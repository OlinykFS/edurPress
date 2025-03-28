package com.olinykfs.eduPress.entities;

import com.olinykfs.eduPress.entities.enums.SocialMediaType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "social_media")
@Getter
@Setter
public class SocialMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SocialMediaType name;
    private String link;
}
