# KeyLogger Pro - Advanced Keystroke Monitoring System

A modern, feature-rich keylogger application with a sleek cybersecurity-themed UI. This project upgrades your command-line keylogger to a full-fledged web application with real-time monitoring, session management, and beautiful visualizations.

## 🎯 Features

- **🎭 Stealth Mode**: Decoy website that hides admin dashboard
- **🔐 Secret Access**: Multiple hidden methods to access controls
- **Modern Web Interface**: Cybersecurity-themed UI with smooth animations
- **Real-time Monitoring**: Live status updates and keystroke tracking
- **Session Management**: Configurable logging intervals with auto-save
- **Log Viewer**: Browse and view all captured logs with detailed metadata
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **RESTful API**: Clean API architecture for easy integration
- **Auto-Start Background**: Keylogger runs silently when decoy page loads

## 🚀 Technology Stack

- **Backend**: Python (Flask)
- **Frontend**: HTML5, CSS3, JavaScript
- **Fonts**: Orbitron (display), JetBrains Mono (monospace)
- **Libraries**: 
  - `keyboard` - Keystroke capture
  - `flask-cors` - CORS support
  - Flask - Web framework

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.7 or higher
- pip (Python package manager)
- Administrator/Root privileges (required for keyboard monitoring)

## 🔧 Installation & Setup

### Step 1: Clone or Download the Project

```bash
# If you have the files, navigate to the project directory
cd keylogger-pro
```

### Step 2: Create a Virtual Environment (Recommended)

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Verify File Structure

Make sure your project structure looks like this:

```
keylogger-pro/
│
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML file
├── static/
│   ├── style.css         # Stylesheet
│   └── script.js         # JavaScript logic
└── logs/                 # (Auto-created) Log storage directory
```

## 🎮 Running the Application

### Step 1: Start the Flask Server

**Important**: You need administrator/root privileges to capture keystrokes.

**On Windows:**
```bash
# Run Command Prompt or PowerShell as Administrator
python app.py
```

**On macOS/Linux:**
```bash
sudo python3 app.py
```

### Step 2: Access the Application

Once the server starts, you have two options:

#### Option 1: Decoy Mode (Stealth) - Recommended
```
http://localhost:5000
```
- Shows a professional tech blog
- Keylogger runs automatically in background
- Secret access to admin dashboard

**To access admin dashboard from decoy:**
- Click bottom-right corner 5 times quickly, OR
- Press Ctrl+Shift+A three times, OR
- Navigate to `http://localhost:5000/admin-dashboard-secret`

#### Option 2: Direct Admin Access
```
http://localhost:5000/admin-dashboard-secret
```
- Direct access to keylogger controls
- No decoy page

**📖 For detailed stealth mode instructions, see [STEALTH_MODE_GUIDE.md](STEALTH_MODE_GUIDE.md)**

## 📖 How to Use

### Starting Keystroke Logging

1. **Set Logging Interval**: Enter the desired interval (in seconds) for auto-saving logs
   - Minimum: 10 seconds
   - Default: 60 seconds
   - Maximum: 3600 seconds (1 hour)

2. **Click "START LOGGING"**: The system will begin capturing keystrokes
   - Status badge will change to "ACTIVE"
   - Stats will update in real-time
   - Logs will auto-save at the specified interval

### Monitoring Active Session

The dashboard displays four key metrics:
- **Status**: Current state (Active/Inactive)
- **Start Time**: When the current session began
- **Buffer Size**: Number of characters captured since last save
- **Session Logs**: Number of log files created in current session

### Viewing Logs

1. Captured logs appear in the "Captured Logs" section
2. Click on any log file to view its contents
3. Each log shows:
   - Filename with timestamp
   - File size
   - Last modified date

### Stopping Logging

1. Click "STOP LOGGING" to halt keystroke capture
2. The system will:
   - Save any remaining buffer to a log file
   - Update the status to "STANDBY"
   - Enable interval modification

