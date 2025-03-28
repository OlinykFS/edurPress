package com.olinykfs.eduPress.services.emailServices;

import com.olinykfs.eduPress.config.security.JWTUtils;
import com.olinykfs.eduPress.entities.EmailUpdateToken;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.repositories.EmailUpdateTokenRepository;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.authServices.AuthService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailUpdateService {

    @Value("${EMAIL_UPDATE_API}")
    private String emailUpdateApi;

    private final EmailUpdateTokenRepository emailUpdateTokenRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final AuthService authService;
    private final JWTUtils jwtUtils;

    public void createEmailUpdateToken(User user, String newEmail) throws MessagingException {
        String token = UUID.randomUUID().toString();
        EmailUpdateToken emailUpdateToken = new EmailUpdateToken();
        emailUpdateToken.setToken(token);
        emailUpdateToken.setUser(user);
        emailUpdateToken.setNewEmail(newEmail);
        emailUpdateToken.setExpiryDate(LocalDateTime.now().plusHours(24));

        emailUpdateTokenRepository.save(emailUpdateToken);

        String confirmationUrl = emailUpdateApi + token;
        sendEmailUpdateConfirmationEmail(newEmail, confirmationUrl);
    }

    public void sendEmailUpdateConfirmationEmail(String to, String confirmationUrl) throws MessagingException {
        emailService.sendUpdateConfirmationEmail(to, confirmationUrl);
    }

    public ResponseEntity<Map<String, String>> confirmNewEmail(String token, HttpServletResponse response) {
        EmailUpdateToken emailUpdateToken = emailUpdateTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Token not found"));
        if (emailUpdateToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token expired");
        }
        User user = emailUpdateToken.getUser();
        user.setEmail(emailUpdateToken.getNewEmail());
        user.setEmailVerified(true);
        userRepository.save(user);
        emailUpdateTokenRepository.delete(emailUpdateToken);

        UserDetails updatedUserDetails = userDetailsService.loadUserByUsername(user.getEmail());
        authService.removeAuthCookie(response);
        authService.removeRefreshCookie(response);
        String newAccessToken = jwtUtils.generateToken(updatedUserDetails, user.getId());
        String newRefreshToken = jwtUtils.generateRefreshToken(updatedUserDetails, user.getId());
        authService.setAuthCookie(response, newAccessToken, true);
        authService.setRefreshCookie(response, newRefreshToken, true);
        return ResponseEntity.ok(Map.of("message", "Email updated successfully"));
    }

}
