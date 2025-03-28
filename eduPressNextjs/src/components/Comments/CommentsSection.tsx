import Image from "next/image";
import { formatDate } from "@/services/utils/utils";
import { getListOfComment } from "@/services/api/apiRequests";
import { CommentData, PaginatedResponse } from "@/services/types";
import { useEffect, useState } from "react";

interface CommentsSectionProps {
  courseId: number;
}

function getInitials(name: string): string {
  if (!name) return "NA";
  const parts = name.split(" ");
  return parts.map((part) => part.charAt(0).toUpperCase()).slice(0, 2).join("");
}

export default function CommentsSection({ courseId }: CommentsSectionProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<PaginatedResponse<CommentData>>();
  const [error, setError] = useState<string | null>(null);
  const pageSize = 3;

  useEffect(() => {
    if (courseId) {
      getListOfComment(courseId, currentPage - 1, pageSize)
        .then((data) => setComments(data))
        .catch((err) => {
          console.error(err);
          setError("Error when tried to get Comments");
        });
    }
  }, [courseId, currentPage]);

  const totalPages = comments?.totalPages || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mt-6">
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-6 px-4">
        {comments?.content.map((comment) => (
          <li key={comment.id} className="flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex flex-shrink-0 justify-center items-center bg-gray-100 border rounded-full w-10 md:w-14 h-10 md:h-14 font-semibold text-gray-600 text-lg md:text-xl overflow-hidden">
                {comment.studentAvatar ? (
                  <Image
                    src={comment.studentAvatar}
                    alt="avatar"
                    width={100}
                    height={100}
                    quality={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{getInitials(comment.studentUsername || "")}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                  <p className="font-semibold text-base text-gray-800 md:text-lg truncate">
                    {comment.studentUsername}
                  </p>
                  <p className="font-normal text-gray-500 text-sm md:text-base">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                <p className="mt-2 font-normal text-gray-600 text-sm md:text-base break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-2 mt-8 px-4">
        <button
          className={`p-2 md:px-4 md:py-2 rounded-full transition-colors ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-100"
          }`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`min-w-[2.5rem] px-3 py-2 text-sm md:text-base rounded-full transition-colors ${
                currentPage === index + 1 ? "bg-black text-white font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className={`p-2 md:px-4 md:py-2 rounded-full transition-colors ${
            currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-100"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
