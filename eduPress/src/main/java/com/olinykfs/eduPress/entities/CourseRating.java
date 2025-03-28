package com.olinykfs.eduPress.entities;

import com.olinykfs.eduPress.entities.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_ratings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
