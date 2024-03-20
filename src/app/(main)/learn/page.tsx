import {
  FeedWrapper,
  LearnHeader,
  StickyWrapper,
  UserProgress,
} from "@/components";

const LearnPage = () => (
  <div className="flex flex-row gap-[40px] px-6">
    <FeedWrapper>
      <LearnHeader title="spanish" />
    </FeedWrapper>
    <StickyWrapper>
      <UserProgress
        activeCourse={{
          title: "Spanish",
          imageSrc: "/es.svg",
        }}
        hasActiveSubscription={false}
        hearts={5}
        points={100}
      />
    </StickyWrapper>
  </div>
);

export default LearnPage;
