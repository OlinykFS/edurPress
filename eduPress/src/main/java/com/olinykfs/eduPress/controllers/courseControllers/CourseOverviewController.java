package com.olinykfs.eduPress.controllers.courseControllers;

import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseOverviewDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CreateCourseOverviewDTO;
import com.olinykfs.eduPress.services.courseServices.CourseOverviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/course/overview")
@AllArgsConstructor
public class CourseOverviewController {

    private final CourseOverviewService courseOverviewService;

    @GetMapping("/{courseId}")
    public CourseOverviewDTO getCourseOverview(@PathVariable Long courseId) {
        return courseOverviewService.getOverviewForCourseById(courseId);
    }

    @PostMapping
    public CreateCourseOverviewDTO createOverviewForCourse(@RequestBody CreateCourseOverviewDTO createCourseOverviewDTO) {
        return courseOverviewService.createOverviewForCourse(createCourseOverviewDTO);
    }
}
