package com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs;

import com.olinykfs.eduPress.entities.dto.instructorDTOs.SocialMediaDTO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class InstructorApplicationResponseDTO {
    private Long applicationId;
    private Long userId;
    private String firstName;
    private String lastName;
    private String title;
    private String bio;
    private String specialization;
    private int age;
    private Set<SocialMediaDTO> socialMedia;
    private String status;
    private LocalDateTime createdAt;
}
