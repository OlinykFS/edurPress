package com.olinykfs.eduPress.entities.dto.commentDTOs;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String studentUsername;
    private String studentAvatarUrl;
    private Long courseId;
    private String courseTitle;
}

