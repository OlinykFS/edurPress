package com.olinykfs.eduPress.controllers.commentController;

import com.olinykfs.eduPress.entities.dto.commentDTOs.CommentCreateDTO;
import com.olinykfs.eduPress.entities.dto.commentDTOs.CommentResponseDTO;
import com.olinykfs.eduPress.services.commentServices.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody CommentCreateDTO commentDTO) {
        try {
            CommentResponseDTO responseDTO = commentService.handleAddComment(commentDTO);
            return ResponseEntity.ok(responseDTO);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<Page<CommentResponseDTO>> getCommentsByCourse(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @PathVariable Long courseId) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<CommentResponseDTO> responseDTOs = commentService.getCommentsByCourseIdWithDetails(pageable, courseId);
            return ResponseEntity.ok(responseDTOs);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<CommentResponseDTO>> getCommentsByStudent(@PathVariable Long studentId) {
        List<CommentResponseDTO> responseDTOs = commentService.getCommentsByStudentId(studentId);
        return ResponseEntity.ok(responseDTOs);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteCommentById(commentId);
        return ResponseEntity.noContent().build();
    }
}
