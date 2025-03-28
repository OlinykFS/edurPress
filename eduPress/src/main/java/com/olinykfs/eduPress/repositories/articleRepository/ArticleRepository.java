package com.olinykfs.eduPress.repositories.articleRepository;

import com.olinykfs.eduPress.entities.Article;
import com.olinykfs.eduPress.entities.dto.articleDTOs.ArticleCardDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.articleDTOs.ArticleCardDTO(" +
            "a.id, a.title, a.content, a.articlePreviewUrl, a.publishedAt, a.author.email, a.category.name) " +
            "FROM Article a ORDER BY a.publishedAt DESC")
    Page<ArticleCardDTO> findAllArticleCard(Pageable pageable);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.articleDTOs.ArticleCardDTO(" +
            "a.id, a.title, a.content, a.articlePreviewUrl, a.publishedAt, a.author.email, a.category.name) " +
            "FROM Article a " +
            "WHERE a.publishedAt <= CURRENT_TIMESTAMP " +
            "AND (LOWER(a.title) LIKE LOWER(:query) OR LOWER(a.content) LIKE LOWER(:query)) " +
            "ORDER BY a.publishedAt DESC")
    Page<ArticleCardDTO> findArticleByTitle(@Param("query") String query, Pageable pageable);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.articleDTOs.ArticleCardDTO(" +
            "a.id, a.title, a.content, a.articlePreviewUrl, a.publishedAt, a.author.email, a.category.name) " +
            "FROM Article a " +
            "WHERE a.category.id = :categoryId")
    Page<ArticleCardDTO> getArticleByCategory(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query(value = "SELECT new com.olinykfs.eduPress.entities.dto.articleDTOs.ArticleCardDTO(" +
            "a.id, a.title, a.content, a.articlePreviewUrl, a.publishedAt, a.author.email, a.category.name) " +
            "FROM Article a " +
            "WHERE a.publishedAt <= CURRENT_TIMESTAMP " +
            "ORDER BY a.publishedAt DESC",
            countQuery = "SELECT count(a) FROM Article a WHERE a.publishedAt <= CURRENT_TIMESTAMP")
    Page<ArticleCardDTO> findLatestArticles(Pageable pageable);


    @EntityGraph(attributePaths = {"tags", "comments"})
    Article findArticleById(Long id);

}
