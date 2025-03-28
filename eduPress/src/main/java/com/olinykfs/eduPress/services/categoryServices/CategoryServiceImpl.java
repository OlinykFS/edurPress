package com.olinykfs.eduPress.services.categoryServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.Category;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryCreateDTO;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryResponseDTO;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryUpdateDTO;
import com.olinykfs.eduPress.repositories.CategoryRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final GenericDTOConverter genericDTOConverter;

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public Category addCategory(CategoryCreateDTO categoryCreateDTO) {
        Category category = genericDTOConverter.convertToEntity(categoryCreateDTO, Category.class);
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public Category updateCategory(Long categoryId, CategoryUpdateDTO categoryUpdateDTO) {
        return categoryRepository.findById(categoryId)
                .map(category -> {
                    category.setName(categoryUpdateDTO.getName());
                    category.setDescription(categoryUpdateDTO.getDescription());
                    return categoryRepository.save(category);
                })
                .orElseThrow(() -> new GlobalExceptionHandler.CourseNotFoundException("Category not found"));
    }

    @Override
    @Cacheable(value = "allCategories")
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAllCategories();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
    }

    @Override
    public void incrementCourseCount(Long categoryId) {
        Category category = getCategory(categoryId);
        category.incrementCountOfCourses();
        categoryRepository.save(category);
    }
    @Override
    public void decrementCourseCount(Long categoryId) {
        Category category = getCategory(categoryId);
        category.decrementCountOfCourses();
        categoryRepository.save(category);
    }
}
