@echo off
title Share POS Live Link
cls
echo ========================================================
echo       Nodedr OrderRestro - Public Live Link
echo ========================================================
echo.

cd /d "%~dp0"

echo Starting secure Cloudflare Live Link for client demo...
echo.
cloudflared.exe tunnel --url http://localhost:3000
pause
