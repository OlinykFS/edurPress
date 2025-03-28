"use client";
import { useState, useEffect, useRef } from "react";
import { getCourseOverview } from "@/services/api/apiRequests";
import type { CourseOverview } from "@/services/types";

interface CourseOverviewProps {
  courseId: number;
}

const CACHE_KEY_PREFIX = "overview_";
const CACHE_TTL = 24 * 60 * 60 * 1000;

export default function CourseOverview({ courseId }: CourseOverviewProps) {
  const [overview, setOverview] = useState<CourseOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getCachedData = (courseId: number): CourseOverview | null => {
    const cacheKey = `${CACHE_KEY_PREFIX}${courseId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }
    return null;
  };

  const saveDataToCache = (courseId: number, data: CourseOverview) => {
    const cacheKey = `${CACHE_KEY_PREFIX}${courseId}`;
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  };

  const clearOldCache = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
          const { timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp > CACHE_TTL) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  };

  useEffect(() => {
    const loadOverview = async () => {
      try {
        clearOldCache();

        const cachedData = getCachedData(courseId);
        if (cachedData) {
          setOverview(cachedData);
          setLoading(false);
          return;
        }

        const data = await getCourseOverview(courseId);
        setOverview(data);
        saveDataToCache(courseId, data);
      } catch (err) {
        setError("Failed to load course overview.");
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, [courseId]);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="border-[#FF782D] border-b-2 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="font-medium text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="font-medium text-red-500 text-xl">Course overview not found.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h3 className="mb-4 font-bold text-[#1A1A1A] text-2xl">Course Description</h3>
        <p className="text-[#4A4A4A] text-lg leading-relaxed">
          {overview.description || "No description available."}
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-bold text-[#1A1A1A] text-2xl">Certification</h3>
        <p className="text-[#4A4A4A] text-lg leading-relaxed">
          {overview.certification || "No certification details available."}
        </p>
      </div>

      <div className="shadow-sm border rounded-lg overflow-hidden">
        <div
          onClick={() => toggleSection("requirements")}
          className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 px-6 h-14 transition cursor-pointer"
        >
          <h3 className="font-semibold text-[16px] text-gray-800">Requirements</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              openSection === "requirements" ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          ref={(el) => {
            contentRefs.current["requirements"] = el;
          }}
          className={`overflow-hidden transition-all duration-300 ease-in-out`}
          style={{
            maxHeight: openSection === "requirements" ? contentRefs.current["requirements"]?.scrollHeight : 0,
          }}
        >
          <ul className="space-y-2 px-6 py-4 list-disc list-inside">
            {overview.requirements?.map((requirement, index) => (
              <li key={index} className="text-[#4A4A4A] text-lg leading-relaxed">
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shadow-sm border rounded-lg overflow-hidden">
        <div
          onClick={() => toggleSection("features")}
          className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 px-6 h-14 transition cursor-pointer"
        >
          <h3 className="font-semibold text-[16px] text-gray-800">Features</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              openSection === "features" ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          ref={(el) => {
            contentRefs.current["features"] = el;
          }}
          className={`overflow-hidden transition-all duration-300 ease-in-out`}
          style={{
            maxHeight: openSection === "features" ? contentRefs.current["features"]?.scrollHeight : 0,
          }}
        >
          <ul className="space-y-2 px-6 py-4 list-disc list-inside">
            {overview.features?.map((feature, index) => (
              <li key={index} className="text-[#4A4A4A] text-lg leading-relaxed">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shadow-sm border rounded-lg overflow-hidden">
        <div
          onClick={() => toggleSection("targetAudience")}
          className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 px-6 h-14 transition cursor-pointer"
        >
          <h3 className="font-semibold text-[16px] text-gray-800">Target Audience</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              openSection === "targetAudience" ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          ref={(el) => {
            contentRefs.current["targetAudience"] = el;
          }}
          className={`overflow-hidden transition-all duration-300 ease-in-out`}
          style={{
            maxHeight: openSection === "targetAudience" ? contentRefs.current["targetAudience"]?.scrollHeight : 0,
          }}
        >
          <ul className="space-y-2 px-6 py-4 list-disc list-inside">
            {overview.targetAudience?.map((audience, index) => (
              <li key={index} className="text-[#4A4A4A] text-lg leading-relaxed">
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}