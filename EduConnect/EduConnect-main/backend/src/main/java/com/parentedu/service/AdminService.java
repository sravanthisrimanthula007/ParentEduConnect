package com.parentedu.service;

import com.parentedu.entity.ActiveSession;
import com.parentedu.entity.LoginAudit;
import com.parentedu.entity.SchoolStats;
import com.parentedu.repository.ActiveSessionRepository;
import com.parentedu.repository.LoginAuditRepository;
import com.parentedu.repository.SchoolStatsRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final SchoolStatsRepository schoolStatsRepository;
    private final LoginAuditRepository loginAuditRepository;
    private final ActiveSessionRepository activeSessionRepository;

    public AdminService(SchoolStatsRepository schoolStatsRepository,
                        LoginAuditRepository loginAuditRepository,
                        ActiveSessionRepository activeSessionRepository) {
        this.schoolStatsRepository = schoolStatsRepository;
        this.loginAuditRepository = loginAuditRepository;
        this.activeSessionRepository = activeSessionRepository;
    }

    public Map<String, Object> getSchoolStats() {
        SchoolStats stats = schoolStatsRepository.findById(1).orElse(defaultStats());
        Map<String, Object> map = new HashMap<>();
        map.put("totalStudents", stats.getTotalStudents());
        map.put("teachers", stats.getTeachers());
        map.put("attendancePercent", stats.getAttendancePercent());
        map.put("riskAlerts", stats.getRiskAlerts());
        map.put("present", stats.getPresentCount());
        map.put("absent", stats.getAbsentCount());
        map.put("pass", stats.getPassCount());
        map.put("fail", stats.getFailCount());
        return map;
    }

    public List<LoginAudit> getLoginAudits() {
        return loginAuditRepository.findAll();
    }

    public List<ActiveSession> getActiveSessions() {
        return activeSessionRepository.findAll();
    }

    private SchoolStats defaultStats() {
        SchoolStats s = new SchoolStats();
        s.setId(1);
        s.setTotalStudents(1248);
        s.setTeachers(96);
        s.setAttendancePercent(88);
        s.setRiskAlerts(142);
        s.setPresentCount(1098);
        s.setAbsentCount(150);
        s.setPassCount(1086);
        s.setFailCount(162);
        return s;
    }
}
