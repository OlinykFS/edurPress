"use client";
import React, { useState, useEffect } from "react";
import { useCachedFetch } from "@/services/hooks/useCachedFetch";
import { getAllFilterCategories } from "@/services/api/apiRequests";
import { getAllInstructorsName } from "@/services/api/adminRequests";
import { CACHE_KEY_CATEGORIES, CACHE_KEY_INSTRUCTORS } from "@/services/utils/utils";
import { Category, Instructor } from "@/services/types";

interface CourseFilterProps {
  variant: "desktop" | "mobile";
  selectedCategories: number[];
  selectedInstructors: number[];
  onCategorySelect: (selectedCategories: number[]) => void;
  onInstructorSelect: (selectedInstructors: number[]) => void;
}

export default function CourseFilter({
  variant,
  selectedCategories,
  selectedInstructors,
  onCategorySelect,
  onInstructorSelect,
}: CourseFilterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setTimeout(() => setIsVisible(false), 300);
    } else {
      setIsVisible(true);
      setTimeout(() => setIsModalOpen(true), 10);
    }
  };

  const { data: categories, error: categoriesError } = useCachedFetch<Category[]>(
    CACHE_KEY_CATEGORIES,
    getAllFilterCategories
  );
  const { data: instructors, error: instructorsError } = useCachedFetch<Instructor[]>(
    CACHE_KEY_INSTRUCTORS,
    getAllInstructorsName
  );

  const handleCategoryChange = (id: number) => {
    const newSelection = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];
    onCategorySelect(newSelection);
  };

  const handleInstructorChange = (id: number) => {
    const newSelection = selectedInstructors.includes(id)
      ? selectedInstructors.filter((instId) => instId !== id)
      : [...selectedInstructors, id];
    onInstructorSelect(newSelection);
  };

  const filterContent = (
    <section className="pl-4 w-full max-w-[300px] overflow-y-auto h-full ">
      {(categoriesError || instructorsError) && (
        <p className="mb-4 text-red-500">{categoriesError || instructorsError}</p>
      )}

        <div className="mb-6 pr-2">
          <h3 className="mb-4 font-semibold text-lg">Categories</h3>
          <ul className="space-y-2">
            {categories?.map((category) => (
              <li key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    className="mr-2"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-gray-700">
                    {category.name}
                  </label>
                </div>
                <span className="text-gray-500">{category.countOfCourses}</span>
              </li>
            ))}
          </ul>
        </div>
      <div className="mb-6">
        <h3 className="mb-4 font-semibold text-lg">Authors</h3>
        <ul className="space-y-2">
          {instructors?.map((instructor) => (
            <li key={instructor.id} className="flex items-center">
              <input
                type="checkbox"
                id={`instructor-${instructor.id}`}
                className="mr-2"
                checked={selectedInstructors.includes(instructor.id)}
                onChange={() => handleInstructorChange(instructor.id)}
              />
              <label htmlFor={`instructor-${instructor.id}`} className="text-gray-700">
                {instructor.email}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  if (variant === "desktop") {
    return <div>{filterContent}</div>;
  }

  return (
    <>
      <button
        className="fixed bottom-10 left-4 z-[150] bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg"
        onClick={toggleModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 14.414V19a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
      </button>

      {isVisible && (
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${
            isModalOpen ? "opacity-100 visible" : "opacity-0"
          }`}
          onClick={toggleModal}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isModalOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Filters</h3>
          <button onClick={toggleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {filterContent}
      </div>
    </>
  );
}
