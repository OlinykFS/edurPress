"use client";

import { useState, useEffect } from "react";
import { Course } from "@/services/types";
import { getUsersCourses } from "@/services/api/apiRequests";

import CourseList from "./CourseList";

export default function UserCourses() {
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>("");

  const getUserCourses = async () => {
    try {
      const result = await getUsersCourses();
      setUserCourses(result);
    } catch (error) {
      console.log("Error fetching user courses: " + error);
      setError("Failed to load courses.");
    }
  };

  useEffect(() => {
    getUserCourses();
  }, []);

  return (
    <section>
      {error && <p>error {error}</p>}
        <CourseList courses={userCourses} />
    </section>
  );
}
