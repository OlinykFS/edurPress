package com.olinykfs.eduPress.repositories;

import com.olinykfs.eduPress.entities.Tag;
import com.olinykfs.eduPress.entities.dto.articleDTOs.TagDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

}
