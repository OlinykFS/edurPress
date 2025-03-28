package com.olinykfs.eduPress.services.userProgressServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.details.CustomUserDetails;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserAchievementDTO;
import com.olinykfs.eduPress.entities.user.Achievement;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.enums.Role;
import com.olinykfs.eduPress.repositories.AchievementRepository;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserRepository userRepository;
    private final GenericDTOConverter genericDTOConverter;

    public List<UserAchievementDTO> getUserAchievements() {
        Long userId = getCurrentUserId();
        List<Achievement> achievements = achievementRepository.findAllByUserId(userId);
        return achievements.stream()
                .map(achievement -> genericDTOConverter.convertToDTO(achievement, UserAchievementDTO.class))
                .collect(Collectors.toList());
    }

    public void checkAndAwardAchievements(int completedLessons, int completedModules, int completedCourses, Role role) {
        Long userId = getCurrentUserIdOrNull();
        if (userId == null) {
            return;
        }

        for (AchievementConfig config : AchievementConfig.ACHIEVEMENTS) {
            int progress = getProgressForAchievement(config.getName(), completedLessons, completedModules, completedCourses, role);

            Optional<AchievementConfig.LevelDescription> achievedLevel = config.getLevels().stream()
                    .filter(level -> config.getCondition().isAchieved(progress, level.getLevel()))
                    .max((l1, l2) -> Integer.compare(getLevelPriority(l1.getLevel()), getLevelPriority(l2.getLevel())));

            achievedLevel.ifPresent(levelDescription -> awardOrUpgradeAchievement(userId, config.getName(), levelDescription));
        }
    }

    private int getProgressForAchievement(String achievementName, int lessons, int modules, int courses, Role role) {
        return switch (achievementName) {
            case "Lesson Master" -> lessons;
            case "Module Expert" -> modules;
            case "Course Conqueror" -> courses;
            case "Instructor" -> (role == Role.INSTRUCTOR) ? 1 : 0;
            default -> 0;
        };
    }

    private void awardOrUpgradeAchievement(Long userId, String name, AchievementConfig.LevelDescription level) {
        Optional<Achievement> existing = achievementRepository.findByUserIdAndName(userId, name);
        String levelName = level.getLevel();
        String description = level.getDescription();

        if (existing.isPresent()) {
            Achievement achievement = existing.get();
            if (getLevelPriority(levelName) > getLevelPriority(achievement.getLevel())) {
                achievement.setLevel(levelName);
                achievement.setDescription(description);
                achievement.setAwardedAt(LocalDateTime.now());
                achievementRepository.save(achievement);
            }
        } else {
            Achievement achievement = new Achievement();
            achievement.setName(name);
            achievement.setLevel(levelName);
            achievement.setDescription(description);
            achievement.setAwardedAt(LocalDateTime.now());
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new GlobalExceptionHandler.UsernameNotFoundException("User not found"));
            achievement.setUser(user);
            achievementRepository.save(achievement);
        }
    }

    private int getLevelPriority(String level) {
        return switch (level) {
            case "Bronze" -> 1;
            case "Silver" -> 2;
            case "Gold" -> 3;
            default -> 0;
        };
    }

    protected Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails)) {
            throw new RuntimeException("Invalid principal type");
        }
        return ((CustomUserDetails) principal).getId();
    }

    protected Long getCurrentUserIdOrNull() {
        try {
            return getCurrentUserId();
        } catch (RuntimeException ex) {
            return null;
        }
    }

    @EventListener
    public void handleProgressUpdated(ProgressUpdatedEvent event) {
        checkAndAwardAchievements(
                event.getCompletedLessons(),
                event.getCompletedModules(),
                event.getCompletedCourses(),
                event.getRole()
        );
    }
}