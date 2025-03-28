package com.olinykfs.eduPress.services.courseServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.entities.Course;
import com.olinykfs.eduPress.entities.FAQs;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseFAQsCreateDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseFAQsDTO;
import com.olinykfs.eduPress.entities.dto.courseDTOs.CourseFAQsUpdateDTO;
import com.olinykfs.eduPress.repositories.courseRepository.CourseRepository;
import com.olinykfs.eduPress.repositories.courseRepository.FAQsRepository;
import com.olinykfs.eduPress.services.GenericDTOConverter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CourseFAQsService {

    private final FAQsRepository faqsRepository;
    private final GenericDTOConverter genericDTOConverter;
    private final CourseRepository courseRepository;


    @Transactional(readOnly = true)
    public List<CourseFAQsDTO> findAllByCourseId(Long courseId) {
        courseRepository.findById(courseId).orElseThrow(() -> new GlobalExceptionHandler.CourseNotFoundException("Course not found with ID: " + courseId));

        List<FAQs> faqsList = faqsRepository.findAllByCourse_Id(courseId);
        return faqsList.stream()
                .map(faq -> genericDTOConverter.convertToDTO(faq, CourseFAQsDTO.class))
                .collect(Collectors.toList());
    }


    @Transactional
    public CourseFAQsDTO create(CourseFAQsCreateDTO courseFAQsCreateDTO) {
        Course course = courseRepository.findById(courseFAQsCreateDTO.getCourseId())
                .orElseThrow(() -> new GlobalExceptionHandler.CourseNotFoundException("Course not found with ID: " + courseFAQsCreateDTO.getCourseId()));

        FAQs faq = new FAQs();
        faq.setQuestion(courseFAQsCreateDTO.getQuestion());
        faq.setAnswer(courseFAQsCreateDTO.getAnswer());
        faq.setCourse(course);

        FAQs savedFaq = faqsRepository.save(faq);
        log.debug("Created FAQ for course ID: {}, question: {}", course.getId(), faq.getQuestion());
        return genericDTOConverter.convertToDTO(savedFaq, CourseFAQsDTO.class);
    }


    @Transactional
    public CourseFAQsDTO updateCourseFAQs(CourseFAQsUpdateDTO courseFAQsUpdateDTO) {
        FAQs faq = faqsRepository.findById(courseFAQsUpdateDTO.getId())
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("FAQ not found with ID: " + courseFAQsUpdateDTO.getId()));

        Course course = courseRepository.findById(courseFAQsUpdateDTO.getCourseId())
                .orElseThrow(() -> new GlobalExceptionHandler.CourseNotFoundException("Course not found with ID: " + courseFAQsUpdateDTO.getCourseId()));

        faq.setQuestion(courseFAQsUpdateDTO.getQuestion());
        faq.setAnswer(courseFAQsUpdateDTO.getAnswer());
        faq.setCourse(course);

        FAQs updatedFaq = faqsRepository.save(faq);
        log.debug("Updated FAQ ID: {}, question: {}", updatedFaq.getId(), updatedFaq.getQuestion());
        return genericDTOConverter.convertToDTO(updatedFaq, CourseFAQsDTO.class);
    }


    @Transactional
    public void deleteFAQ(Long faqId) {
        FAQs faq = faqsRepository.findById(faqId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("FAQ not found with ID: " + faqId));

        faqsRepository.delete(faq);
        log.info("Deleted FAQ ID: {}", faqId);
    }
}