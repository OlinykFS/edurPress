package com.olinykfs.eduPress.repositories;

import com.olinykfs.eduPress.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
