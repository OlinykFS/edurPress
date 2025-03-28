"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCourseModule } from "@/services/api/adminRequests";
import { getModulesByCourseId } from "@/services/api/apiRequests";
import { Module, UpdateModuleData } from "@/services/types";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

export default function CourseModuleEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [modules, setModules] = useState<Module[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => { 
    if (!courseId) {
      setError("Course ID is missing.");
      return;
    }

    const loadModules = async () => {
      const loadedModules = await getModulesByCourseId(Number(courseId));
      if (!loadedModules) {
        setError("Modules not found.");
      } else {

        const sortedModules = loadedModules.sort((a, b) => (a.moduleOrder || 0) - (b.moduleOrder || 0));
        setModules(sortedModules);
      }
    };

    loadModules();
  }, [courseId]);

  
  const handleChange = (moduleId: number, field: keyof UpdateModuleData, value: string | number) => {
    setModules((prev) =>
      prev?.map((module) =>
        module.id === moduleId ? { ...module, [field]: value } : module
      ) || null
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !modules) return;

    const updatedModules = Array.from(modules);
    const [movedModule] = updatedModules.splice(result.source.index, 1);
    updatedModules.splice(result.destination.index, 0, movedModule);

    const reorderedModules = updatedModules.map((module, index) => ({
      ...module,
      moduleOrder: index + 1,
    }));

    setModules(reorderedModules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!modules) {
      setError("Modules data is not loaded.");
      setIsSubmitting(false);
      return;
    }

    const invalidModules = modules.filter((module) => !module.title.trim());
    if (invalidModules.length > 0) {
      setError("All modules must have a title.");
      setIsSubmitting(false);
      return;
    }

    try {
      
      for (const mod of modules) {
        const updateData: UpdateModuleData = {
          title: mod.title,
          duration: mod.duration,
          description: mod.description,
          moduleOrder: mod.moduleOrder,
        };
        await updateCourseModule(mod.id, updateData);
      }
      
      router.push(`/courses/course/course/?id=${courseId}`);
    } catch (error) {
      setError("Failed to update modules. Please try again.");
      console.error("Error updating modules:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!modules) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        {error ? error : "Loading modules..."}
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-3 lg:px-8 py-10 ">
      <div className="mx-auto px-4 max-[400px]:p-2 max-w-[1290px]">
        <h1 className="mb-8 font-bold text-3xl text-gray-800 tracking-wide">Edit Modules</h1>
        {error && (
          <div className="bg-red-200 mb-4 p-3 rounded font-semibold text-center text-red-800 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="modules">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {modules.map((module, index) => (
                    <Draggable
                      key={module.id}
                      draggableId={String(module.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div
                              {...provided.dragHandleProps}
                              className="p-2 hover:bg-gray-100 rounded cursor-move"
                            >
                              <GripVertical className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Title
                              </label>
                              <input
                                type="text"
                                value={module.title}
                                onChange={(e) => handleChange(module.id, "title", e.target.value)}
                                className="border-gray-300 bg-gray-50 p-3 border rounded-lg w-full focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                                required
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Duration
                              </label>
                              <input
                                type="text"
                                value={module.duration || ""}
                                onChange={(e) => handleChange(module.id, "duration", e.target.value)}
                                className="border-gray-300 bg-gray-50 p-3 border rounded-lg w-full focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Description
                              </label>
                              <textarea
                                value={module.description || ""}
                                onChange={(e) => handleChange(module.id, "description", e.target.value)}
                                className="border-gray-300 bg-gray-50 p-3 border rounded-lg w-full h-32 focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex justify-end space-x-4 pt-8">
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}