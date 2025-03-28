package com.olinykfs.eduPress.controllers.authControllers;

import com.olinykfs.eduPress.entities.dto.userDTOs.UserLoginDTO;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserRegisterDTO;
import com.olinykfs.eduPress.services.authServices.AuthService;
import com.olinykfs.eduPress.services.emailServices.EmailUpdateService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailUpdateService emailUpdateService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @Valid @RequestBody UserLoginDTO loginRequest,
            HttpServletResponse response) {
        return authService.login(loginRequest, response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        return authService.logout(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(
            @Valid @RequestBody UserRegisterDTO registerRequest) {
        return authService.register(registerRequest);
    }

    @GetMapping("/confirm-email")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String token) {
        return authService.confirmEmail(token);
    }

    @GetMapping("/confirm-new-email/{token}")
    public ResponseEntity<Map<String, String>> confirmNewEmail(@PathVariable("token") String token, HttpServletResponse response) {
        return emailUpdateService.confirmNewEmail(token, response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(
            HttpServletRequest request, HttpServletResponse response) {
        return authService.refreshToken(request, response);
    }
}
