"use client";

import { Course } from "@/services/types";
import CourseListItem from "./CourseListItem";
import { useRouter } from "next/navigation";

interface CourseListProps {
  courses: Course[];
  showMenu?: boolean;
}

export default function CourseList({ courses, showMenu = false }: CourseListProps) {
  const router = useRouter();

  return (
    <div className="divide-y divide-gray-200">
      {courses.map((course) => (
        <CourseListItem
          key={course.id}
          course={course}
          showMenu={showMenu}
          onClick={(id) => router.push(`/courses/course/${course.title}?id=${id}`)}
        />
      ))}
    </div>
  );
}
