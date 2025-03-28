"use client";

import { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { addOverviewToCourse } from "@/services/api/adminRequests";
import { TagInput } from "@/components/Layout/Main/TagInput";

export interface CourseOverview {
  certification: string;
  learningOutcomes: string[];
  requirements: string[];
  features: string[];
  targetAudience: string[];
}


export default function NewCourseOverview() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [certification, setCertification] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [error, setError] = useState("");
  
  const courseId = searchParams.get("id");
  
  const { courseTitle } = useParams();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const overviewPayload: CourseOverview & { courseId: number } = {
      courseId: Number(courseId),
      certification,
      learningOutcomes,
      requirements,
      features,
      targetAudience,
    };

    try {
      await addOverviewToCourse(overviewPayload);
      router.push(`/admin/courses/${courseTitle}/faqs/new?id=${courseId}`);
    } catch (err) {
      setError("Failed to add course overview");
    }
  };
  // router.push(`/admin/courses/${courseTitle}/modules/new?id=${courseId}`);
  return (
    <section className="sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="mx-auto px-4 max-w-[1290px]">
        <h1 className="mb-8 font-bold text-3xl text-gray-800 tracking-wide">
          Create Course Overview
        </h1>
        {error && (
          <div className="mb-4 p-3 border border-red-300 rounded font-semibold text-center text-red-800 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Certification
            </label>
            <input
              type="text"
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
              placeholder="Enter certification details"
              className="border-gray-300 bg-gray-50 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 w-full text-gray-800 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Learning Outcomes
            </label>
            <TagInput
              value={learningOutcomes}
              onChange={setLearningOutcomes}
              placeholder="Type an outcome and press Enter"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Requirements
            </label>
            <TagInput
              value={requirements}
              onChange={setRequirements}
              placeholder="Type a requirement and press Enter"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Features
            </label>
            <TagInput
              value={features}
              onChange={setFeatures}
              placeholder="Type a feature and press Enter"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Target Audience
            </label>
            <TagInput
              value={targetAudience}
              onChange={setTargetAudience}
              placeholder="Type an audience entry and press Enter"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium text-gray-800 transition-all">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-medium text-white transition-all">
              Add Overview
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
