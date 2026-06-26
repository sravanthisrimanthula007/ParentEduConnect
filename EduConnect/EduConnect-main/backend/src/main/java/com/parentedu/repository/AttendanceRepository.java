package com.parentedu.repository;

import com.parentedu.entity.Attendance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentIdOrderByMonthIndexAsc(Long studentId);
}
