package com.olinykfs.eduPress.controllers.adminContrllers;

import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCreateDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseResponseDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseUpdateDTO;
import com.olinykfs.eduPress.services.courseServices.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@AllArgsConstructor
@RequestMapping("/admin/courses")
public class AdminCourseController {

    private final CourseService courseService;

    @PostMapping(consumes = {"multipart/form-data", "application/json"})
    public ResponseEntity<CourseResponseDTO> addCourse(
            @RequestPart(value = "courseData", required = false) CourseCreateDTO courseCreateDTO,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        CourseResponseDTO newCourse = courseService.addCourse(courseCreateDTO, image);
        return ResponseEntity.ok(newCourse);
    }

    @GetMapping
    public ResponseEntity<Page<CourseCardDTO>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        Page<CourseCardDTO> courses = courseService.getAllCourses(page, size);
        return ResponseEntity.ok(courses);
    }

    @PatchMapping("/{courseId}")
    public ResponseEntity<CourseUpdateDTO> updateCourse(@PathVariable Long courseId, @RequestBody @Valid CourseUpdateDTO courseUpdateDTO) {
        if (!courseId.equals(courseUpdateDTO.getId())) {
            throw new IllegalArgumentException("ID in URL and body must match");
        }
        CourseUpdateDTO dto = courseService.updateCourse(courseId, courseUpdateDTO);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.noContent().build();
    }
}
