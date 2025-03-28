"use client";

import { useState, useEffect, useCallback } from "react";
import LayoutWithCards from "@/components/Layout/Main/CardLayout";
import ArticleCardList from "@/components/Article/articleCardList";
import { getAllArticles, searchArticles, getArticlesByCategory } from "@/services/api/apiRequests";
import { Article, PaginatedResponse } from "@/services/types";
import { useInfiniteScroll } from "@/services/hooks/useInfiniteScroll";
import { useRouter } from "next/navigation";
import { useResponsiveLayout } from "@/services/hooks/useResponsiveLayout";
import ArticleFilter from "@/components/Article/articleFIlter";
import { BlogCardGrid } from "@/components/Article/articleCardGrid";
import Image from "next/image";

export default function BlogPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [layout, toggleLayout] = useResponsiveLayout();
  const size = 9;

  const fetchArticles = useCallback(
    async (currentPage: number, reset: boolean = false) => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        let data: PaginatedResponse<Article>;

        if (searchValue.trim() !== "") {
          data = await searchArticles(searchValue, currentPage, size);
        } else if (selectedCategories.length > 0) {
          const categoryPromises = selectedCategories.map((categoryId) =>
            getArticlesByCategory(categoryId, currentPage, size)
          );
          const categoryResponses = await Promise.all(categoryPromises);

          const allArticles = categoryResponses.flatMap((response) => response.content);
          const maxTotalPages = Math.max(...categoryResponses.map((res) => res.totalPages));

          const uniqueArticles = Array.from(
            new Map(allArticles.map((article) => [article.id, article])).values()
          );

          data = {
            content: uniqueArticles.slice(0, size), 
            totalPages: maxTotalPages,
            totalElements: uniqueArticles.length,
            number: currentPage,
            size: size,
          };
        } else {
          data = await getAllArticles(currentPage, size);
        }

        setArticles((prevArticles) =>
          reset ? data.content : [...prevArticles, ...data.content]
        );
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchValue, selectedCategories]
  );

  useEffect(() => {
    setPage(0);
    setArticles([]);
    fetchArticles(0, true);
  }, [searchValue, selectedCategories, fetchArticles]);

  const incrementPage = useCallback(() => {
    if (page < totalPages - 1 && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [page, totalPages, isLoading]);

  useEffect(() => {
    if (page > 0) {
      fetchArticles(page);
    }
  }, [page, fetchArticles]);

  const lastElementRef = useInfiniteScroll(incrementPage, isLoading, page, totalPages);

  return (
    <>
      <div className="mx-auto mt-24 max-w-[1290px] flex flex-col lg:flex-row gap-6 px-4 relative">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 w-[300px]">All Articles</h1>
            <div className="flex items-center justify-end w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full py-2 pr-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                <Image
                  src="/img/icons/adminIcons/search.svg"
                  alt="Search Icon"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2"
                />
              </div>
              <div className="hidden md:flex gap-2 ml-4">
                <div
                  onClick={() => toggleLayout("grid")}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-100 transition ${layout === "grid" ? "bg-gray-100" : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    className={layout === "grid" ? "fill-orange-500" : "fill-gray-700"}
                  >
                    <path d="M2.5 2.5V9.16667H9.16667V2.5H2.5ZM2.5 10.8333V17.5H9.16667V10.8333H2.5ZM10.8333 2.5V9.16667H17.5V2.5H10.8333ZM10.8333 10.8333V17.5H17.5V10.8333Z" />
                  </svg>
                </div>
                <div
                  onClick={() => toggleLayout("list")}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-100 transition ${layout === "list" ? "bg-gray-100" : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    className={layout === "list" ? "fill-orange-500" : "fill-gray-700"}
                  >
                    <path d="M2.5 2.5H17.5V5H2.5V2.5ZM2.5 7.5H17.5V10H2.5V7.5ZM2.5 12.5H17.5V15H2.5V12.5Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {articles.length === 0 && !isLoading ? (
            <p className="text-center text-gray-500">No articles found.</p>
          ) : (
            <>
              <LayoutWithCards<Article>
                showHeader={false}
                data={articles}
                layout={layout}
                toggleLayout={toggleLayout}
                renderGridCard={(article) => (
                  <BlogCardGrid
                    article={article}
                    onClick={() => router.push(`/articles/${article.title}?id=${article.id}`)}
                  />
                )}
                renderListCard={(article) => (
                  <ArticleCardList
                    article={article}
                    onClick={() => router.push(`/articles/${article.title}?id=${article.id}`)}
                  />
                )}
              />
              <div ref={lastElementRef} />
              {isLoading && <p className="text-center mt-4">Loading more articles...</p>}
            </>
          )}
        </div>

        <div className="hidden lg:block sticky top-24 right-0 h-fit self-start z-10">
          <div className="w-[300px]">
            <ArticleFilter
              variant="desktop"
              selectedCategories={selectedCategories}
              onCategorySelect={setSelectedCategories}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 z-50">
        <ArticleFilter
          variant="mobile"
          selectedCategories={selectedCategories}
          onCategorySelect={setSelectedCategories}
        />
      </div>
    </>
  );
}