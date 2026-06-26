package com.parentedu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "school_stats")
public class SchoolStats {
    @Id
    private Integer id = 1;
    @Column(name = "total_students")
    private Integer totalStudents;
    private Integer teachers;
    @Column(name = "attendance_percent")
    private Integer attendancePercent;
    @Column(name = "risk_alerts")
    private Integer riskAlerts;
    @Column(name = "present_count")
    private Integer presentCount;
    @Column(name = "absent_count")
    private Integer absentCount;
    @Column(name = "pass_count")
    private Integer passCount;
    @Column(name = "fail_count")
    private Integer failCount;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getTotalStudents() { return totalStudents; }
    public void setTotalStudents(Integer totalStudents) { this.totalStudents = totalStudents; }
    public Integer getTeachers() { return teachers; }
    public void setTeachers(Integer teachers) { this.teachers = teachers; }
    public Integer getAttendancePercent() { return attendancePercent; }
    public void setAttendancePercent(Integer attendancePercent) { this.attendancePercent = attendancePercent; }
    public Integer getRiskAlerts() { return riskAlerts; }
    public void setRiskAlerts(Integer riskAlerts) { this.riskAlerts = riskAlerts; }
    public Integer getPresentCount() { return presentCount; }
    public void setPresentCount(Integer presentCount) { this.presentCount = presentCount; }
    public Integer getAbsentCount() { return absentCount; }
    public void setAbsentCount(Integer absentCount) { this.absentCount = absentCount; }
    public Integer getPassCount() { return passCount; }
    public void setPassCount(Integer passCount) { this.passCount = passCount; }
    public Integer getFailCount() { return failCount; }
    public void setFailCount(Integer failCount) { this.failCount = failCount; }
}
