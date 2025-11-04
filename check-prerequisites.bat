@echo off
title Prerequisites Check
cls
echo ====================================
echo   Checking Prerequisites
echo ====================================
echo.

set "allGood=1"

echo [1/4] Checking Python...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    python --version
    echo ✓ Python is installed
) else (
    echo ✗ Python is NOT installed
    echo Download: https://www.python.org/downloads/
    set "allGood=0"
)
echo.

echo [2/4] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    node --version
    echo ✓ Node.js is installed
) else (
    echo ✗ Node.js is NOT installed
    echo Download: https://nodejs.org/
    set "allGood=0"
)
echo.

echo [3/4] Checking npm...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    npm --version
    echo ✓ npm is installed
) else (
    echo ✗ npm is NOT installed (comes with Node.js)
    set "allGood=0"
)
echo.

echo [4/4] Checking MongoDB...
mongod --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MongoDB is installed
) else (
    echo ⚠ MongoDB might not be installed or not in PATH
    echo Download: https://www.mongodb.com/try/download/community
    echo Note: You can also use MongoDB Atlas (cloud) instead
)
echo.

echo ====================================
if "%allGood%"=="1" (
    echo ✓ All required tools are installed!
    echo You can now run start.bat
) else (
    echo ✗ Some tools are missing!
    echo Please install the missing tools and try again.
)
echo ====================================
echo.
pause
