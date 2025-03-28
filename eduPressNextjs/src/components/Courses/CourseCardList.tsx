"use client";
import { Course } from "@/services/types";
import Image from "next/image";
import { useState } from "react";

interface CourseCardProps {
  course: Course;
  onClick: (courseId: number) => void;
}

export default function CourseCardList({ course, onClick }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className="group relative border-[#EAEAEA] border-[1px] bg-white shadow-sm hover:shadow-lg border-solid rounded-xl w-full transition-all hover:-translate-y-3 duration-300 cursor-pointer overflow-hidden"
      style={{ height: "250px" }}
    >
      <div className="flex h-full">
        <div className="relative">
          <div
            className="bg-gray-200 w-full h-full animate-pulse"
            style={{ display: imageLoaded ? "none" : "block" }}
          />
          <Image
            src={course.imageUrl || "/img/courseImageNotFound.jpg"}
            width={137}
            height={250}
            alt={course.title || "Course image"}
            quality={100}
            className={`w-[350px] h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          <span className="top-3 left-3 absolute bg-black px-3 py-1 rounded-md text-white text-xs uppercase">
            {course.categoryName || "Other"}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-2/3">
          <div>
            <div className="flex justify-between items-center">
              <h3
                className={`text-lg font-semibold line-clamp-2 ${
                  isHovered ? "text-orange-500" : "text-gray-600"
                } transition-colors duration-150`}
              >
                {course.title}
              </h3>
              <p
                className={`text-lg font-bold ${
                  isHovered ? "text-orange-500" : "text-gray-600"
                } transition-colors duration-150`}
              >
                {course.price ? `$${course.price}` : "Free"}
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              by {course.instructorName || "Unknown Author"}
            </p>
          </div>
        <div className="flex justify-between items-center py-2 border-t-2">
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[14px] text-gray-500">
            <div className="flex items-center gap-2 min-w-[80px]">
              <Image src={`/img/icons/courseIcons/timeIcon.svg`} alt="time duration" width={16} height={16} />
              <span>{course.duration || "N/A"} Weeks</span>
            </div>

            <div className="flex items-center gap-2 min-w-[80px]">
              <Image src={`/img/icons/courseIcons/studentIcon.svg`} alt="students" width={16} height={16} />
              <span>{course.studentsCount || 0} Students</span>
            </div>

            <div className="flex items-center gap-2 min-w-[80px]">
              <Image src={`/img/icons/courseIcons/lessonIcon.svg`} alt="modules" width={16} height={16} />
              <span>{course.modulesCount} Modules</span>
            </div>

            <div className="flex items-center gap-2 min-w-[80px] lowercase">
              <Image src={`/img/icons/courseIcons/levelIcon.svg`} alt="level" width={16} height={16} />
              <span>{course.difficulty} Level</span>
            </div>
          </div>

            <button className="font-medium text-blue-600 hover:underline">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}