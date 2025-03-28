package com.olinykfs.eduPress.services.userProgressServices;

import com.olinykfs.eduPress.entities.dto.userDTOs.UserDailyProgressDTO;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserStatsDTO;
import com.olinykfs.eduPress.entities.enums.Role;
import com.olinykfs.eduPress.entities.user.userProgress.*;
import com.olinykfs.eduPress.repositories.*;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.repositories.userProgressRepository.*;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.CheckCourseAccess;
import com.olinykfs.eduPress.services.enrollmentServices.EnrollmentService;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private static final int COMPLETE_PERCENTAGE = 100;
    private static final int INCOMPLETE_PERCENTAGE = 0;

    private final UserLessonProgressRepository lessonProgressRepo;
    private final LessonRepository lessonRepo;
    private final ModuleRepository moduleRepo;
    private final UserModuleProgressRepository moduleProgressRepo;
    private final UserCourseProgressRepository courseProgressRepo;
    private final UserRepository userRepo;
    private final CourseRepository courseRepo;
    private final ApplicationEventPublisher eventPublisher;
    private final UserDailyProgressSummaryRepository userDailyProgressSummaryRepo;
    private final CheckCourseAccess checkCourseAccess;

    public UserStatsDTO getUserStats() {
        Long userId = checkCourseAccess.getCurrentUserId();
        return UserStatsDTO.builder()
                .completedLessons(countCompletedLessons(userId))
                .lastLessonCompletion(getLastLessonCompletion(userId))
                .completedModules(countCompletedModules(userId))
                .lastModuleCompletion(getLastModuleCompletion(userId))
                .completedCourses(countCompletedCourses(userId))
                .lastCourseCompletion(getLastCourseCompletion(userId))
                .build();
    }
    
    public List<UserDailyProgressDTO> getUserDailyProgress() {
        Long userId = checkCourseAccess.getCurrentUserId();

        List<UserDailyProgressSummary> summaries = userDailyProgressSummaryRepo.findAllByUserIdOrderByDateAsc(userId);

        return summaries.stream()
                .map(summary -> UserDailyProgressDTO.builder()
                        .date(summary.getDate())
                        .lessonCompletions(summary.getLessonCompletions())
                        .moduleCompletions(summary.getModuleCompletions())
                        .courseCompletions(summary.getCourseCompletions())
                        .totalCompletions(summary.getTotalCompletions())
                        .build())
                .collect(Collectors.toList());
    }

    public void markLessonAsCompleted(Long lessonId) {
        Long userId = checkCourseAccess.getCurrentUserId();
        UserLessonProgress progress = getOrCreateLessonProgress(userId, lessonId);

        boolean wasCompleted = progress.isCompleted();
        updateLessonProgress(progress);
        if (!wasCompleted) {
            updateDailySummary(userId, "lesson", progress.getCompletedAt().toLocalDate());
        }
        updateModuleProgress(progress.getLesson().getModule().getId());
        updateCourseProgress(progress.getLesson().getModule().getCourse().getId());
        publishProgressUpdateEvent(userId);
    }

    public void updateModuleProgress(Long moduleId) {
        Long userId = checkCourseAccess.getCurrentUserId();
        UserModuleProgress moduleProgress = getOrCreateModuleProgress(userId, moduleId);

        boolean wasCompleted = moduleProgress.isCompleted();
        boolean allLessonsCompleted = areAllLessonsCompleted(userId, moduleId);
        updateProgress(moduleProgress, allLessonsCompleted);
        if (allLessonsCompleted && !wasCompleted) {
            updateDailySummary(userId, "module", moduleProgress.getUpdatedAt().toLocalDate());
        }
        moduleProgressRepo.save(moduleProgress);
    }

    public void updateCourseProgress(Long courseId) {
        Long userId = checkCourseAccess.getCurrentUserId();
        UserCourseProgress courseProgress = getOrCreateCourseProgress(userId, courseId);

        boolean wasCompleted = courseProgress.isCompleted();
        boolean allModulesCompleted = areAllModulesCompleted(userId, courseId);
        updateProgress(courseProgress, allModulesCompleted);
        if (allModulesCompleted && !wasCompleted) {
            updateDailySummary(userId, "course", courseProgress.getUpdatedAt().toLocalDate());
        }
        courseProgressRepo.save(courseProgress);
    }

    private void updateDailySummary(Long userId, String completionType, LocalDate date) {
        UserDailyProgressSummary summary = userDailyProgressSummaryRepo.findByUserIdAndDate(userId, date)
                .orElseGet(() -> {
                    UserDailyProgressSummary newSummary = new UserDailyProgressSummary();
                    newSummary.setUser(userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
                    newSummary.setDate(date);
                    return newSummary;
                });

        switch (completionType) {
            case "lesson":
                summary.setLessonCompletions(summary.getLessonCompletions() + 1);
                break;
            case "module":
                summary.setModuleCompletions(summary.getModuleCompletions() + 1);
                break;
            case "course":
                summary.setCourseCompletions(summary.getCourseCompletions() + 1);
                break;
            default:
                throw new IllegalArgumentException("Invalid completion type: " + completionType);
        }

        summary.setTotalCompletions(summary.getLessonCompletions() + summary.getModuleCompletions() + summary.getCourseCompletions());
        userDailyProgressSummaryRepo.save(summary);
    }

    private int countCompletedLessons(Long userId) {
        return lessonProgressRepo.findAllByUserIdAndCompletedTrue(userId).size();
    }

    private LocalDateTime getLastLessonCompletion(Long userId) {
        return lessonProgressRepo.findAllByUserIdAndCompletedTrue(userId).stream()
                .map(UserLessonProgress::getCompletedAt)
                .max(LocalDateTime::compareTo)
                .orElse(null);
    }

    private int countCompletedModules(Long userId) {
        return moduleProgressRepo.findAllByUserIdAndCompletedTrue(userId).size();
    }

    private LocalDateTime getLastModuleCompletion(Long userId) {
        return moduleProgressRepo.findAllByUserIdAndCompletedTrue(userId).stream()
                .map(UserModuleProgress::getUpdatedAt)
                .max(LocalDateTime::compareTo)
                .orElse(null);
    }

    private int countCompletedCourses(Long userId) {
        return courseProgressRepo.findAllByUserIdAndCompletedTrue(userId).size();
    }

    private LocalDateTime getLastCourseCompletion(Long userId) {
        return courseProgressRepo.findAllByUserIdAndCompletedTrue(userId).stream()
                .map(UserCourseProgress::getUpdatedAt)
                .max(LocalDateTime::compareTo)
                .orElse(null);
    }

    private UserLessonProgress getOrCreateLessonProgress(Long userId, Long lessonId) {
        return lessonProgressRepo.findByUserIdAndLesson_LessonId(userId, lessonId)
                .orElseGet(() -> {
                    UserLessonProgress progress = new UserLessonProgress();
                    progress.setUser(userRepo.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found")));
                    progress.setLesson(lessonRepo.findById(lessonId)
                            .orElseThrow(() -> new RuntimeException("Lesson not found")));
                    return progress;
                });
    }

    private UserModuleProgress getOrCreateModuleProgress(Long userId, Long moduleId) {
        return moduleProgressRepo.findByUserIdAndModuleId(userId, moduleId)
                .orElseGet(() -> {
                    UserModuleProgress progress = new UserModuleProgress();
                    progress.setUser(userRepo.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found")));
                    progress.setModule(moduleRepo.findById(moduleId)
                            .orElseThrow(() -> new RuntimeException("Module not found")));
                    return progress;
                });
    }

    private UserCourseProgress getOrCreateCourseProgress(Long userId, Long courseId) {
        return courseProgressRepo.findByUserIdAndCourseId(userId, courseId)
                .orElseGet(() -> {
                    UserCourseProgress progress = new UserCourseProgress();
                    progress.setUser(userRepo.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found")));
                    progress.setCourse(courseRepo.findById(courseId)
                            .orElseThrow(() -> new RuntimeException("Course not found")));
                    return progress;
                });
    }

    private void updateLessonProgress(UserLessonProgress progress) {
        progress.setProgressPercentage(COMPLETE_PERCENTAGE);
        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        lessonProgressRepo.save(progress);
    }

    private void updateProgress(ProgressEntity progress, boolean isCompleted) {
        progress.setProgressPercentage(isCompleted ? COMPLETE_PERCENTAGE : INCOMPLETE_PERCENTAGE);
        progress.setCompleted(isCompleted);
        progress.setUpdatedAt(LocalDateTime.now());
    }

    private boolean areAllLessonsCompleted(Long userId, Long moduleId) {
        return lessonRepo.findByModuleIdOrderByLessonOrderAsc(moduleId)
                .stream()
                .allMatch(lesson -> lessonProgressRepo.findByUserIdAndLesson_LessonId(userId, lesson.getLessonId())
                        .map(UserLessonProgress::isCompleted)
                        .orElse(false));
    }

    private boolean areAllModulesCompleted(Long userId, Long courseId) {
        return moduleRepo.findByCourseId(courseId)
                .stream()
                .allMatch(module -> moduleProgressRepo.findByUserIdAndModuleId(userId, module.getId())
                        .map(UserModuleProgress::isCompleted)
                        .orElse(false));
    }

    public Map<Long, Boolean> getModuleCompletionMap(Long userId, Long courseId) {
        return moduleProgressRepo.findAllByUserIdAndModule_CourseId(userId, courseId)
                .stream()
                .collect(Collectors.toMap(
                        progress -> progress.getModule().getId(),
                        UserModuleProgress::isCompleted
                ));
    }

    public Map<Long, Boolean> getLessonCompletionMap(Long userId, Long courseId) {
        return lessonProgressRepo.findAllByUserIdAndLesson_Module_CourseId(userId, courseId)
                .stream()
                .collect(Collectors.toMap(
                        progress -> progress.getLesson().getLessonId(),
                        UserLessonProgress::isCompleted
                ));
    }

    private void publishProgressUpdateEvent(Long userId) {
        UserStatsDTO stats = getUserStats();
        Role userRole = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getRole();

        eventPublisher.publishEvent(new ProgressUpdatedEvent(
                this,
                userId,
                stats.getCompletedLessons(),
                stats.getCompletedModules(),
                stats.getCompletedCourses(),
                userRole
        ));
    }
}