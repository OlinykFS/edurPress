"use client";
import { Article } from "@/services/types";
import Image from "next/image";
import { useState } from "react";

interface ArticleCardProps {
  article: Article;
  onClick: (articleId: number) => void;
}

export default function ArticleCardList({ article, onClick }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={() => onClick(article.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-[#EAEAEA] border-[1px] bg-white shadow-sm hover:shadow-lg border-solid rounded-xl w-full transition-all hover:-translate-y-3 duration-300 cursor-pointer overflow-hidden"
      style={{ height: "250px" }}
    >
      <div className="flex h-full">
        <div className="relative">
          <div
            className="bg-gray-200 w-full h-full animate-pulse"
            style={{ display: imageLoaded ? "none" : "block" }}
          />
          <Image
            src={article.articlePreviewUrl || "/img/articlePreview.png"}
            width={137}
            height={250}
            alt={article.title || "Article image"}
            quality={100}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          <span className="top-3 left-3 absolute bg-black px-3 py-1 rounded-md text-white text-xs uppercase">
            {String(article.category) || "Category"}
          </span>
        </div>
        <div className="flex flex-col justify-between p-4 w-2/3">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3
                className={`text-lg font-semibold line-clamp-2 ${
                  isHovered ? "text-orange-500" : "text-gray-600"
                } transition-colors duration-150`}
              >
                {article.title}
              </h3>
            </div>
            <p className="line-clamp-2 text-[18px] text-gray-600">
              {article.content}
            </p>
          </div>
          <div className="flex justify-between items-center py-2 border-t-2">
            <div className="flex">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3333 1.99996H11.6666V0.666626H10.3333V1.99996H3.66659V0.666626H2.33325V1.99996H1.66659C0.933252 1.99996 0.333252 2.59996 0.333252 3.33329V14C0.333252 14.7333 0.933252 15.3333 1.66659 15.3333H12.3333C13.0666 15.3333 13.6666 14.7333 13.6666 14V3.33329C13.6666 2.59996 13.0666 1.99996 12.3333 1.99996ZM12.3333 14H1.66659V5.33329H12.3333V14Z"
                  fill="#FF782D"
                />
              </svg>
              <p className="flex items-center ml-2 text-gray-500 text-sm">
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No date available"}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2 text-[14px] text-gray-500">
              <button className="font-medium text-blue-600 hover:underline">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}