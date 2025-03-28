package com.olinykfs.eduPress.entities.dto.courseDTOs;

import lombok.Data;

@Data
public class TopCoursesDTO {
    private Long id;
    private String title;
    private String description;
    private double price;
    private String duration;
    private String imageUrl;
    private String instructorName;
    private long lessonsCount;
    private long modulesCount;
    private long studentsCount;
    private String categoryName;
}