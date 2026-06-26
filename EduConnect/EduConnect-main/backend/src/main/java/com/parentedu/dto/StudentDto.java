package com.parentedu.dto;

import java.util.List;
import java.util.Map;

public class StudentDto {
    public String id;
    public String name;
    public String roll;
    public String className;
    public String section;
    public String parent;
    public String contact;
    public List<Integer> attendance;
    public Map<String, List<Integer>> subjects;
    public String grade;
    public int rankPrediction;
    public int improvement;
    public String risk;
    public String weakSubject;
    public int passProbability;
    public int behaviorScore;
    public int assignmentCompletion;
    public int participation;
    public List<List<String>> achievements;
    public List<List<String>> complaints;
}
