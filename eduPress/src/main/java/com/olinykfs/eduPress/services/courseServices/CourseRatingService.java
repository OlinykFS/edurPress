package com.olinykfs.eduPress.services.courseServices;

import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.CourseRating;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseRatingDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseRatingPostDTO;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRatingRepository;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CourseRatingService {

    private final CourseRepository courseRepository;
    private final CourseRatingRepository courseRatingRepository;
    private final UserRepository userRepository;

    @Transactional
    public void rateCourse(CourseRatingPostDTO courseRatingPostDTO, Long userId) {
        if (courseRatingPostDTO.getRating() < 0 || courseRatingPostDTO.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }

        Course course = courseRepository.findById(courseRatingPostDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CourseRating courseRating = courseRatingRepository.findByCourseAndUser(course, user);
        if (courseRating == null) {
            courseRating = new CourseRating();
            courseRating.setCourse(course);
            courseRating.setUser(user);
        }
        courseRating.setRating(courseRatingPostDTO.getRating());
        courseRatingRepository.save(courseRating);

        updateCourseAverageRating(course);
    }

    @Transactional(readOnly = true)
    public CourseRatingDTO getCourseRatingDTO(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Double average = courseRatingRepository.findAverageRatingByCourseId(courseId);
        average = (average != null) ? average : 0.0;
        Long totalRatings = courseRatingRepository.countByCourse(course);
        List<Object[]> rawCounts = courseRatingRepository.getRatingCountsByCourseId(courseId);
        return getCourseRatingDTO(rawCounts, average, totalRatings);
    }

    @Transactional
    public void updateCourseAverageRating(Course course) {
        Double average = courseRatingRepository.findAverageRatingByCourseId(course.getId());
        course.setAverageRating(average != null ? average : 0.0);
        courseRepository.save(course);
    }

    private static CourseRatingDTO getCourseRatingDTO(List<Object[]> rawCounts, Double average, Long totalRatings) {
        Map<Integer, Long> ratingCounts = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            ratingCounts.put(i, 0L);
        }
        for (Object[] row : rawCounts) {
            Integer rating = (Integer) row[0];
            Long count = (Long) row[1];
            ratingCounts.put(rating, count);
        }

        CourseRatingDTO dto = new CourseRatingDTO();
        dto.setAverageRating(average);
        dto.setTotalRatings(totalRatings);
        dto.setRatingCounts(ratingCounts);
        return dto;
    }
}
