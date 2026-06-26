package com.parentedu.config;

import com.parentedu.entity.*;
import com.parentedu.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(UserRepository userRepository, StudentRepository studentRepository,
                               MarkRepository markRepository, AttendanceRepository attendanceRepository,
                               BehaviorLogRepository behaviorLogRepository, AchievementRepository achievementRepository,
                               LoginAuditRepository loginAuditRepository, SchoolStatsRepository schoolStatsRepository) {
        return args -> {
            if (studentRepository.count() > 0) return;

            Student sameed = createStudent("sameed", "Sameed Khan", "08", "10", "A", "Aamir Khan",
                    "+91 98765 43210", "A", 9, 7, "Medium", "Mathematics", 94, 78, 86, 74);
            Student aisha = createStudent("aisha", "Aisha Rahman", "14", "9", "B", "Nadia Rahman",
                    "+91 98765 43890", "A+", 3, 9, "Low", "Science", 99, 94, 98, 91);
            studentRepository.save(sameed);
            studentRepository.save(aisha);

            seedMarks(markRepository, sameed.getId(), aisha.getId());
            seedAttendance(attendanceRepository, sameed.getId(), aisha.getId());
            seedBehavior(behaviorLogRepository, sameed.getId(), aisha.getId());
            seedAchievements(achievementRepository, sameed.getId(), aisha.getId());

            User parent = new User();
            parent.setEmail("parent@demo.edu");
            parent.setPassword("parent123");
            parent.setRole("parent");
            parent.setName("Aamir Khan");
            parent.setLanguage("en");
            parent.setStudentId(sameed.getId());
            parent.setStatus("Enabled");
            userRepository.save(parent);

            User teacher = new User();
            teacher.setEmail("teacher@demo.edu");
            teacher.setPassword("teacher123");
            teacher.setRole("teacher");
            teacher.setName("Mr. Ravi Kumar");
            teacher.setLanguage("en");
            teacher.setStatus("Enabled");
            userRepository.save(teacher);

            User admin = new User();
            admin.setEmail("admin@demo.edu");
            admin.setPassword("admin123");
            admin.setRole("admin");
            admin.setName("Admin Office");
            admin.setLanguage("en");
            admin.setStatus("Enabled");
            userRepository.save(admin);

            if (loginAuditRepository.count() == 0) {
                seedAudits(loginAuditRepository);
            }

            if (schoolStatsRepository.count() == 0) {
                SchoolStats stats = new SchoolStats();
                stats.setId(1);
                stats.setTotalStudents(1248);
                stats.setTeachers(96);
                stats.setAttendancePercent(88);
                stats.setRiskAlerts(142);
                stats.setPresentCount(1098);
                stats.setAbsentCount(150);
                stats.setPassCount(1086);
                stats.setFailCount(162);
                schoolStatsRepository.save(stats);
            }
        };
    }

    private Student createStudent(String extId, String name, String roll, String cls, String section,
                                  String parent, String contact, String grade, int rank, int improvement,
                                  String risk, String weak, int passProb, int behavior, int assign, int part) {
        Student s = new Student();
        s.setExternalId(extId);
        s.setName(name);
        s.setRoll(roll);
        s.setClassName(cls);
        s.setSection(section);
        s.setParentName(parent);
        s.setContact(contact);
        s.setGrade(grade);
        s.setRankPrediction(rank);
        s.setImprovement(improvement);
        s.setRisk(risk);
        s.setWeakSubject(weak);
        s.setPassProbability(passProb);
        s.setBehaviorScore(behavior);
        s.setAssignmentCompletion(assign);
        s.setParticipation(part);
        return s;
    }

    private void seedMarks(MarkRepository repo, Long sameedId, Long aishaId) {
        saveMarks(repo, sameedId, "Mathematics", 72, 74, 77, 79, 81, 82);
        saveMarks(repo, sameedId, "Science", 86, 85, 84, 88, 89, 91);
        saveMarks(repo, sameedId, "English", 78, 80, 82, 81, 83, 85);
        saveMarks(repo, sameedId, "Social", 69, 73, 76, 74, 77, 79);
        saveMarks(repo, sameedId, "Computer", 91, 93, 94, 95, 96, 96);
        saveMarks(repo, aishaId, "Mathematics", 88, 90, 91, 92, 94, 95);
        saveMarks(repo, aishaId, "Science", 82, 83, 86, 87, 88, 90);
        saveMarks(repo, aishaId, "English", 91, 92, 93, 92, 94, 95);
        saveMarks(repo, aishaId, "Social", 84, 85, 86, 88, 88, 89);
        saveMarks(repo, aishaId, "Computer", 93, 94, 95, 96, 97, 98);
    }

    private void saveMarks(MarkRepository repo, Long sid, String subject, int... scores) {
        for (int i = 0; i < scores.length; i++) {
            Mark m = new Mark();
            m.setStudentId(sid);
            m.setSubject(subject);
            m.setMonthIndex(i);
            m.setScore(scores[i]);
            repo.save(m);
        }
    }

    private void seedAttendance(AttendanceRepository repo, Long sameedId, Long aishaId) {
        saveAttendance(repo, sameedId, 92, 89, 86, 84, 82, 78);
        saveAttendance(repo, aishaId, 96, 95, 94, 93, 91, 92);
    }

    private void saveAttendance(AttendanceRepository repo, Long sid, int... pct) {
        for (int i = 0; i < pct.length; i++) {
            Attendance a = new Attendance();
            a.setStudentId(sid);
            a.setMonthIndex(i);
            a.setPercentage(pct[i]);
            repo.save(a);
        }
    }

    private void seedBehavior(BehaviorLogRepository repo, Long sameedId, Long aishaId) {
        saveBehavior(repo, sameedId, "May 28", "Late submission in Mathematics assignment", "Moderate");
        saveBehavior(repo, sameedId, "Apr 18", "Talkative during lab instructions", "Low");
        saveBehavior(repo, sameedId, "Mar 07", "Improved class participation noted", "Positive");
        saveBehavior(repo, aishaId, "May 12", "Consistent homework submission", "Positive");
        saveBehavior(repo, aishaId, "Apr 04", "Helped classmates during project work", "Positive");
    }

    private void saveBehavior(BehaviorLogRepository repo, Long sid, String date, String note, String severity) {
        BehaviorLog b = new BehaviorLog();
        b.setStudentId(sid);
        b.setLogDate(date);
        b.setNote(note);
        b.setSeverity(severity);
        repo.save(b);
    }

    private void seedAchievements(AchievementRepository repo, Long sameedId, Long aishaId) {
        saveAchievement(repo, sameedId, "Science Expo", "Second prize in robotics prototype");
        saveAchievement(repo, sameedId, "Sports Day", "100m relay team finalist");
        saveAchievement(repo, sameedId, "Coding Sprint", "Certificate of excellence");
        saveAchievement(repo, aishaId, "Debate League", "Best speaker award");
        saveAchievement(repo, aishaId, "Math Olympiad", "School round winner");
        saveAchievement(repo, aishaId, "Art Fest", "Digital poster certificate");
    }

    private void saveAchievement(AchievementRepository repo, Long sid, String title, String desc) {
        Achievement a = new Achievement();
        a.setStudentId(sid);
        a.setTitle(title);
        a.setDescription(desc);
        repo.save(a);
    }

    private void seedAudits(LoginAuditRepository repo) {
        saveAudit(repo, "Aisha Rahman Parent", "parent", "04 Jun 2026, 12:42 PM", "Chrome / Windows", "Success");
        saveAudit(repo, "Mr. Ravi Kumar", "teacher", "04 Jun 2026, 12:38 PM", "Edge / Windows", "Success");
        saveAudit(repo, "Admin Office", "admin", "04 Jun 2026, 12:31 PM", "Chrome / Windows", "Success");
        saveAudit(repo, "Unknown Parent Login", "parent", "04 Jun 2026, 12:18 PM", "Mobile / Android", "Failed");
        saveAudit(repo, "Sameed Khan Parent", "parent", "04 Jun 2026, 11:57 AM", "Safari / iPhone", "Success");
    }

    private void saveAudit(LoginAuditRepository repo, String name, String role, String time, String device, String status) {
        LoginAudit a = new LoginAudit();
        a.setUserName(name);
        a.setRole(role);
        a.setLogTime(time);
        a.setDevice(device);
        a.setStatus(status);
        repo.save(a);
    }
}
