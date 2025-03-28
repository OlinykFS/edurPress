package com.olinykfs.eduPress.controllers.lessonControllers;

import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonCreateDTO;
import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonResponseDTO;
import com.olinykfs.eduPress.services.lessonServices.LessonService;
import com.olinykfs.eduPress.services.userProgressServices.ProgressService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lessons")
@AllArgsConstructor
public class LessonController {

    private final LessonService lessonService;
    private final ProgressService progressService;

    @PostMapping
    public ResponseEntity<LessonCreateDTO> createLesson(@RequestBody LessonCreateDTO lessonCreateDTO) {
        LessonCreateDTO responseDTO = lessonService.addLesson(lessonCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
    @PostMapping("/batch")
    public ResponseEntity<List<LessonCreateDTO>> createLessonsBatch(
            @RequestBody List<LessonCreateDTO> lessonsDTO) {

        List<LessonCreateDTO> createdLessons = lessonService.addLessonsBatch(lessonsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLessons);
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<LessonResponseDTO>> getLessonsByModuleId(@PathVariable Long moduleId) {
        List<LessonResponseDTO> lessons = lessonService.getLessonsByModuleId(moduleId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<LessonResponseDTO>> getAllLessonsByCourseId(@PathVariable Long courseId) {
        List<LessonResponseDTO> lessons = lessonService.getLessonsByCourseId(courseId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/course/{courseId}/lesson/{lessonId}")
    public ResponseEntity<LessonResponseDTO> getLessonByCourseIdAndLessonId(
            @PathVariable Long courseId,
            @PathVariable Long lessonId) {
        LessonResponseDTO lesson = lessonService.getLessonByCourseIdAndLessonId(courseId, lessonId);
        return ResponseEntity.ok(lesson);
    }

    @PostMapping("/{lessonId}/complete")
    public ResponseEntity<Map<String, String>> markLessonCompleted(@PathVariable Long lessonId) {
        progressService.markLessonAsCompleted(lessonId);
        return ResponseEntity.ok(Map.of("message", "Lesson marked as completed"));
    }


    @DeleteMapping("/{lessonId}")
    public ResponseEntity<String> deleteLesson(@PathVariable Long lessonId) {
        lessonService.deleteLesson(lessonId);
        return ResponseEntity.ok("Lesson deleted successfully and order updated.");
    }

}

