package com.olinykfs.eduPress.entities.dto.instructorDTOs;

import com.olinykfs.eduPress.entities.enums.SocialMediaType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocialMediaDTO {
    private SocialMediaType name;
    private String link;
}
