-- Parent Edu Connect - MySQL Schema
-- Run in MySQL Workbench (password: 7993445360)

CREATE DATABASE IF NOT EXISTS parent_edu_connect
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE parent_edu_connect;

CREATE TABLE IF NOT EXISTS users (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(120) NOT NULL UNIQUE,
  password      VARCHAR(120) NOT NULL,
  role          VARCHAR(20)  NOT NULL,
  name          VARCHAR(120) NOT NULL,
  language      VARCHAR(10)  DEFAULT 'en',
  student_id    BIGINT       NULL,
  status        VARCHAR(20)  DEFAULT 'Enabled',
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
  external_id           VARCHAR(50)  NOT NULL UNIQUE,
  name                  VARCHAR(120) NOT NULL,
  roll                  VARCHAR(10)  NOT NULL,
  class_name            VARCHAR(10)  NOT NULL,
  section               VARCHAR(10)  NOT NULL,
  parent_name           VARCHAR(120) NOT NULL,
  contact               VARCHAR(30)  NOT NULL,
  grade                 VARCHAR(5)   NOT NULL,
  rank_prediction       INT          NOT NULL,
  improvement           INT          NOT NULL,
  risk                  VARCHAR(20)  NOT NULL,
  weak_subject          VARCHAR(50)  NOT NULL,
  pass_probability      INT          NOT NULL,
  behavior_score        INT          NOT NULL,
  assignment_completion INT          NOT NULL,
  participation         INT          NOT NULL
);

CREATE TABLE IF NOT EXISTS marks (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id  BIGINT       NOT NULL,
  subject     VARCHAR(50)  NOT NULL,
  month_index INT          NOT NULL,
  score       INT          NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  UNIQUE KEY uk_marks (student_id, subject, month_index)
);

CREATE TABLE IF NOT EXISTS attendance (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id  BIGINT NOT NULL,
  month_index INT    NOT NULL,
  percentage  INT    NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  UNIQUE KEY uk_attendance (student_id, month_index)
);

CREATE TABLE IF NOT EXISTS behavior_logs (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT       NOT NULL,
  log_date   VARCHAR(20)  NOT NULL,
  note       VARCHAR(255) NOT NULL,
  severity   VARCHAR(20)  NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS achievements (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id  BIGINT       NOT NULL,
  title       VARCHAR(120) NOT NULL,
  description VARCHAR(255) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS login_audits (
  id        BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(120) NOT NULL,
  role      VARCHAR(20)  NOT NULL,
  log_time  VARCHAR(40)  NOT NULL,
  device    VARCHAR(80)  NOT NULL,
  status    VARCHAR(20)  NOT NULL
);

CREATE TABLE IF NOT EXISTS active_sessions (
  id        BIGINT AUTO_INCREMENT PRIMARY KEY,
  token     VARCHAR(64)  NOT NULL UNIQUE,
  user_name VARCHAR(120) NOT NULL,
  role      VARCHAR(20)  NOT NULL,
  since     VARCHAR(20)  NOT NULL,
  location  VARCHAR(80)  NOT NULL,
  status    VARCHAR(20)  NOT NULL DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS school_stats (
  id                  INT PRIMARY KEY DEFAULT 1,
  total_students      INT NOT NULL,
  teachers            INT NOT NULL,
  attendance_percent  INT NOT NULL,
  risk_alerts         INT NOT NULL,
  present_count       INT NOT NULL,
  absent_count        INT NOT NULL,
  pass_count          INT NOT NULL,
  fail_count          INT NOT NULL
);
