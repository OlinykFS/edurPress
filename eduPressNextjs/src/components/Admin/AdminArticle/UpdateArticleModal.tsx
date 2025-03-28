import { useState, useEffect } from "react";

interface UpdateArticleModalProps {
  visible: boolean;
  onUpdateArticle: (article: any) => void;
  article: any;
  onClose: () => void;
}

export const UpdateArticleModal = ({ visible, onUpdateArticle, article, onClose }: UpdateArticleModalProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setAuthor(article.author);
      setPublishedDate(article.publishedDate);
      setImageUrl(article.imageUrl);
    }
  }, [article]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateArticle({ ...article, title, author, publishedDate, imageUrl });
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-700 shadow-md p-6 rounded-lg w-full max-w-2xl">
        <h2 className="mb-4 font-bold text-xl">Update Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Published Date</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 px-3 py-2 rounded text-sm text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-3 py-2 rounded text-sm text-white"
            >
              Update Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};