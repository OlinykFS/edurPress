import { useState, useEffect } from "react";
import { Course } from "@/services/types";
import { getPublishedCourses } from "@/services/api/apiRequests";
import CourseList from "./CourseList";

export default function  UserPublishedCourses() {
   const [userCourses, setUserCourses] = useState<Course[]>([]);
   
   const getUserPublishedCourses = async () => {
      try {
      const result = await getPublishedCourses();
      setUserCourses(result);
      } catch (error) {
      console.log("error fetching user published courses" + error)
      }
   }

   useEffect(() => {
      getUserPublishedCourses();
   }, []);

   return (
      <section className="max-h-[500px] overflow-y-auto">
            <CourseList
            showMenu
            courses={userCourses} />

      </section>
   )
}