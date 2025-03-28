package com.olinykfs.eduPress.entities.dto.courseDTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseFAQsUpdateDTO {
    private Long id;
    @NotNull(message = "Course ID must not be null")
    private Long courseId;

    @NotBlank(message = "Question must not be empty")
    private String question;

    @NotBlank(message = "Answer must not be empty")
    private String answer;
}
