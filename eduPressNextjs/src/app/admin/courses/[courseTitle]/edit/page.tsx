"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCourse } from "@/services/api/adminRequests";
import { getCourseById } from "@/services/api/apiRequests";
import { Difficult, UpdateCourseData,Course } from "@/services/types";

export default function CourseEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const [course, setCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setError("Course ID is missing.");
      return;
    }

    const loadCourse = async () => {
      const loadedCourse = await getCourseById(Number(courseId));
      if (!loadedCourse) {
        setError("Course not found.");
      } else {
        setCourse(loadedCourse);
      }
    };

    loadCourse();
  }, [courseId]);

  const handleChange = (field: keyof Course, value: string | number | boolean) => {
    if (!course) return;
    setCourse({ ...course, [field]: value });
  };

  const validateForm = () => {
    if (!course) {
      setError("Course data is not loaded.");
      return false;
    }

    if (!course.title || course.title.trim() === "") {
      setError("Title must not be empty.");
      return false;
    }

    if (course.price === undefined || course.price < 0) {
      setError("Price must be >= 0.");
      return false;
    }

    if (course.discount !== undefined && (course.discount < 0 || course.discount > 100)) {
      setError("Discount must be between 0 and 100.");
      return false;
    }

    if (!course.description || course.description.trim() === "") {
      setError("Description must not be empty.");
      return false;
    }

    if (course.difficulty && !Object.values(Difficult).includes(course.difficulty as Difficult)) {
      setError("Invalid difficulty level. Must be EASY, MEDIUM, or HARD.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!course || !courseId) {
      setError("Course data is missing.");
      setIsSubmitting(false);
      return;
    }

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const courseUpdateData: UpdateCourseData = {
        id: Number(courseId),
        title: course.title,
        difficult: course.difficulty as Difficult,
        freeCourse: course.price === 0 || course.freeCourse === true,
        description: course.description,
        price: course.price,
        discount: course.discount || 0,
      };

      await updateCourse(course.id, courseUpdateData);
      router.push(`/courses/course/${course.title}?id=${course.id}`);
    } catch (error) {
      setError("Failed to update course. Please try again.");
      console.error("Error updating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        {error ? error : "Loading course..."}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-3 lg:px-8 py-10 min-h-screen">
      <div className="mx-auto px-4 max-[400px]:p-2 max-w-[1290px]">
        <h1 className="mb-8 font-bold text-3xl text-gray-800 tracking-wide">Edit Course: {course.title}</h1>
        {error && (
          <div className="bg-red-200 mb-4 p-3 rounded font-semibold text-center text-red-800 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Course Title</label>
              <input
                type="text"
                placeholder="Course Title"
                value={course.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Course Description</label>
              <textarea
                placeholder="Course Description"
                value={course.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full h-32 text-gray-800 focus:outline-none transition-all resize-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={course.price ?? ""}
                onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Discount (%)</label>
              <input
                type="number"
                placeholder="Discount"
                value={course.discount ?? ""}
                onChange={(e) => handleChange("discount", parseFloat(e.target.value) || 0)}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Difficulty</label>
              <select
                value={course.difficulty || ""}
                onChange={(e) => handleChange("difficulty", e.target.value)}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 transition-all cursor-pointer appearance-none focus:outline-none"
              >
                <option value="" disabled>
                  Select Difficulty
                </option>
                <option value={Difficult.EASY}>Easy</option>
                <option value={Difficult.MEDIUM}>Medium</option>
                <option value={Difficult.HARD}>Hard</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Duration (hours)</label>
              <input
                type="number"
                placeholder="Duration"
                value={course.duration ?? ""}
                disabled
                className="border-gray-300 bg-gray-100 p-3 border rounded-lg w-full text-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Category</label>
              <input
                type="text"
                value={course.categoryName || ""}
                disabled
                className="border-gray-300 bg-gray-100 p-3 border rounded-lg w-full text-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Instructor</label>
              <input
                type="text"
                value={course.instructorName || ""}
                disabled
                className="border-gray-300 bg-gray-100 p-3 border rounded-lg w-full text-gray-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 col-span-full pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin/courses")}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium text-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-3 rounded-lg font-medium text-white transition-all"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}