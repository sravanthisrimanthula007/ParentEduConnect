package com.parentedu.dto;

public class LoginResponse {
    public String token;
    public String role;
    public String name;
    public String view;
    public String language;
    public String studentId;

    public LoginResponse(String token, String role, String name, String view, String language, String studentId) {
        this.token = token;
        this.role = role;
        this.name = name;
        this.view = view;
        this.language = language;
        this.studentId = studentId;
    }
}
