package com.olinykfs.eduPress.entities.dto.courseDTOs;

import com.olinykfs.eduPress.entities.enums.Difficult;
import jakarta.validation.constraints.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseUpdateDTO {

    @NotNull(message = "Course ID must not be null")
    private Long id;

    @NotBlank(message = "Title must not be empty")
    private String title;

    private Difficult difficult;

    private boolean freeCourse;

    @NotBlank(message = "Description must not be empty")
    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;

    @DecimalMin(value = "0.0", message = "Price must be >= 0")
    private double price;

    @DecimalMin(value = "0.0",  message = "Discount must be >= 0")
    @DecimalMax(value = "100.0", message = "Discount must be <= 100")
    private double discount;
}
