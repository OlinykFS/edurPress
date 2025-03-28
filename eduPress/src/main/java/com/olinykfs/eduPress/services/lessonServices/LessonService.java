package com.olinykfs.eduPress.services.lessonServices;

import com.olinykfs.eduPress.entities.Lesson;
import com.olinykfs.eduPress.entities.Module;
import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonCreateDTO;
import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonResponseDTO;
import com.olinykfs.eduPress.entities.user.userProgress.UserLessonProgress;
import com.olinykfs.eduPress.repositories.LessonRepository;
import com.olinykfs.eduPress.repositories.ModuleRepository;
import com.olinykfs.eduPress.repositories.userProgressRepository.UserLessonProgressRepository;
import com.olinykfs.eduPress.services.CheckCourseAccess;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import com.olinykfs.eduPress.services.enrollmentServices.EnrollmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;
    private final GenericDTOConverter genericDTOConverter;
    private final UserLessonProgressRepository lessonProgressRepo;
    private final CheckCourseAccess checkCourseAccess;


    @Transactional
    public LessonCreateDTO addLesson(LessonCreateDTO lessonCreateDTO) {
        validateLessonCreateDTO(lessonCreateDTO);
        Module module = getModuleOrThrow(lessonCreateDTO.getModuleId());
        checkCourseAccess.checkCourseAccess(module.getCourse().getId());

        Long targetOrder = calculateTargetOrder(lessonCreateDTO.getLessonOrder(), module.getId());
        shiftLessonOrdersIfNeeded(module.getId(), targetOrder);

        Lesson lesson = genericDTOConverter.convertToDTO(lessonCreateDTO, Lesson.class);
        lesson.setLessonOrder(targetOrder);
        lesson.setModule(module);

        lessonRepository.save(lesson);
        updateModuleLessonsCount(module, 1);

        return lessonCreateDTO;
    }

    @Transactional
    public List<LessonCreateDTO> addLessonsBatch(List<LessonCreateDTO> lessonsDTO) {
        if (lessonsDTO.isEmpty()) {
            return Collections.emptyList();
        }

        Long moduleId = lessonsDTO.get(0).getModuleId();
        Module module = getModuleOrThrow(moduleId);
        if (!checkCourseAccess.checkCourseAccess(module.getCourse().getId())) {
            throw new RuntimeException("Access denied");
        }

        validateBatchLessons(lessonsDTO, moduleId);

        Long baseOrder = lessonRepository.findMaxOrderByModuleId(moduleId).orElse(0L);

        List<Lesson> lessonsToSave = new ArrayList<>();
        for (LessonCreateDTO dto : lessonsDTO) {
            Long targetOrder;
            if (dto.getLessonOrder() == null || dto.getLessonOrder() < 1) {
                targetOrder = ++baseOrder;
            } else {
                targetOrder = dto.getLessonOrder();
                shiftLessonOrdersIfNeeded(moduleId, targetOrder);
            }
            Lesson lesson = genericDTOConverter.convertToDTO(dto, Lesson.class);
            lesson.setLessonOrder(targetOrder);
            lesson.setModule(module);
            lessonsToSave.add(lesson);
        }

        lessonRepository.saveAll(lessonsToSave);
        updateModuleLessonsCount(module, lessonsToSave.size());

        return lessonsDTO;
    }


    public List<LessonResponseDTO> getLessonsByModuleId(Long moduleId) {
        Module module = getModuleOrThrow(moduleId);
        checkCourseAccess.checkCourseAccess(module.getCourse().getId());

        List<Lesson> lessons = lessonRepository.findByModuleIdOrderByLessonOrderAsc(moduleId);
        Long userId = checkCourseAccess.getCurrentUserId();

        Map<Long, Boolean> progressMap = lessonProgressRepo.findByUserIdAndLesson_ModuleId(userId, moduleId)
                .stream()
                .collect(Collectors.toMap(p -> p.getLesson().getLessonId(), UserLessonProgress::isCompleted));

        List<LessonResponseDTO> lessonDTOs = new ArrayList<>();
        boolean previousCompleted = true;

        for (Lesson lesson : lessons) {
            boolean isCompleted = progressMap.getOrDefault(lesson.getLessonId(), false);
            boolean locked = !previousCompleted;
            previousCompleted = isCompleted;

            LessonResponseDTO dto = genericDTOConverter.convertToDTO(lesson, LessonResponseDTO.class);
            dto.setLocked(locked);
            lessonDTOs.add(dto);
        }
        return lessonDTOs;
    }

    @Transactional
    public void deleteLesson(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found with ID: " + lessonId));
        Module module = lesson.getModule();
        checkCourseAccess.checkCourseAccess(module.getCourse().getId());

        Long deletedOrder = lesson.getLessonOrder();
        lessonRepository.delete(lesson);
        lessonRepository.shiftOrdersAfterDeletion(module.getId(), deletedOrder);
        updateModuleLessonsCount(module, -1);
    }

    public List<LessonResponseDTO> getLessonsByCourseId(Long courseId) {
        checkCourseAccess.checkCourseAccess(courseId);
        List<Lesson> lessons = lessonRepository.findByModule_CourseIdOrderByLessonOrderAsc(courseId);
        return lessons.stream()
                .map(lesson -> genericDTOConverter.convertToDTO(lesson, LessonResponseDTO.class))
                .collect(Collectors.toList());
    }

    public LessonResponseDTO getLessonByCourseIdAndLessonId(Long courseId, Long lessonId) {
        checkCourseAccess.checkCourseAccess(courseId);
        Lesson lesson = lessonRepository.findByLessonIdAndModule_CourseId(lessonId, courseId)
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found with ID: " + lessonId));
        return genericDTOConverter.convertToDTO(lesson, LessonResponseDTO.class);
    }

    private Module getModuleOrThrow(Long moduleId) {
        return moduleRepository.findById(moduleId)
                .orElseThrow(() -> new EntityNotFoundException("Module not found with ID: " + moduleId));
    }

    private void shiftLessonOrdersIfNeeded(Long moduleId, Long startingOrder) {
        lessonRepository.shiftOrders(moduleId, startingOrder);
    }

    private Long calculateTargetOrder(Long requestedOrder, Long moduleId) {
        if (requestedOrder == null || requestedOrder < 1) {
            return lessonRepository.findMaxOrderByModuleId(moduleId).orElse(0L) + 1;
        }
        return requestedOrder;
    }

    private void updateModuleLessonsCount(Module module, int delta) {
        module.setLessonsCount(module.getLessonsCount() + delta);
        moduleRepository.save(module);
    }

    private void validateLessonCreateDTO(LessonCreateDTO dto) {
        if (dto.getModuleId() == null) {
            throw new IllegalArgumentException("Module ID cannot be null");
        }
    }

    private void validateBatchLessons(List<LessonCreateDTO> lessonsDTO, Long moduleId) {
        for (LessonCreateDTO dto : lessonsDTO) {
            if (!dto.getModuleId().equals(moduleId)) {
                throw new IllegalArgumentException("All lessons must belong to the same module");
            }
        }
    }
}