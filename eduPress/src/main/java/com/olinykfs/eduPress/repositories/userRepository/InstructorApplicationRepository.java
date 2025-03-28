package com.olinykfs.eduPress.repositories.userRepository;

import com.olinykfs.eduPress.entities.InstructorApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InstructorApplicationRepository extends JpaRepository<InstructorApplication, Long> {

    @Query("SELECT ia FROM InstructorApplication ia LEFT JOIN FETCH ia.socialMedia WHERE ia.applicationId = :applicationId")
    Optional<InstructorApplication> findByIdWithSocialMedia(@Param("applicationId") Long applicationId);

    @Query("SELECT ia FROM InstructorApplication ia LEFT JOIN FETCH ia.socialMedia")
    List<InstructorApplication> findAllWithSocialMedia();
}

