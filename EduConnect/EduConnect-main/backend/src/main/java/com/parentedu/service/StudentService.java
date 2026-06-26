package com.parentedu.service;

import com.parentedu.dto.StudentDto;
import com.parentedu.entity.*;
import com.parentedu.repository.*;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final MarkRepository markRepository;
    private final AttendanceRepository attendanceRepository;
    private final BehaviorLogRepository behaviorLogRepository;
    private final AchievementRepository achievementRepository;

    public StudentService(StudentRepository studentRepository, MarkRepository markRepository,
                          AttendanceRepository attendanceRepository, BehaviorLogRepository behaviorLogRepository,
                          AchievementRepository achievementRepository) {
        this.studentRepository = studentRepository;
        this.markRepository = markRepository;
        this.attendanceRepository = attendanceRepository;
        this.behaviorLogRepository = behaviorLogRepository;
        this.achievementRepository = achievementRepository;
    }

    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public StudentDto getStudentByExternalId(String externalId) {
        Student student = studentRepository.findByExternalId(externalId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        return toDto(student);
    }

    public StudentDto getStudentDto(Student student) {
        return toDto(student);
    }

  @Transactional
    public void updateRecord(String externalId, String subject, Integer marks, Integer attendancePct, String behaviorNote) {
        Student student = studentRepository.findByExternalId(externalId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        Long sid = student.getId();

        if (subject != null && marks != null) {
            List<Mark> existing = markRepository.findByStudentIdAndSubject(sid, subject);
            int monthIndex = existing.isEmpty() ? 0 : existing.stream().mapToInt(Mark::getMonthIndex).max().orElse(-1) + 1;
            if (monthIndex > 5) monthIndex = 5;
            Mark mark = new Mark();
            mark.setStudentId(sid);
            mark.setSubject(subject);
            mark.setMonthIndex(monthIndex);
            mark.setScore(marks);
            markRepository.save(mark);
        }

        if (attendancePct != null) {
            List<Attendance> records = attendanceRepository.findByStudentIdOrderByMonthIndexAsc(sid);
            int monthIndex = records.isEmpty() ? 0 : records.get(records.size() - 1).getMonthIndex() + 1;
            if (monthIndex > 5) monthIndex = 5;
            Attendance att = new Attendance();
            att.setStudentId(sid);
            att.setMonthIndex(monthIndex);
            att.setPercentage(attendancePct);
            attendanceRepository.save(att);
        }

        if (behaviorNote != null && !behaviorNote.isBlank()) {
            BehaviorLog log = new BehaviorLog();
            log.setStudentId(sid);
            log.setLogDate("Jun 24");
            log.setNote(behaviorNote);
            log.setSeverity("Moderate");
            behaviorLogRepository.save(log);
        }
    }

    private StudentDto toDto(Student student) {
        Long sid = student.getId();
        StudentDto dto = new StudentDto();
        dto.id = student.getExternalId();
        dto.name = student.getName();
        dto.roll = student.getRoll();
        dto.className = student.getClassName();
        dto.section = student.getSection();
        dto.parent = student.getParentName();
        dto.contact = student.getContact();
        dto.grade = student.getGrade();
        dto.rankPrediction = student.getRankPrediction();
        dto.improvement = student.getImprovement();
        dto.risk = student.getRisk();
        dto.weakSubject = student.getWeakSubject();
        dto.passProbability = student.getPassProbability();
        dto.behaviorScore = student.getBehaviorScore();
        dto.assignmentCompletion = student.getAssignmentCompletion();
        dto.participation = student.getParticipation();

        dto.attendance = attendanceRepository.findByStudentIdOrderByMonthIndexAsc(sid).stream()
                .map(Attendance::getPercentage).collect(Collectors.toList());

        List<Mark> marks = markRepository.findByStudentId(sid);
        Map<String, List<Integer>> subjectMap = new LinkedHashMap<>();
        for (Mark m : marks) {
            subjectMap.computeIfAbsent(m.getSubject(), k -> new ArrayList<>());
            while (subjectMap.get(m.getSubject()).size() < m.getMonthIndex()) {
                subjectMap.get(m.getSubject()).add(0);
            }
            if (subjectMap.get(m.getSubject()).size() == m.getMonthIndex()) {
                subjectMap.get(m.getSubject()).add(m.getScore());
            } else {
                subjectMap.get(m.getSubject()).set(m.getMonthIndex(), m.getScore());
            }
        }
        dto.subjects = subjectMap;

        dto.achievements = achievementRepository.findByStudentId(sid).stream()
                .map(a -> List.of(a.getTitle(), a.getDescription()))
                .collect(Collectors.toList());

        dto.complaints = behaviorLogRepository.findByStudentIdOrderByIdDesc(sid).stream()
                .map(b -> List.of(b.getLogDate(), b.getNote(), b.getSeverity()))
                .collect(Collectors.toList());

        return dto;
    }
}
