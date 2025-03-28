"use client";

import { addFaqToCourse } from "@/services/api/adminRequests";
import { NewFAQs } from "@/services/types";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useState } from "react";

export default function FaqsPage() {
  const router = useRouter();
  const { courseTitle } = useParams();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const [error, setError] = useState("");
  const [faqs, setFaqs] = useState<NewFAQs>({
    courseId: Number(courseId),
    question: "",
    answer: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFaqs({
      ...faqs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await addFaqToCourse(faqs);
      setFaqs({ ...faqs, question: "", answer: "" });
    } catch (err) {
      console.error("Error adding faqs:", err);
      setError("An error occurred while adding the faqs.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">FAQs</h1>
      <p className="text-lg text-gray-700 mb-6">
        Here you can find the frequently asked questions about the course.
      </p>
      <div className="bg-white shadow rounded p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              value={faqs.question}
              onChange={handleChange}
              placeholder="Enter the question"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <textarea
              name="answer"
              id="answer"
              value={faqs.answer}
              onChange={handleChange}
              rows={4}
              placeholder="Enter the answer"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add FAQ
          </button>
          <button
               onClick={() => router.push(`/admin/courses/${courseTitle}/modules/new?id=${courseId}`)}
               >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
