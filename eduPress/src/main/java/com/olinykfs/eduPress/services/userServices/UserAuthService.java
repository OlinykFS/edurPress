package com.olinykfs.eduPress.services.userServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserRegisterDTO;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.authServices.RegistrationService;
import com.olinykfs.eduPress.services.emailServices.EmailVerificationService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAuthService {

    private final RegistrationService registrationService;
    private final EmailVerificationService emailVerificationService;
    private final UserRepository userRepository;

    @Transactional
    public void registerUser(UserRegisterDTO registerRequest) throws MessagingException {
        registrationService.registerUser(registerRequest);
    }

    public String confirmUserEmail(String token) {
        return emailVerificationService.confirmUserEmail(token);
    }

    public Long getUserIdByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new GlobalExceptionHandler.UsernameNotFoundException("User not found for email: " + email);
        }
        return user.getId();
    }
}
