"use client";

import { useState, useEffect } from "react";
import { CourseRatingData } from "@/services/types";
import { getCourseRating, rateCourse } from "@/services/api/apiRequests";
import CommentsSection from "./CommentsSection";


interface CommentListProps {
  courseId: number | null;
}

export default function CommentList({ courseId }: CommentListProps) {
  const [ratingData, setRatingData] = useState<CourseRatingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  const fetchRatingData = () => {
    if (courseId) {
      getCourseRating(courseId)
        .then((data) => setRatingData(data))
        .catch((err) => {
          console.error(err);
          setError("Error when tried get Rating");
        });
    }
  };

  useEffect(() => {
    fetchRatingData();
  }, [courseId]);

  const handleStarClick = (star: number) => {
    if (!courseId) return;
    rateCourse({ courseId, rating: star })
      .then(() => {
        setUserRating(star);
        fetchRatingData();
      })
      .catch((err) => {
        console.error(err);
        setError("Error when tried to send Rating");
      });
  };


  return (
    <div className="flex flex-col justify-between mt-6 min-h-[350px]">
      {ratingData ? (
        <div className="px-4">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{ratingData.averageRating.toFixed(1)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <svg
                    key={i}
                    onClick={() => handleStarClick(starValue)}
                    className={`w-6 h-6 cursor-pointer ${
                      starValue <= Math.round(ratingData.averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } ${userRating === starValue ? "scale-110" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.163c.969 0 1.372 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.062 9.374c-.784-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.947z" />
                  </svg>
                );
              })}
            </div>
            <p className="text-gray-500 text-sm">
              based on {ratingData.totalRatings.toLocaleString()} ratings
            </p>
          </div>

          <div className="mt-3 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingData.ratingCounts[star] || 0;
              const percent = ratingData.totalRatings > 0 ? (count / ratingData.totalRatings) * 100 : 0;
              return (
                <div key={star} className="flex items-center">
                  <p className="text-sm font-medium">{star}★</p>
                  <div className="w-full h-2 mx-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-sm">{percent.toFixed(0)}%</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="px-4 text-gray-500">Rating Loading</div>
      )}

      <CommentsSection
        courseId={Number(courseId)}
      />
    </div>
  );
}
