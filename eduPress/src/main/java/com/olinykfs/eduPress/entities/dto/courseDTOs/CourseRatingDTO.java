package com.olinykfs.eduPress.entities.dto.courseDTOs;

import lombok.Data;
import java.util.Map;

@Data
public class CourseRatingDTO {
    private double averageRating;
    private long totalRatings;
    private Map<Integer, Long> ratingCounts;
}
