"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/services/types";
import CourseCardGrid from "./CourseCardGrid";
import { fetchTopCourses as fetchTopCoursesHandler } from "@/handlers/Course/courseFetchingHandlers";
import MainCardLayout from "@/components/Layout/Main/MainCardLayout";

export default function TopCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCourses = () => {
    fetchTopCoursesHandler(setCourses, setError);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="mt-24 ">
    <MainCardLayout
      title="Featured Courses"
      description="Explore our Popular Courses"
      showAllLink="/courses"
      showAllName="All Courses"
      error={error}
    >
      
      {courses.map((course) => (
        <CourseCardGrid
          key={course.id}
          course={course}
          onClick={() => router.push(`/courses/course/${course.title}?id=${course.id}`)}
        />
      ))}
    </MainCardLayout>
    </div>
  );
}
