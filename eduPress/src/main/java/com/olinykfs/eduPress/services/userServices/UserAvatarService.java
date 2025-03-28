package com.olinykfs.eduPress.services.userServices;

import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.storageServices.FirebaseStorageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserAvatarService {

    private final UserRepository userRepository;
    private final FirebaseStorageService firebaseStorageService;

    public String uploadAvatar(MultipartFile file, Long userId) throws Exception {
        String avatarUrl = firebaseStorageService.uploadUserAvatar(file);

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setAvatarUrl(avatarUrl);
            userRepository.save(user);
            return avatarUrl;
        }
        throw new Exception("User not found with ID: " + userId);
    }

    public void deleteAvatar(String fileName) throws Exception {
        firebaseStorageService.deleteFile(fileName);
    }
}
