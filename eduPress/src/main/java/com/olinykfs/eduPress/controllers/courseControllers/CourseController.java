package com.olinykfs.eduPress.controllers.courseControllers;

import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseResponseDTO;
import com.olinykfs.eduPress.services.courseServices.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseService courseService;


    @GetMapping
    public ResponseEntity<Page<CourseCardDTO>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        Page<CourseCardDTO> courses = courseService.getAllCourses(page, size);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/byCategory/{categoryId}")
    public ResponseEntity<Page<CourseCardDTO>> getCoursesByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        Page<CourseCardDTO> courses = courseService.getCoursesByCategory(categoryId, page, size);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<CourseResponseDTO> getCourseById(@PathVariable Long courseId) {
        CourseResponseDTO course = courseService.getCourseById(courseId);
        return ResponseEntity.ok(course);
    }
    @GetMapping("/byInstructor/{instructorId}")
    public ResponseEntity<Page<CourseCardDTO>> getCourseByInstructor(
            @PathVariable Long instructorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        Page<CourseCardDTO> courses = courseService.searchCoursesByInstructorId(instructorId, page, size);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/topCourses")
    public ResponseEntity<List<CourseCardDTO>> getTopCourses() {
        List<CourseCardDTO> topCourses = courseService.getTopCourses();
        return ResponseEntity.ok(topCourses);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<CourseCardDTO>> getCoursesByName(@PathVariable String name) {
        List<CourseCardDTO> searchCourses = courseService.searchCourses(name);
        return ResponseEntity.ok(searchCourses);
    }

    @GetMapping("/courseForUser")
    public ResponseEntity<List<CourseCardDTO>> getCoursesForUser() {
        List<CourseCardDTO> coursesForUser = courseService.getCoursesForUser();
        return ResponseEntity.ok(coursesForUser);
    }

    @GetMapping("/getPublished")
    public ResponseEntity<List<CourseCardDTO>> getPublishedForUser() {
        List<CourseCardDTO> publishedCourse = courseService.getPublishedCourses();
        return ResponseEntity.ok(publishedCourse);
    }
}
