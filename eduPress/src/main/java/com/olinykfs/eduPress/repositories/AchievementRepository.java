package com.olinykfs.eduPress.repositories;

import com.olinykfs.eduPress.entities.user.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    Optional<Achievement> findByUserIdAndName(Long userId, String name);

    List<Achievement> findAllByUserId(Long userId);
}
