import { InstructorApplication } from "@/services/types";
import { formatDate } from "@/services/utils/utils";

interface ApplicationCardProps {
  application: InstructorApplication;
  handleAction: (applicationId: number, status: string) => void;
  handleDelete: (applicationId: number) => void;
}

export default function ApplicationCard({
  application,
  handleAction,
  handleDelete,
}: ApplicationCardProps) {
  return (
    <div className="flex flex-col bg-gray-800 shadow-md p-4 rounded-lg">
      <div className="flex flex-col mb-4">
        <p className="text-gray-400 text-sm">
          <strong>Title:</strong> {application.title}
        </p>
        <h3 className="mb-2 font-semibold text-lg">ID: {application.id}</h3>
        <p className="text-gray-400 text-sm">
          <strong>Status:</strong> {application.status}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Created At:</strong> {formatDate(application.createdAt)}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>User Name:</strong> {application.username}
        </p> 
        <p className="text-gray-400 text-sm">
          <strong>User ID:</strong> {application.userId}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Age:</strong> {application.age}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Specialization:</strong> {application.specialization}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Social Media:</strong>{" "}
          {application.socialMedia.map((social: { name: string; link: string }, index: number) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-500 text-sm hover:underline truncate"
            >
              {social.name}
            </a>
          ))}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Bio:</strong> {application.bio}
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded font-bold text-white"
          onClick={() => handleAction(application.applicationId, "REJECTED")}
        >
          REJECT
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 px-3 py-1 rounded font-bold text-white"
          onClick={() => handleAction(application.applicationId, "APPROVED")}
        >
          APPROVE
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded font-bold text-white"
          onClick={() => handleDelete(application.applicationId)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}