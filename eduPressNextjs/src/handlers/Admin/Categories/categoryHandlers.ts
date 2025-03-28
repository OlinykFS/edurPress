import { addCategory, deleteCategory } from "@/services/api/adminRequests";
import type * as Types from "@/services/types";

export const handleAddCategory = async (
  newCategory: Types.NewCategoryData,
  setCategories: (categories: Types.Category[]) => void,
  categories: Types.Category[],
  setNewCategory: (category: { name: string; description: string; iconName: string }) => void,
  fetchCategories: () => Promise<void>,
  setError: (error: string) => void
) => {
  try {
    const addedCategory = await addCategory(newCategory);
    setCategories([...categories, addedCategory]);
    setNewCategory({ name: "", description: "", iconName: "" });
    await fetchCategories();
  } catch (error) {
    setError("Failed to save category: " + error);
  }
};

export const handleDeleteCategory = async (
  id: number,
  fetchCategories: () => Promise<void>,
) => {
  try {
    await deleteCategory(id);
    await fetchCategories();
  } catch (error) {
    console.log("Failed to delete category: " + error);
  }
};