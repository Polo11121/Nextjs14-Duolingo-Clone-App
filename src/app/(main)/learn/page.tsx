import {
  FeedWrapper,
  LearnHeader,
  StickyWrapper,
  Unit,
  UserProgress,
} from "@/components";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
    ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row gap-[40px] px-6">
      <FeedWrapper>
        <LearnHeader title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <Unit
            key={unit.id}
            id={unit.id}
            order={unit.order}
            title={unit.title}
            description={unit.description}
            lessons={unit.lessons}
            activeLesson={courseProgress?.activeLesson}
            activeLessonPercentage={lessonPercentage}
          />
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hasActiveSubscription={false}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
