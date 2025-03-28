package com.olinykfs.eduPress.entities.dto.lessonDTOs;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class LessonCreateDTO {
    private String title;
    private String description;
    private String videoUrl;
    private Long moduleId;
    private Long lessonOrder;
}
