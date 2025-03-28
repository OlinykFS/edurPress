package com.olinykfs.eduPress.services.courseServices;

import com.olinykfs.eduPress.services.storageServices.FirebaseStorageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class CourseStorageService {

    private final FirebaseStorageService firebaseStorageService;

    public String uploadCourseImage(MultipartFile image) {
        return image != null && !image.isEmpty() ? firebaseStorageService.uploadFile(image) : null;
    }

    public void deleteCourseImage(String imageUrl) {
        String fileName = extractFileName(imageUrl);
        if (fileName != null) {
            firebaseStorageService.deleteFile(fileName);
        }
    }

    private String extractFileName(String imageUrl) {
        return imageUrl != null && imageUrl.contains("courses/") ? imageUrl.substring(imageUrl.indexOf("courses/")) : null;
    }
}

