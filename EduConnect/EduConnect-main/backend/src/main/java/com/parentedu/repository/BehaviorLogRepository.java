package com.parentedu.repository;

import com.parentedu.entity.BehaviorLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BehaviorLogRepository extends JpaRepository<BehaviorLog, Long> {
    List<BehaviorLog> findByStudentIdOrderByIdDesc(Long studentId);
}
