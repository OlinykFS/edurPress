package com.olinykfs.eduPress.entities.dto.commentDTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentCreateDTO {
    private Long courseId;
    private String content;
    // studentId больше не нужен, так как он берется из аутентификации
}

