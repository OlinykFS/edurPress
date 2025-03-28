import { getInstructorData } from "@/services/api/adminRequests";
import {Instructor} from "@/services/types";

export const fetchInstructor = async (userId: number): Promise<Instructor> => {
  try {
    const result = await getInstructorData(userId);
    if (!result) {
      throw new Error("Instructor not found");
    }
    return result;
  } catch (error) {
    throw new Error("Failed to fetch Instructor Info: " + error);
  }
};
