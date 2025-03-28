"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {Article} from "@/services/types"
import { formatDate } from "@/services/utils/utils";
import { getArticleById } from "@/services/api/apiRequests";

export default function ArticlePage() {
   const [article, setArticle] = useState<Article>();
   const [error, setError] = useState<string | null>(null);
   const searchParams = useSearchParams();
   const articleId = searchParams.get('id');
   const articleIdNumber = articleId ? Number(articleId) : NaN;

  async function handleGetArticle() {
      try {
        const result = await getArticleById(articleIdNumber);
        setArticle(result);
      } catch (error) {
        setError(error + "error");
      }
  }

  useEffect(() => {
    if (articleIdNumber) {
       handleGetArticle();
    }
  }, [articleIdNumber]);

   return (
     <>
     {article && (
     <section className="flex md:flex-row flex-col gap-8 mx-auto mt-14 max-w-screen-xl px-4">
       {error && <p>{error}</p>}
       <div className="flex-1">
         <h1 className="mb-6 text-3xl">{article.title}</h1>
         <div className="flex gap-7 mb-6">
           <p className="flex gap-2">
             <Image
               src={`/img/icons/article/articleAuthor.svg`}
               width={16}
               height={16}
               alt="author"
             />
             {article.authorId}
           </p>
           <p className="flex gap-2">
             <Image
               src={`/img/icons/article/Calendar.svg`}
               width={16}
               height={16}
               alt="date"
             />
             {formatDate(String(article.publishedAt))}
           </p>
           <p className="flex gap-2">
             <Image
               src={`/img/icons/article/articleComments.svg`}
               width={16}
               height={16}
               alt="category"
             />
             {article.category?.name}
           </p>
         </div>
         <div className="mb-10">
           <Image
             src={article.articlePreviewUrl || '/img/articleImageNotFound.png'}
             alt="article image"
             width={990}
             height={603}
             quality={100}
             className="rounded-3xl w-full h-auto"
           />
           <p className="mt-6 text-lg">{article.content}</p>
           <p className="flex flex-wrap gap-3 mt-5">
             {article.tags?.map((tag) => (
               <span key={tag.id} className="bg-gray-200 px-3 py-1 rounded-lg">
                 {tag.name}
               </span>
             ))}
           </p>
         </div>
       </div>
       <aside className="md:block hidden w-80">
         {/* <ArticleFilter onCategorySelect={handleCategorySelect} />  */}
       </aside>
     </section>
     )}
     </>
   );
}