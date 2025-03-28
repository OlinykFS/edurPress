package com.olinykfs.eduPress.services.userProgressServices;

import com.olinykfs.eduPress.entities.enums.Role;

public class RoleBasedCondition implements AchievementCondition {

    private final Role requiredRole;

    public RoleBasedCondition(Role requiredRole) {
        this.requiredRole = requiredRole;
    }

    @Override
    public boolean isAchieved(int progress, String level) {
        return progress == 1;
    }
}
