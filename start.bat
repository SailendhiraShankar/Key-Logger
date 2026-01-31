@echo off
echo ===================================
echo KeyLogger Pro - Quick Start
echo ===================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate
echo.

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt
echo.

REM Check for admin rights
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running with administrator privileges...
    echo.
    echo Starting Flask server...
    echo Open your browser and go to: http://localhost:5000
    echo.
    python app.py
) else (
    echo.
    echo ========================================
    echo WARNING: No administrator privileges!
    echo ========================================
    echo.
    echo This application requires administrator rights to capture keystrokes.
    echo Please right-click this file and select "Run as administrator"
    echo.
    pause
)
