"use client";
import Image from "next/image";
import {Article} from "@/services/types";
import { useState } from "react";

type BlogCardProps = {
  article: Article;
  onClick: (courseId: number) => void;
};

export function BlogCardGrid({ article, onClick }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
   <div
    onClick={() => onClick(article.id)}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    className="group relative border-[#EAEAEA] border-[1px] bg-white shadow-sm hover:shadow-lg border-solid rounded-xl w-full max-w-full h-full transition-all hover:-translate-y-3 duration-300 cursor-pointer overflow-hidden">
         <div className="relative bg-gray-200 h-[55%]">
           <Image
             src={article.articlePreviewUrl || '/img/articlePreview.png'}
             width={410}
             height={250}
             alt={article.title || "Course image"}
             quality={100}
             className={`w-full h-full object-cover transition-opacity duration-300 ${
               isImageLoaded ? "opacity-100" : "opacity-0"
             }`}
             onLoad={handleImageLoad}
             loading="lazy"
           />
           {!isImageLoaded && (
             <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
               <div className="border-gray-900 border-t-2 border-b-2 rounded-full w-10 h-10 animate-spin"></div>
             </div>
           )}
           <p className="top-3 left-3 absolute bg-black px-3 py-1 rounded-md text-white text-xs uppercase">
             {String(article.category) || "Category"}
           </p>
         </div>
      <div className="flex flex-col gap-4 p-5">
        <h3
          className={`text-lg font-semibold line-clamp-2 ${
            isHovered ? "text-orange-500" : "text-gray-600"
          } transition-colors duration-150`}
        >
          {article.title}
        </h3>
        <div className="flex">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3333 1.99996H11.6666V0.666626H10.3333V1.99996H3.66659V0.666626H2.33325V1.99996H1.66659C0.933252 1.99996 0.333252 2.59996 0.333252 3.33329V14C0.333252 14.7333 0.933252 15.3333 1.66659 15.3333H12.3333C13.0666 15.3333 13.6666 14.7333 13.6666 14V3.33329C13.6666 2.59996 13.0666 1.99996 12.3333 1.99996ZM12.3333 14H1.66659V5.33329H12.3333V14Z" fill="#FF782D"/>
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
        <p className="line-clamp-2 text-[18px] text-gray-600">
          {article.content}
        </p>
      </div>
    </div>
  );
}