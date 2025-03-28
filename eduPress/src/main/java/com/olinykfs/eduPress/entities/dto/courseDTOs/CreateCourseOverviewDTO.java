package com.olinykfs.eduPress.entities.dto.courseDTOs;

import lombok.Data;

import java.util.Set;

@Data
public class CreateCourseOverviewDTO {

    private Long courseId;
    private String certification;
    private Set<String> learningOutcomes;
    private Set<String> requirements;
    private Set<String> features;
    private Set<String> targetAudience;
}
