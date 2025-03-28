package com.olinykfs.eduPress.entities.user;

import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.enums.EnrollmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "enrollments")
@Getter
@Setter
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Enumerated(EnumType.STRING)
    private EnrollmentStatus enrollmentStatus;

    @Column(name = "payment_reference")
    private String paymentReference;

    @Column(name = "enrollment_date", nullable = false)
    private java.time.LocalDateTime enrollmentDate;

}
