import { getCourseById } from "@/services/api/apiRequests";
import {Course} from "@/services/types";

export const fetchCourse = async (
  courseId: number,
  setCourse: (course: Course) => void,
  setError: (error: string) => void,
) => {
  if (!Number.isInteger(courseId)) {
    setError("Invalid course ID");
    return;
  }
  try {
    const course = await getCourseById(courseId);
    if (!course) {
      setError("Course not found");
      return;
    }
    setCourse(course);
  } catch (error) {
    setError("Failed to fetch course: " + error);
  }
};

