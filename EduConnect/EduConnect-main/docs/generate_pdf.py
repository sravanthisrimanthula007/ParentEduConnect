"""Generate PROJECT_DOCUMENTATION.pdf for Parent Edu Connect."""
from pathlib import Path

try:
    from fpdf import FPDF
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2", "-q"])
    from fpdf import FPDF

OUTPUT = Path(__file__).resolve().parent / "PROJECT_DOCUMENTATION.pdf"

SECTIONS = [
    ("Parent Edu Connect - Project Documentation", [
        "AI-Based Student Monitoring & Smart Academic Analytics System",
        "Author: Sameed Khan Project",
        "Stack: Java Spring Boot + MySQL + Python + HTML/CSS/JS",
    ]),
    ("1. Project Overview", [
        "Parent Edu Connect is a role-based academic monitoring platform for parents, teachers, and administrators.",
        "It tracks marks, attendance, behavior, achievements, and provides AI-driven predictions and a chatbot assistant.",
        "The frontend is a responsive glass-style SPA. Data persists in MySQL via a Java REST API.",
        "Python provides hybrid ML predictions (linear regression + rule-based scoring).",
    ]),
    ("2. System Architecture", [
        "Layer 1 - Frontend: index.html, styles.css, app.js (browser)",
        "Layer 2 - Backend: Java Spring Boot on port 8080 (REST + JPA)",
        "Layer 3 - Database: MySQL Workbench database parent_edu_connect",
        "Layer 4 - AI Service: Python Flask on port 5000 (predict + chat)",
        "Flow: Browser -> Java API -> MySQL; Java API -> Python AI -> JSON response -> Browser",
    ]),
    ("3. Database Schema (MySQL)", [
        "users - login accounts (parent, teacher, admin)",
        "students - student profiles and summary metrics",
        "marks - monthly subject marks per student",
        "attendance - monthly attendance percentages",
        "behavior_logs - complaints and positive remarks",
        "achievements - certificates and awards",
        "login_audits - login history for admin panel",
        "active_sessions - live session tracking",
        "school_stats - school-wide analytics counters",
        "Scripts: database/schema.sql and database/seed.sql",
        "MySQL password configured: 7993445360 (root user)",
    ]),
    ("4. Java Backend (backend/)", [
        "ParentEduConnectApplication.java - Spring Boot entry point",
        "entity/ - JPA entities mapping MySQL tables",
        "repository/ - Spring Data JPA repositories",
        "service/ - AuthService, StudentService, AiService, AdminService",
        "controller/ApiController.java - REST endpoints under /api",
        "config/DataSeeder.java - seeds demo data on first run",
        "config/WebConfig.java - CORS + RestTemplate for Python calls",
        "application.properties - MySQL JDBC URL and AI service URL",
    ]),
    ("5. Python AI (python-ai/)", [
        "app.py - Flask API: /predict, /chat, /health",
        "predictor.py - prediction formulas + sklearn LinearRegression blend",
        "requirements.txt - flask, numpy, scikit-learn",
        "Predictions use marks trend, attendance influence, behavior score.",
        "Chatbot uses keyword intent matching (attendance, weak subject, predict, complaints).",
    ]),
    ("6. Frontend (app.js connections)", [
        "API_BASE = http://localhost:8080/api",
        "apiFetch() - generic HTTP helper with X-Auth-Token header",
        "handleLogin() -> POST /api/auth/login -> loads students from MySQL",
        "loadStudentsFromApi() -> GET /api/students",
        "handleTeacherUpdate() -> POST /api/records (saves to MySQL)",
        "loadPredictions() -> GET /api/predictions/{id} -> Java -> Python",
        "addChat() -> POST /api/chat -> Python chatbot",
        "loadAdminData() -> GET /api/admin/stats, login-audits, sessions",
        "Falls back to local mock data if backend is offline.",
    ]),
    ("7. API Endpoints", [
        "POST /api/auth/login - authenticate user",
        "POST /api/auth/logout - end session",
        "GET /api/students - list all students",
        "GET /api/students/{id} - student detail",
        "POST /api/records - teacher record entry",
        "GET /api/predictions/{studentId}?subject=Mathematics",
        "POST /api/chat - AI chatbot question",
        "GET /api/admin/stats - school analytics",
        "GET /api/admin/login-audits - login history",
        "GET /api/admin/sessions - active sessions",
    ]),
    ("8. How to Run", [
        "1. Start MySQL Workbench (root / 7993445360)",
        "2. Run database/schema.sql and seed.sql (optional - auto-seed available)",
        "3. cd python-ai && pip install -r requirements.txt && python app.py",
        "4. cd backend && mvn spring-boot:run",
        "5. Open index.html or run start-all.bat",
        "Demo logins: parent@demo.edu/parent123, teacher@demo.edu/teacher123, admin@demo.edu/admin123",
    ]),
    ("9. File Structure", [
        "index.html - main UI shell",
        "app.js - frontend application logic + API integration",
        "styles.css - responsive glass UI theme",
        "backend/pom.xml - Maven dependencies",
        "backend/src/main/java/com/parentedu/ - Java source",
        "backend/src/main/resources/application.properties - DB config",
        "python-ai/app.py - AI Flask server",
        "python-ai/predictor.py - ML prediction logic",
        "database/schema.sql - MySQL DDL",
        "database/seed.sql - demo data",
        "start-all.bat - Windows launcher",
        "SETUP.md - setup instructions",
    ]),
]


class DocPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 10)
        self.cell(0, 8, "Parent Edu Connect - Technical Documentation", align="C")
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")


def build_pdf():
    pdf = DocPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Helvetica", size=11)

    for title, lines in SECTIONS:
        pdf.set_font("Helvetica", "B", 13)
        pdf.multi_cell(0, 8, title)
        pdf.ln(2)
        pdf.set_font("Helvetica", size=11)
        for line in lines:
            pdf.multi_cell(0, 6, line)
            pdf.ln(1)
        pdf.ln(4)

    pdf.output(str(OUTPUT))
    print("Generated PROJECT_DOCUMENTATION.pdf")


if __name__ == "__main__":
    build_pdf()
