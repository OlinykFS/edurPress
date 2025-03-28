package com.olinykfs.eduPress.controllers.courseControllers;

import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseRatingDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseRatingPostDTO;
import com.olinykfs.eduPress.services.CheckCourseAccess;
import com.olinykfs.eduPress.services.courseServices.CourseRatingService;

import com.olinykfs.eduPress.services.enrollmentServices.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseRatingController {

    private final CourseRatingService courseRatingService;
    private final CheckCourseAccess checkCourseAccess;

    @PostMapping("/rate")
    public ResponseEntity<?> rateCourse(@RequestBody CourseRatingPostDTO courseRatingPostDTO) {
        Long userId = checkCourseAccess.getCurrentUserId();
        courseRatingService.rateCourse(courseRatingPostDTO, userId);
        HashMap<String, Object> response = new HashMap<>();
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/rating/{courseId}")
    public ResponseEntity<CourseRatingDTO> getCourseRating(@PathVariable Long courseId) {
        CourseRatingDTO dto = courseRatingService.getCourseRatingDTO(courseId);
        return ResponseEntity.ok(dto);
    }
}
