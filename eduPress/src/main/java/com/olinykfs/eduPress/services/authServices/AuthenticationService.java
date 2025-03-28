package com.olinykfs.eduPress.services.authServices;

import com.olinykfs.eduPress.config.security.JWTUtils;
import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.details.CustomUserDetails;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final UserRepository userRepository;

    public String authenticate(String email, String password) {
        logger.info("Attempting to authenticate user with email: {}", email);

        User user = userRepository.findByEmail(email);
        if (user == null) {
            logger.warn("User not found for email: {}", email);
            throw new GlobalExceptionHandler.UsernameNotFoundException("User not found for email: " + email);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            logger.warn("Invalid password for user with email: {}", email);
            throw new GlobalExceptionHandler.InvalidPasswordException("Invalid password");
        }

        logger.info("Successfully authenticated user with email: {}", email);
        return jwtUtils.generateToken(loadUserDetails(user.getEmail()), user.getId());
    }

    private CustomUserDetails loadUserDetails(String email) {
        return (CustomUserDetails) userDetailsService.loadUserByUsername(email);
    }
}
