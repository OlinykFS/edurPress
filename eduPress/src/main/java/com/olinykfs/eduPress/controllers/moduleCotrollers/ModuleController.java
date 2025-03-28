package com.olinykfs.eduPress.controllers.moduleCotrollers;

import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleCreateDTO;
import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleResponseDTO;
import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleUpdateDTO;
import com.olinykfs.eduPress.services.moduleService.ModuleService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/modules")
@AllArgsConstructor
public class ModuleController {


    private final ModuleService moduleService;

    @PostMapping
    public ModuleResponseDTO addModule(@RequestBody ModuleCreateDTO moduleCreateDTO) {
        return moduleService.createModule(moduleCreateDTO);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getModulesByCourseId(@PathVariable Long courseId) {
        return moduleService.getModulesWithAccessCheck(courseId);
    }

    @PatchMapping("/{moduleId}")
    public ModuleResponseDTO updateModule(@PathVariable Long moduleId, @RequestBody @Valid ModuleUpdateDTO moduleUpdateDTO) {
        return moduleService.updateModule(moduleId, moduleUpdateDTO);
    }

    @DeleteMapping("/{moduleId}")
    public ResponseEntity<String> deleteModule(@PathVariable Long moduleId) {
        moduleService.deleteModule(moduleId);
        return ResponseEntity.ok("Module and its lessons deleted successfully.");
    }
}
