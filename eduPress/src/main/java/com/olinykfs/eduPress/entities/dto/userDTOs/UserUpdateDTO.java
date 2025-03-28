package com.olinykfs.eduPress.entities.dto.userDTOs;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String email;
    private String username;
    private String userBio;
    private String password;
}
