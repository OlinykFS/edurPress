package com.olinykfs.eduPress.entities.dto.userDTOs;

import com.olinykfs.eduPress.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String username;
    private String email;
    private Role role;
    private boolean emailVerified;
    private String avatarUrl;
    private LocalDateTime joinDate;
    private String userBio;
}
