
import { addCourseWithImage, deleteCourse, updateCourse } from "@/services/api/adminRequests";
import type * as Types from "@/services/types";

export const handleAddCourse = async (
  data: Types.NewCourseData,
  image: File | null,
  setError: (error: string) => void
) => {
  try {
    const response = await addCourseWithImage(data, image);
    
    return await response;
  } catch (error) {
    setError(error instanceof Error ? error.message : "Unknown error");
    throw error;
  }
};

export const handleDeleteCourse = async (
  id: number,
  fetchCourse: () => Promise<void>,
  setError: (error: string) => void
) => {
  try {
    await deleteCourse(id);
    await fetchCourse();
  } catch (error) {
    setError("Failed to delete course: " + error);
  }
};