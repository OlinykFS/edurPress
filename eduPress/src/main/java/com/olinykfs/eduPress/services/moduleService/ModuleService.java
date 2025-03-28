package com.olinykfs.eduPress.services.moduleService;

import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.Lesson;
import com.olinykfs.eduPress.entities.Module;

import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonResponseDTO;
import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleCreateDTO;
import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleLimitedDTO;
import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleResponseDTO;
import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleUpdateDTO;
import com.olinykfs.eduPress.repositories.LessonRepository;
import com.olinykfs.eduPress.repositories.ModuleRepository;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.services.CheckCourseAccess;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import com.olinykfs.eduPress.services.enrollmentServices.EnrollmentService;
import com.olinykfs.eduPress.services.userProgressServices.ProgressService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final ProgressService progressService;
    private final GenericDTOConverter genericDTOConverter;
    private final CheckCourseAccess checkCourseAccess;

    @Transactional
    public ModuleResponseDTO createModule(ModuleCreateDTO moduleCreateDTO) {
        Course course = courseRepository.findById(moduleCreateDTO.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + moduleCreateDTO.getCourseId()));

        Module module = new Module();
        module.setTitle(moduleCreateDTO.getTitle());
        module.setDescription(moduleCreateDTO.getDescription());
        module.setDuration(moduleCreateDTO.getDuration());
        module.setModuleOrder(moduleCreateDTO.getModuleOrder());
        module.setCourse(course);
        module.setLessonsCount(0);

        course.getModules().add(module);
        moduleRepository.save(module);

        log.debug("Created module for course ID: {}, module title: {}", course.getId(), module.getTitle());
        return genericDTOConverter.convertToDTO(module, ModuleResponseDTO.class);
    }

    @Transactional
    public void deleteModule(Long moduleId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new EntityNotFoundException("Module not found with ID: " + moduleId));

        lessonRepository.deleteAll(module.getLessons());
        moduleRepository.delete(module);

        log.info("Deleted module ID: {} and its lessons", moduleId);
    }

    @Transactional
    public ModuleResponseDTO updateModule(Long moduleId, ModuleUpdateDTO moduleUpdateDTO) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new EntityNotFoundException("Module not found with ID: " + moduleId));
        updateFields(module, moduleUpdateDTO);
        Module updatedModule = moduleRepository.save(module);
        return genericDTOConverter.convertToDTO(updatedModule, ModuleResponseDTO.class);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> getModulesWithAccessCheck(Long courseId) {
        Long userId = checkCourseAccess.getCurrentUserIdOrNull();
        boolean hasAccess = checkCourseAccess.checkCourseAccess(courseId);

        if (!hasAccess) {
            List<ModuleLimitedDTO> limitedModules = moduleRepository.findAllLimitedByCourseId(courseId);
            log.debug("Returned limited module data for user ID: {} and course ID: {}", userId, courseId);
            return new ResponseEntity<>(limitedModules, HttpStatus.PARTIAL_CONTENT);
        }

        List<Module> modules = moduleRepository.findByCourseIdOrderByModuleOrderAscWithLessons(courseId);

        Map<Long, Boolean> moduleCompletionMap = progressService.getModuleCompletionMap(userId, courseId);
        Map<Long, Boolean> lessonCompletionMap = progressService.getLessonCompletionMap(userId, courseId);

        List<ModuleResponseDTO> moduleDTOs = buildModuleResponses(modules, moduleCompletionMap, lessonCompletionMap);
        log.debug("Returned full module data for user ID: {} and course ID: {}", userId, courseId);
        return ResponseEntity.ok(moduleDTOs);
    }

    private List<ModuleResponseDTO> buildModuleResponses(List<Module> modules,
                                                         Map<Long, Boolean> moduleCompletionMap,
                                                         Map<Long, Boolean> lessonCompletionMap) {
        List<ModuleResponseDTO> moduleDTOs = new ArrayList<>();
        boolean previousModuleCompleted = true;

        for (Module module : modules) {
            ModuleResponseDTO dto = genericDTOConverter.convertToDTO(module, ModuleResponseDTO.class);
            boolean isLocked = !previousModuleCompleted;
            dto.setLocked(isLocked);

            if (!isLocked) {
                List<LessonResponseDTO> lessonDTOs = buildLessonResponses(module.getLessons(), lessonCompletionMap);
                dto.setLessons(lessonDTOs);
            } else {
                dto.setLessons(List.of());
            }

            moduleDTOs.add(dto);
            previousModuleCompleted = moduleCompletionMap.getOrDefault(module.getId(), false);
        }

        return moduleDTOs;
    }

    private List<LessonResponseDTO> buildLessonResponses(List<Lesson> lessons,
                                                         Map<Long, Boolean> lessonCompletionMap) {
        List<LessonResponseDTO> lessonDTOs = new ArrayList<>();
        boolean previousLessonCompleted = true;

        for (Lesson lesson : lessons) {
            LessonResponseDTO dto = genericDTOConverter.convertToDTO(lesson, LessonResponseDTO.class);
            boolean isLocked = !previousLessonCompleted;
            dto.setLocked(isLocked);

            boolean isCompleted = lessonCompletionMap.getOrDefault(lesson.getLessonId(), false);
            dto.setCompleted(isCompleted);
            dto.setRequirements(lesson.getRequirements());

            lessonDTOs.add(dto);
            previousLessonCompleted = isCompleted;
        }

        return lessonDTOs;
    }
    private void updateFields(Module module, ModuleUpdateDTO dto) {
        if(StringUtils.hasText(dto.getTitle())) {
            module.setTitle(dto.getTitle().trim());
        } else {
            throw  new IllegalArgumentException("Title must not be blank");
        }
        if(StringUtils.hasText(dto.getDescription())) {
            module.setDescription(dto.getDescription().trim());
        } else {
            throw  new IllegalArgumentException("Description must not be blank");
        }
        if(dto.getDuration() == null){
            throw  new IllegalArgumentException("Duration must not be null");
        }
    }
}