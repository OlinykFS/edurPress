package com.olinykfs.eduPress.services.userProgressServices;


import com.olinykfs.eduPress.entities.enums.Role;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ProgressUpdatedEvent extends ApplicationEvent {

    private final Long userId;
    private final int completedLessons;
    private final int completedModules;
    private final int completedCourses;
    private final Role role;

    public ProgressUpdatedEvent(Object source, Long userId, int completedLessons, int completedModules, int completedCourses, Role role) {
        super(source);
        this.userId = userId;
        this.completedLessons = completedLessons;
        this.completedModules = completedModules;
        this.completedCourses = completedCourses;
        this.role = role;
    }


}
