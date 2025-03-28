package com.olinykfs.eduPress.repositories.courseRepository;

import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseResponseDTO(" +
            "c.id, c.title, c.description, c.price, c.discount, c.duration, c.averageRating, c.category.name, c.imageUrl, c.instructor.id," +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), c.freeCourse, c.difficulty, c.modulesCount, c.numberOfStudents, false, false)" +
            "FROM Course c " +
            "WHERE c.id = :id")
    CourseResponseDTO findCourseById(@Param("id") Long id);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO(" +
            "c.id, c.title, c.description, c.price, c.averageRating, c.category.name, " +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), " +
            "c.imageUrl, c.numberOfStudents, c.modulesCount, c.duration) " +
            "FROM Course c " +
            "WHERE c.category.id = :categoryId")
    Page<CourseCardDTO> findByCategoryId(Pageable pageable,@Param("categoryId") Long categoryId);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO(" +
            "c.id, c.title, c.description, c.price, c.averageRating, c.category.name, " +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), " +
            "c.imageUrl, c.numberOfStudents, c.modulesCount, c.duration) " +
            "FROM Course c " +
            "ORDER BY c.averageRating DESC")
    Page<CourseCardDTO> findTopCourseCards(Pageable pageable);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO(" +
            "c.id, c.title, c.description, c.price, c.averageRating, c.category.name, " +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), " +
            "c.imageUrl, c.numberOfStudents, c.modulesCount, c.duration) " +
            "FROM Course c " +
            "WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "   OR LOWER(c.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<CourseCardDTO> searchCourses(@Param("query") String query);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO(" +
            "c.id, c.title, c.description, c.price, c.averageRating, c.category.name, " +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), " +
            "c.imageUrl, c.numberOfStudents, c.modulesCount, c.duration) " +
            "FROM Course c JOIN c.enrollments e " +
            "WHERE e.user.id = :userId")
    List<CourseCardDTO> findCoursesByUserId(@Param("userId") Long userId);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO(" +
            "c.id, c.title, c.description, c.price, c.averageRating, c.category.name, " +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), " +
            "c.imageUrl, c.numberOfStudents, c.modulesCount, c.duration) " +
            "FROM Course c " +
            "WHERE c.instructor.id = :instructorId")
    List<CourseCardDTO> findCoursesByInstructor_Id(@Param("instructorId") Long instructorId);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO(" +
            "c.id, c.title, c.description, c.price, c.averageRating, c.category.name, " +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), " +
            "c.imageUrl, c.numberOfStudents, c.modulesCount, c.duration, c.difficulty) " +
            "FROM Course c")
    Page<CourseCardDTO> findAllCourses(Pageable pageable);

    Course findCourse_IdById(Long id);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.courseDTOs.CourseCardDTO(" +
            "c.id, c.title, c.description, c.price, c.averageRating, c.category.name, " +
            "CONCAT(c.instructor.firstName, ' ', c.instructor.lastName), " +
            "c.imageUrl, c.numberOfStudents, c.modulesCount, c.duration) " +
            "FROM Course c " +
            "WHERE c.instructor.id = :instructorId")
    Page<CourseCardDTO> getCoursesByInstructor_Id(Pageable pageable, @Param("instructorId")  Long instructorId);
}
