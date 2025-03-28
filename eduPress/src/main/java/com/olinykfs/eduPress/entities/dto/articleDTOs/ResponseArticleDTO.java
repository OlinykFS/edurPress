package com.olinykfs.eduPress.entities.dto.articleDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseArticleDTO {
    private Long id;
    private String title;
    private String content;
    private String articlePreviewUrl;
    private LocalDateTime publishedAt;
    private ArticleAuthorDTO author;
    private String category;
    private List<TagDTO> tags;
}
