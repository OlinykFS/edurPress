package com.olinykfs.eduPress.services.userProgressServices;

import com.olinykfs.eduPress.entities.enums.Role;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Getter
public class AchievementConfig {
    private final String name;
    private final AchievementCondition condition;
    private final List<LevelDescription> levels;

    public AchievementConfig(String name, AchievementCondition condition, List<LevelDescription> levels) {
        this.name = name;
        this.condition = condition;
        this.levels = levels;
    }

    @Getter
    public static class LevelDescription {
        private final String level;
        private final String description;

        public LevelDescription(String level, String description) {
            this.level = level;
            this.description = description;
        }
    }

    public static AchievementCondition createCountBasedCondition(Map<String, Integer> thresholds) {
        return new CountBasedCondition(thresholds);
    }

    public static AchievementCondition createRoleBasedCondition(Role role) {
        return new RoleBasedCondition(role);
    }

    public static final List<AchievementConfig> ACHIEVEMENTS = Arrays.asList(
            new AchievementConfig(
                    "Lesson Master",
                    createCountBasedCondition(Map.of("Bronze", 10, "Silver", 30, "Gold", 75)),
                    Arrays.asList(
                            new LevelDescription("Bronze", "Completed 10 Lessons"),
                            new LevelDescription("Silver", "Completed 30 Lessons"),
                            new LevelDescription("Gold", "Completed 75 Lessons")
                    )
            ),
            new AchievementConfig(
                    "Instructor",
                    createRoleBasedCondition(Role.INSTRUCTOR),
                    List.of(
                            new LevelDescription("Bronze", "Стал инструктором")
                    )
            )
    );
}