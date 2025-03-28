package com.olinykfs.eduPress.services.enrollmentServices;

import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.user.Enrollment;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.enums.EnrollmentStatus;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.repositories.EnrollmentRepository;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public boolean isUserEnrolledInCourse(Long userId, Long courseId) {
        return enrollmentRepository.existsByUser_IdAndCourse_IdAndEnrollmentStatus(userId, courseId, EnrollmentStatus.ACTIVE);
    }

    public boolean hasPendingPaymentForCourse(Long userId, Long courseId) {
        return enrollmentRepository.existsByUser_IdAndCourse_IdAndEnrollmentStatus(userId, courseId, EnrollmentStatus.PENDING_PAYMENT);
    }

    public String enrollUser(Long userId, Long courseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.findByUser_IdAndCourse_Id(userId, courseId).isPresent()) {
            return "User already enrolled in the course.";
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDateTime.now());

        if (course.isFreeCourse()) {
            enrollment.setEnrollmentStatus(EnrollmentStatus.ACTIVE);
            course.incrementNumberOfStudents();
            courseRepository.save(course);
        } else {
            enrollment.setEnrollmentStatus(EnrollmentStatus.PENDING_PAYMENT);
        }

        enrollmentRepository.save(enrollment);

        return course.isFreeCourse() ? "User successfully enrolled in the course." :
                "Enrollment created. Please proceed with payment.";
    }

    public boolean checkAccess(Long userId, Long courseId) {
        Enrollment enrollment = enrollmentRepository.findByUser_IdAndCourse_Id(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        return EnrollmentStatus.ACTIVE.equals(enrollment.getEnrollmentStatus());
    }

    public String completePayment(Long userId, Long courseId, String paymentReference) {
        Enrollment enrollment = enrollmentRepository.findByUser_IdAndCourse_Id(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        if (EnrollmentStatus.ACTIVE.equals(enrollment.getEnrollmentStatus())) {
            return "Payment already completed.";
        }

        if (!EnrollmentStatus.PENDING_PAYMENT.equals(enrollment.getEnrollmentStatus())) {
            throw new RuntimeException("Invalid enrollment status.");
        }

        enrollment.setEnrollmentStatus(EnrollmentStatus.ACTIVE);
        enrollment.setPaymentReference(paymentReference);
        enrollmentRepository.save(enrollment);

        Course course = enrollment.getCourse();
        course.incrementNumberOfStudents();
        courseRepository.save(course);

        return "Payment successful. Access granted to the course.";
    }

    public boolean hasAccessToCourse(Long userId, Long courseId) {
        return enrollmentRepository.existsByUser_IdAndCourse_IdAndEnrollmentStatus(userId, courseId, EnrollmentStatus.ACTIVE);
    }
}

