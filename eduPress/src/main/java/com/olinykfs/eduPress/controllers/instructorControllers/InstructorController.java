package com.olinykfs.eduPress.controllers.instructorControllers;

import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorInfoDTO;
import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorNameDTO;
import com.olinykfs.eduPress.services.instructorServices.InstructorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
@AllArgsConstructor
public class InstructorController {
    private final InstructorService instructorService;

    @GetMapping
    public ResponseEntity<List<InstructorInfoDTO>> findAll() {
        List<InstructorInfoDTO> instructors = instructorService.getAllInstructors();
        return ResponseEntity.ok(instructors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorInfoDTO> findById(@PathVariable Long id) {
        InstructorInfoDTO instructor = instructorService.getInstructorById(id);
        return ResponseEntity.ok(instructor);
    }

    @GetMapping("/names")
    public ResponseEntity<List<InstructorNameDTO>> findNames() {
        List<InstructorNameDTO> instructors = instructorService.getAllInstructorNames();
        return ResponseEntity.ok(instructors);
    }
}
