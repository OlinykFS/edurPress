import { getAllInstructors, getAllInstructorsName } from "@/services/api/adminRequests";
import {Instructor} from "@/services/types";
import { ApiError } from "@/services/api/api";

export const getAllInstructorsHandler = async (
   setInstructors: (instructors: Instructor[]) => void,
   setErrors: (error: string) => void
) => {
   try {
      const result = await getAllInstructors();
      setInstructors(result);
   } catch (e) {
      setErrors(e + "error getting all instructors");
   }
}

export const getAllInstructorsNameHandler = async (
   setInstructors: (instructors: Instructor[]) => void,
   setErrors: (error: string) => void
 ) => {
   try {
     const result = await getAllInstructorsName();
     setInstructors(result);
   } catch (e) {
     if (e instanceof ApiError) {
       setErrors(`Error: ${e.message}`);
     } else {
       setErrors("An unexpected error occurred while fetching instructors.");
     }
   }
 };
 