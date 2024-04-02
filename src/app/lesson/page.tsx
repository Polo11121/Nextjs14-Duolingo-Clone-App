import { Quiz } from "@/components";
import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/courses");
  }

  const lessonChallenges = lesson.challenges ?? [];

  const initialPercentage =
    (lessonChallenges.filter((challenge) => challenge.completed).length /
      lessonChallenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={false}
    />
  );
};

export default LessonPage;
