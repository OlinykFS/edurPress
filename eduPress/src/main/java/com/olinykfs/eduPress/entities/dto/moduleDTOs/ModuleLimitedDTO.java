package com.olinykfs.eduPress.entities.dto.moduleDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModuleLimitedDTO {
    private Long id;
    private String title;
    private String duration;
    private int lessonsCount;
}
