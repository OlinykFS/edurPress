import {addInstructorApplication, deleteInstructorApplication, getInstructorApplication, patchInstructorApplication } from "@/services/api/adminRequests";
import type * as Types from "@/services/types";

export const handleAddApplication = async (
  newApplication: Types.InstructorNewApplicationData,
  setError: (error: string) => void
) => {
  if (!newApplication.title || !newApplication.bio || !newApplication.age || !newApplication.specialization) {
    setError("Please fill all fields");
    return;
  }
  try {
    await addInstructorApplication(newApplication);
  } catch (error) {
    setError("Error: " + error);
  }
};

export const handleGetAllApplication = async (
  setApplication: (application: Types.InstructorApplication[]) => void,
  setError: (error: string) => void
) => {
  try {
    const result = await getInstructorApplication();
    setApplication(result);
  } catch (error) {
    setError("Error: " + error);
  }
};

export const handlePatchApplication = async (
  updatedApplication: Types.InstructorApplicationUpdateData,
  setError: (error: string) => void
) => {
  try {
    await patchInstructorApplication(updatedApplication);
  } catch (error) {
    setError("Error: " + error);
  }
};

export const handleDeleteApplication = async (
  id: number,
  setError: (error: string) => void
) => {
  try {
    await deleteInstructorApplication(id);
  } catch (error) {
    setError("Failed to delete application: " + error);
  }
};