package com.olinykfs.eduPress.entities.dto.courseDTOs;

import com.olinykfs.eduPress.entities.enums.Difficult;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CourseCreateDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Duration is required")
    private String duration;

    private double price;
    private double discount;

    @NotBlank(message = "Instructor is required")
    private Long instructorId;

    @NotBlank(message = "Category is required")
    private Long categoryId;

    private Difficult difficulty;

    private boolean freeCourse;
}

