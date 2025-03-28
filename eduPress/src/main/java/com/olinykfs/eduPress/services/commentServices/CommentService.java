package com.olinykfs.eduPress.services.commentServices;

import com.olinykfs.eduPress.details.CustomUserDetails;
import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.CourseComment;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.dto.commentDTOs.CommentCreateDTO;
import com.olinykfs.eduPress.entities.dto.commentDTOs.CommentResponseDTO;
import com.olinykfs.eduPress.repositories.courseRepository.CourseCommentRepository;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentService {

    private final CourseCommentRepository courseCommentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final GenericDTOConverter genericDTOConverter;


    @CacheEvict(value = "comments", allEntries = true)
    public CommentResponseDTO handleAddComment(CommentCreateDTO commentDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        User student = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Course course = courseRepository.findById(commentDTO.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));

        CourseComment comment = genericDTOConverter.convertToEntity(commentDTO, CourseComment.class);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setStudent(student);
        comment.setCourse(course);

        courseCommentRepository.save(comment);
        return genericDTOConverter.convertToDTO(comment, CommentResponseDTO.class);
    }

    @Cacheable(value = "comments", key = "#studentId")
    public List<CommentResponseDTO> getCommentsByStudentId(Long studentId) {
        List<CourseComment> comments = courseCommentRepository.findByStudentId(studentId);
        return comments.stream()
                .map(comment -> genericDTOConverter.convertToDTO(comment, CommentResponseDTO.class))
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "comments", allEntries = true)
    public void deleteCommentById(Long commentId) {
        courseCommentRepository.deleteById(commentId);
    }

    @Cacheable(value = "courseComments", key = "{#courseId, #pageable.pageNumber, #pageable.pageSize}")
    public Page<CommentResponseDTO> getCommentsByCourseIdWithDetails(Pageable pageable, Long courseId) {
        Page<CourseComment> comments = courseCommentRepository.findByCourseId(pageable, courseId);
        return comments.map(comment -> genericDTOConverter.convertToDTO(comment, CommentResponseDTO.class));
    }
}
