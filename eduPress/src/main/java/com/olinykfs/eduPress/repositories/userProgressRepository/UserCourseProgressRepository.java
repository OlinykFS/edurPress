package com.olinykfs.eduPress.repositories.userProgressRepository;

import com.olinykfs.eduPress.entities.user.userProgress.UserCourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface UserCourseProgressRepository extends JpaRepository<UserCourseProgress, Long> {
    Optional<UserCourseProgress> findByUserIdAndCourseId(Long userId, Long courseId);

    List<UserCourseProgress> findAllByUserIdAndCompletedTrue(Long userId);
}
