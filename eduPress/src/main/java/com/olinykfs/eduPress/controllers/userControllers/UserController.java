package com.olinykfs.eduPress.controllers.userControllers;

import com.olinykfs.eduPress.entities.dto.userDTOs.*;
import com.olinykfs.eduPress.services.userProgressServices.AchievementService;
import com.olinykfs.eduPress.services.userProgressServices.ProgressService;
import com.olinykfs.eduPress.services.userServices.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protected")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final ProgressService progressService;
    private final AchievementService achievementService;

    @GetMapping("/current")
    public ResponseEntity<UserResponseDTO> getCurrentUserData() {
        UserResponseDTO currentUserData = userService.getCurrentUserData();
        return ResponseEntity.ok(currentUserData);
    }

    @GetMapping("/user")
    public ResponseEntity<UserResponseDTO> getUserData(@RequestParam Long userId) {
        UserResponseDTO userResponse = userService.getUserInfo(userId);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/statistic")
    public ResponseEntity<UserStatsDTO> statisticUser() {
        UserStatsDTO userResponse = progressService.getUserStats();
        return ResponseEntity.ok(userResponse);
    }
    @GetMapping("/getUserDailyProgress")
    public ResponseEntity<List<UserDailyProgressDTO>> getUserDailyProgress() {
        return ResponseEntity.ok(progressService.getUserDailyProgress());
    }

    @GetMapping("/achievement")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<UserAchievementDTO>> getUserAchievements() {
        try {
            List<UserAchievementDTO> achievements = achievementService.getUserAchievements();
            return ResponseEntity.ok(achievements);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(null); // Не аутентифицирован
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Внутренняя ошибка
        }
    }

    @PutMapping("/current")
    public ResponseEntity<UpdateUserResponseDTO> updateCurrentUser(@RequestBody UserUpdateDTO updateDTO) {
        return userService.updateCurrentUser(updateDTO);
    }
}

