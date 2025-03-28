package com.olinykfs.eduPress.services.authServices;

import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.VerificationToken;
import com.olinykfs.eduPress.repositories.VerificationTokenRepository;
import com.olinykfs.eduPress.services.emailServices.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {

    @Value("${VERIVE_EMAIL_API}")
    private String verificationEmailApi;
    private final VerificationTokenRepository tokenRepository;
    private final EmailService emailService;

    public void createVerificationToken(User user) throws MessagingException {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        tokenRepository.save(verificationToken);

        String confirmationUrl = verificationEmailApi + token;
        emailService.sendConfirmationEmail(user.getEmail(), confirmationUrl);
    }
}
