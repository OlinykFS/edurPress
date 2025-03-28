"use client";

import { Course } from "@/services/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface CourseListItemProps {
  course: Course;
  onClick: (courseId: number) => void;
  showMenu?: boolean;
}

export default function CourseListItem({ course, onClick, showMenu = false }: CourseListItemProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false); 

    const courseTitle = encodeURIComponent(course.title);
    const courseId = course.id;

    switch (action) {
      case "Edit Course":
        router.push(`/admin/courses/${courseTitle}/edit?id=${courseId}`);
        break;
      case "Add New Module":
        
        router.push(`/admin/courses/${courseTitle}/modules/new?courseId=${courseId}`);
        break;
      case "Add New Lesson to Module":
        
        router.push(`/admin/courses/${courseTitle}/modules?courseId=${courseId}`);
        break;
      case "Edit Module":
        
        router.push(`/admin/courses/${courseTitle}/modules/edit/?courseId=${courseId}`);
        break;
      case "Edit Lesson":
        
        router.push(`/admin/courses/${courseTitle}/modules?courseId=${courseId}`);
        break;
      default:
        console.log(`Unknown action "${action}" on course ID ${courseId}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      onClick={() => {
        if (course.id !== undefined) {
          onClick(course.id);
        }
      }}
      className="relative flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={course.imageUrl || "/img/courseImageNotFound.jpg"}
          alt={course.title || "Course image"}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-600">{course.categoryName || "Category"}</p>
        <div className="flex items-center space-x-4 mt-1">
          <span className="text-sm text-gray-500">
            {course.duration ? `${course.duration} weeks` : "Duration N/A"}
          </span>
          <span className="text-sm text-gray-500">
            {course.studentsCount} students
          </span>
        </div>
      </div>
      <div className="ml-4">
        <span className="text-xl font-bold text-gray-800">
          {course.price ? `$${course.price}` : "Free"}
        </span>
      </div>

      {showMenu && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition-colors z-20"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-12 right-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-30 animate-menu overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <button
                  onClick={(e) => handleMenuAction("Edit Course", e)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Edit Course
                </button>
                <button
                  onClick={(e) => handleMenuAction("Add New Module", e)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Add New Module
                </button>
                <button
                  onClick={(e) => handleMenuAction("Add New Lesson to Module", e)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Add New Lesson to Module
                </button>
                <button
                  onClick={(e) => handleMenuAction("Edit Module", e)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Edit Module
                </button>
                <button
                  onClick={(e) => handleMenuAction("Edit Lesson", e)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Edit Lesson
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes menuFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-menu {
          animation: menuFadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
}