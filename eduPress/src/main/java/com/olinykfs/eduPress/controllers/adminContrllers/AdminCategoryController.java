package com.olinykfs.eduPress.controllers.adminContrllers;

import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryCreateDTO;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryResponseDTO;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryUpdateDTO;
import com.olinykfs.eduPress.entities.Category;
import com.olinykfs.eduPress.services.categoryServices.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin/category")
@PreAuthorize("hasRole('ADMIN')")
public class AdminCategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody CategoryCreateDTO categoryCreateDTO) {
        Category newCategory = categoryService.addCategory(categoryCreateDTO);
        return ResponseEntity.ok(newCategory);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryUpdateDTO categoryUpdateDTO) {
        Category updated = categoryService.updateCategory(categoryId, categoryUpdateDTO);
        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }
}
