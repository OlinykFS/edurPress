package com.olinykfs.eduPress.services.storageServices;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
public class FIreBaseStorageServiceImpl implements FirebaseStorageService {


    @Value("${fire.base.bucket.name}")
    private String BUCKET_NAME;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            String fileName = "courses/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);
            Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

            return blob.signUrl(365, TimeUnit.DAYS).toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    @Override
    public void deleteFile(String fileName) {
        try {
            Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);
            Blob blob = bucket.get(fileName);

            if (blob == null || !blob.delete()) {
                throw new RuntimeException("Failed to delete file. File not found: " + fileName);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete file: " + fileName, e);
        }
    }

    @Override
    public String uploadUserAvatar(MultipartFile file) {
        try {
            String fileName = "user/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Bucket bucket = StorageClient.getInstance().bucket(BUCKET_NAME);
            Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

            return blob.signUrl(365, TimeUnit.DAYS).toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }
}
