@echo off
title Parent Edu Connect - Start All Services
echo ============================================
echo  Parent Edu Connect - Full Stack Launcher
echo ============================================
echo.

cd /d "%~dp0"

echo [1/3] Starting Python AI Service (port 5000)...
start "Python AI" cmd /k "cd python-ai && pip install -r requirements.txt -q && python app.py"

timeout /t 3 /nobreak >nul

echo [2/3] Starting Java Backend + MySQL API (port 8080)...
start "Java Backend" cmd /k "cd backend && mvn spring-boot:run"

timeout /t 5 /nobreak >nul

echo [3/3] Opening Frontend...
start "" "%~dp0index.html"

echo.
echo All services starting. Login at index.html with:
echo   parent@demo.edu / parent123
echo   teacher@demo.edu / teacher123
echo   admin@demo.edu / admin123
echo.
echo Ensure MySQL Workbench is running with password: 7993445360
pause
