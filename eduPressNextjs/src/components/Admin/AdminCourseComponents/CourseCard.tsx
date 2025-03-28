import { useState } from "react";
import { Course } from "@/services/types";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="relative bg-gray-800 border border-gray-600 shadow-lg rounded-lg p-6 text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="flex justify-between items-center mb-3">
        <h2 
          className="text-xl font-bold cursor-pointer hover:text-blue-400 transition"
          onClick={() => router.push(`/courses/course/${course.title}?id=${course.id}`)}
        >
          {course.title}
        </h2>
        <button onClick={toggleMenu} className="relative">
          <svg className="w-6 h-6 text-gray-400 hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2"
              d="M12 6v.01M12 12v.01M12 18v.01" 
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute right-4 top-10 bg-gray-700 text-sm text-white rounded-md shadow-lg w-36 z-20">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Edit</li>
            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Delete</li>
            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">View</li>
          </ul>
        </div>
      )}

      <div 
        className={`inline-block text-xs font-semibold px-3 py-1 rounded-lg text-white mb-4
          ${course.difficulty === "EASY" ? "bg-green-500" : course.difficulty === "MEDIUM" ? "bg-yellow-500" : "bg-red-700"}`}
      >
        {course.difficulty}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div><span className="text-gray-400">Category:</span> {course.categoryName}</div>
        <div><span className="text-gray-400">Price:</span> {course.price === 0 ? "Free" : `$${course.price}`}</div>
        <div><span className="text-gray-400">Duration:</span> {Math.ceil(course.duration)} hours</div>
        <div><span className="text-gray-400">Modules:</span> {course.modulesCount || "N/A"}</div>
        <div><span className="text-gray-400">Rating:</span> {course.averageRating || "N/A"}</div>
        <div><span className="text-gray-400">Students:</span> {course.studentsCount || "N/A"}</div>
        <div className="col-span-2"><span className="text-gray-400">Instructor:</span> {course.instructorName || "N/A"}</div>
      </div>
    </div>
  );
};
