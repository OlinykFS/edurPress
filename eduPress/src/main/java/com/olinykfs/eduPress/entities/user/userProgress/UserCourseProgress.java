package com.olinykfs.eduPress.entities.user.userProgress;


import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_course_progress")
@Data
@NoArgsConstructor
public class UserCourseProgress implements ProgressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private int progressPercentage;

    private boolean completed;

    private LocalDateTime updatedAt;
}

