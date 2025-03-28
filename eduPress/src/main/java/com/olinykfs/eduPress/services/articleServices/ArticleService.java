package com.olinykfs.eduPress.services.articleServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.Article;
import com.olinykfs.eduPress.entities.ArticleCategory;
import com.olinykfs.eduPress.entities.Tag;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.dto.articleDTOs.*;
import com.olinykfs.eduPress.repositories.*;
import com.olinykfs.eduPress.repositories.articleRepository.ArticleCategoryRepository;
import com.olinykfs.eduPress.repositories.articleRepository.ArticleRepository;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final GenericDTOConverter genericDTOConverter;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final ArticleCategoryRepository articleCategoryRepository;

    @Cacheable(value = "allArticles", key = "'allArticles_' + #page + '_' + #size")
    public Page<ArticleCardDTO> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.findAllArticleCard(pageable);
    }

    @Cacheable(value = "latestArticles")
    public List<ArticleCardDTO> getLatestArticles() {
        Pageable pageable = PageRequest.of(0, 6);
        Page<ArticleCardDTO> articles = articleRepository.findLatestArticles(pageable);
        return articles.getContent();
    }

    @Cacheable(value = "articleById", key = "#id")
    public ResponseArticleDTO getArticleById(Long id) {
        Article article = articleRepository.findArticleById(id);
        return genericDTOConverter.convertToDTO(article, ResponseArticleDTO.class);
    }

    @Cacheable(value = "articlesByCategory", key = "'articlesByCategory_' + #categoryId + '_' + #page + '_' + #size")
    public Page<ArticleCardDTO> getArticleByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.getArticleByCategory(categoryId, pageable);
    }

    @Cacheable(value = "searchArticles", key = "'searchArticles_' + #query + '_' + #page + '_' + #size")
    public Page<ArticleCardDTO> searchByTitle(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.findArticleByTitle("%" + query.toLowerCase() + "%", pageable);
    }

    @Transactional
    public ResponseArticleDTO addArticle(CreateArticleDTO createArticleDTO) {
        Article article = genericDTOConverter.convertToEntity(createArticleDTO, Article.class);
        article.setPublishedAt(LocalDateTime.now());

        User user = userRepository.findByEmail(createArticleDTO.getAuthorEmail());
        if (user == null) {
            throw new GlobalExceptionHandler.UserNotFoundException("User not found with email: " + createArticleDTO.getAuthorEmail());
        }
        ArticleCategory articleCategory = articleCategoryRepository.getArticleCategoryById(createArticleDTO.getCategoryId());
        article.setAuthor(user);
        article.setCategory(articleCategory);
        articleCategory.getArticles().add(article);

        if (createArticleDTO.getTagIds() != null && !createArticleDTO.getTagIds().isEmpty()) {
            List<Tag> tagList = tagRepository.findAllById(createArticleDTO.getTagIds());
            if (tagList.isEmpty()) {
                throw new GlobalExceptionHandler.TagNotFoundException("Tags not found for ids: " + createArticleDTO.getTagIds());
            }
            article.setTags(new HashSet<>(tagList));
        } else {
            article.setTags(new HashSet<>());
        }
        articleRepository.save(article);
        articleCategory.increaseCountOfArticles();
        articleCategoryRepository.save(articleCategory);
        return genericDTOConverter.convertToDTO(article, ResponseArticleDTO.class);
    }

    @Transactional
    public void delete(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + id));
        article.setCategory(null);
        articleRepository.delete(article);
    }
}
