"use client";
import { useState, useEffect } from "react";

interface AddArticleCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (category: { name:string}) => void;
  initialData?: { name: string } | null;
}

export default function AddArticleCategoryModal({
  visible,
  onClose,
  onSave,
  initialData = null,
}: AddArticleCategoryModalProps) {
  const [category, setCategory] = useState({ name: "" });

  useEffect(() => {
    if (initialData) {
      setCategory(initialData);
    } else {
      setCategory({ name: ""});
    }
  }, [initialData, visible]);

  if (!visible) return null;

  const handleSave = () => {
    if (!category.name) {
      alert("Please fill all required fields.");
      return;
    }
    onSave(category);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-700 shadow-md p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-bold text-xl">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>
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
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 px-3 py-2 rounded text-sm text-white"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 px-3 py-2 rounded text-sm text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
