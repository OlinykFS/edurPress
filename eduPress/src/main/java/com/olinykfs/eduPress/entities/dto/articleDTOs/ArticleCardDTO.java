package com.olinykfs.eduPress.entities.dto.articleDTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ArticleCardDTO {
    private Long id;
    private String title;
    private String content;
    private String articlePreviewUrl;
    private LocalDateTime publishedAt;
    private String author;
    private String category;

    public ArticleCardDTO(Long id, String title, String content, String articlePreviewUrl, LocalDateTime publishedAt, String author, String category) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.articlePreviewUrl = articlePreviewUrl;
        this.publishedAt = publishedAt;
        this.author = author;
        this.category = category;
    }
}
