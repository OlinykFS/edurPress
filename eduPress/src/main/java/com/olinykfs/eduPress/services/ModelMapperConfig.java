package com.olinykfs.eduPress.services;

import com.olinykfs.eduPress.entities.*;
import com.olinykfs.eduPress.entities.Module;
import com.olinykfs.eduPress.entities.dto.articleDTOs.CreateArticleDTO;
import com.olinykfs.eduPress.entities.dto.articleDTOs.ResponseArticleDTO;
import com.olinykfs.eduPress.entities.dto.articleDTOs.TagDTO;
import com.olinykfs.eduPress.entities.dto.commentDTOs.CommentResponseDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseOverviewDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseResponseDTO;
import com.olinykfs.eduPress.entities.dto.instructorDTOs.InstructorInfoDTO;
import com.olinykfs.eduPress.entities.dto.instructorDTOs.SocialMediaDTO;
import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonCreateDTO;
import com.olinykfs.eduPress.entities.dto.lessonDTOs.LessonResponseDTO;
import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleResponseDTO;
import com.olinykfs.eduPress.entities.dto.userDTOs.UserAchievementDTO;
import com.olinykfs.eduPress.entities.enums.Difficult;
import com.olinykfs.eduPress.entities.user.Achievement;
import com.olinykfs.eduPress.entities.user.Instructor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
@AllArgsConstructor
@Slf4j
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        final ModelMapper modelMapper = new ModelMapper();

        modelMapper.addMappings(new PropertyMap<CreateArticleDTO, Article>() {
            @Override
            protected void configure() {
                skip(destination.getCategory());
                skip(destination.getTags());
            }
        });

        modelMapper.addMappings(new PropertyMap<Article, ResponseArticleDTO>() {
            @Override
            protected void configure() {
                using(ctx -> ctx.getSource() == null
                        ? ""
                        : ((ArticleCategory) ctx.getSource()).getName())
                        .map(source.getCategory(), destination.getCategory());

                using(ctx -> {
                    Object src = ctx.getSource();
                    if (src instanceof Set<?>) {
                        return ((Set<?>) src).stream()
                                .map(Tag.class::cast)
                                .map(tag -> new TagDTO(tag.getId(), tag.getName()))
                                .collect(Collectors.toList());
                    }
                    return Collections.emptyList();
                }).map(source.getTags(), destination.getTags());
            }
        });

        modelMapper.addMappings(new PropertyMap<LessonCreateDTO, Lesson>() {
            @Override
            protected void configure() {
                skip(destination.getLessonId());
                map(source.getTitle(), destination.getTitle());
                map(source.getDescription(), destination.getDescription());
                map(source.getVideoUrl(), destination.getVideoUrl());
                map(source.getLessonOrder(), destination.getLessonOrder());
            }
        });

        modelMapper.addMappings(new PropertyMap<Lesson, LessonResponseDTO>() {
            @Override
            protected void configure() {
                map(source.getTitle(), destination.getTitle());
                map(source.getDescription(), destination.getDescription());
                map(source.getVideoUrl(), destination.getVideoUrl());
                map(source.getModule().getId(), destination.getModuleId());
            }
        });

        modelMapper.addMappings(new PropertyMap<Module, ModuleResponseDTO>() {
            @Override
            protected void configure() {
                map(source.getTitle(), destination.getTitle());
                map(source.getCourse().getId(), destination.getCourseId());
                map(source.getDuration(), destination.getDuration());
                map(source.getDescription(), destination.getDescription());
                map(source.getLessonsCount(), destination.getLessonsCount());
            }
        });

        modelMapper.addMappings(new PropertyMap<SocialMedia, SocialMediaDTO>() {
            @Override
            protected void configure() {
                map().setName(source.getName());
                map().setLink(source.getLink());
            }
        });


        modelMapper.addMappings(new PropertyMap<SocialMediaDTO, SocialMedia>() {
            @Override
            protected void configure() {
                map().setName(source.getName());
                map().setLink(source.getLink());
            }
        });

        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.addConverter((Converter<Difficult, String>) context -> {
            Difficult source = context.getSource();
            return source == null ? null : source.name().toLowerCase();
        });



        modelMapper.addConverter((Converter<String, Difficult>) context -> {
            String source = context.getSource();
            if (source == null || source.trim().isEmpty()) {
                return null;
            }
            try {
                return Difficult.valueOf(source.trim().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Bad type for course difficult " + source, e);
            }
        });

        modelMapper.addMappings(new PropertyMap<Course, CourseResponseDTO>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getId());
                map(source.getTitle(), destination.getTitle());
                map(source.getDescription(), destination.getDescription());
                map(source.getDuration(), destination.getDuration());
                map(source.getPrice(), destination.getPrice());
                map(source.getDiscount(), destination.getDiscount());
                map(source.getAverageRating(), destination.getAverageRating());
                map(source.isFreeCourse(), destination.isFreeCourse());
                map(source.getImageUrl(), destination.getImageUrl());
                map(source.getInstructor().getFullName(), destination.getInstructorName());
                map(source.getInstructor().getId(), destination.getInstructorId());
                map(source.getCategory().getName(), destination.getCategoryName());
                map(source.getNumberOfStudents(), destination.getStudentsCount());
                map(source.getModulesCount(), destination.getModulesCount());
                map(source.getDifficulty(), destination.getDifficulty());
            }
        });

        modelMapper.addMappings(new PropertyMap<CourseOverview, CourseOverviewDTO>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getId());
                map(source.getCourse().getTitle(), destination.getName());
                map(source.getCourse().getDescription(), destination.getDescription());
                map(source.getCertification(), destination.getCertification());
                map(source.getLearningOutcomes(), destination.getLearningOutcomes());
                map(source.getRequirements(), destination.getRequirements());
                map(source.getFeatures(), destination.getFeatures());
                map(source.getTargetAudience(), destination.getTargetAudience());
            }
        });
        modelMapper.addMappings(new PropertyMap<Instructor, InstructorInfoDTO>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getId());
                map(source.getFullName(), destination.getUsername());
                map(source.getUser().getEmail(), destination.getEmail());
                map(source.getSpecialization(), destination.getSpecialization());

            }
        });
        modelMapper.addMappings(new PropertyMap<CourseComment, CommentResponseDTO>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getId());
                map(source.getContent(), destination.getContent());
                map(source.getCreatedAt(), destination.getCreatedAt());

                map(source.getStudent().getUsername(), destination.getStudentUsername());
                map(source.getStudent().getAvatarUrl(), destination.getStudentAvatarUrl());
                map(source.getCourse().getId(), destination.getCourseId());
                map(source.getCourse().getTitle(), destination.getCourseTitle());

            }
        });
        modelMapper.addMappings(new PropertyMap<Achievement, UserAchievementDTO>() {
            @Override
            protected void configure() {
                map(source.getId(), destination.getAchievementId());
                map(source.getUser().getId(), destination.getUserId());
            }
        });
        modelMapper.getConfiguration()
                .setAmbiguityIgnored(true)
                .setSkipNullEnabled(true);

        return modelMapper;
    }
}
