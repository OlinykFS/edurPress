"use client";
import { useState } from "react";

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (category: { name: string; description: string; iconName: string }) => void;
  initialCategory?: { name: string; description: string; iconName: string };
}

export default function AddCategoryModal({
  visible,
  onClose,
  onSave,
  initialCategory = { name: "", description: "", iconName: "" },
}: AddCategoryModalProps) {
  const [category, setCategory] = useState(initialCategory);

  if (!visible) return null;

  const handleSave = () => {
    if (!category.name || !category.description || !category.iconName) {
      alert("Please fill all required fields.");
      return;
    }
    onSave(category);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-700 shadow-md p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-bold text-xl">Add / Edit Category</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Category Name</label>
            <input
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Category Description</label>
            <textarea
              placeholder="Category Description"
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Icon Name</label>
            <input
              type="text"
              placeholder="Icon Name (e.g., 'icon.svg')"
              value={category.iconName}
              onChange={(e) => setCategory({ ...category, iconName: e.target.value })}
              className="bg-gray-800 p-2 rounded-lg w-full text-white"
              required
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}