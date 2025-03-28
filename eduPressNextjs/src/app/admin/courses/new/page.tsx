"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCategories } from "@/services/api/adminRequests";
import { getAllInstructorsNameHandler } from "@/handlers/User/getAllInstructors";
import { handleAddCourse } from "@/handlers/Admin/Courses/courseHandlers";
import { Category, Instructor, NewCourseData } from "@/services/types";

export default function AddCoursePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [newCourse, setNewCourse] = useState<NewCourseData>({
    title: "",
    description: "",
    categoryId: 0,
    instructorId: 0,
    price: null,
    duration: null,
    discount: null,
    freeCourse: false,
    difficulty: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResult = await getAllCategories();
        setCategories(categoriesResult);

        await getAllInstructorsNameHandler(
          (data) => setInstructors(data),
          (err) => setError(err)
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    if (
      !newCourse.title ||
      !newCourse.description ||
      !newCourse.categoryId ||
      !newCourse.instructorId ||
      (newCourse.price === null || newCourse.price < 0) ||
      (newCourse.duration === null || newCourse.duration < 0) ||
      (newCourse.discount !== null && (newCourse.discount! < 0 || newCourse.discount! > 100))
    ) {
      setError("Please fill out all required fields correctly.");
      return false;
    }
    return true;
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof NewCourseData
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setNewCourse({ ...newCourse, [field]: value ? +value : null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const createdCourse = await handleAddCourse(
        { ...newCourse, freeCourse: newCourse.price === 0 },
        image,
        setError
      );

      if (createdCourse) {
        router.push(`/admin/courses/${createdCourse.title}/overview/new?id=${createdCourse.id}`);

      } else {
        setError("Failed to receive course ID from server.");
      }
    } catch (error) {
      setError("Failed to create course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-3 lg:px-8 py-10 min-h-screen">
      <div className="mx-auto px-4 max-[400px]:p-2 max-w-[1290px]">
        <h1 className="mb-8 font-bold text-3xl text-gray-800 tracking-wide">
          Create New Course
        </h1>
        {error && (
          <div className="bg-red-200 mb-4 p-3 rounded font-semibold text-center text-red-800 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Course Title
              </label>
              <input
                type="text"
                placeholder="Course Title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
                required/>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Course Description
              </label>
              <textarea
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full h-32 text-gray-800 focus:outline-none transition-all resize-none"
                required/>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Price
              </label>
              <input
                type="number"
                placeholder="Price"
                value={newCourse.price ?? ""}
                onChange={(e) => handleNumberChange(e, "price")}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
                required/>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Duration (hours)
              </label>
              <input
                type="number"
                placeholder="Duration"
                value={newCourse.duration ?? ""}
                onChange={(e) => handleNumberChange(e, "duration")}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Discount (%)
              </label>
              <input
                type="number"
                placeholder="Discount"
                value={newCourse.discount ?? ""}
                onChange={(e) => handleNumberChange(e, "discount")}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Difficulty
              </label>
              <select
                value={newCourse.difficulty || ""}
                onChange={(e) => setNewCourse({ ...newCourse, difficulty: e.target.value })}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 transition-all cursor-pointer appearance-none focus:outline-none">
                <option value="" disabled>
                  Select Difficulty
                </option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Category
              </label>
              <select
                value={newCourse.categoryId}
                onChange={(e) => setNewCourse({ ...newCourse, categoryId: +e.target.value })}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 transition-all cursor-pointer appearance-none focus:outline-none"
              >
                <option value={0} disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Instructor
              </label>
              <select
                value={newCourse.instructorId}
                onChange={(e) => setNewCourse({ ...newCourse, instructorId: +e.target.value })}
                className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 transition-all cursor-pointer appearance-none focus:outline-none"
              >
                <option value={0} disabled>
                  Select Instructor
                </option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Course Image
              </label>
              <div className="relative border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 p-4 border-dashed rounded-lg transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
                <div className="text-center text-gray-600">
                  {image ? image.name : "Choose an image"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 col-span-full pt-4">
            <button
              type="button"
              onClick={() => router.push("/courses")}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium text-gray-800 transition-all">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-3 rounded-lg font-medium text-white transition-all">
              {isSubmitting ? "Creating..." : "Next >"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
