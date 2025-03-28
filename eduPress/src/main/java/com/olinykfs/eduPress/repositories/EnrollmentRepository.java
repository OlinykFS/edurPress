package com.olinykfs.eduPress.repositories;

import com.olinykfs.eduPress.entities.user.Enrollment;
import com.olinykfs.eduPress.entities.enums.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByUser_IdAndCourse_Id(Long userId, Long courseId);

    boolean existsByUser_IdAndCourse_IdAndEnrollmentStatus(Long userId, Long courseId, EnrollmentStatus status);
}

