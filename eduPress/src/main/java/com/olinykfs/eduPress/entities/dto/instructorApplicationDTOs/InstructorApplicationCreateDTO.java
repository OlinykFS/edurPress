package com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs;

import com.olinykfs.eduPress.entities.SocialMedia;
import com.olinykfs.eduPress.entities.enums.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class InstructorApplicationCreateDTO {
    private Long userId;
    private String title;
    private String bio;
    private String firstName;
    private String lastName;
    private String specialization;
    private int age;
    private Set<SocialMedia> socialMedia;
    private LocalDateTime createdAt = LocalDateTime.now();
    private ApplicationStatus status = ApplicationStatus.PENDING;
}
