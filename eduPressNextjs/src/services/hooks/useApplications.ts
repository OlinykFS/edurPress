import { useState, useEffect } from "react";
import { handleGetAllApplication,handlePatchApplication,handleDeleteApplication } from "@/handlers/Admin/Applications/applicationHandler";
import { InstructorApplication, InstructorApplicationUpdateData } from "@/services/types";

export const useApplications = () => {
  const [applications, setApplications] = useState<InstructorApplication[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      await handleGetAllApplication(setApplications, setError);
    } catch {
      setError("Failed to fetch applications.");
    }
  };

  const updateApplication = async (application: InstructorApplicationUpdateData) => {
    try {
      await handlePatchApplication(application, setError);
      await fetchData();
    } catch {
      setError("Failed to update application status.");
    }
  };

  const deleteApplication = async (applicationId: number) => {
    try {
      await handleDeleteApplication(applicationId, setError);
      await fetchData();
    } catch {
      setError("Failed to delete application.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { applications, error, fetchData, updateApplication, deleteApplication };
};
