package com.olinykfs.eduPress.repositories.userProgressRepository;

import com.olinykfs.eduPress.entities.user.userProgress.UserDailyProgressSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserDailyProgressSummaryRepository extends JpaRepository<UserDailyProgressSummary, Long> {
    Optional<UserDailyProgressSummary> findByUserIdAndDate(Long userId, LocalDate date);

    @Query("SELECT udp FROM UserDailyProgressSummary udp WHERE udp.user.id = :userId ORDER BY udp.date ASC")
    List<UserDailyProgressSummary> findAllByUserIdOrderByDateAsc(@Param("userId") Long userId);
}