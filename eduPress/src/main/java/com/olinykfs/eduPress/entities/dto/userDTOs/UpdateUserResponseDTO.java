package com.olinykfs.eduPress.entities.dto.userDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserResponseDTO {
    private UserResponseDTO user;
    private String message;
}
