"use client";

import { useState, useEffect } from "react";
import { useCachedFetch } from "@/services/hooks/useCachedFetch";
import { getArticleCategories } from "@/services/api/adminRequests";
import { CACHE_KEY_ARTICLE_CATEGORIES } from "@/services/utils/utils";
import { ArticleCategory } from "@/services/types";

interface ArticleFilterProps {
  variant: "desktop" | "mobile";
  selectedCategories: number[];
  onCategorySelect: (selectedCategories: number[]) => void;
}

export default function ArticleFilter({
  variant,
  selectedCategories,
  onCategorySelect,
}: ArticleFilterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories, error } = useCachedFetch<ArticleCategory[]>(
    CACHE_KEY_ARTICLE_CATEGORIES,
    getArticleCategories
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCategoryChange = (id: number) => {
    const newSelection = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];
    onCategorySelect(newSelection);
  };

  const filterContent = (
    <section className="pl-4 w-full max-w-[300px] overflow-y-auto h-full">
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <div className="mb-6 pr-2">
        <h3 className="mb-4 font-semibold text-lg">Categories</h3>
        {!categories ? (
          <p>Loading categories...</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`article-category-${category.id}`}
                    className="mr-2"
                    checked={selectedCategories.includes(category.id!)}
                    onChange={() => handleCategoryChange(category.id!)}
                  />
                  <label htmlFor={`article-category-${category.id}`} className="text-gray-700">
                    {category.name}
                  </label>
                </div>
                <span className="text-gray-500">{category.countOfArticles}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );

  if (variant === "desktop") {
    return <div className="sticky top-24">{filterContent}</div>;
  }

  return (
    <>
      <button
        className="fixed bottom-10 left-4 z-[150] bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-200"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 14.414V19a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 z-40"
          onClick={toggleModal}
        />
      )}

      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Filters</h3>
          <button onClick={toggleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {filterContent}
      </div>
    </>
  );
}