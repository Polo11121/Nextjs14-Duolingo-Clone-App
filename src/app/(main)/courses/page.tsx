import { CoursesList } from "@/components/CoursesList";
import { getCoursers, getUserProgress } from "@/db/queries";

const CoursesPage = async () => {
  const coursesData = getCoursers();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <CoursesList
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  );
};

export default CoursesPage;
