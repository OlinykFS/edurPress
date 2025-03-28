package com.olinykfs.eduPress.entities.dto.moduleDTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleUpdateDTO {
    private Long id;
    private String title;
    private String description;
    private Long moduleOrder;
    private String duration;
}
