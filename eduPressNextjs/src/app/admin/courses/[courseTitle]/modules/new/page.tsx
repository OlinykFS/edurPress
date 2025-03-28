"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { handleAddModuleToCourse } from "@/handlers/Course/moduleHandlers/moduleHandler";
import { NewModule } from "@/services/types";

export default function AddModulePage() {
  const router = useRouter();

  const { courseTitle } = useParams();

  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const [moduleData, setModuleData] = useState<NewModule>({
    title: "",
    description: "",
    duration: "",
    courseId: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseId) {
      setModuleData((prev) => ({ ...prev, courseId: Number(courseId) }));
    }
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const mod = await handleAddModuleToCourse(moduleData, setError);
      if (mod && module.id) {
        router.push(`/admin/courses/${courseTitle}/modules/${module.id}/lessons/new?courseId=${courseId}`);
      } else {
        setError("Module creation failed.");
      }
    } catch (err) {
      console.error("Error adding module:", err);
      setError("An error occurred while adding the module.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="mx-auto max-w-[1290px]">
        <h1 className="mb-8 font-bold text-3xl text-center text-gray-800 tracking-wide">
          Add New Module
        </h1>

        {error && (
          <div className="mb-4 p-3 border border-red-300 rounded font-semibold text-center text-red-800 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Module Title
            </label>
            <input
              type="text"
              value={moduleData.title}
              onChange={(e) =>
                setModuleData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Module Duration
            </label>
            <input
              type="text"
              value={moduleData.duration}
              onChange={(e) =>
                setModuleData((prev) => ({ ...prev, duration: e.target.value }))
              }
              className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Description
            </label>
            <textarea
              value={moduleData.description}
              onChange={(e) =>
                setModuleData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none h-32 transition-all resize-none"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium text-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-3 rounded-lg font-medium text-white transition-all"
            >
              Add Module &amp; Add Lessons
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
