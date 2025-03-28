import { enrollToCourse } from "@/services/api/apiRequests";

export const handleEnrollToCourse = async (
   courseId: number,
   setError: (error: string) => void
) => {
   try {
      await enrollToCourse(courseId);
   } catch (error){
      setError(error + "error enroll user to course");
   }
}

