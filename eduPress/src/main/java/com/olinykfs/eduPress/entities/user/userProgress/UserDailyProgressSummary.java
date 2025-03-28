package com.olinykfs.eduPress.entities.user.userProgress;

import com.olinykfs.eduPress.entities.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "user_daily_progress_summary")
@Data
@NoArgsConstructor
public class UserDailyProgressSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    private int lessonCompletions = 0;
    private int courseCompletions = 0;
    private int moduleCompletions = 0;

    @Column(nullable = false)
    private int totalCompletions = 0;
}