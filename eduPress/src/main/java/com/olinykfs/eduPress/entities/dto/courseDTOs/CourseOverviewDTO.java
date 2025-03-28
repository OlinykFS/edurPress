package com.olinykfs.eduPress.entities.dto.courseDTOs;

import lombok.Data;

import java.util.List;

@Data
public class CourseOverviewDTO {
    private Long id;
    private String name;
    private String description;
    private String certification;
    private List<String> learningOutcomes;
    private List<String> requirements;
    private List<String> features;
    private List<String> targetAudience;
}