"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainCardLayout from "@/components/Layout/Main/MainCardLayout";
import { BlogCardGrid } from "./articleCardGrid";
import { Article } from "@/services/types";
import { getLatestArticles } from "@/services/api/adminRequests";

export default function LatestArticles() {
   const [articles, setArticles] = useState<Article[]>([]);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();
 
   const fetchArticles = async ()=> {
     const result = await getLatestArticles();
      setArticles(result);
   };
 
   useEffect(() => {
     fetchArticles();
   }, []);
 
   return (
    <div className="mt-24 px-4">
     <MainCardLayout
       title="Featured Articles"
       showAllName="All Articles"
       description="Explore our Popular Articles"
       showAllLink="/articles"
       error={error}
     >
       {articles.map((article) => (
         <BlogCardGrid
           key={article.id}
           article={article}
           onClick={() => router.push(`/articles/${article.title}?id=${article.id}`)}
         />
       ))}
     </MainCardLayout>
     </div>
   );
 }