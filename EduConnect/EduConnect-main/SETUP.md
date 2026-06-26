# Parent Edu Connect - Full Stack Setup

AI-based student monitoring system with **Java Spring Boot**, **MySQL**, **Python AI**, and **HTML/JS frontend**.

## Architecture

```
Browser (index.html + app.js)
        |  REST JSON (port 8080)
        v
Java Spring Boot API (backend/)
        |  JDBC
        v
MySQL Workbench (parent_edu_connect)
        ^
        |  HTTP (port 5000)
Python AI Service (python-ai/)
```

## Prerequisites

- Java 17+
- Maven 3.9+
- Python 3.10+
- MySQL Server (MySQL Workbench)

## MySQL Setup

1. Open **MySQL Workbench**
2. Connect as `root` with password: `7993445360`
3. Run scripts in order:
   - `database/schema.sql`
   - `database/seed.sql`

Or let Spring Boot auto-create tables on first run (data seeded via `DataSeeder.java`).

Database name: `parent_edu_connect`

## Run Everything

**Option A – One click (Windows):**
```
start-all.bat
```

**Option B – Manual:**

```bash
# Terminal 1 - Python AI
cd python-ai
pip install -r requirements.txt
python app.py

# Terminal 2 - Java Backend
cd backend
mvn spring-boot:run

# Terminal 3 - Frontend
Open index.html in browser (or http://localhost:8080 if served via backend)
```

## Demo Logins

| Role    | Email              | Password   |
|---------|--------------------|------------|
| Parent  | parent@demo.edu    | parent123  |
| Teacher | teacher@demo.edu   | teacher123 |
| Admin   | admin@demo.edu     | admin123   |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/students` | All students |
| GET | `/api/students/{id}` | Student detail |
| POST | `/api/records` | Teacher save marks/attendance |
| GET | `/api/predictions/{studentId}` | AI predictions |
| POST | `/api/chat` | AI chatbot |
| GET | `/api/admin/stats` | School statistics |
| GET | `/api/admin/login-audits` | Login history |
| GET | `/api/admin/sessions` | Active sessions |
| GET | `/api/health` | Health check |

## File Connection Map

| File | Role |
|------|------|
| `index.html` | UI layout, loads `styles.css` + `app.js` |
| `app.js` | Frontend logic, calls `http://localhost:8080/api` |
| `backend/` | Java REST API, JPA entities, MySQL connection |
| `python-ai/app.py` | Flask server for predictions + chat |
| `python-ai/predictor.py` | ML/rule hybrid prediction logic |
| `database/schema.sql` | MySQL table definitions |
| `database/seed.sql` | Demo data for Workbench |

## Documentation

See `docs/PROJECT_DOCUMENTATION.pdf` for full project report.
