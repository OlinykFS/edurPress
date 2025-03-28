"use client";

import { useState } from "react";
import { Lesson } from "@/services/types";
import { useRouter } from "next/navigation";
import Accordion from "../Layout/Main/Accordion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MainContentProps {
  lesson: Lesson;
  courseId: number;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  onLessonChange: (lessonId: number) => void;
  onMarkCompleted: (lessonId: number) => void;
  toggleSidebar?: () => void;
}

function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getYouTubeEmbedUrl(url: string): string {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
}

export default function MainContent({
  lesson,
  courseId,
  previousLesson,
  nextLesson,
  onLessonChange,
  onMarkCompleted,
  toggleSidebar,
}: MainContentProps) {
  const router = useRouter();
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const embedUrl =
    lesson.videoUrl && isYouTubeUrl(lesson.videoUrl)
      ? getYouTubeEmbedUrl(lesson.videoUrl)
      : null;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-600 hover:text-gray-800 rounded focus:outline-none"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-800 truncate">{lesson.title}</h1>
        </div>
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-600 hover:text-gray-800 rounded focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full">
        <div className="space-y-6">
          {/* Video Section */}
          {lesson.videoUrl && (
            <section className="rounded-lg overflow-hidden border border-gray-200">
              {embedUrl ? (
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lesson.title}
                  />
                </div>
              ) : (
                <video controls className="w-full">
                  <source src={lesson.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </section>
          )}

          {/* Description */}
          <section className="prose max-w-none">
            <p className="text-gray-700 text-base leading-relaxed">{lesson.description}</p>
          </section>

          {/* Requirements */}
          <section>
            <Accordion
              title="Requirements"
              isOpen={isAccordionOpen}
              onToggle={() => setAccordionOpen((prev) => !prev)}
            >
              {lesson.requirements && lesson.requirements.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  {lesson.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No requirements listed.</p>
              )}
            </Accordion>
          </section>

          {/* Navigation */}
          <section className="flex justify-between items-center mt-8">
            <button
              onClick={() => previousLesson && onLessonChange(previousLesson.lessonId)}
              disabled={!previousLesson}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              <span>{previousLesson?.title || "No previous lesson"}</span>
            </button>
            <button
              onClick={() => nextLesson && onLessonChange(nextLesson.lessonId)}
              disabled={!nextLesson}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <span>{nextLesson?.title || "No next lesson"}</span>
              <ChevronRight size={16} />
            </button>
          </section>

          {/* Completion Button */}
          <section className="mt-6">
            {!lesson.completed ? (
              <button
                onClick={() => onMarkCompleted(lesson.lessonId)}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                Mark as Completed
              </button>
            ) : (
              <div className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-600 text-center font-medium">
                Lesson Completed ✓
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}