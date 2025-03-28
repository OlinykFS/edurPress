package com.olinykfs.eduPress.services.userProgressServices;

import java.util.Map;

public class CountBasedCondition implements AchievementCondition {
    private final Map<String, Integer> levelThresholds;

    public CountBasedCondition(Map<String, Integer> levelThresholds) {
        this.levelThresholds = levelThresholds;
    }

    @Override
    public boolean isAchieved(int progress, String level) {
        return progress >= levelThresholds.getOrDefault(level, Integer.MAX_VALUE);
    }
}
