package com.olinykfs.eduPress.entities.dto.userDTOs;

import lombok.Data;

@Data
public class UserCreateDTO {
    private String username;
    private String email;
    private String password;
}