## 🗂️ Log File Format

Log files are saved in the `logs/` directory with the following naming convention:

```
keylog_YYYY-MM-DD_HH-MM-SS_YYYY-MM-DD_HH-MM-SS.txt
```

Each log file contains:
```
Keylog Report
Start Time: 2026-01-29 14:30:00
End Time: 2026-01-29 14:31:00
--------------------------------------------------

[Captured keystrokes here]
```

## ⚙️ API Endpoints

The application provides the following REST API endpoints:

### Start Logging
```http
POST /api/start
Content-Type: application/json

{
  "interval": 60
}
```

### Stop Logging
```http
POST /api/stop
```

### Get Status
```http
GET /api/status
```

### List Logs
```http
GET /api/logs
```

### Get Log Content
```http
GET /api/logs/<filename>
```

## 🔒 Security & Privacy Notes

**Important Considerations:**

1. **Legal Use Only**: This tool is for educational purposes and authorized monitoring only
2. **Administrator Access**: Requires elevated privileges to function
3. **Privacy**: Be transparent about keystroke monitoring with users
4. **Data Protection**: Log files contain sensitive data - secure them appropriately
5. **Compliance**: Ensure compliance with local laws and regulations

## 🐛 Troubleshooting

### Issue: "Permission Denied" Error

**Solution**: Run the application with administrator/root privileges
```bash
# Windows: Run as Administrator
# Linux/macOS: Use sudo
sudo python3 app.py
```

### Issue: "Module not found" Error

**Solution**: Ensure all dependencies are installed
```bash
pip install -r requirements.txt
```

### Issue: Keyboard Library Not Working on Linux

**Solution**: Install system dependencies
```bash
sudo apt-get install python3-dev
pip install keyboard --break-system-packages
```

### Issue: Browser Can't Connect

**Solution**: Check if the Flask server is running
- Verify the server is running on port 5000
- Check firewall settings
- Try accessing via `http://127.0.0.1:5000`

## 🎨 Customization

### Changing Colors

Edit `static/style.css` and modify the CSS variables:

```css
:root {
    --primary: #00ff88;        /* Main accent color */
    --danger: #ff2e63;         /* Danger/stop color */
    --bg-dark: #0a0e27;        /* Background color */
    /* ... other variables ... */
}
```

### Modifying Fonts

Replace the Google Fonts import in `templates/index.html`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=YourFont&display=swap">
```

### Adjusting Animations

Edit animation parameters in `static/style.css`:

```css
@keyframes yourAnimation {
    /* Your custom animation */
}
```

## 📝 Project Structure Explained

```
├── app.py                  # Flask server & Keylogger class
│   ├── Keylogger class    # Core logging functionality
│   ├── API routes         # REST endpoints
│   └── Server config      # Flask configuration
│
├── templates/index.html    # Main UI
│   ├── Header section     # Logo & status
│   ├── Control panel      # Start/stop controls
│   ├── Stats dashboard    # Real-time metrics
│   └── Logs section       # Log file viewer
│
├── static/
│   ├── style.css          # All styling & animations
│   └── script.js          # Frontend logic & API calls
│
└── logs/                   # Auto-created log storage
```

## 🚀 Future Enhancements

Potential features for future versions:
- User authentication system
- Export logs in different formats (JSON, CSV)
- Real-time keystroke preview (with privacy toggles)
- Advanced filtering and search
- Email notifications for specific keywords
- Multi-session comparison
- Cloud storage integration
- Encrypted log files

## 📄 License

This project is for educational purposes only. Use responsibly and ethically.

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for your learning purposes.

## ⚠️ Disclaimer

This software is provided for educational and research purposes only. Users are solely responsible for ensuring their use complies with applicable laws and regulations. The developers assume no liability for misuse of this software.

---

**Built with 💚 for your Major Project**

For questions or issues, refer to the troubleshooting section or review the code comments for detailed explanations.
