package com.parentedu.service;

import com.parentedu.dto.ChatRequest;
import com.parentedu.dto.StudentDto;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiService {

    private final RestTemplate restTemplate;
    private final StudentService studentService;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public AiService(RestTemplate restTemplate, StudentService studentService) {
        this.restTemplate = restTemplate;
        this.studentService = studentService;
    }

    public Map<String, Object> getPredictions(String studentId, String subject) {
        StudentDto student = studentService.getStudentByExternalId(studentId);
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("student", student);
            body.put("subject", subject);
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.postForObject(aiServiceUrl + "/predict", body, Map.class);
            if (result != null) return result;
        } catch (Exception ignored) {
            // fallback to local calculation
        }
        return localPredict(student, subject);
    }

    public String chat(ChatRequest request) {
        StudentDto student = studentService.getStudentByExternalId(request.studentId);
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("student", student);
            body.put("subject", request.subject);
            body.put("question", request.question);
            body.put("language", request.language);
            @SuppressWarnings("unchecked")
            Map<String, String> result = restTemplate.postForObject(aiServiceUrl + "/chat", body, Map.class);
            if (result != null && result.get("answer") != null) return result.get("answer");
        } catch (Exception ignored) {
            // fallback
        }
        return "AI service unavailable. Please check Python service on port 5000.";
    }

    private Map<String, Object> localPredict(StudentDto student, String subject) {
        Map<String, Object> result = new HashMap<>();
        int predicted = predictedScore(student, subject);
        result.put("predictedScore", predicted);
        result.put("weakSubject", student.weakSubject);
        result.put("risk", student.risk);
        result.put("passProbability", student.passProbability);
        result.put("recommendation", "Focus on " + student.weakSubject + " with daily practice and error review.");
        return result;
    }

    private int predictedScore(StudentDto student, String subject) {
        List<Integer> marks = student.subjects.get(subject);
        if (marks == null || marks.isEmpty()) return 0;
        int trend = marks.get(marks.size() - 1) - marks.get(0);
        double attAvg = student.attendance.stream().mapToInt(Integer::intValue).average().orElse(85);
        double attendanceInfluence = (attAvg - 85) * 0.18;
        double behaviorInfluence = (student.behaviorScore - 75) * 0.08;
        return Math.min(100, (int) Math.round(marks.get(marks.size() - 1) + trend * 0.15 + attendanceInfluence + behaviorInfluence));
    }
}
