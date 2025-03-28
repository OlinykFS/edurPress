package com.olinykfs.eduPress.repositories.courseRepository;

import com.olinykfs.eduPress.entities.FAQs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface FAQsRepository extends JpaRepository<FAQs, Long> {

    @Query("SELECT f FROM FAQs f WHERE f.course.id = :courseId")
    List<FAQs> findAllByCourse_Id(@Param("courseId") Long courseId);


}
