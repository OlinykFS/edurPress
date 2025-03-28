package com.olinykfs.eduPress.repositories.courseRepository;

import com.olinykfs.eduPress.entities.CourseOverview;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseOverviewRepository extends JpaRepository<CourseOverview, Long> {
    @EntityGraph(attributePaths = {
            "course",
            "learningOutcomes",
            "requirements",
            "features",
            "targetAudience"
    })
    Optional<CourseOverview> findByCourseId(Long courseId);
}