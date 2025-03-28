package com.olinykfs.eduPress.services.emailServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.VerificationToken;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.repositories.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    public String confirmUserEmail(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        validateToken(verificationToken);
        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken);
        return "Email confirmed successfully!";
    }

    private void validateToken(VerificationToken verificationToken) {
        if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new GlobalExceptionHandler.InvalidTokenException("Invalid or expired token");
        }
    }
}

