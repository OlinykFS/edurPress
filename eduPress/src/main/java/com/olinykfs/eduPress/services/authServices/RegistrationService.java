package com.olinykfs.eduPress.services.authServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserRegisterDTO;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.enums.Role;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenService verificationTokenService;

    public void registerUser(UserRegisterDTO registerRequest) throws MessagingException {
        checkIfUserExists(registerRequest.getEmail());
        User user = createUser(registerRequest);
        userRepository.save(user);
        verificationTokenService.createVerificationToken(user);
    }

    private void checkIfUserExists(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new GlobalExceptionHandler.UserAlreadyExistsException("User already exists");
        }
    }

    private User createUser(UserRegisterDTO registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setJoinDate(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(Role.STUDENT);
        return user;
    }
}

