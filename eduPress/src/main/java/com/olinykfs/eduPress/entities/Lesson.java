package com.olinykfs.eduPress.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "lessons")
@Getter
@Setter
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lessonId;

    private String title;
    private String description;


    private String videoUrl;
    private String duration;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "lesson_requirements", joinColumns = @JoinColumn(name = "lesson_id"))
    @Column(name = "requirement")
    private List<String> requirements;

    @Column(name = "lesson_order")
    private Long lessonOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;
}