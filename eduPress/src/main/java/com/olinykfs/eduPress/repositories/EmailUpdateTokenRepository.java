package com.olinykfs.eduPress.repositories;

import com.olinykfs.eduPress.entities.EmailUpdateToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailUpdateTokenRepository extends JpaRepository<EmailUpdateToken, Long> {
    Optional<EmailUpdateToken> findByToken(String token);
}
