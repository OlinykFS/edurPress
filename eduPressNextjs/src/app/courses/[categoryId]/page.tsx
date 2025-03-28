"use client";
import { useEffect, useState, useCallback } from "react";
import { Course } from "@/services/types";
import { useRouter, useParams } from "next/navigation";
import CourseCardGrid from "@/components/Courses/CourseCardGrid";
import { useInfiniteScroll } from "@/services/hooks/useInfiniteScroll";
import { getCoursesByCategory } from "@/services/api/apiRequests";

export default function CoursesByCategory() {
  const { categoryId } = useParams();
  const router = useRouter();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const categoryIdNumber = Number(categoryId);
  const size = 9;

  const fetchCourses = useCallback(async (currentPage: number) => {
    try {
      setIsLoading(true);
      const data = await getCoursesByCategory(categoryIdNumber, currentPage, size);
      setCourses((prev) =>
        currentPage === 0 ? data.content : [...prev, ...data.content]
      );
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError("Failed to fetch courses: " + err);
    } finally {
      setIsLoading(false);
    }
  }, [categoryIdNumber]);

  useEffect(() => {
    if (categoryIdNumber) {
      setPage(0);
      setCourses([]);
      fetchCourses(0);
    }
  }, [categoryIdNumber, fetchCourses]);

  const incrementPage = useCallback(() => {
    if (page < totalPages - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCourses(nextPage);
    }
  }, [page, totalPages, fetchCourses]);

  const lastElementRef = useInfiniteScroll(incrementPage, isLoading, page, totalPages);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <section className="mt-24 w-[1290px] mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-3xl font-semibold">Featured Courses</h2>
          <p className="text-[18px]">Explore our Popular Courses</p>
        </div>
        <a
          href="/courses"
          className="border-black border-solid border-[1px] rounded-full py-[10px] px-5 hover:bg-black hover:text-white transition-all duration-150"
        >
          All Courses
        </a>
      </div>
      <div className="grid w-full grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCardGrid
            key={course.id}
            course={course}
            onClick={(courseId) => router.push(`/courses/course/${courseId}`)}
          />
        ))}
      </div>
      <div ref={lastElementRef} />
      {isLoading && <p>Loading...</p>}
    </section>
  );
}
