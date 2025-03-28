package com.olinykfs.eduPress.repositories;

import com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleLimitedDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.olinykfs.eduPress.entities.Module;
import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    @EntityGraph(attributePaths = {"lessons"})
    List<Module> findByCourseId(Long courseId);


    @Query("SELECT new com.olinykfs.eduPress.entities.dto.moduleDTOs.ModuleLimitedDTO(" +
            "m.id, m.title, m.duration, m.lessonsCount) " +
            "FROM Module m WHERE m.course.id = :courseId")
    List<ModuleLimitedDTO> findAllLimitedByCourseId(Long courseId);

    @Query("SELECT m FROM Module m LEFT JOIN FETCH m.lessons WHERE m.course.id = :courseId ORDER BY m.moduleOrder ASC")
    List<Module> findByCourseIdOrderByModuleOrderAscWithLessons(Long courseId);
}


