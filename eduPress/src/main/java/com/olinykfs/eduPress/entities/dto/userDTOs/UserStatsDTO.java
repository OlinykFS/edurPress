package com.olinykfs.eduPress.entities.dto.userDTOs;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserStatsDTO {
    private int completedLessons;
    private int completedModules;
    private int completedCourses;

    private LocalDateTime lastLessonCompletion;
    private LocalDateTime lastModuleCompletion;
    private LocalDateTime lastCourseCompletion;
}
