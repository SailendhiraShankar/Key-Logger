#!/bin/bash

echo "==================================="
echo "KeyLogger Pro - Quick Start"
echo "==================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
echo ""

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt
echo ""

# Check for root privileges
if [ "$EUID" -ne 0 ]; then
    echo ""
    echo "========================================"
    echo "WARNING: No root privileges!"
    echo "========================================"
    echo ""
    echo "This application requires root access to capture keystrokes."
    echo "Please run this script with sudo:"
    echo "  sudo ./start.sh"
    echo ""
    exit 1
fi

echo "Running with root privileges..."
echo ""
echo "Starting Flask server..."
echo "Open your browser and go to: http://localhost:5000"
echo ""
python3 app.py
