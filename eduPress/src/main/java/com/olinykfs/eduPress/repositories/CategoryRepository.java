package com.olinykfs.eduPress.repositories;

import com.olinykfs.eduPress.entities.Category;
import com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT new com.olinykfs.eduPress.entities.dto.categoryDTOs.CategoryResponseDTO(" +
            "c.id, c.name, c.description, c.iconName, c.countOfCourses) " +
            "FROM Category c")
    List<CategoryResponseDTO> findAllCategories();
}
