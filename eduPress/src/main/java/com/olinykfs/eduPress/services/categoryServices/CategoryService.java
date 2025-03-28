package com.olinykfs.eduPress.services.categoryServices;

import com.olinykfs.eduPress.entities.Category;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryCreateDTO;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryResponseDTO;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryUpdateDTO;

import java.util.List;

public interface CategoryService {
    Category addCategory(CategoryCreateDTO categoryCreateDTO);
    void deleteCategory(Long categoryId);
    List<CategoryResponseDTO> getAllCategories();
    Category updateCategory(Long categoryId, CategoryUpdateDTO categoryUpdateDTO);
    Category getCategory(Long categoryId);
    void incrementCourseCount(Long categoryId);
    void decrementCourseCount(Long categoryId);
}
