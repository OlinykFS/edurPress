package com.olinykfs.eduPress.services.instructorServices;

import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorInfoDTO;
import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorNameDTO;
import com.olinykfs.eduPress.entities.user.Instructor;
import com.olinykfs.eduPress.repositories.userRepository.InstructorRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstructorServiceImpl implements InstructorService {

    private final InstructorRepository instructorRepository;
    private final GenericDTOConverter genericDTOConverter;

    @Override
    @Transactional
    public List<InstructorInfoDTO> getAllInstructors() {
        List<Instructor> instructors = instructorRepository.findAll();
        return instructors
                .stream()
                .map(instructor -> genericDTOConverter.convertToDTO(instructor, InstructorInfoDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public InstructorInfoDTO getInstructorById(Long userId) {
        var instructor = instructorRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Instructor not found with ID: " + userId));
        return genericDTOConverter.convertToDTO(instructor, InstructorInfoDTO.class);
    }

    @Override
    public Instructor getById(Long id) {
        return instructorRepository.findInstructorById(id);
    }

    @Override
    public Long findInstructorIdByUserId(Long id) {
        return instructorRepository.findInstructorIdByUserId(id);
    }

    @Override
    public List<InstructorNameDTO> getAllInstructorNames() {
        return instructorRepository.findAllEmails();
    }
}
