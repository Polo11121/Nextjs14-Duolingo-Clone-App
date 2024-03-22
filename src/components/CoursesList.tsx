"use client";

import { courses, userProgress } from "@/db/schemas";
import { Card } from "@/components";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/userProgress";
import { toast } from "sonner";

type CoursesListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const CoursesList = ({ courses, activeCourseId }: CoursesListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const clickCardHandler = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(async () => {
      try {
        await upsertUserProgress(id);
        toast.success("Course successfully started.");
      } catch {
        toast.error("Something went wrong.");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map(({ id, imageSrc, title }) => (
        <Card
          id={id}
          key={id}
          title={title}
          imageSrc={imageSrc}
          onClick={clickCardHandler}
          disabled={pending}
          active={id === activeCourseId}
        />
      ))}
    </div>
  );
};
