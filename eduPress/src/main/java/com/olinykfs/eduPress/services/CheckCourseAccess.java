package com.olinykfs.eduPress.services;

import com.olinykfs.eduPress.details.CustomUserDetails;
import com.olinykfs.eduPress.services.enrollmentServices.EnrollmentService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckCourseAccess {

    private final EnrollmentService enrollmentService;

    public boolean checkCourseAccess(Long courseId) {
        Long userId = getCurrentUserIdOrNull();
        if (userId == null) {
            log.warn("No authentication present. Access denied for course ID: {}", courseId);
            return false;
        }

        boolean hasAccess = enrollmentService.hasAccessToCourse(userId, courseId);
        if (!hasAccess) {
            log.warn("Access denied for user ID: {} to course ID: {}", userId, courseId);
        } else {
            log.debug("Access granted for user ID: {} to course ID: {}", userId, courseId);
        }
        return hasAccess;
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedAccessException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails)) {
            throw new UnauthorizedAccessException("Invalid principal type");
        }

        return ((CustomUserDetails) principal).getId();
    }

    public Long getCurrentUserIdOrNull() {
        try {
            return getCurrentUserId();
        } catch (UnauthorizedAccessException ex) {
            return null;
        }
    }

    public static class UnauthorizedAccessException extends RuntimeException {
        public UnauthorizedAccessException(String message) {
            super(message);
        }
    }

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CheckCourseAccess.class);
}