package com.olinykfs.eduPress.controllers.articleControllers;

import com.olinykfs.eduPress.entities.ArticleCategory;
import com.olinykfs.eduPress.entities.dto.articleDTOs.ArticleCategoryDTO;
import com.olinykfs.eduPress.services.articleServices.ArticleCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article/category")
@RequiredArgsConstructor
public class ArticleCategoryController {

    private final ArticleCategoryService articleCategoryService;

    @GetMapping
    public ResponseEntity<List<ArticleCategoryDTO>> getArticleCategories() {
        return ResponseEntity.ok(articleCategoryService.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<ArticleCategory> createArticleCategory(@RequestBody ArticleCategoryDTO articleCategoryDTO) {
        ArticleCategory category = articleCategoryService.createCategory(articleCategoryDTO);
        return ResponseEntity.ok(category);
    }
}
