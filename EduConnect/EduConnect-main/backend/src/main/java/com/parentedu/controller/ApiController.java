package com.parentedu.controller;

import com.parentedu.dto.*;
import com.parentedu.entity.ActiveSession;
import com.parentedu.entity.LoginAudit;
import com.parentedu.service.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final AuthService authService;
    private final StudentService studentService;
    private final AiService aiService;
    private final AdminService adminService;

    public ApiController(AuthService authService, StudentService studentService,
                        AiService aiService, AdminService adminService) {
        this.authService = authService;
        this.studentService = studentService;
        this.aiService = aiService;
        this.adminService = adminService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        if (token != null) authService.logout(token);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/students")
    public List<StudentDto> getStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/students/{id}")
    public StudentDto getStudent(@PathVariable String id) {
        return studentService.getStudentByExternalId(id);
    }

    @PostMapping("/records")
    public ResponseEntity<?> updateRecord(@RequestBody RecordUpdateRequest request) {
        studentService.updateRecord(request.studentId, request.subject, request.marks,
                request.attendance, request.behaviorNote);
        return ResponseEntity.ok(Map.of("success", true, "student", studentService.getStudentByExternalId(request.studentId)));
    }

    @GetMapping("/predictions/{studentId}")
    public Map<String, Object> predictions(@PathVariable String studentId,
                                           @RequestParam(defaultValue = "Mathematics") String subject) {
        return aiService.getPredictions(studentId, subject);
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody ChatRequest request) {
        return Map.of("answer", aiService.chat(request));
    }

    @GetMapping("/admin/stats")
    public Map<String, Object> adminStats() {
        return adminService.getSchoolStats();
    }

    @GetMapping("/admin/login-audits")
    public List<LoginAudit> loginAudits() {
        return adminService.getLoginAudits();
    }

    @GetMapping("/admin/sessions")
    public List<ActiveSession> sessions() {
        return adminService.getActiveSessions();
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "service", "Parent Edu Connect API");
    }
}
