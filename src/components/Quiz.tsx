"use client";

import { useState, useTransition } from "react";
import { challenges, challengeOptions } from "@/db/schemas";
import {
  QuizHeader,
  QuestionBubble,
  Challenge,
  QuizFooter,
  QuizResultCard,
} from "@/components";
import { upsertChallengeProgress } from "@/actions/challengeProgress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/userProgress";
import { useAudio, useWindowSize } from "react-use";
import Confetti from "react-confetti";
import Image from "next/image";

type QuizProps = {
  initialLessonId: number;
  initialHearts: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any;
  initialPercentage: number;
};

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialLessonChallenges,
  userSubscription,
  initialPercentage,
}: QuizProps) => {
  const { width, height } = useWindowSize();
  const [correctAudio, _c, correctAudioControls] = useAudio({
    src: "/correct.wav",
  });
  const [incorrectAudio, _i, incorrectAudioControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
  });
  const [lessonId] = useState(initialLessonId);
  const [isPending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = initialLessonChallenges.findIndex(
      (challenge) => !challenge.completed
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [status, setStatus] = useState<
    "correct" | "wrong" | "none" | "completed"
  >("none");
  const [selectedOption, setSelectedOption] = useState<number>();

  const currentChallenge = challenges[activeIndex];

  if (!currentChallenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          height={height}
          width={width}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <QuizResultCard variant="points" value={challenges.length * 10} />
            <QuizResultCard variant="hearts" value={hearts * 10} />
          </div>
        </div>

        <QuizFooter status="completed" onCheck={() => {}} lessonId={lessonId} />
      </>
    );
  }

  const options = currentChallenge?.challengeOptions || [];

  const selectHandler = (optionId: number) => {
    if (status !== "none") {
      return;
    }

    setSelectedOption(optionId);
  };

  const nextQuestionHandler = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const continueHandler = () => {
    if (!selectedOption) {
      return;
    }

    if (status === "wrong") {
      setSelectedOption(undefined);
      setStatus("none");
      return;
    }

    if (status === "correct") {
      setSelectedOption(undefined);
      setStatus("none");
      nextQuestionHandler();
      return;
    }

    const correctOption = options.find(({ correct }) => correct);

    if (!correctOption) {
      return;
    }

    if (selectedOption === correctOption.id) {
      startTransition(async () => {
        try {
          const response = await upsertChallengeProgress(currentChallenge.id);

          if (response?.error === "hearts") {
            setHearts((prevHearts) => prevHearts - 1);
            return;
          }

          correctAudioControls.play();
          setStatus("correct");
          setPercentage(
            (prevPercentage) => prevPercentage + 100 / challenges.length
          );

          if (initialPercentage === 100) {
            setHearts((prevHearts) => Math.min(prevHearts + 1, 5));
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        }
      });
    } else {
      startTransition(async () => {
        try {
          const response = await reduceHearts(currentChallenge.id);

          if (response?.error === "hearts") {
            console.log("hearts");
            return;
          }

          incorrectAudioControls.play();
          setStatus("wrong");

          if (!response?.error) {
            setHearts((prevState) => Math.max(prevState - 1, 0));
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        }
      });
    }
  };

  const title =
    currentChallenge.type === "ASSIST"
      ? "Select the correct meaning"
      : currentChallenge.question;

  return (
    <>
      <QuizHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscriptions={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {currentChallenge.type === "ASSIST" && (
                <QuestionBubble question={currentChallenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={selectHandler}
                status={status}
                selectedOption={selectedOption}
                isDisabled={false}
                type={currentChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <QuizFooter
        isDisabled={!selectedOption || isPending}
        status={status}
        onCheck={continueHandler}
      />
    </>
  );
};
