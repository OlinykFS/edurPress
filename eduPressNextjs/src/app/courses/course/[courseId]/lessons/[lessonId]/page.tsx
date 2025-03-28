"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { getModulesByCourseId, markLessonAsCompleted } from "@/services/api/apiRequests";
import { Module, Lesson } from "@/services/types";
import LeftAside from "@/components/LessonsComponents/LeftAside";
import MainContent from "@/components/LessonsComponents/MainContent";

export default function LessonPage() {
  const { courseId } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const fetchModules = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const modulesData: Module[] = await getModulesByCourseId(Number(courseId));
      setModules(modulesData);
    } catch (err) {
      setError(
        `Failed to load data: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  useEffect(() => {
    if (modules.length > 0 && currentLessonId === null) {
      const lessons: Lesson[] = modules.flatMap((module) => module.lessons || []);
      if (lessons.length > 0) {
        setCurrentLessonId(lessons[0].lessonId);
      }
    }
  }, [modules, currentLessonId]);

  const allLessons: Lesson[] = useMemo(() => {
    return modules.flatMap((module) => module.lessons || []);
  }, [modules]);

  const currentLesson: Lesson | null = useMemo(() => {
    if (!currentLessonId) return null;
    return allLessons.find((lesson) => lesson.lessonId === currentLessonId) || null;
  }, [allLessons, currentLessonId]);

  const { previousLesson, nextLesson } = useMemo(() => {
    if (!currentLesson) return { previousLesson: null, nextLesson: null };
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.lessonId === currentLesson.lessonId
    );
    return {
      previousLesson: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
      nextLesson:
        currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
    };
  }, [allLessons, currentLesson]);

  const handleLessonChange = (newLessonId: number) => {
    setCurrentLessonId(newLessonId);
    setSidebarOpen(false);
  };

  const handleMarkCompleted = async (lessonId: number) => {
    try {
      await markLessonAsCompleted(lessonId);
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold">Lesson not found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      <div className="relative flex flex-1 ">
        <LeftAside
          modules={modules}
          currentLessonId={currentLessonId}
          onLessonChange={handleLessonChange}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "md:ml-72 " : "md:ml-0"
          }`}
        >
          <MainContent
            lesson={currentLesson}
            courseId={Number(courseId)}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
            onLessonChange={handleLessonChange}
            onMarkCompleted={handleMarkCompleted}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>
    
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
        ></div>
      )}
    </div>
  );
}
