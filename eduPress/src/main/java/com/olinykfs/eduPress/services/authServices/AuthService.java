package com.olinykfs.eduPress.services.authServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserLoginDTO;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserRegisterDTO;
import com.olinykfs.eduPress.services.userServices.UserAuthService;
import com.olinykfs.eduPress.config.security.JWTUtils;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Map;
import java.util.Optional;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationService authenticationService;
    private final UserAuthService userService;
    private final JWTUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    private static final String AUTH_COOKIE_NAME = "authToken";
    private static final String REFRESH_COOKIE_NAME = "refreshToken";
    private static final int THIRTY_DAYS = 30 * 24 * 60 * 60;

    public ResponseEntity<Map<String, String>> login(UserLoginDTO loginRequest, HttpServletResponse response) {
        try {
            String accessToken = authenticationService.authenticate(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );
            log.debug("Access token: {}", accessToken);
            log.info("User {} is attempting to log in", loginRequest.getEmail());

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            Long userId = userService.getUserIdByEmail(loginRequest.getEmail());
            String refreshToken = jwtUtils.generateRefreshToken(userDetails, userId);

            setAuthCookie(response, accessToken, loginRequest.isRememberMe());
            setRefreshCookie(response, refreshToken, loginRequest.isRememberMe());

            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } catch (GlobalExceptionHandler.UsernameNotFoundException ex) {
            log.error("User not found: {}", loginRequest.getEmail(), ex);
            return handleException(ex, "Invalid email", HttpStatus.NOT_FOUND);
        } catch (GlobalExceptionHandler.InvalidPasswordException ex) {
            log.error("Invalid password for user: {}", loginRequest.getEmail(), ex);
            return handleException(ex, "Invalid password", HttpStatus.UNAUTHORIZED);
        } catch (RuntimeException ex) {
            log.error("Unexpected error during login for user: {}", loginRequest.getEmail(), ex);
            return handleException(ex, "An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        removeAuthCookie(response);
        removeRefreshCookie(response);
        log.info("User logged out");
        return createMessageResponse("Successful logout", HttpStatus.OK);
    }

    public ResponseEntity<Map<String, String>> register(UserRegisterDTO registerRequest) {
        try {
            userService.registerUser(registerRequest);
            log.info("User registered: {}", registerRequest.getEmail());
            return createMessageResponse("Registration successful. Check your email to confirm your account.", HttpStatus.OK);
        } catch (GlobalExceptionHandler.UserAlreadyExistsException ex) {
            log.error("User already exists: {}", registerRequest.getEmail(), ex);
            return createMessageResponse(ex.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception ex) {
            log.error("Unexpected error during user registration: {}", registerRequest.getEmail(), ex);
            return createMessageResponse("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> confirmEmail(String token) {
        try {
            String confirmationResult = userService.confirmUserEmail(token);
            log.info("Email confirmed for token: {}", token);
            return ResponseEntity.ok(confirmationResult);
        } catch (GlobalExceptionHandler.InvalidTokenException ex) {
            log.error("Invalid or expired token: {}", token, ex);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
        }
    }

    public ResponseEntity<Map<String, String>> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        Optional<String> refreshTokenOpt = extractCookieValue(request, REFRESH_COOKIE_NAME);

        if (refreshTokenOpt.isEmpty()) {
            log.warn("User attempted token refresh, but token is missing");
            logout(response);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Refresh token missing"));
        }

        String refreshToken = refreshTokenOpt.get();
        try {
            Optional<String> usernameOpt = jwtUtils.extractUsername(refreshToken);
            if (usernameOpt.isEmpty()) {
                log.warn("Failed to extract username from refresh token");
                clearCookie(response, REFRESH_COOKIE_NAME);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid refresh token"));
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(usernameOpt.get());
            if (!jwtUtils.isTokenValid(refreshToken, userDetails)) {
                log.warn("Invalid refresh token for user {}", usernameOpt.get());
                clearCookie(response, REFRESH_COOKIE_NAME);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid refresh token"));
            }

            Long userId = jwtUtils.extractUserId(refreshToken);
            String newAccessToken = jwtUtils.generateToken(userDetails, userId);
            String newRefreshToken = jwtUtils.generateRefreshToken(userDetails, userId);

            setAuthCookie(response, newAccessToken, true);
            setRefreshCookie(response, newRefreshToken, true);

            log.info("Token refreshed for user {}", usernameOpt.get());
            return ResponseEntity.ok(Map.of("message", "Token refreshed"));
        } catch (JwtException | GlobalExceptionHandler.InvalidTokenException e) {
            log.error("Error refreshing token: {}", e.getMessage(), e);
            clearCookie(response, REFRESH_COOKIE_NAME);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid refresh token"));
        }
    }

    private Optional<String> extractCookieValue(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return Optional.empty();
        }
        return Arrays.stream(cookies)
                .filter(cookie -> cookieName.equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue);
    }

    public void setAuthCookie(HttpServletResponse response, String token, boolean rememberMe) {
        Cookie authCookie = new Cookie(AUTH_COOKIE_NAME, token);
        authCookie.setHttpOnly(true);
        authCookie.setSecure(true);
        authCookie.setPath("/");
        authCookie.setMaxAge(rememberMe ? THIRTY_DAYS : -1);
        authCookie.setAttribute("SameSite", "None");
        response.addCookie(authCookie);
    }

    public void setRefreshCookie(HttpServletResponse response, String refreshToken, boolean rememberMe) {
        Cookie refreshCookie = new Cookie(REFRESH_COOKIE_NAME, refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(rememberMe ? THIRTY_DAYS : -1);
        refreshCookie.setAttribute("SameSite", "None");
        response.addCookie(refreshCookie);
    }

    public void removeAuthCookie(HttpServletResponse response) {
        clearCookie(response, AUTH_COOKIE_NAME);
    }

    public void removeRefreshCookie(HttpServletResponse response) {
        clearCookie(response, REFRESH_COOKIE_NAME);
    }

    private void clearCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", "None");

        response.addCookie(cookie);
    }


    private ResponseEntity<Map<String, String>> createMessageResponse(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private ResponseEntity<Map<String, String>> handleException(Exception ex, String message, HttpStatus status) {
        return createMessageResponse(message, status);
    }
}
