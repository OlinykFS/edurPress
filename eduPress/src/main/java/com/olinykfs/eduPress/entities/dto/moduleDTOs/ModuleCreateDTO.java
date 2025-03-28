package com.olinykfs.eduPress.entities.dto.moduleDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ModuleCreateDTO {
    private String title;
    private String description;
    private String duration;
    private Long moduleOrder;
    private Long courseId;
}
