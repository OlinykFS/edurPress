package com.olinykfs.eduPress.repositories.userRepository;

import com.olinykfs.eduPress.entities.user.Instructor;
import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorNameDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorNameDTO(i.id," +
            "CONCAT(i.firstName, ' ', i.lastName)) " +
            "FROM Instructor i")
    List<InstructorNameDTO> findAllEmails();
    

    @Query("SELECT i.id FROM Instructor i WHERE i.user.id = :userId")
    Long findInstructorIdByUserId(@Param("userId") Long userId);

    Instructor findInstructorById(Long id);
}
