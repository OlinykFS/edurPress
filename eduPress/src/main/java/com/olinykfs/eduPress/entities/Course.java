package com.olinykfs.eduPress.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.olinykfs.eduPress.entities.user.Enrollment;
import com.olinykfs.eduPress.entities.user.Instructor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.olinykfs.eduPress.entities.enums.Difficult;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "courses")
@Getter
@Setter

public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    private String duration;

    @Column(name = "image_url", length = 1024)
    private String imageUrl;

    private double price;
    private double discount;
    private double averageRating;
    private boolean freeCourse;

    private int modulesCount;
    private int numberOfStudents;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty")
    private Difficult difficulty;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<FAQs> faqs;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Module> modules = new ArrayList<>();

    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private CourseOverview overview;

    public void incrementNumberOfStudents() {
        this.numberOfStudents++;
    }

    public void increaseCountOfModules() {
        this.modulesCount++;
    }
    public void decreaseCountOfModules() {
        if (this.modulesCount > 0) {
            this.modulesCount--;
        }
    }
}