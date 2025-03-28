package com.olinykfs.eduPress.repositories.courseRepository;

import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.CourseRating;
import com.olinykfs.eduPress.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRatingRepository extends JpaRepository<CourseRating, Long> {

    CourseRating findByCourseAndUser(Course course, User user);

    @Query("SELECT AVG(cr.rating) FROM CourseRating cr WHERE cr.course.id = :courseId")
    Double findAverageRatingByCourseId(@Param("courseId") Long courseId);

    @Query("SELECT cr.rating, COUNT(cr) FROM CourseRating cr WHERE cr.course.id = :courseId GROUP BY cr.rating")
    List<Object[]> getRatingCountsByCourseId(@Param("courseId") Long courseId);

    Long countByCourse(Course course);
}
