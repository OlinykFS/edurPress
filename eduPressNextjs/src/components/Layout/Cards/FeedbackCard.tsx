"use client";
import { useState } from "react";

interface FeedbackCardProps {
  feedback: {
    id: number;
    quote: string;
    author: string;
    role: string;
  };
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col border-2 p-6 w-full h-full min-h-[400px] hover:fill-orange-500 rounded-3xl transition-all duration-100">
      <div className="flex flex-col gap-5 h-full">
        <span>
          <svg
            width="36"
            height="30"
            viewBox="0 0 36 30"
            className={isHovered ? "fill-orange-500" : ""}>
            <path d="M24.5 29.8L35.5 2.3L29.9 0L16.6 26.7L24.5 29.8ZM7.9 29.8L18.9 2.3L13.3 0L0 26.7L7.9 29.8Z" />
          </svg>
        </span>
        <p className="flex-grow font-normal text-[17px] lg:text-[18px] leading-relaxed">
          {feedback.quote}
        </p>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-[18px] lg:text-[20px]">
            {feedback.author}
          </span>
          <span className="font-normal text-[16px] lg:text-[18px]">
            {feedback.role}
          </span>
        </div>
      </div>
    </div>
  );
}