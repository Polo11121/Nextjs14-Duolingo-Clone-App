import {
  FeedWrapper,
  LearnHeader,
  StickyWrapper,
  UserProgress,
} from "@/components";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row gap-[40px] px-6">
      <FeedWrapper>
        <LearnHeader title={userProgress.activeCourse.title} />
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
