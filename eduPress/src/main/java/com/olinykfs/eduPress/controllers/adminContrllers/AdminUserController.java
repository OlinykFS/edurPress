package com.olinykfs.eduPress.controllers.adminContrllers;

import com.olinykfs.eduPress.entities.dto.userDTOs.UserResponseDTO;
import com.olinykfs.eduPress.services.adminServices.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class AdminUserController {
    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = adminService.findAll();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
    }
}

