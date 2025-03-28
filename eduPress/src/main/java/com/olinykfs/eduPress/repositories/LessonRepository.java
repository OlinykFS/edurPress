package com.olinykfs.eduPress.repositories;


import com.olinykfs.eduPress.entities.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByModuleIdOrderByLessonOrderAsc(@Param("moduleId") Long moduleId);

    @Query("SELECT COALESCE(MAX(l.lessonOrder), 0) FROM Lesson l WHERE l.module.id = :moduleId")
    Optional<Long> findMaxOrderByModuleId(@Param("moduleId") Long moduleId);

    @Modifying
    @Query("UPDATE Lesson l SET l.lessonOrder = l.lessonOrder + 1 " +
            "WHERE l.module.id = :moduleId AND l.lessonOrder >= :startingOrder")
    void shiftOrders(@Param("moduleId") Long moduleId, @Param("startingOrder") Long startingOrder);

    @Modifying
    @Query("UPDATE Lesson l SET l.lessonOrder = l.lessonOrder - 1 " +
            "WHERE l.module.id = :moduleId AND l.lessonOrder > :deletedOrder")
    void shiftOrdersAfterDeletion(@Param("moduleId") Long moduleId, @Param("deletedOrder") Long deletedOrder);

    @Query("SELECT l FROM Lesson l WHERE l.module.course.id = :courseId ORDER BY l.lessonOrder ASC")
    List<Lesson> findByModule_CourseIdOrderByLessonOrderAsc(@Param("courseId") Long courseId);

    @Query("SELECT l FROM Lesson l WHERE l.lessonId = :lessonId AND l.module.course.id = :courseId")
    Optional<Lesson> findByLessonIdAndModule_CourseId(@Param("lessonId") Long lessonId,
                                                      @Param("courseId") Long courseId);
}
