package com.olinykfs.eduPress.services.articleServices;

import com.olinykfs.eduPress.entities.Tag;
import com.olinykfs.eduPress.entities.dto.articleDTOs.TagDTO;
import com.olinykfs.eduPress.repositories.TagRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public List<TagDTO> getAllTags() {
        List<Tag> tags = tagRepository.findAll();
        return tags.stream()
                .map(tag -> new TagDTO(tag.getId(), tag.getName()))
                .collect(Collectors.toList());
    }

    public TagDTO addTag(TagDTO tagDTO) {
        Tag tag = tagRepository.save(new Tag(tagDTO.getName()));
        return new TagDTO(tag.getId(), tag.getName());
    }
}


