package com.olinykfs.eduPress.services.articleServices;

import com.olinykfs.eduPress.entities.ArticleCategory;
import com.olinykfs.eduPress.entities.dto.articleDTOs.ArticleCategoryDTO;
import com.olinykfs.eduPress.repositories.articleRepository.ArticleCategoryRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ArticleCategoryService {

    private final ArticleCategoryRepository articleCategoryRepository;
    private final GenericDTOConverter genericDTOConverter;

    public List<ArticleCategoryDTO> getAllCategories() {
        List<ArticleCategory> categories = articleCategoryRepository.findAll();
        return categories.stream()
                .map(category -> genericDTOConverter.convertToDTO(category, ArticleCategoryDTO.class))
                .collect(Collectors.toList());
    }

    public ArticleCategory createCategory(ArticleCategoryDTO categoryDTO) {
        ArticleCategory category = genericDTOConverter.convertToEntity(categoryDTO, ArticleCategory.class);
        return articleCategoryRepository.save(category);
    }
}
