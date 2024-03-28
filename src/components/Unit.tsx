import { UnitBanner, LessonButton } from "@/components";
import { lessons, units } from "@/db/schemas";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson?: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  };
  activeLessonPercentage: number;
};

export const Unit = ({
  activeLessonPercentage,
  activeLesson,
  description,
  id,
  lessons,
  order,
  title,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = activeLesson?.id === lesson.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              id={lesson.id}
              key={lesson.id}
              index={index}
              percentage={activeLessonPercentage}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
            />
          );
        })}
      </div>
    </>
  );
};
