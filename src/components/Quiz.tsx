"use client";

import { useState } from "react";
import { challenges, challengeOptions } from "@/db/schemas";
import { QuizHeader } from "@/components";

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
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <>
      <QuizHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscriptions={!!userSubscription?.isActive}
      />
    </>
  );
};
