@echo off
echo Starting PostgreSQL database on port 3003...
"C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" -D "C:\Program Files\PostgreSQL\16\data" start
timeout /t 3 /nobreak >nul
"C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" -D "C:\Program Files\PostgreSQL\16\data" status
echo Database is ready!
