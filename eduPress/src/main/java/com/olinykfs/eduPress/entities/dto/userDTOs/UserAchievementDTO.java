package com.olinykfs.eduPress.entities.dto.userDTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserAchievementDTO {
    private Long userId;
    private Long achievementId;
    private String name;
    private String level;
    private String description;
    private LocalDateTime awardedAt;
}
