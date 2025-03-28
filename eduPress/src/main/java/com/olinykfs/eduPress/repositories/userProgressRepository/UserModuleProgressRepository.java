package com.olinykfs.eduPress.repositories.userProgressRepository;

import com.olinykfs.eduPress.entities.user.userProgress.UserModuleProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserModuleProgressRepository extends JpaRepository<UserModuleProgress, Long> {
    Optional<UserModuleProgress> findByUserIdAndModuleId(Long userId, Long moduleId);

    List<UserModuleProgress> findAllByUserIdAndCompletedTrue(Long userId);

    @Query("SELECT ump FROM UserModuleProgress ump " +
            "JOIN FETCH ump.module m " +
            "WHERE ump.user.id = :userId AND m.course.id = :courseId")
    List<UserModuleProgress> findAllByUserIdAndModule_CourseId(@Param("userId") Long userId,
                                                               @Param("courseId") Long courseId);
}