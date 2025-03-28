package com.olinykfs.eduPress.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String iconName;

    private Long countOfCourses = 0L;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courses = new ArrayList<>();

    public void incrementCountOfCourses() {
        if (this.countOfCourses == null) {
            this.countOfCourses = 0L;
        }
        this.countOfCourses++;
    }
    public void decrementCountOfCourses() {
        if (this.countOfCourses > 0) {
            this.countOfCourses--;
        }
    }
}
