"use client";

import { useState, useTransition } from "react";
import { challenges, challengeOptions } from "@/db/schemas";
import {
  QuizHeader,
  QuestionBubble,
  Challenge,
  QuizFooter,
} from "@/components";
import { upsertChallengeProgress } from "@/actions/challengeProgress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/userProgress";

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
        lessonId={initialLessonId}
      />
    </>
  );
};
