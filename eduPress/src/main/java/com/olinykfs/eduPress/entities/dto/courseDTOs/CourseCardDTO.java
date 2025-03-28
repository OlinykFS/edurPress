package com.olinykfs.eduPress.entities.dto.courseDTOs;

import com.olinykfs.eduPress.entities.enums.Difficult;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CourseCardDTO {
    private Long id;
    private String title;
    private String description;
    private double price;
    private double averageRating;
    private String categoryName;
    private String instructorName;
    private String imageUrl;
    private int numberOfStudents;
    private int modulesCount;
    private String duration;
    private Difficult difficulty;
    public CourseCardDTO(Long id, String title, String description, double price, double averageRating,
                         String categoryName, String instructorName, String imageUrl,
                         int numberOfStudents, int modulesCount, String duration) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.averageRating = averageRating;
        this.categoryName = categoryName;
        this.instructorName = instructorName;
        this.imageUrl = imageUrl;
        this.numberOfStudents = numberOfStudents;
        this.modulesCount = modulesCount;
        this.duration = duration;
    }
    public CourseCardDTO(Long id, String title, String description, double price, double averageRating,
                         String categoryName, String instructorName, String imageUrl,
                         int numberOfStudents, int modulesCount, String duration, Difficult difficulty) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.averageRating = averageRating;
        this.categoryName = categoryName;
        this.instructorName = instructorName;
        this.imageUrl = imageUrl;
        this.numberOfStudents = numberOfStudents;
        this.modulesCount = modulesCount;
        this.duration = duration;
        this.difficulty = difficulty;
    }
}
