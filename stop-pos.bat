@echo off
title Stop OrderRestro POS
cls
echo Stopping OrderRestro Backend and Web services...

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":4001" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo Services on port 4001 and 3000 stopped.
pause
