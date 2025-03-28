package com.olinykfs.eduPress.services.userServices;

import com.olinykfs.eduPress.details.CustomUserDetails;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.dto.userDTOs.UpdateUserResponseDTO;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserResponseDTO;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserUpdateDTO;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.emailServices.EmailUpdateService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailUpdateService emailUpdateService;

    public UserResponseDTO getCurrentUserData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails customUserDetails)) {
            throw new IllegalStateException("No authenticated user found.");
        }

        return userRepository.findUserWithoutInstructor(customUserDetails.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public UserResponseDTO getUserInfo(Long userId) {
        return userRepository.findUserWithoutInstructor(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
    }

    @Transactional
    public ResponseEntity<UpdateUserResponseDTO> updateCurrentUser(UserUpdateDTO updateDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails customUserDetails)) {
            throw new IllegalStateException("No authenticated user found.");
        }
        Long userId = customUserDetails.getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        boolean emailUpdateTriggered = false;

        if (updateDTO.getUsername() != null && !updateDTO.getUsername().isBlank()) {
            user.setUsername(updateDTO.getUsername());
        }
        if (updateDTO.getUserBio() != null) {
            user.setUserBio(updateDTO.getUserBio());
        }
        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        }

        if (updateDTO.getEmail() != null && !updateDTO.getEmail().isBlank() &&
                !updateDTO.getEmail().equalsIgnoreCase(user.getEmail())) {
            try {
                emailUpdateService.createEmailUpdateToken(user, updateDTO.getEmail());
                emailUpdateTriggered = true;
            } catch (MessagingException e) {
                throw new RuntimeException("Failed to send email update confirmation: " + e.getMessage());
            }
        }

        userRepository.save(user);

        UserResponseDTO updatedUser = userRepository.findUserWithoutInstructor(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found after update"));

        String message;
        if (emailUpdateTriggered) {
            message = "Your profile has been updated. Please check your new email for a confirmation link to complete the email update.";
        } else {
            message = "Your profile has been updated successfully.";
        }

        UpdateUserResponseDTO responseDTO = new UpdateUserResponseDTO(updatedUser, message);
        return ResponseEntity.ok(responseDTO);
    }
}
