@echo off
title Nodedr OrderRestro POS Launcher
cls
echo ========================================================
echo        Nodedr OrderRestro (Restaurant POS)
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Database Status...
netstat -ano | findstr "3003" >nul
if %errorlevel% neq 0 (
    echo Starting PostgreSQL database on port 3003...
    "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" -D "C:\Program Files\PostgreSQL\16\data" start
    timeout /t 2 /nobreak >nul
) else (
    echo Database is already running on port 3003.
)

echo.
echo [2/3] Starting Backend Server (Port 4001)...
start "OrderRestro Backend" cmd /k "title OrderRestro Backend (Port 4001) && cd /d "%~dp0" && node apps\backend\dist\src\main.js"

echo.
echo [3/3] Starting Frontend POS Web Server (Port 3000)...
start "OrderRestro Web" cmd /k "title OrderRestro Web POS (Port 3000) && cd /d "%~dp0" && set PORT=3000 && set HOSTNAME=0.0.0.0 && node apps\web\.next\standalone\apps\web\server.js"

timeout /t 3 /nobreak >nul

echo.
echo ========================================================
echo   Application started successfully!
echo.
echo   POS Web URL:   http://localhost:3000
echo   API Docs URL:  http://localhost:4001/api/docs
echo.
echo   --- Login Credentials ---
echo   Email:    rp524917@gmail.com
echo   Password: 11111111
echo   PIN:      1111
echo ========================================================
echo.

start http://localhost:3000/login
pause
