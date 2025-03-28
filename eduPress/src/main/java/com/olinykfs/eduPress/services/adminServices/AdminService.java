package com.olinykfs.eduPress.services.adminServices;

import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserResponseDTO;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final GenericDTOConverter genericDTOConverter;

    public void deleteUser(Long userId) {
            userRepository.deleteById(userId);
    }

    public List<UserResponseDTO> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> genericDTOConverter.convertToDTO(user, UserResponseDTO.class))
                .collect(Collectors.toList());
    }

}