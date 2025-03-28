import Image from "next/image";
import { Article } from "@/services/types";
import { formatDate } from "@/services/utils/utils";


interface ArticleCardProps {
  article: Article;
  onDelete: (articleId: number) => void;
  onUpdate: (article: any) => void;
}

export const ArticleCard = ({ article, onDelete, onUpdate }: ArticleCardProps) => {
  const publishedAtString = article.publishedAt instanceof Date 
    ? article.publishedAt.toISOString() 
    : article.publishedAt;

  return (
    <div className="flex flex-col bg-gray-700 shadow-md p-4 rounded-lg text-white">
      <div className="relative mb-4 rounded-t-lg w-full h-48 overflow-hidden">
        <Image
          src={article.articlePreviewUrl || `/img/articlePreview.png`}
          layout="fill"
          objectFit="cover"
          alt={article.title || "Article image"}
          quality={100}
          className="rounded-t-lg"
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{article.title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdate(article)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm text-white"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(article.id)}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Author:</strong> {article.authorId}
        </p>
        <p>
          <strong>Published Date:</strong> {formatDate(publishedAtString)} 
        </p>
      </div>
    </div>
  );
};