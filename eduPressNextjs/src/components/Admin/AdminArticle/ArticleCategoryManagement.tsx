import { useEffect, useState } from "react";
import { addArticleCategory, getArticleCategories } from "@/services/api/adminRequests";
import { ArticleCategory } from "@/services/types";
import AddArticleCategoryModal from "./addArticleCategory";

export default function ArticleCategoryManagement() {
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchCategories = async () => {
    try {
      const result = await getArticleCategories();
      setCategories(result);
    } catch (err: any) {
      setError("Failed to fetch categories: " + err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = (category: { name: string}) => {
    addArticleCategory(category)
      .then(() => {
        fetchCategories();
        setModalVisible(false);
      })
      .catch((err: any) => setError("Failed to add category: " + err.message));
  };

  return (
    <div className="bg-[#111928] p-4 text-white">
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <button
        onClick={() => { setModalVisible(true) }}
        className="bg-blue-500 mb-4 px-4 py-2 rounded text-white">
        Add New Category
      </button>

      <AddArticleCategoryModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCategory}
      />

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col justify-between bg-gray-800 shadow-md p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
