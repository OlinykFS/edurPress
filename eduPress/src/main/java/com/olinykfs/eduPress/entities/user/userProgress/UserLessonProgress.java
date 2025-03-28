package com.olinykfs.eduPress.entities.user.userProgress;

import com.olinykfs.eduPress.entities.Lesson;
import com.olinykfs.eduPress.entities.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_lesson_progress")
@Data
@NoArgsConstructor
public class UserLessonProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    private int progressPercentage;

    private boolean completed;

    private LocalDateTime completedAt;
}

