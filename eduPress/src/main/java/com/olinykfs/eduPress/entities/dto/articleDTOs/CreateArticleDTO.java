package com.olinykfs.eduPress.entities.dto.articleDTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CreateArticleDTO {
    private String title;
    private String content;
    private String articlePreviewUrl;
    private LocalDateTime publishedAt;
    private String authorEmail;
    private Long categoryId;
    private List<Long> tagIds;
}