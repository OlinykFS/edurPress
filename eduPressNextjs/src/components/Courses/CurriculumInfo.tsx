"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getModulesByCourseId } from "@/services/api/apiRequests";
import { Module } from "@/services/types";
import Accordion from "@/components/Layout/Main/Accordion";

interface CurriculumInfoProps {
  courseId: number;
}

export default function CurriculumInfo({ courseId }: CurriculumInfoProps) {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [openModuleId, setOpenModuleId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const result = await getModulesByCourseId(courseId);
        setModules(result);
      } catch (err: any) {
        setError(err + " - Failed to load curriculum data");
      }
    };
    loadModules();
  }, [courseId]);

  const toggleModule = (moduleId: number) =>
    setOpenModuleId((prev) => (prev === moduleId ? null : moduleId));

  const handleLessonClick = (lessonId: number) => {
    router.push(`/courses/course/${courseId}/lessons/${lessonId}`);
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!modules.length) return <p>No curriculum data</p>;

  return (
    <div className="space-y-4">
      {modules.map((module) => {
        if (!module.id) return null;
        const isOpen = openModuleId === module.id;
        const isRestricted = !module.lessons || module.lessons.length === 0;

        const header = (
          <div
            className={`flex justify-between items-center h-14 bg-gray-100 px-6 transition ${
              isOpen ? "bg-gray-200" : ""
            } ${isRestricted ? "opacity-50 pointer-events-none" : "cursor-pointer hover:bg-gray-200"}`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/img/icons/courseIcons/moduleArrowIcon.svg"
                alt="Arrow icon"
                width={16}
                height={16}
                className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
              />
              <div className="flex gap-7 items-center">
                <h3 className="font-semibold text-[16px] text-gray-800">{module.title} </h3>
                <p className="text-[12px]">{module.description}</p>
              </div>
            </div>
            <span className="text-gray-600 text-sm">
              {module.lessonsCount} Lessons • {module.duration || "N/A"}
            </span>
          </div>
        );

        return (
          <Accordion
            key={module.id}
            header={header}
            isOpen={isOpen}
            onToggle={() => {
              if (!isRestricted) toggleModule(module.id);
            }}
          >
            {!isRestricted && (
              <ul className="divide-y divide-gray-200">
                {module.lessons?.map((lesson) => {
                  if (!lesson.lessonId) return null;
                  return (
                    <li
                      key={lesson.lessonId}
                      className="flex justify-between hover:bg-gray-50 px-4 py-2 cursor-pointer"
                      onClick={() => handleLessonClick(lesson.lessonId)}
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/img/icons/courseIcons/fileLessonIcon.svg"
                          alt="Lesson icon"
                          width={16}
                          height={16}
                        />
                        <p>{lesson.title}</p>
                        
                      </div>
                      <div className="flex items-center space-x-4">
                        <button className="font-medium text-blue-600">Preview</button>
                        <p className="text-gray-600 text-sm">{lesson.duration}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Accordion>
        );
      })}
    </div>
  );
}
