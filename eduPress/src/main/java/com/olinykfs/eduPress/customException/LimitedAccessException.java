package com.olinykfs.eduPress.customException;

import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleLimitedDTO;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Getter

public class LimitedAccessException extends ResponseStatusException {

    private final List<ModuleLimitedDTO> limitedAccessModules;

    public LimitedAccessException(List<ModuleLimitedDTO> modules) {
        super(HttpStatus.PARTIAL_CONTENT, "Limited access to the course modules.");
        this.limitedAccessModules = modules;
    }
}
