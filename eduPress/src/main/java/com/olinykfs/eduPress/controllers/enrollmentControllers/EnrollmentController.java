package com.olinykfs.eduPress.controllers.enrollmentControllers;

import com.olinykfs.eduPress.services.CheckCourseAccess;
import com.olinykfs.eduPress.services.enrollmentServices.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final CheckCourseAccess checkCourseAccess;

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<Map<String, Object>> enrollUser(@PathVariable Long courseId) {
        Long userId = checkCourseAccess.getCurrentUserIdOrNull();
        String message = enrollmentService.enrollUser(userId, courseId);

        Map<String, Object> response = Map.of(
                "status", HttpStatus.ACCEPTED.value(),
                "message", message
        );

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }


    @GetMapping("/access")
    public ResponseEntity<Boolean> checkAccess(@RequestParam Long courseId) {
        Long userId = checkCourseAccess.getCurrentUserIdOrNull();
        boolean hasAccess = enrollmentService.checkAccess(userId, courseId);
        return ResponseEntity.ok(hasAccess);
    }

    @PostMapping("/pay")
    public ResponseEntity<String> completePayment(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long courseId = Long.valueOf(request.get("courseId").toString());
        String paymentReference = (String) request.get("paymentReference");

        String message = enrollmentService.completePayment(userId, courseId, paymentReference);
        return ResponseEntity.ok(message);
    }
}
