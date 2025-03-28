"use client";
import { useState, useEffect } from "react";
import { getAllArticles, deleteArticle, addArticle } from "@/services/api/apiRequests";
import { Article, PaginatedResponse } from "@/services/types";
import { ArticleCard } from "./ArticleCard";
import { UpdateArticleModal } from "./UpdateArticleModal";
import { AddArticleModal } from "./addArticleModal";


export default function ArticleDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const data: PaginatedResponse<Article> = await getAllArticles(currentPage, size);
      setArticles(data.content);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err: any) {
      setError("Error fetching articles: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleDelete = async (articleId: number) => {
    try {
      await deleteArticle(articleId);
      fetchData(page);
    } catch (err) {
      setError("Error deleting article");
    }
  };

  const handleAddArticle = async (article: Article) => {
    try {
      await addArticle(article);
      setPage(0);
      fetchData(0);
    } catch (err) {
      setError("Error adding article");
    }
  };

  return (
    <div className="text-white">
      {error && <p className="mb-4 text-red-500">{error}</p>}
      
      <button
        onClick={() => setAddModalVisible(true)}
        className="bg-blue-500 mb-4 px-4 py-2 rounded text-white"
      >
        Add New Article
      </button>
      
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onDelete={handleDelete}
            onUpdate={(article) => {
              setSelectedArticle(article);
              setUpdateModalVisible(true);
            }}
          />
        ))}
      </div>
            
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0 || isLoading}
          className="bg-gray-700 px-4 py-2 rounded disabled:bg-gray-500"
        >
          {"<<"} Back
        </button>

        <span className="text-lg">
          {page + 1} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
          disabled={page >= totalPages - 1 || isLoading}
          className="bg-blue-500 px-4 py-2 rounded disabled:bg-gray-500"
        >
          Next {">>"}
        </button>
      </div>

      {isLoading && <p className="text-center mt-4">Loading...</p>}

      {isAddModalVisible && (
        <AddArticleModal
          visible={isAddModalVisible}
          onAddArticle={handleAddArticle}
          onClose={() => setAddModalVisible(false)}
        />
      )}

      {isUpdateModalVisible && selectedArticle && (
        <UpdateArticleModal
          visible={isUpdateModalVisible}
          article={selectedArticle}
          onClose={() => setUpdateModalVisible(false)}
          onUpdateArticle={() => fetchData(page)}
        />
      )}
    </div>
  );
}
