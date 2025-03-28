package com.olinykfs.eduPress.services.courseServices;

import com.olinykfs.eduPress.entities.Category;
import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCreateDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseResponseDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseUpdateDTO;
import com.olinykfs.eduPress.entities.user.Instructor;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.services.CheckCourseAccess;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import com.olinykfs.eduPress.services.categoryServices.CategoryService;
import com.olinykfs.eduPress.services.courseServices.validation.CourseValidator;
import com.olinykfs.eduPress.services.instructorServices.InstructorService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService  {

    private final CourseRepository courseRepository;
    private final GenericDTOConverter genericDTOConverter;
    private final CheckCourseAccess checkCourseAccess;
    private final CourseValidator courseValidator;
    private final CategoryService categoryService;
    private final CourseStorageService courseStorageService;
    private final InstructorService instructorService;

    @Override
    @Transactional
    public CourseResponseDTO addCourse(@Valid CourseCreateDTO courseCreateDTO, MultipartFile image) {
        courseValidator.validateCourseCreate(courseCreateDTO);

        Category category = categoryService.getCategory(courseCreateDTO.getCategoryId());
        categoryService.incrementCourseCount(category.getId());

        Instructor instructor = instructorService.getById(courseCreateDTO.getInstructorId());

        Course course = genericDTOConverter.convertToDTO(courseCreateDTO, Course.class);
        course.setCategory(category);
        course.setInstructor(instructor);
        course.setDifficulty(courseCreateDTO.getDifficulty());

        course.setImageUrl(courseStorageService.uploadCourseImage(image));

        courseRepository.save(course);
        return genericDTOConverter.convertToDTO(course, CourseResponseDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "allCourses", key = "'allCourses_' + #page + '_' + #size")
    public Page<CourseCardDTO> getAllCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return courseRepository.findAllCourses(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "courseById", key = "#courseId")
    public CourseResponseDTO getCourseById(Long courseId) {
        CourseResponseDTO course = courseRepository.findCourseById(courseId);
        boolean hasAccess = checkCourseAccess.checkCourseAccess(courseId);
        CourseResponseDTO dto = genericDTOConverter.convertToDTO(course, CourseResponseDTO.class);
        dto.setUserEnrolled(hasAccess);
        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "coursesByCategory", key = "'coursesByCategory_' + #categoryId + '_' + #page + '_' + #size")
    public Page<CourseCardDTO> getCoursesByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return courseRepository.findByCategoryId(pageable, categoryId);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "topCourses")
    public List<CourseCardDTO> getTopCourses() {
        Pageable pageable = PageRequest.of(0, 6);
        Page<CourseCardDTO> topCourses = courseRepository.findTopCourseCards(pageable);
        return topCourses.getContent();
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "searchCourses", key = "#query")
    public List<CourseCardDTO> searchCourses(String query) {
        return courseRepository.searchCourses(query.toLowerCase());
    }

    @Override
    @Cacheable(value = "coursesByInstructor", key = "'coursesByInstructor_' + #instructorId + '_' + #page + '_' + #size")
    public Page<CourseCardDTO> searchCoursesByInstructorId(Long instructorId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return courseRepository.getCoursesByInstructor_Id(pageable, instructorId);
    }

    @Override
    @Cacheable(value = "coursesForUser", key = "'coursesForUser_' + @checkCourseAccess.currentUserIdOrNull")
    public List<CourseCardDTO> getCoursesForUser() {
        return courseRepository.findCoursesByUserId(checkCourseAccess.getCurrentUserIdOrNull());
    }

    @Override
    @Cacheable(value = "publishedCourses", key = "'publishedCourses_' + @checkCourseAccess.currentUserIdOrNull")
    public List<CourseCardDTO> getPublishedCourses() {
        Long instructorId = instructorService.findInstructorIdByUserId(checkCourseAccess.getCurrentUserIdOrNull());
        return courseRepository.findCoursesByInstructor_Id(instructorId);
    }

    @Override
    @Transactional
    @CacheEvict(value = "courseById", key = "#courseId")
    public CourseUpdateDTO updateCourse(Long courseId, CourseUpdateDTO courseUpdateDTO) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Course with ID " + courseUpdateDTO.getId() + " not found"));

        updateFields(course, courseUpdateDTO);
        Course updatedCourse = courseRepository.save(course);

        return genericDTOConverter.convertToDTO(updatedCourse, CourseUpdateDTO.class);
    }

    @Override
    @Transactional
    public void deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
        categoryService.decrementCourseCount(course.getCategory().getId());

        courseStorageService.deleteCourseImage(course.getImageUrl());

        courseRepository.delete(course);

        System.out.println("Course deleted with ID: " + courseId);
    }


    private void updateFields(Course course, CourseUpdateDTO dto) {
        if (StringUtils.hasText(dto.getTitle())) {
            course.setTitle(dto.getTitle().trim());
        } else {
            throw new IllegalArgumentException("Title must not be blank");
        }

        if (StringUtils.hasText(dto.getDescription())) {
            course.setDescription(dto.getDescription().trim());
        } else {
            throw new IllegalArgumentException("Description must not be blank");
        }

        if (dto.getPrice() < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        } else {
            course.setPrice(dto.getPrice());
        }

        if (dto.getDiscount() < 0 || dto.getDiscount() > 100) {
            throw new IllegalArgumentException("Discount must be between 0 and 100");
        } else {
            course.setDiscount(dto.getDiscount());
        }

        course.setFreeCourse(dto.isFreeCourse());

        if (dto.getDifficult() != null) {
            course.setDifficulty(dto.getDifficult());
        }
    }
}
