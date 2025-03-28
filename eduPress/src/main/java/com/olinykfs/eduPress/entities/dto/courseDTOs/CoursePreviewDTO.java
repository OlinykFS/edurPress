package com.olinykfs.eduPress.entities.dto.courseDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CoursePreviewDTO {
    private Long id;
    private String title;
    private String description;
    private double price;
    private double discount;
    private String duration;
    private String categoryName;
    private String imageUrl;
    private Long instructorId;

}
