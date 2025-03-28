import { useState, useEffect } from "react";
import { Course } from "@/services/types";

import { CourseCard } from "./CourseCard";
import Link from "next/link";
import { getAllCourses } from "@/services/api/apiRequests";

export default function CourseDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const data = await getAllCourses(currentPage, size);
      setCourses(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Error fetching course");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="text-white">
      <Link className="bg-slate-600 px-3 py-1" href={`/admin/courses/new`}>
        Add New Course
      </Link>

      <div className="flex flex-wrap gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0 || isLoading}
          className="bg-gray-700 px-4 py-2 rounded disabled:bg-gray-500"
        >
          {"<<"} Back
        </button>

        <span className="text-lg">
          {page + 1} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
          disabled={page >= totalPages - 1 || isLoading}
          className="bg-blue-500 px-4 py-2 rounded disabled:bg-gray-500"
        >
          Next {">>"}
        </button>
      </div>

      {isLoading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}
