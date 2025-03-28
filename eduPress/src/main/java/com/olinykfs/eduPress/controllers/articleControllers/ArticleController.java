package com.olinykfs.eduPress.controllers.articleControllers;

import com.olinykfs.eduPress.entities.dto.ResponseMessageDTO;
import com.olinykfs.eduPress.entities.dto.articleDTOs.*;
import com.olinykfs.eduPress.services.articleServices.ArticleService;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article")
@AllArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<Page<ArticleCardDTO>> getAllArticles(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "9") int size) {
        return ResponseEntity.ok(articleService.findAll(page, size));
    }

    @GetMapping("/getLatestArticles")
    public ResponseEntity<List<ArticleCardDTO>> getLatestArticles(){
        return ResponseEntity.ok(articleService.getLatestArticles());
    }
    @GetMapping("/search/{name}")
    public ResponseEntity<Page<ArticleCardDTO>> getArticleByTitle(@PathVariable String name, @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "9") int size) {
        return ResponseEntity.ok(articleService.searchByTitle(name, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseArticleDTO> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ArticleCardDTO>> getArticleByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(articleService.getArticleByCategory(categoryId, page, size));
    }

    @PostMapping
    public ResponseEntity<ResponseArticleDTO> createArticle(@RequestBody CreateArticleDTO createArticleDTO) {
        ResponseArticleDTO newArticle = articleService.addArticle(createArticleDTO);
        return ResponseEntity.ok(newArticle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessageDTO> deleteArticle(@PathVariable Long id) {
        articleService.delete(id);
        ResponseMessageDTO responseMessage = new ResponseMessageDTO("Successfully deleted article with ID: " + id);
        return ResponseEntity.ok(responseMessage);
    }

}