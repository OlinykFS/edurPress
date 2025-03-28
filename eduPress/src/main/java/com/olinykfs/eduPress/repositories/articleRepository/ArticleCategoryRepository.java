package com.olinykfs.eduPress.repositories.articleRepository;

import com.olinykfs.eduPress.entities.ArticleCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Long> {

    Optional<ArticleCategory> findById(Long id);

    ArticleCategory getArticleCategoryById(Long id);
}
