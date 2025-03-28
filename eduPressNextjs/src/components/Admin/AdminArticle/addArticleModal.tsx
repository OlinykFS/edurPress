"use client";
import { useState, useEffect } from "react";
import { getArticleCategories, getArticleTags } from "@/services/api/adminRequests";

interface AddArticleModalProps {
  visible: boolean;
  onAddArticle: (article: any) => void;
  onClose: () => void;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

export const AddArticleModal = ({ visible, onAddArticle, onClose }: AddArticleModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">(4);
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null;
  const authorEmail = userObj ? userObj.email : '';

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesData = await getArticleCategories();
        setCategories(
          categoriesData
            .filter((cat) => cat.id !== undefined)
            .map((cat) => ({
              id: cat.id as number,
              name: cat.name,
            }))
        );        
        const tagsData = await getArticleTags();
        setAllTags(tagsData);
      } catch (error) {
        console.error("Error fetching categories and tags:", error);
      }
    };
    fetchCategoriesAndTags();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddArticle({
      title,
      content,
      articlePreviewUrl: imageUrl,
      authorEmail,
      categoryId,
      tagIds
    });
    onClose();
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const existingTag = allTags.find(tag => tag.name.toLowerCase() === newTagName.toLowerCase());
      if (existingTag) {
        if (!tagIds.includes(existingTag.id)) {
          setTagIds([...tagIds, existingTag.id]);
        }
      } else {
        console.warn("Tag not found in the database. Consider adding it first.");
      }
      setNewTagName("");
    }
  };

  const handleRemoveTag = (tagId: number) => {
    setTagIds(tagIds.filter(id => id !== tagId));
  };

  const handleSelectTag = (tagId: number) => {
    if (!tagIds.includes(tagId)) {
      setTagIds([...tagIds, tagId]);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-700 shadow-md p-6 rounded-lg w-full max-w-2xl">
        <h2 className="mb-4 font-bold text-xl">Add New Article</h2>
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
            <label className="block mb-1 font-medium text-sm">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Tags</label>
            <div className="flex items-center">
              <select
                value=""
                onChange={(e) => handleSelectTag(Number(e.target.value))}
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
              >
                <option value="">Select a tag</option>
                {allTags.map((tag) => (
                  <option key={tag.id} value={tag.id} disabled={tagIds.includes(tag.id)}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-green-500 ml-2 px-3 py-2 rounded text-sm text-white"
              >
                Add Tag
              </button>
            </div>
            <div className="mt-2">
              {tagIds.map((tagId) => {
                const tag = allTags.find(t => t.id === tagId);
                return (
                  <span
                    key={tagId}
                    className="relative bg-gray-600 mr-2 px-2 py-1 rounded text-sm text-white"
                  >
                    {tag?.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tagId)}
                      className="top-0 right-0 absolute bg-red-500 px-1 py-0.5 rounded-full text-white text-xs"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
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
              Add Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};