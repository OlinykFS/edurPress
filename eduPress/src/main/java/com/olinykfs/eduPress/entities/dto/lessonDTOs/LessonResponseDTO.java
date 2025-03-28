package com.olinykfs.eduPress.entities.dto.lessonDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonResponseDTO {
    private Long lessonId;
    private String title;
    private String description;
    private String videoUrl;
    private Long moduleId;
    private String duration;
    private boolean completed;
    private boolean locked;
    private List<String> requirements;
}

