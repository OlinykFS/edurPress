package com.olinykfs.eduPress.repositories.userRepository;

import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT new com.olinykfs.eduPress.entities.dto.userDTOs.UserResponseDTO( " +
            "u.id, u.username, u.email, u.role, u.emailVerified, u.avatarUrl, u.joinDate, u.userBio) " +
            "FROM User u WHERE u.id = :userId")
    Optional<UserResponseDTO> findUserWithoutInstructor(@Param("userId") Long userId);

}
