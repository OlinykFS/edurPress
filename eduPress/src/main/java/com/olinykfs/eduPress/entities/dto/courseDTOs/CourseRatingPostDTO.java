package com.olinykfs.eduPress.entities.dto.courseDTOs;

import lombok.Data;

@Data
public class CourseRatingPostDTO {
    private Long courseId;
    private int rating;
}
