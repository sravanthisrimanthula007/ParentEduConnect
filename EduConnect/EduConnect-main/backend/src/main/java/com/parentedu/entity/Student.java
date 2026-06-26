package com.parentedu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "external_id")
    private String externalId;
    private String name;
    private String roll;
    @Column(name = "class_name")
    private String className;
    private String section;
    @Column(name = "parent_name")
    private String parentName;
    private String contact;
    private String grade;
    @Column(name = "rank_prediction")
    private Integer rankPrediction;
    private Integer improvement;
    private String risk;
    @Column(name = "weak_subject")
    private String weakSubject;
    @Column(name = "pass_probability")
    private Integer passProbability;
    @Column(name = "behavior_score")
    private Integer behaviorScore;
    @Column(name = "assignment_completion")
    private Integer assignmentCompletion;
    private Integer participation;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getExternalId() { return externalId; }
    public void setExternalId(String externalId) { this.externalId = externalId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRoll() { return roll; }
    public void setRoll(String roll) { this.roll = roll; }
    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }
    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }
    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public Integer getRankPrediction() { return rankPrediction; }
    public void setRankPrediction(Integer rankPrediction) { this.rankPrediction = rankPrediction; }
    public Integer getImprovement() { return improvement; }
    public void setImprovement(Integer improvement) { this.improvement = improvement; }
    public String getRisk() { return risk; }
    public void setRisk(String risk) { this.risk = risk; }
    public String getWeakSubject() { return weakSubject; }
    public void setWeakSubject(String weakSubject) { this.weakSubject = weakSubject; }
    public Integer getPassProbability() { return passProbability; }
    public void setPassProbability(Integer passProbability) { this.passProbability = passProbability; }
    public Integer getBehaviorScore() { return behaviorScore; }
    public void setBehaviorScore(Integer behaviorScore) { this.behaviorScore = behaviorScore; }
    public Integer getAssignmentCompletion() { return assignmentCompletion; }
    public void setAssignmentCompletion(Integer assignmentCompletion) { this.assignmentCompletion = assignmentCompletion; }
    public Integer getParticipation() { return participation; }
    public void setParticipation(Integer participation) { this.participation = participation; }
}
