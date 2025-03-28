package com.olinykfs.eduPress.services.courseServices.validation;

import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCreateDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseUpdateDTO;
import org.springframework.stereotype.Component;

@Component
public class CourseValidator {
    public void validateCourseCreate(CourseCreateDTO dto) {
        if (dto.getCategoryId() == null) throw new IllegalArgumentException("Category ID is required");
    }

    public void validateCourseUpdate(CourseUpdateDTO dto) {
        if (dto.getPrice() < 0) throw new IllegalArgumentException("Price must be >= 0");
        if (dto.getDiscount() < 0 || dto.getDiscount() > 100) throw new IllegalArgumentException("Discount must be between 0 and 100");
    }
}

