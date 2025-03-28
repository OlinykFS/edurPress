import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllCategories } from "@/services/api/adminRequests";
import { handleAddCategory, handleDeleteCategory } from "@/handlers/Admin/Categories/categoryHandlers";
import AddCategoryModal from "../Category/addCategory";
import { Category } from "@/services/types";

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ name: string; description: string; iconName: string } | null>(null);

  const fetchCategories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result.slice(0, 10));
    } catch (error) {
      setError("Failed to fetch categories: " + error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = (category: { name: string; description: string; iconName: string }) => {
    handleAddCategory(category, setCategories, categories, () => {}, fetchCategories, setError);
  };

  return (
    <div className="bg-[#111928] p-4 text-white">
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <button
        onClick={() => {
          setModalVisible(true);
          setEditingCategory(null);
        }}
        className="bg-blue-500 mb-4 px-4 py-2 rounded text-white"
      >
        Add New Category
      </button>

      <AddCategoryModal
        visible={isModalVisible}
        initialCategory={editingCategory || undefined}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCategory}
      />

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col justify-between bg-gray-800 shadow-md p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="mt-2 text-gray-400 text-sm">{category.description}</p>  
              </div>
            
              <div className="">
                <Image
                  src={`/img/icons/categoryIcons/${category.iconName}`}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setEditingCategory({
                    name: category.name,
                    description: category.description,
                    iconName: category.iconName || "",
                  });
                  setModalVisible(true);
                }}
                className="bg-blue-500 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id, fetchCategories)}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
