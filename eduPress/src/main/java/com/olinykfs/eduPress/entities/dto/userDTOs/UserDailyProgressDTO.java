package com.olinykfs.eduPress.entities.dto.userDTOs;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class UserDailyProgressDTO {
    private LocalDate date;
    private int lessonCompletions;
    private int moduleCompletions;
    private int courseCompletions;
    private int totalCompletions;
}