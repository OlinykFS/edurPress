"use client";

import { addListOfLessonsToModule } from "@/services/api/adminRequests";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { NewLesson } from "@/services/types";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { Trash2, Plus, GripVertical, X } from "lucide-react";

function createEmptyLesson(moduleId: number): NewLesson & { tempId: string } {
  return {
    tempId: uuidv4(),
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    requirements: [""],
    lessonOrder: 0,
    moduleId,
  };
}

export default function NewLessonForModulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { courseTitle, moduleId } = useParams();

  const [lessons, setLessons] = useState(() => [createEmptyLesson(Number(moduleId))]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLessonChange = useCallback(
    <K extends keyof NewLesson>(tempId: string, field: K, value: NewLesson[K]) => {
      setLessons((prev) =>
        prev.map((lesson) =>
          lesson.tempId === tempId ? { ...lesson, [field]: value } : lesson
        )
      );
    },
    []
  );
  

  const handleRequirementChange = (tempId: string, index: number, value: string) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.tempId === tempId
          ? {
              ...lesson,
              requirements: lesson.requirements?.map((req, i) => (i === index ? value : req)),
            }
          : lesson
      )
    );
  };

  const addRequirement = (tempId: string) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.tempId === tempId
          ? { ...lesson, requirements: [...(lesson.requirements || []), ""] }
          : lesson
      )
    );
  };

  const removeRequirement = (tempId: string, index: number) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.tempId === tempId
          ? { ...lesson, requirements: (lesson.requirements || []).filter((_, i) => i !== index) }
          : lesson
      )
    );
  };

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    setLessons((prev) => {
      const updatedLessons = Array.from(prev);
      const [movedItem] = updatedLessons.splice(result.source.index, 1);
      updatedLessons.splice(result.destination!.index, 0, movedItem);
      return updatedLessons.map((lesson, index) => ({ ...lesson, lessonOrder: index + 1 }));
    });
  }, []);

  const addNewLesson = () => setLessons((prev) => [...prev, createEmptyLesson(Number(moduleId))]);

  const removeLesson = (tempId: string) => {
    if (lessons.length > 1) {
      setLessons((prev) => prev.filter((lesson) => lesson.tempId !== tempId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await addListOfLessonsToModule(lessons);
      router.push(`/admin/courses/${courseTitle}/modules/new?id=${courseId}`);
    } catch (err) {
      console.error("Error adding lessons:", err);
      setError("An error occurred while adding lessons.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-3 lg:px-8 py-10 min-h-screen">
      <div className="mx-auto px-4 max-w-[1290px]">
        <h1 className="mb-8 font-bold text-3xl text-gray-800 tracking-wide">
          Create New Lessons
        </h1>

        {error && (
          <div className="bg-red-200 mb-4 p-3 rounded text-center text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="lessons">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {lessons.map((lesson, index) => (
                    <Draggable key={lesson.tempId} draggableId={lesson.tempId} index={index}>
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
                            <button
                              type="button"
                              onClick={() => removeLesson(lesson.tempId)}
                              className="text-red-500 hover:text-red-600 disabled:opacity-50"
                              disabled={lessons.length === 1}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Lesson Title
                              </label>
                              <input
                                type="text"
                                placeholder="Lesson Title"
                                value={lesson.title}
                                onChange={(e) =>
                                  handleLessonChange(lesson.tempId, "title", e.target.value)
                                }
                                className="border-gray-300 bg-gray-50 p-3 border rounded-lg w-full focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                                required
                              />
                            </div>

                            <div>
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Video URL
                              </label>
                              <input
                                type="url"
                                placeholder="Video URL"
                                value={lesson.videoUrl}
                                onChange={(e) =>
                                  handleLessonChange(lesson.tempId, "videoUrl", e.target.value)
                                }
                                className="border-gray-300 bg-gray-50 p-3 border rounded-lg w-full focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Duration (minutes)
                              </label>
                              <input
                                type="number"
                                placeholder="Duration"
                                value={lesson.duration}
                                onChange={(e) =>
                                  handleLessonChange(lesson.tempId, "duration", e.target.value)
                                }
                                className="border-gray-300 bg-gray-50 p-3 border rounded-lg w-full focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all"
                                required
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Description
                              </label>
                              <textarea
                                placeholder="Lesson Description"
                                value={lesson.description}
                                onChange={(e) =>
                                  handleLessonChange(lesson.tempId, "description", e.target.value)
                                }
                                className="border-gray-300 bg-gray-50 p-3 border rounded-lg w-full h-32 focus:ring-2 focus:ring-orange-500 text-gray-800 focus:outline-none transition-all resize-none"
                                required
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block mb-1 font-medium text-gray-700 text-sm">
                                Requirements
                              </label>
                              {lesson.requirements?.map((req, reqIndex) => (
                                <div key={reqIndex} className="flex gap-2 mb-2">
                                  <input
                                    type="text"
                                    placeholder="Requirement"
                                    value={req}
                                    onChange={(e) =>
                                      handleRequirementChange(
                                        lesson.tempId,
                                        reqIndex,
                                        e.target.value
                                      )
                                    }
                                    className="border-gray-300 bg-gray-50 p-2 border rounded-lg w-full"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeRequirement(lesson.tempId, reqIndex)
                                    }
                                    className="text-red-500"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addRequirement(lesson.tempId)}
                                className="text-orange-500"
                              >
                                + Add Requirement
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={addNewLesson}
                      className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium text-gray-800 flex items-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      Add Another Lesson
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8">
            <button
              type="button"
              onClick={() =>
                router.push(`/admin/courses/${courseTitle}/modules/new?id=${courseId}`)
              }
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium text-gray-800"
            >
              Back to Modules
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-3 rounded-lg font-medium text-white flex items-center gap-2"
            >
              {isSubmitting
                ? "Creating..."
                : `Create ${lessons.length} Lesson${lessons.length > 1 ? "s" : ""}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
