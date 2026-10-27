@echo off
title Nodedr OrderRestro POS Development Mode
cls
echo ========================================================
echo   Nodedr OrderRestro - Development Mode (Hot Reload)
echo ========================================================
echo.

cd /d "%~dp0"

echo Checking Database Status...
netstat -ano | findstr "3003" >nul
if %errorlevel% neq 0 (
    echo Starting PostgreSQL database on port 3003...
    "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" -D "C:\Program Files\PostgreSQL\16\data" start
    timeout /t 2 /nobreak >nul
) else (
    echo Database is already running on port 3003.
)

echo.
echo Starting Monorepo in Dev Mode (Backend + Web)...
echo POS URL will be: http://localhost:3000
echo.
pnpm dev
pause
