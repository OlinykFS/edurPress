import { getAllCourses } from "@/services/api/adminRequests";
import { getTopCourses } from "@/services/api/apiRequests";

import type * as Types from "@/services/types";

export const fetchAllCourses = async (
  setCourses: (courses: Types.Course[]) => void,
  setError: (error: string) => void
) => {
  try {
    const result = await getAllCourses();
    setCourses(result);
  } catch (error) {
    setError("Failed to fetch courses: " + error);
  }
};

export const fetchTopCourses = async (
  setCourses: (courses: Types.Course[]) => void,
  setError: (error: string) => void
) => {
  try {
    const result = await getTopCourses();
    setCourses(result);
  } catch (error) {
    setError("Failed to fetch courses: " + error);
  }
};