package com.olinykfs.eduPress.controllers.articleControllers;

import com.olinykfs.eduPress.entities.dto.articleDTOs.TagDTO;
import com.olinykfs.eduPress.services.articleServices.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article/tags")
@RequiredArgsConstructor
public class ArticleTagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<List<TagDTO>> getTags() {
        return ResponseEntity.ok(tagService.getAllTags());
    }

    @PostMapping
    public ResponseEntity<TagDTO> createTag(@RequestBody TagDTO articleTagDTO) {
        return ResponseEntity.ok(tagService.addTag(articleTagDTO));
    }
}
