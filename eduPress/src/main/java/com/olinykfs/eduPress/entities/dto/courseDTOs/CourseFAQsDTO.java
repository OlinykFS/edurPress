package com.olinykfs.eduPress.entities.dto.courseDTOs;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CourseFAQsDTO {
    private Long id;
    private String question;
    private String answer;
    private Long courseId;
}
