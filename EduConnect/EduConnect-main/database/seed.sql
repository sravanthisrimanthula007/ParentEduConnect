-- Seed data for Parent Edu Connect
USE parent_edu_connect;

DELETE FROM achievements;
DELETE FROM behavior_logs;
DELETE FROM attendance;
DELETE FROM marks;
DELETE FROM students;
DELETE FROM users;
DELETE FROM login_audits;
DELETE FROM active_sessions;
DELETE FROM school_stats;

INSERT INTO students (external_id, name, roll, class_name, section, parent_name, contact, grade, rank_prediction, improvement, risk, weak_subject, pass_probability, behavior_score, assignment_completion, participation) VALUES
('sameed', 'Sameed Khan', '08', '10', 'A', 'Aamir Khan', '+91 98765 43210', 'A', 9, 7, 'Medium', 'Mathematics', 94, 78, 86, 74),
('aisha', 'Aisha Rahman', '14', '9', 'B', 'Nadia Rahman', '+91 98765 43890', 'A+', 3, 9, 'Low', 'Science', 99, 94, 98, 91);

-- Sameed marks
INSERT INTO marks (student_id, subject, month_index, score) VALUES
(1, 'Mathematics', 0, 72), (1, 'Mathematics', 1, 74), (1, 'Mathematics', 2, 77), (1, 'Mathematics', 3, 79), (1, 'Mathematics', 4, 81), (1, 'Mathematics', 5, 82),
(1, 'Science', 0, 86), (1, 'Science', 1, 85), (1, 'Science', 2, 84), (1, 'Science', 3, 88), (1, 'Science', 4, 89), (1, 'Science', 5, 91),
(1, 'English', 0, 78), (1, 'English', 1, 80), (1, 'English', 2, 82), (1, 'English', 3, 81), (1, 'English', 4, 83), (1, 'English', 5, 85),
(1, 'Social', 0, 69), (1, 'Social', 1, 73), (1, 'Social', 2, 76), (1, 'Social', 3, 74), (1, 'Social', 4, 77), (1, 'Social', 5, 79),
(1, 'Computer', 0, 91), (1, 'Computer', 1, 93), (1, 'Computer', 2, 94), (1, 'Computer', 3, 95), (1, 'Computer', 4, 96), (1, 'Computer', 5, 96);

-- Aisha marks
INSERT INTO marks (student_id, subject, month_index, score) VALUES
(2, 'Mathematics', 0, 88), (2, 'Mathematics', 1, 90), (2, 'Mathematics', 2, 91), (2, 'Mathematics', 3, 92), (2, 'Mathematics', 4, 94), (2, 'Mathematics', 5, 95),
(2, 'Science', 0, 82), (2, 'Science', 1, 83), (2, 'Science', 2, 86), (2, 'Science', 3, 87), (2, 'Science', 4, 88), (2, 'Science', 5, 90),
(2, 'English', 0, 91), (2, 'English', 1, 92), (2, 'English', 2, 93), (2, 'English', 3, 92), (2, 'English', 4, 94), (2, 'English', 5, 95),
(2, 'Social', 0, 84), (2, 'Social', 1, 85), (2, 'Social', 2, 86), (2, 'Social', 3, 88), (2, 'Social', 4, 88), (2, 'Social', 5, 89),
(2, 'Computer', 0, 93), (2, 'Computer', 1, 94), (2, 'Computer', 2, 95), (2, 'Computer', 3, 96), (2, 'Computer', 4, 97), (2, 'Computer', 5, 98);

-- Attendance
INSERT INTO attendance (student_id, month_index, percentage) VALUES
(1, 0, 92), (1, 1, 89), (1, 2, 86), (1, 3, 84), (1, 4, 82), (1, 5, 78),
(2, 0, 96), (2, 1, 95), (2, 2, 94), (2, 3, 93), (2, 4, 91), (2, 5, 92);

-- Behavior logs
INSERT INTO behavior_logs (student_id, log_date, note, severity) VALUES
(1, 'May 28', 'Late submission in Mathematics assignment', 'Moderate'),
(1, 'Apr 18', 'Talkative during lab instructions', 'Low'),
(1, 'Mar 07', 'Improved class participation noted', 'Positive'),
(2, 'May 12', 'Consistent homework submission', 'Positive'),
(2, 'Apr 04', 'Helped classmates during project work', 'Positive');

-- Achievements
INSERT INTO achievements (student_id, title, description) VALUES
(1, 'Science Expo', 'Second prize in robotics prototype'),
(1, 'Sports Day', '100m relay team finalist'),
(1, 'Coding Sprint', 'Certificate of excellence'),
(2, 'Debate League', 'Best speaker award'),
(2, 'Math Olympiad', 'School round winner'),
(2, 'Art Fest', 'Digital poster certificate');

-- Users (demo accounts)
INSERT INTO users (email, password, role, name, language, student_id, status) VALUES
('parent@demo.edu', 'parent123', 'parent', 'Aamir Khan', 'en', 1, 'Enabled'),
('teacher@demo.edu', 'teacher123', 'teacher', 'Mr. Ravi Kumar', 'en', NULL, 'Enabled'),
('admin@demo.edu', 'admin123', 'admin', 'Admin Office', 'en', NULL, 'Enabled');

-- Login audits
INSERT INTO login_audits (user_name, role, log_time, device, status) VALUES
('Aisha Rahman Parent', 'parent', '04 Jun 2026, 12:42 PM', 'Chrome / Windows', 'Success'),
('Mr. Ravi Kumar', 'teacher', '04 Jun 2026, 12:38 PM', 'Edge / Windows', 'Success'),
('Admin Office', 'admin', '04 Jun 2026, 12:31 PM', 'Chrome / Windows', 'Success'),
('Unknown Parent Login', 'parent', '04 Jun 2026, 12:18 PM', 'Mobile / Android', 'Failed'),
('Sameed Khan Parent', 'parent', '04 Jun 2026, 11:57 AM', 'Safari / iPhone', 'Success');

-- School stats
INSERT INTO school_stats (id, total_students, teachers, attendance_percent, risk_alerts, present_count, absent_count, pass_count, fail_count) VALUES
(1, 1248, 96, 88, 142, 1098, 150, 1086, 162);
