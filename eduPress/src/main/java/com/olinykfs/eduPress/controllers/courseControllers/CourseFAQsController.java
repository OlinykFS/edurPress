package com.olinykfs.eduPress.controllers.courseControllers;

import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseFAQsCreateDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseFAQsDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseFAQsUpdateDTO;
import com.olinykfs.eduPress.services.courseServices.CourseFAQsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses/faqs")
@AllArgsConstructor
public class CourseFAQsController {

    private final CourseFAQsService courseFAQsService;

    @GetMapping("/{courseId}")
    public ResponseEntity<List<CourseFAQsDTO>> getCourseFAQs(@PathVariable Long courseId) {
        List<CourseFAQsDTO> faqs = courseFAQsService.findAllByCourseId(courseId);
        return ResponseEntity.ok(faqs);
    }

    @PostMapping
    public ResponseEntity<CourseFAQsDTO> addCourseFAQs(@RequestBody CourseFAQsCreateDTO courseFAQsCreateDTO) {
        CourseFAQsDTO faq = courseFAQsService.create(courseFAQsCreateDTO);
        return ResponseEntity.ok(faq);
    }

    @PatchMapping
    public ResponseEntity<CourseFAQsDTO> updateCourseFAQs(@RequestBody CourseFAQsUpdateDTO courseFAQsUpdateDTO) {
        CourseFAQsDTO updatedFaq = courseFAQsService.updateCourseFAQs(courseFAQsUpdateDTO);
        return ResponseEntity.ok(updatedFaq);
    }

    @DeleteMapping("/{faqId}")
    public ResponseEntity<Void> deleteFAQ(@PathVariable Long faqId) {
        courseFAQsService.deleteFAQ(faqId);
        return ResponseEntity.ok().build();
    }
}