package com.olinykfs.eduPress.entities.dto.categoryDTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String iconName;
    private Long countOfCourses;

    public CategoryResponseDTO(Long id, String name, String description, String iconName, Long countOfCourses) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.iconName = iconName;
        this.countOfCourses = countOfCourses;
    }
}
