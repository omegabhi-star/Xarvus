@echo off
title Starting Expense Tracker
echo ====================================
echo    Expense Tracker Startup Script
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python 3.8+ from https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if yarn is installed
yarn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Yarn is not installed. Installing yarn...
    npm install -g yarn
)

echo [1/6] Checking prerequisites...
echo ✓ Python installed
echo ✓ Node.js installed
echo ✓ Yarn installed
echo.

REM Setup Backend
echo [2/6] Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install backend dependencies
echo Installing backend dependencies...
pip install -r requirements.txt >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
cd ..
echo.

REM Setup Frontend
echo [3/6] Setting up frontend...
cd frontend

REM Install frontend dependencies
if not exist "node_modules" (
    echo Installing frontend dependencies...
    yarn install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
)
echo ✓ Frontend dependencies installed
cd ..
echo.

REM Check environment files
echo [4/6] Checking environment configuration...
if not exist "backend\.env" (
    echo [WARNING] backend\.env not found. Creating default...
    (
        echo MONGO_URL=mongodb://localhost:27017
        echo DB_NAME=expense_tracker
        echo CORS_ORIGINS=http://localhost:3000
    ) > backend\.env
)

if not exist "frontend\.env" (
    echo [WARNING] frontend\.env not found. Creating default...
    (
        echo REACT_APP_BACKEND_URL=http://localhost:8001
    ) > frontend\.env
)
echo ✓ Environment files ready
echo.

REM Start MongoDB
echo [5/6] Checking MongoDB...
echo Please make sure MongoDB is running!
echo If not installed, visit: https://www.mongodb.com/try/download/community
echo.
timeout /t 3 >nul

REM Start services
echo [6/6] Starting servers...
echo.
echo ====================================
echo Starting Backend (FastAPI)...
echo Backend will run on: http://localhost:8001
echo ====================================
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && uvicorn server:app --reload --host 0.0.0.0 --port 8001"

timeout /t 3 >nul

echo.
echo ====================================
echo Starting Frontend (React)...
echo Frontend will run on: http://localhost:3000
echo ====================================
start "Frontend Server" cmd /k "cd frontend && yarn start"

echo.
echo ====================================
echo    ✓ Expense Tracker Started!
echo ====================================
echo.
echo Backend API: http://localhost:8001
echo Frontend App: http://localhost:3000
echo API Docs: http://localhost:8001/docs
echo.
echo Your browser will open automatically in a few seconds...
echo.
echo To stop the servers, close the terminal windows
echo or press Ctrl+C in each window.
echo.
echo ====================================

timeout /t 5 >nul
start http://localhost:3000

echo Press any key to exit this window...
pause >nul
