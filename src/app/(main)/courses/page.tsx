import { CoursesList } from "@/components/CoursesList";
import { getCoursers } from "@/db/queries";

const CoursesPage = async () => {
  const courses = await getCoursers();

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <CoursesList courses={courses} />
    </div>
  );
};

export default CoursesPage;
