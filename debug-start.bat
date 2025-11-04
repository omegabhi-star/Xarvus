@echo off
title Debug - Expense Tracker Startup
echo ====================================
echo   DEBUG MODE - Expense Tracker
echo ====================================
echo.

echo Step 1: Checking Python...
python --version
if %errorlevel% neq 0 (
    echo [FAILED] Python not found
    echo Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo [OK] Python is installed
echo.

echo Step 2: Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo [FAILED] Node.js not found
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js is installed
echo.

echo Step 3: Checking Yarn...
yarn --version
if %errorlevel% neq 0 (
    echo [INFO] Yarn not found, installing...
    npm install -g yarn
)
echo [OK] Yarn is installed
echo.

echo Step 4: Checking backend folder...
if exist "backend" (
    echo [OK] backend folder exists
) else (
    echo [FAILED] backend folder not found
    pause
    exit /b 1
)
echo.

echo Step 5: Checking frontend folder...
if exist "frontend" (
    echo [OK] frontend folder exists
) else (
    echo [FAILED] frontend folder not found
    pause
    exit /b 1
)
echo.

echo Step 6: Checking backend virtual environment...
cd backend
if exist "venv" (
    echo [OK] Virtual environment exists
) else (
    echo [INFO] Creating virtual environment...
    python -m venv venv
    echo [OK] Virtual environment created
)
cd ..
echo.

echo Step 7: Installing backend dependencies...
cd backend
call venv\Scripts\activate.bat
echo Installing packages (this may take a moment)...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [FAILED] Could not install backend dependencies
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
cd ..
echo.

echo Step 8: Checking frontend dependencies...
cd frontend
if exist "node_modules" (
    echo [OK] Frontend dependencies exist
) else (
    echo [INFO] Installing frontend dependencies...
    yarn install
    if %errorlevel% neq 0 (
        echo [FAILED] Could not install frontend dependencies
        pause
        exit /b 1
    )
)
echo [OK] Frontend dependencies ready
cd ..
echo.

echo Step 9: Checking environment files...
if exist "backend\.env" (
    echo [OK] backend\.env exists
    type backend\.env
) else (
    echo [INFO] Creating backend\.env...
    (
        echo MONGO_URL=mongodb://localhost:27017
        echo DB_NAME=expense_tracker
        echo CORS_ORIGINS=http://localhost:3000
    ) > backend\.env
    echo [OK] backend\.env created
)
echo.

if exist "frontend\.env" (
    echo [OK] frontend\.env exists
    type frontend\.env
) else (
    echo [INFO] Creating frontend\.env...
    (
        echo REACT_APP_BACKEND_URL=http://localhost:8001
    ) > frontend\.env
    echo [OK] frontend\.env created
)
echo.

echo Step 10: Checking MongoDB...
echo [INFO] Trying to connect to MongoDB...
echo Make sure MongoDB is installed and running!
echo Download from: https://www.mongodb.com/try/download/community
echo.

echo ====================================
echo   ALL CHECKS COMPLETED!
echo ====================================
echo.
echo Everything looks good!
echo Now you can run start.bat to start the application.
echo.
pause
