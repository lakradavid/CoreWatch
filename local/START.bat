@echo off
echo ========================================
echo CoreWatch - Local Mode Launcher
echo ========================================
echo.
echo Starting CoreWatch in local monitoring mode...
echo This will monitor YOUR computer's hardware.
echo.
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Start backend in a new window
echo [1/2] Starting Backend Server...
start "CoreWatch Backend" cmd /k "cd backend && npm install && npm start"
echo Backend starting in new window...
echo.

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new window
echo [2/2] Starting Frontend...
start "CoreWatch Frontend" cmd /k "cd frontend && npm install && npm run dev"
echo Frontend starting in new window...
echo.

echo ========================================
echo CoreWatch is starting!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Wait for both windows to finish loading,
echo then open your browser to:
echo.
echo    http://localhost:3000
echo.
echo ========================================
echo.
echo Press any key to close this window...
echo (The backend and frontend will keep running)
pause >nul
