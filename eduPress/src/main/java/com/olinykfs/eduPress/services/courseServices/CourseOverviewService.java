package com.olinykfs.eduPress.services.courseServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.CourseOverview;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseOverviewDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CreateCourseOverviewDTO;
import com.olinykfs.eduPress.repositories.courseRepository.CourseOverviewRepository;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CourseOverviewService {

    private final CourseOverviewRepository courseOverviewRepository;
    private final GenericDTOConverter genericDTOConverter;
    private final CourseRepository courseRepository;

    public CourseOverviewDTO getOverviewForCourseById(Long courseId) {
        CourseOverview courseOverview = courseOverviewRepository.findByCourseId(courseId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Course overview not found for course id: " + courseId));
        return genericDTOConverter.convertToDTO(courseOverview, CourseOverviewDTO.class);
    }

    public CreateCourseOverviewDTO createOverviewForCourse(CreateCourseOverviewDTO createDTO) {
        Course course = courseRepository.findById(createDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        CourseOverview overview = new CourseOverview();
        overview.setCourse(course);
        overview.setCertification(createDTO.getCertification());
        overview.setLearningOutcomes(createDTO.getLearningOutcomes());
        overview.setRequirements(createDTO.getRequirements());
        overview.setFeatures(createDTO.getFeatures());
        overview.setTargetAudience(createDTO.getTargetAudience());
        courseOverviewRepository.save(overview);
        return createDTO;
    }
}
