import { addModuleToCourse } from "@/services/api/adminRequests"
import { NewModule } from "@/services/types";

export const handleAddModuleToCourse = async (
   newModule: NewModule,
   setError: (error: string) => void
) => {
   try {
      const result = await addModuleToCourse(newModule);
      return result;
   } catch (e){
      setError(e + "error add module to course");
   }
}