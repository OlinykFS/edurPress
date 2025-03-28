package com.olinykfs.eduPress.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
@AllArgsConstructor
@Slf4j
public class GenericDTOConverter {

    private final ModelMapper modelMapper;

    public <E, D> D convertToDTO(E entity, Class<D> dtoClass) {
        return modelMapper.map(entity, dtoClass);
    }

    public <E, D> E convertToEntity(D dto, Class<E> entityClass) {
        return modelMapper.map(dto, entityClass);
    }

    public <E, D> D convertToDTO(E entity, Class<D> dtoClass, Consumer<ModelMapper> config) {
        ModelMapper localMapper = new ModelMapper();
        config.accept(localMapper);
        return localMapper.map(entity, dtoClass);
    }
}
