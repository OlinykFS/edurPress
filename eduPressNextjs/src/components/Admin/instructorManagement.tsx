import { getAllInstructorsHandler } from "@/handlers/User/getAllInstructors";
import { Instructor } from "@/services/types";
import { useEffect, useState } from "react";
import Image from "next/image";

const getInitials = (name: string): string => {
  if (!name) return "NA";
  const parts = name.split(" ");
  return parts.map((part) => part.charAt(0).toUpperCase()).slice(0, 2).join("");
};

export default function InstructorManagement() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [errors, setErrors] = useState<string | null>(null);

  const fetchData = async () => {
    await getAllInstructorsHandler(setInstructors, setErrors);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 text-white">
      {errors && <div className="mb-4 text-red-500">{errors}</div>}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {instructors.map((instructor) => (
          <div key={instructor.id}
            className="flex flex-col bg-gray-800 shadow-md p-4 rounded-lg">
            <div className="flex">
              <div className="flex justify-center items-center bg-gray-500 mr-4 rounded-full w-24 h-24 font-bold text-lg text-white overflow-hidden">
                {instructor.avatarUrl ? (
                  <Image
                    src={instructor.avatarUrl}
                    alt={`${instructor.username}'s avatar`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"/>
                ) : (
                  <span>{getInitials(instructor.username)}</span>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{instructor.username}</h3>
                <p className="text-gray-400 text-sm">{instructor.age} лет</p>
                <p className="text-gray-400 text-sm truncate">{instructor.specialization}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm break-words whitespace-pre-wrap">
                {instructor.bio}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {instructor.socialMedia.map((social, index) => (
                <a key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline truncate">
                  {social.name}
                </a>
              ))}
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <button className="bg-green-500 hover:bg-green-700 px-4 py-1 rounded font-bold text-white">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-700 px-4 py-1 rounded font-bold text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
