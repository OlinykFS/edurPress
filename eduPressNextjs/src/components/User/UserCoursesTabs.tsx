"use client";

import { useState } from "react";
import UserCourses from "@/components/User/userCourses";
import UserPublishedCourses from "@/components/User/userPublishedCourses";
import { useAuth } from "@/app/context/authContext";
  

interface CoursesTabsProps {
  showPublished: boolean;
}

export default function CoursesTabs({ showPublished }: CoursesTabsProps) {
  const [activeTab, setActiveTab] = useState<"enrolled" | "published">("enrolled");
  const { hasRole } = useAuth();
  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row border-b border-gray-300">
        <button
          onClick={() => setActiveTab("enrolled")}
          className={`py-2  w-full sm:w-auto text-center text-sm font-semibold focus:outline-none transition-all ${
            activeTab === "enrolled"
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-600"
          }`}
        >
          Your Courses
        </button>
        {(hasRole("INSTRUCTOR") || hasRole("ADMIN")) && (
          <div className="">
            {showPublished && (
              <button
                onClick={() => setActiveTab("published")}
                className={`mt-2 sm:mt-0 sm:ml-4 py-2 px-3 w-full sm:w-auto text-center text-sm font-semibold focus:outline-none transition-all ${
                  activeTab === "published"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-600"
                }`}
              >
                Published Courses
              </button>
            )}
        </div>
      )}
      </div>
      <div className="pt-4">
        {activeTab === "enrolled" && <UserCourses />}
        {(hasRole("INSTRUCTOR") || hasRole("ADMIN")) && (
          <div className="">
            {activeTab === "published" && showPublished && <UserPublishedCourses />}
          </div>
        )}
      </div>
    </div>
  );
}
