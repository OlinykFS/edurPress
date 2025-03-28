package com.olinykfs.eduPress.entities.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.SocialMedia;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "instructors")
@Getter
@Setter
@JsonIgnoreProperties("user")
public class Instructor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "instructor")
    private User user;

    private String firstName;
    private String lastName;

    @Column(length = 500)
    private String bio;

    private String specialization;
    private int age;

    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Course> courses = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "instructor_id")
    private Set<SocialMedia> socialMedia;

    public String getFullName() {
        return firstName + " " + lastName;
    }
}

