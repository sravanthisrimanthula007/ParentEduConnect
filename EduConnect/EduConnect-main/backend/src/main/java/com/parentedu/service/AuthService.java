package com.parentedu.service;

import com.parentedu.dto.LoginRequest;
import com.parentedu.dto.LoginResponse;
import com.parentedu.entity.*;
import com.parentedu.repository.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final LoginAuditRepository loginAuditRepository;
    private final ActiveSessionRepository activeSessionRepository;

    public AuthService(UserRepository userRepository, StudentRepository studentRepository,
                       LoginAuditRepository loginAuditRepository, ActiveSessionRepository activeSessionRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.loginAuditRepository = loginAuditRepository;
        this.activeSessionRepository = activeSessionRepository;
    }

    @Transactional
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.email);
        String status = "Failed";
        String userName = request.email;

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            userName = user.getName();
            if (user.getPassword().equals(request.password) && user.getRole().equals(request.role)) {
                status = "Success";
                String token = UUID.randomUUID().toString().replace("-", "");
                String view = roleToView(user.getRole());
                String studentExternalId = null;
                if (user.getStudentId() != null) {
                    studentExternalId = studentRepository.findById(user.getStudentId())
                            .map(Student::getExternalId).orElse(null);
                }

                ActiveSession session = new ActiveSession();
                session.setToken(token);
                session.setUserName(user.getName());
                session.setRole(user.getRole());
                session.setSince(LocalDateTime.now().format(DateTimeFormatter.ofPattern("hh:mm a")));
                session.setLocation(locationForRole(user.getRole()));
                session.setStatus("Active");
                activeSessionRepository.save(session);

                if (request.language != null) {
                    user.setLanguage(request.language);
                    userRepository.save(user);
                }

                recordAudit(userName, user.getRole(), status);
                return new LoginResponse(token, user.getRole(), user.getName(), view,
                        user.getLanguage() != null ? user.getLanguage() : "en", studentExternalId);
            }
        }

        recordAudit(userName, request.role != null ? request.role : "parent", status);
        throw new IllegalArgumentException("Invalid credentials for selected role");
    }

    @Transactional
    public void logout(String token) {
        activeSessionRepository.findByToken(token).ifPresent(s -> activeSessionRepository.delete(s));
    }

    public User validateToken(String token) {
        ActiveSession session = activeSessionRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired session"));
        return userRepository.findByEmail(session.getUserName() + "@demo.edu")
                .or(() -> userRepository.findAll().stream()
                        .filter(u -> u.getName().equals(session.getUserName()))
                        .findFirst())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    private void recordAudit(String userName, String role, String status) {
        LoginAudit audit = new LoginAudit();
        audit.setUserName(userName);
        audit.setRole(role);
        audit.setLogTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")));
        audit.setDevice("Chrome / Windows");
        audit.setStatus(status);
        loginAuditRepository.save(audit);
    }

    private String roleToView(String role) {
        if ("admin".equals(role)) return "admin";
        if ("teacher".equals(role)) return "teacher";
        return "parent";
    }

    private String locationForRole(String role) {
        if ("admin".equals(role)) return "School office";
        if ("teacher".equals(role)) return "Class 10-A";
        return "Home network";
    }
}
