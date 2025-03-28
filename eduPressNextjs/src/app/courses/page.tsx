"use client";
import React, { useState, useEffect, useCallback } from "react";
import LayoutWithCards from "@/components/Layout/Main/CardLayout";
import CourseCardGrid from "@/components/Courses/CourseCardGrid";
import CourseCardList from "@/components/Courses/CourseCardList";
import CourseFilter from "@/components/Courses/CourseFilter";
import {
  getAllCourses,
  getCoursesByInstructor,
  getCoursesByCategory,
  searchCourses,
} from "@/services/api/apiRequests";
import { Course } from "@/services/types";
import { useInfiniteScroll } from "@/services/hooks/useInfiniteScroll";
import { fetchPaginatedData } from "@/services/utils/fetchPaginatedData";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useResponsiveLayout } from "@/services/hooks/useResponsiveLayout";

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const size = 9;
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<number[]>([]);
  
  const [searchValue, setSearchValue] = useState("");

  const [layout, toggleLayout] = useResponsiveLayout();

  const fetchCourses = useCallback(async (currentPage: number) => {
    try {
      let data;
      if (selectedCategories.length === 1 && selectedInstructors.length === 0) {
        const categoryId = selectedCategories[0];
        data = await fetchPaginatedData<Course>(
          currentPage,
          size,
          new Set(),
          setIsLoading,
          (page, size) => getCoursesByCategory(categoryId, page, size)
        );
      } else if (selectedInstructors.length === 1 && selectedCategories.length === 0) {
        const instructorId = selectedInstructors[0];
        data = await fetchPaginatedData<Course>(
          currentPage,
          size,
          new Set(),
          setIsLoading,
          (page, size) => getCoursesByInstructor(instructorId, page, size)
        );
      } else {
        data = await fetchPaginatedData<Course>(
          currentPage,
          size,
          new Set(),
          setIsLoading,
          getAllCourses
        );
        if (data && (selectedCategories.length > 0 || selectedInstructors.length > 0)) {
          data.content = data.content.filter((course: Course) => {
            const categoryMatch =
              selectedCategories.length === 0 ||
              selectedCategories.includes(course.categoryId);
            const instructorMatch =
              selectedInstructors.length === 0 ||
              selectedInstructors.includes(course.instructorId);
            return categoryMatch && instructorMatch;
          });
        }
      }
      if (data) {
        setCourses((prevCourses) =>
          currentPage === 0 ? data.content : [...prevCourses, ...data.content]
        );
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [selectedCategories, selectedInstructors]);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setPage(0);
      setCourses([]);
      fetchCourses(0);
    }
  }, [selectedCategories, selectedInstructors, fetchCourses, searchValue]);

  useEffect(() => {
    const query = searchValue.trim();
    if (query !== "") {
      setIsLoading(true);
      searchCourses(query)
        .then((result) => {
          setCourses(result);
          setTotalPages(1);
          setPage(0);
        })
        .catch((error) => console.error("Error searching courses:", error))
        .finally(() => setIsLoading(false));
    }
  }, [searchValue]);

  useEffect(() => {
    if (page !== 0 && searchValue.trim() === "") {
      fetchCourses(page);
    }
  }, [page, fetchCourses, searchValue]);

  const incrementPage = useCallback(() => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  }, [page, totalPages]);

  const lastElementRef = useInfiniteScroll(incrementPage, isLoading, page, totalPages);

  return (
    <>
      <div className="mx-auto mt-24 max-w-[1290px] flex flex-col lg:flex-row gap-6 px-4 relative">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 w-[300px]">All Courses</h1>
            <div className="flex items-center justify-end w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full py-2 pr-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                <Image
                  src="/img/icons/adminIcons/search.svg"
                  alt="Search Icon"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2"
                />
              </div>
              <div className="hidden md:flex gap-2 ml-4">
                <div
                  onClick={() => toggleLayout("grid")}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-100 transition ${layout === "grid" ? "bg-gray-100" : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    className={layout === "grid" ? "fill-orange-500" : "fill-gray-700"}
                  >
                    <path d="M2.5 2.5V9.16667H9.16667V2.5H2.5ZM2.5 10.8333V17.5H9.16667V10.8333H2.5ZM10.8333 2.5V9.16667H17.5V2.5H10.8333ZM10.8333 10.8333V17.5H17.5V10.8333Z" />
                  </svg>
                </div>
                <div
                  onClick={() => toggleLayout("list")}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-100 transition ${layout === "list" ? "bg-gray-100" : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    className={layout === "list" ? "fill-orange-500" : "fill-gray-700"}
                  >
                    <path d="M2.5 2.5H17.5V5H2.5V2.5ZM2.5 7.5H17.5V10H2.5V7.5ZM2.5 12.5H17.5V15H2.5V12.5Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <LayoutWithCards<Course>
            showHeader={false}
            data={courses}
            layout={layout}
            toggleLayout={toggleLayout}
            renderGridCard={(course) => (
              <CourseCardGrid
                course={course}
                onClick={() => router.push(`/courses/course/${course.title}?id=${course.id}`)}
              />
            )}
            renderListCard={(course) => (
              <CourseCardList
                course={course}
                onClick={() => router.push(`/courses/course/${course.title}?id=${course.id}`)}
              />
            )}
          />
          <div ref={lastElementRef} />
        </div>
        <div className="hidden lg:block sticky top-12 right-0 h-fit self-start z-10">
          <div className="w-[300px]">
            <CourseFilter
              variant="desktop"
              selectedCategories={selectedCategories}
              selectedInstructors={selectedInstructors}
              onCategorySelect={setSelectedCategories}
              onInstructorSelect={setSelectedInstructors}
            />
          </div>
        </div>
      </div>
      <div className="lg:hidden px-4 z-50">
        <CourseFilter
          variant="mobile"
          selectedCategories={selectedCategories}
          selectedInstructors={selectedInstructors}
          onCategorySelect={setSelectedCategories}
          onInstructorSelect={setSelectedInstructors}
        />
      </div>
    </>
  );
  
}
