package com.parentedu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "login_audits")
public class LoginAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_name")
    private String userName;
    private String role;
    @Column(name = "log_time")
    private String logTime;
    private String device;
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getLogTime() { return logTime; }
    public void setLogTime(String logTime) { this.logTime = logTime; }
    public String getDevice() { return device; }
    public void setDevice(String device) { this.device = device; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
