package com.olinykfs.eduPress.entities.dto.courseDTOs;

import com.olinykfs.eduPress.entities.enums.Difficult;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class CourseResponseDTO {
    private Long id;
    private String title;
    private String description;
    private double price;
    private double discount;
    private String duration;
    private double averageRating;
    private String categoryName;
    private String imageUrl;
    private Long instructorId;
    private String instructorName;
    private boolean freeCourse;
    private Difficult difficulty;
    private int modulesCount;
    private int studentsCount;
    private boolean isUserEnrolled;
    private boolean hasPendingPayment;

    public CourseResponseDTO(Long id, String title, String description, double price, double discount,
                             String duration, double averageRating, String categoryName,
                             String imageUrl, Long instructorId, String instructorName, boolean freeCourse,
                             Difficult difficulty, int modulesCount, int studentsCount,
                             boolean isUserEnrolled, boolean hasPendingPayment){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.duration = duration;
        this.averageRating = averageRating;
        this.categoryName = categoryName;
        this.imageUrl = imageUrl;
        this.instructorId = instructorId;
        this.instructorName = instructorName;
        this.freeCourse = freeCourse;
        this.difficulty = difficulty;
        this.modulesCount = modulesCount;
        this.studentsCount = studentsCount;
        this.isUserEnrolled = isUserEnrolled;
        this.hasPendingPayment = hasPendingPayment;
    }
}