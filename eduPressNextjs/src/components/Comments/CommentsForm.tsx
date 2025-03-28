"use client";

import { useState } from "react";
import { addCommentToCourse} from "@/services/api/apiRequests";
import { NewCommentData } from "@/services/types";
import { useAuth } from "@/app/context/authContext";

interface CommentFormProps {
  courseId: number | null;
}

export default function CommentForm({ courseId }: CommentFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to post a comment.");
      return;
    }

    if (!courseId) {
      setError("Invalid course ID. Please try again later.");
      return;
    }

    if (!content.trim()) {
      setError("Comment content cannot be empty.");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const newComment: NewCommentData = {
        courseId,
        content,
        studentId: Number(user.id),
      };

      await addCommentToCourse(newComment);
      setContent("");
      setSuccess("Comment posted successfully!");
    } catch (err) {
      console.error("Failed to post comment:", err);
      setError("Failed to post comment. Please try again later.");
    }
  };

  if (!user) {
    return (
      <div className="text-red-500">
        You must be logged in to post a comment.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 px-4">
      <h3 className="mb-4 font-semibold text-xl">Leave a comment</h3>
      {success && <p className="mb-4 text-blue-500">{success}</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border-[#9D9D9D] border-[1px] mt-5 p-3 border-solid rounded-lg w-full h-[110px]"
        placeholder="Write your comment here..."
      />
      <button
        type="submit"
        className="bg-[#FF782D] mt-7 px-6 py-3 rounded-3xl font-semibold text-white"
        disabled={!content.trim()}
      >
        Post comment
      </button>
    </form>
  );
}
