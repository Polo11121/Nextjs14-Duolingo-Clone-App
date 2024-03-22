import { cache } from "react";
import { courses, userProgress } from "@/db/schemas";
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
