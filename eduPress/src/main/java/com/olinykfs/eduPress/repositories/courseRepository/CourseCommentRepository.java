package com.olinykfs.eduPress.repositories.courseRepository;

import com.olinykfs.eduPress.entities.CourseComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseCommentRepository extends JpaRepository<CourseComment, Long> {

    @Query("SELECT c FROM CourseComment c WHERE c.course.id = :courseId ORDER BY c.createdAt DESC")
    Page<CourseComment> findByCourseId(Pageable pageable, @Param("courseId") Long courseId);

    @Query("SELECT c FROM CourseComment c WHERE c.student.id = :studentId ORDER BY c.createdAt DESC")
    List<CourseComment> findByStudentId(@Param("studentId") Long studentId);

}


