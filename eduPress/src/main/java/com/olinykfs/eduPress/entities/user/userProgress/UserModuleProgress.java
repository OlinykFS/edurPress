package com.olinykfs.eduPress.entities.user.userProgress;

import com.olinykfs.eduPress.entities.Module;
import com.olinykfs.eduPress.entities.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_module_progress")
@Data
@NoArgsConstructor
public class UserModuleProgress implements ProgressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;


    private int progressPercentage;

    private boolean completed;

    private LocalDateTime updatedAt;
}

