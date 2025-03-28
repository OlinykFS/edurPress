package com.olinykfs.eduPress.entities.dto.moduleDTOs;

import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModuleResponseDTO {
    private Long id;
    private String title;
    private String duration;
    private String description;
    private Long courseId;
    private int lessonsCount;
    private Long moduleOrder;
    private List<LessonResponseDTO> lessons;
    private boolean locked;
}
