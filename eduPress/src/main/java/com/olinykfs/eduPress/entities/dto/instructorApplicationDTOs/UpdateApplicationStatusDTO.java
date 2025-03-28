package com.olinykfs.eduPress.entities.dto.instructorApplicationDTOs;

import com.olinykfs.eduPress.entities.enums.ApplicationStatus;
import lombok.Data;

@Data
public class UpdateApplicationStatusDTO {
    private Long applicationId;
    private ApplicationStatus status;
}
