import { useApplications } from "@/services/hooks/useApplications";
import { InstructorApplicationUpdateData } from "@/services/types";
import ApplicationCard from "./ApplicationCard";

export default function InstructorApplicationManagement() {
  const { applications, error, updateApplication, deleteApplication } = useApplications();

  const handleAction = (id: number, stat: string) => {
    const updatedApplication: InstructorApplicationUpdateData = {
      applicationId: id,
      status: stat
    };
    updateApplication(updatedApplication);
  };

  return (
    <div className="p-4 text-white">
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            handleAction={handleAction}
            handleDelete={deleteApplication}
          />
        ))}
      </div>
    </div>
  );
}
