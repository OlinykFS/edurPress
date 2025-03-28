"use client";
import { Course } from "@/services/types";
import Image from "next/image";
import { useState } from "react";

interface CourseCardProps {
  course: Course;
  onClick: (courseId: number) => void;
}

export default function CourseCardGrid({ course, onClick }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      onClick={() => {
        if (course.id !== undefined) {
          onClick(course.id);
        } else {
          console.error("Course ID is undefined.");
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col border-[#EAEAEA] border-[1px] bg-white shadow-sm hover:shadow-xl border-solid rounded-xl w-full max-w-full h-[550px] transition-all hover:-translate-y-2 duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative bg-gray-200 h-[50%] overflow-hidden">
        <Image
          src={course.imageUrl || "/img/courseImageNotFound.jpg"}
          width={410}
          height={250}
          alt={course.title || "Course image"}
          quality={100}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-105" : "scale-100"}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
            <div className="border-gray-900 border-t-2 border-b-2 rounded-full w-10 h-10 animate-spin"></div>
          </div>
        )}
        <span className="top-3 left-3 absolute bg-black px-3 py-1 rounded-md text-white text-xs uppercase">
          {course.categoryName || "Category"}
        </span>
      </div>
      <div className="flex flex-col gap-4 p-6 h-[50%]">
        <p className="font-semibold text-gray-500 text-sm">
          by{" "}
          <span className="text-blue-600">
            {course.instructorName || "Unknown Author"}
          </span>
        </p>
        <h3
          className={`text-xl font-bold  ${
            isHovered ? "text-orange-500" : "text-gray-800"
          } transition-colors duration-150`}
        >
          {course.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Image src={`/img/icons/courseIcons/timeIcon.svg`} alt="Duration" width={16} height={16} />
            <span>{course.duration || "N/A"} Weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={`/img/icons/courseIcons/studentIcon.svg`} alt="Students" width={16} height={16} />
            <span>{course.studentsCount || 0} Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={`/img/icons/courseIcons/lessonIcon.svg`} alt="Modules" width={16} height={16} />
            <span>{course.modulesCount} Modules</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <p
            className={`text-xl font-bold ${
              isHovered ? "text-orange-500" : "text-gray-800"
            } transition-colors duration-150`}
          >
            {course.price ? `$${course.price}` : "Free"}
          </p>
          <button
            className={`w-full py-3 rounded-full font-medium transition-all duration-200 ${
              isHovered
                ? "bg-orange-500 text-white"
                : "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-orange-500 hover:text-white hover:border-orange-500"
            }`}
            onMouseEnter={(e) => {
              e.stopPropagation();
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}