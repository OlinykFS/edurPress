package com.olinykfs.eduPress.entities.dto.categoryDTOs;

import lombok.Data;

@Data
public class CategoryCreateDTO {
    private String name;
    private String description;
    private String iconName;
}