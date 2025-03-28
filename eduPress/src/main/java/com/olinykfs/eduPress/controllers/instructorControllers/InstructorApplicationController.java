package com.olinykfs.eduPress.controllers.instructorControllers;

import com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs.InstructorApplicationCreateDTO;
import com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs.InstructorApplicationResponseDTO;
import com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs.UpdateApplicationStatusDTO;
import com.olinykfs.eduPress.services.instructorServices.InstructorApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor-applications")
@AllArgsConstructor
public class InstructorApplicationController {

    private final InstructorApplicationService instructorApplicationService;

    @PostMapping
    public ResponseEntity<InstructorApplicationResponseDTO> createApplication(@RequestBody InstructorApplicationCreateDTO createDTO) {
        InstructorApplicationResponseDTO responseDTO = instructorApplicationService.createInstructorApplication(createDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<InstructorApplicationResponseDTO>> getAllApplications() {
        List<InstructorApplicationResponseDTO> applications = instructorApplicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorApplicationResponseDTO> getApplicationById(@PathVariable Long id) {
        InstructorApplicationResponseDTO application = instructorApplicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
    }

    @PatchMapping
    public ResponseEntity<InstructorApplicationResponseDTO> updateApplicationStatus(@RequestBody UpdateApplicationStatusDTO updateDTO) {
        InstructorApplicationResponseDTO updatedApplication = instructorApplicationService.updateApplicationStatus(updateDTO.getApplicationId(), updateDTO.getStatus());
        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        instructorApplicationService.deleteInstructorApplication(id);
        return ResponseEntity.ok("Successfully");
    }
}

