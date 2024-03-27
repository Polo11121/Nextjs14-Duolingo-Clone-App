import { cache } from "react";
import { courses, units, userProgress } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@clerk/nextjs";

export const getCoursers = cache(async () => await db.query.courses.findMany());

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });
});

export const getCourseById = cache(
  async (id: number) =>
    await db.query.courses.findFirst({ where: eq(courses.id, id) })
);

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWIthCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every(
        (challenge) =>
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
      );

      return {
        ...lesson,
        completed: allCompletedChallenges,
      };
    });

    return { ...unit, lessons: lessonsWIthCompletedStatus };
  });

  return normalizedData;
});
