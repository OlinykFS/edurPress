package com.olinykfs.eduPress.entities.dto.instructorDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstructorInfoDTO {
    private Long id;
    private String username;
    private String email;
    private String bio;
    private String avatarUrl;
    private String specialization;
    private int age;
    private Set<SocialMediaDTO> socialMedia;

}
