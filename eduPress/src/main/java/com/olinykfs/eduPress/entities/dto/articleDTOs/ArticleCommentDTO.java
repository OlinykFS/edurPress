package com.olinykfs.eduPress.entities.dto.articleDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleCommentDTO {
    private Long id;
    private Long studentId;
    private String content;
    private LocalDateTime createdAt;
}
