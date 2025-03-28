package com.olinykfs.eduPress.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ArticleCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long countOfArticles = 0L;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Article> articles;

    public void increaseCountOfArticles() {
        if (this.countOfArticles == null) {
            this.countOfArticles = 0L;
        }
        this.countOfArticles++;
    }

    public void decreaseCountOfArticles() {
        if (this.countOfArticles > 0) {
            this.countOfArticles--;
        }
    }
}

