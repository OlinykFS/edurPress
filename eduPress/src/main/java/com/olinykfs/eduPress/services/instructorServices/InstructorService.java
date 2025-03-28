package com.olinykfs.eduPress.services.instructorServices;


import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorInfoDTO;
import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorNameDTO;
import com.olinykfs.eduPress.entities.user.Instructor;

import java.util.List;

public interface InstructorService {
    List<InstructorInfoDTO> getAllInstructors();
    InstructorInfoDTO getInstructorById(Long userId);
    Instructor getById(Long id);
    List<InstructorNameDTO> getAllInstructorNames();
    Long findInstructorIdByUserId(Long id);
}
