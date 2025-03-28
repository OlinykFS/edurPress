package com.olinykfs.eduPress.services.instructorServices;

import com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs.InstructorApplicationCreateDTO;
import com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs.InstructorApplicationResponseDTO;
import com.olinykfs.eduPress.entities.user.Instructor;
import com.olinykfs.eduPress.entities.SocialMedia;
import com.olinykfs.eduPress.entities.InstructorApplication;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.enums.ApplicationStatus;
import com.olinykfs.eduPress.entities.enums.Role;
import com.olinykfs.eduPress.repositories.userRepository.InstructorApplicationRepository;
import com.olinykfs.eduPress.repositories.userRepository.InstructorRepository;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InstructorApplicationService {

    private final InstructorApplicationRepository applicationRepository;
    private final GenericDTOConverter genericDTOConverter;
    private final UserRepository userRepository;
    private final InstructorRepository instructorRepository;

    @Transactional(readOnly = true)
    public List<InstructorApplicationResponseDTO> getAllApplications() {
        List<InstructorApplication> applications = applicationRepository.findAll();
        return applications.stream()
                .map(app -> genericDTOConverter.convertToDTO(app, InstructorApplicationResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InstructorApplicationResponseDTO getApplicationById(Long id) {
        InstructorApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return genericDTOConverter.convertToDTO(application, InstructorApplicationResponseDTO.class);
    }

    @Transactional
    public InstructorApplicationResponseDTO updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        InstructorApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        switch (status) {
            case REJECTED:
                application.setStatus(ApplicationStatus.REJECTED);
                break;
            case APPROVED:
                approveApplication(application);
                break;
            default:
                throw new IllegalArgumentException("Invalid status provided");
        }

        applicationRepository.save(application);
        return genericDTOConverter.convertToDTO(application, InstructorApplicationResponseDTO.class);
    }

    @Transactional
    public InstructorApplicationResponseDTO createInstructorApplication(InstructorApplicationCreateDTO createDTO) {
        InstructorApplication application = buildApplicationFromDTO(createDTO);
        application = applicationRepository.save(application);
        return genericDTOConverter.convertToDTO(application, InstructorApplicationResponseDTO.class);
    }

    @Transactional
    public void deleteInstructorApplication(Long applicationId) {
        applicationRepository.deleteById(applicationId);
    }

    private void approveApplication(InstructorApplication application) {
        application.setStatus(ApplicationStatus.APPROVED);

        Long userId = application.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(Role.INSTRUCTOR);

        Instructor instructor = new Instructor();
        instructor.setFirstName(application.getFirstName());
        instructor.setLastName(application.getLastName());
        instructor.setBio(application.getBio());
        instructor.setAge(application.getAge());
        instructor.setSpecialization(application.getSpecialization());

        Set<SocialMedia> copiedSocialMedia = application.getSocialMedia().stream()
                .map(original -> {
                    SocialMedia copy = new SocialMedia();
                    copy.setName(original.getName());
                    copy.setLink(original.getLink());
                    return copy;
                })
                .collect(Collectors.toSet());
        instructor.setSocialMedia(copiedSocialMedia);

        user.setInstructor(instructor);

        userRepository.save(user);
        instructorRepository.save(instructor);
    }
    
    private InstructorApplication buildApplicationFromDTO(InstructorApplicationCreateDTO createDTO) {
        InstructorApplication application = new InstructorApplication();
        application.setUserId(createDTO.getUserId());
        application.setTitle(createDTO.getTitle());
        application.setBio(createDTO.getBio());
        application.setFirstName(createDTO.getFirstName());
        application.setLastName(createDTO.getLastName());
        application.setCreatedAt(createDTO.getCreatedAt());
        application.setSpecialization(createDTO.getSpecialization());
        application.setSocialMedia(createDTO.getSocialMedia().stream().toList());
        application.setAge(createDTO.getAge());
        application.setStatus(ApplicationStatus.PENDING);
        return application;
    }
}
