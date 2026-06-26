package com.parentedu.repository;

import com.parentedu.entity.Mark;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarkRepository extends JpaRepository<Mark, Long> {
    List<Mark> findByStudentId(Long studentId);
    List<Mark> findByStudentIdAndSubject(Long studentId, String subject);
}
