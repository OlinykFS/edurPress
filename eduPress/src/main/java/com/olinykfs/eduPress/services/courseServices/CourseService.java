package com.olinykfs.eduPress.services.courseServices;

import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCreateDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseResponseDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CourseService {
    CourseResponseDTO addCourse(CourseCreateDTO courseCreateDTO, MultipartFile image);
    CourseUpdateDTO updateCourse(Long courseId, CourseUpdateDTO courseUpdateDTO);
    Page<CourseCardDTO> getAllCourses(int page, int size);
    CourseResponseDTO getCourseById(Long courseId);
    Page<CourseCardDTO> getCoursesByCategory(Long categoryId, int page, int size);
    List<CourseCardDTO> getTopCourses();
    List<CourseCardDTO> searchCourses(String query);
    Page<CourseCardDTO> searchCoursesByInstructorId(Long instructorId, int page, int size);
    List<CourseCardDTO> getCoursesForUser();
    List<CourseCardDTO> getPublishedCourses();
    void deleteCourse(Long courseId);
}
