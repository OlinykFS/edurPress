package com.olinykfs.eduPress.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "course_overviews")
@Getter
@Setter
public class CourseOverview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(length = 5000)
    private String certification;

    @ElementCollection
    @CollectionTable(name = "course_learning_outcomes", joinColumns = @JoinColumn(name = "course_overview_id"))
    @Column(name = "outcome")
    private Set<String> learningOutcomes;

    @ElementCollection
    @CollectionTable(name = "course_requirements", joinColumns = @JoinColumn(name = "course_overview_id"))
    @Column(name = "requirement")
    private Set<String> requirements;

    @ElementCollection
    @CollectionTable(name = "course_features", joinColumns = @JoinColumn(name = "course_overview_id"))
    @Column(name = "feature")
    private Set<String> features;

    @ElementCollection
    @CollectionTable(name = "course_target_audience", joinColumns = @JoinColumn(name = "course_overview_id"))
    @Column(name = "audience")
    private Set<String> targetAudience;
}