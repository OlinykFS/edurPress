"use client";

import { useState } from "react";
import { Module } from "@/services/types";
import Accordion from "../Layout/Main/Accordion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeftAsideProps {
  modules: Module[];
  currentLessonId: number | null;
  onLessonChange: (lessonId: number) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function LeftAside({
  modules,
  currentLessonId,
  onLessonChange,
  isSidebarOpen,
  toggleSidebar,
}: LeftAsideProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) newSet.delete(moduleId);
      else newSet.add(moduleId);
      return newSet;
    });
  };

  return (
    <aside
      className={`bg-gray-50 text-gray-800 border-r border-gray-200 transition-transform duration-300 h-full fixed top-0 left-0 z-40 shadow-sm ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-96`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold truncate">Course Content</h2>
        <button
          onClick={toggleSidebar}
          className="p-1 text-gray-600 hover:text-gray-800 rounded focus:outline-none"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {isSidebarOpen && (
        <nav className="p-3 space-y-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 64px)" }}>
          {modules.map((module) => (
            <Accordion
              key={module.id}
              title={`${module.title} (${module.lessons?.length || 0})`}
              isOpen={expandedModules.has(module.id)}
              onToggle={() => toggleModule(module.id)}
            >
              <ul className="space-y-1 mt-1">
                {module.lessons?.map((lesson) => (
                  <li key={lesson.lessonId}>
                    <button
                      onClick={() => onLessonChange(lesson.lessonId)}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex items-center justify-between ${
                        currentLessonId === lesson.lessonId
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="truncate flex-1">{lesson.title}</span>
                      {lesson.completed && (
                        <span className="text-green-500 ml-2">✓</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion>
          ))}
        </nav>
      )}
    </aside>
  );
}