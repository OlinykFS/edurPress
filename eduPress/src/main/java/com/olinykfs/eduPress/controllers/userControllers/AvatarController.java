package com.olinykfs.eduPress.controllers.userControllers;

import com.olinykfs.eduPress.services.userServices.UserAvatarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user/avatar")
@RequiredArgsConstructor
public class AvatarController {

    private final UserAvatarService userAvatarService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAvatar(
            @RequestParam("avatar") MultipartFile file,
            @RequestParam("userId") Long userId) {
        try {
            String avatarUrl = userAvatarService.uploadAvatar(file, userId);
            return ResponseEntity.ok(avatarUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload avatar: " + e.getMessage());
        }
    }


    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAvatar(@RequestParam("fileName") String fileName) {
        try {
            userAvatarService.deleteAvatar(fileName);
            return ResponseEntity.ok("Avatar deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete avatar: " + e.getMessage());
        }
    }
}
