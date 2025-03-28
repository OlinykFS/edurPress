package com.olinykfs.eduPress.repositories.userProgressRepository;

import com.olinykfs.eduPress.entities.user.userProgress.UserLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, Long> {

    Optional<UserLessonProgress> findByUserIdAndLesson_LessonId(Long userId, Long lessonLessonId);

    List<UserLessonProgress> findAllByUserIdAndCompletedTrue(Long userId);

    @Query("SELECT ulp FROM UserLessonProgress ulp " +
            "JOIN FETCH ulp.lesson l " +
            "JOIN l.module m " +
            "WHERE ulp.user.id = :userId AND m.course.id = :courseId")
    List<UserLessonProgress> findAllByUserIdAndLesson_Module_CourseId(@Param("userId") Long userId,
                                                                      @Param("courseId") Long courseId);
    @Query("SELECT ulp FROM UserLessonProgress ulp " +
            "WHERE ulp.user.id = :userId AND ulp.lesson.module.id = :moduleId")
    List<UserLessonProgress> findByUserIdAndLesson_ModuleId(@Param("userId") Long userId,
                                                            @Param("moduleId") Long moduleId);
}
