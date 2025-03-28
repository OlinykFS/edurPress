import { getAllCourses, getAllCategories } from "@/services/api/adminRequests";
import type * as Types from "@/services/types";

export const fetchCourses = async (
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

export const fetchCategories = async (
  setCategories: (categories: Types.Category[]) => void,
  setError: (error: string) => void
) => {
  try {
    const result = await getAllCategories();
    setCategories(result);
  } catch (error) {
    setError("Failed to fetch categories: " + error);
  }
};