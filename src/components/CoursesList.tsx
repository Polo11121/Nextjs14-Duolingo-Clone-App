"use client";

import { courses } from "@/db/schemas";
import { Card } from "@/components";

type CoursesListProps = {
  courses: (typeof courses.$inferSelect)[];
};

export const CoursesList = ({ courses }: CoursesListProps) => (
  <div className="grid grid-cols-2 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
    {courses.map(({ id, imageSrc, title }) => (
      <Card
        id={id}
        key={id}
        title={title}
        imageSrc={imageSrc}
        onClick={() => {}}
        disabled={false}
      />
    ))}
  </div>
);
