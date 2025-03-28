package com.olinykfs.eduPress.services.storageServices;


import org.springframework.web.multipart.MultipartFile;

public interface FirebaseStorageService  {
    String uploadFile(MultipartFile file);
    void deleteFile(String fileName);
    String uploadUserAvatar(MultipartFile file);

}
