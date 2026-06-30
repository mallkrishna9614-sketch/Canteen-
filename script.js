const API = "https://backend1-i1jb.onrender.com";

// ===== PASSWORD TOGGLE =====
document.getElementById('toggle-pw').addEventListener('click', () => {
    const pw = document.getElementById('password');
    const eyeOff = document.querySelector('.eye-off');
    const eyeOn = document.querySelector('.eye-on');
    const isHidden = pw.type === 'password';
    pw.type = isHidden ? 'text' : 'password';
    eyeOff.style.display = isHidden ? 'none' : 'block';
    eyeOn.style.display = isHidden ? 'block' : 'none';
});

// ===== ROLE-BASED DYNAMIC FORM =====
const roleConfig = {
    student: {
        label: 'Student Register No.',
        placeholder: 'Enter your student register number',
        noticeTitle: 'This portal is for LPU students only.',
        noticeDesc: 'Use your valid LPU student register no. and password to access.',
        cardSub: 'Access your LPU Canteen account',
        numericOnly: true
    },
    faculty: {
        label: 'Faculty No.',
        placeholder: 'Enter your faculty number',
        noticeTitle: 'Faculty access portal.',
        noticeDesc: 'Use your credentials to access the LPU Canteen system.',
        cardSub: 'Access your LPU Canteen account',
        numericOnly: true
    },
    staff: {
        label: 'Staff Username',
        placeholder: 'Enter your staff username',
        noticeTitle: 'Staff access portal.',
        noticeDesc: 'Use your canteen staff username and password to login.',
        cardSub: 'Staff Management Portal',
        numericOnly: false  // Staff usernames are text (e.g. Coffee, Teaislove)
    }
};

document.getElementById('role').addEventListener('change', function () {
    const config = roleConfig[this.value];
    if (!config) return;

    document.querySelector('#reg-group label').textContent = config.label;
    document.getElementById('reg-number').placeholder = config.placeholder;
    document.getElementById('security-notice').querySelector('strong').textContent = config.noticeTitle;
    document.getElementById('security-notice').querySelector('span').textContent = config.noticeDesc;
    document.querySelector('.card-sub').textContent = config.cardSub;

    clearErrors();
});

// ===== REGISTER NUMBER — Numeric-only for student/faculty, free-text for staff =====
document.getElementById('reg-number').addEventListener('input', function () {
    const role = document.getElementById('role').value;
    if (role !== 'staff') {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});

document.getElementById('reg-number').addEventListener('keydown', function (e) {
    const role = document.getElementById('role').value;
    if (role === 'staff') return; // Allow all characters for staff username

    const allowed = [8, 9, 13, 27, 46, 37, 38, 39, 40];
    if (allowed.includes(e.keyCode)) return;
    if ((e.ctrlKey || e.metaKey) && [65, 67, 86, 88].includes(e.keyCode)) return;
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

// ===== LOGIN =====
async function handleLogin(e) {
    e.preventDefault();
    clearErrors();

    const reg  = document.getElementById('reg-number').value.trim();
    const pw   = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const config = roleConfig[role];

    let valid = true;

    if (!reg) {
        showError('reg-group', 'reg-error', `Please enter your ${(config?.label || 'ID').toLowerCase()}`);
        valid = false;
    }
    if (!pw) {
        showError('pass-group', 'pass-error', 'Please enter your password');
        valid = false;
    }
    if (!valid) return false;

    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.innerHTML = '<span>Verifying...</span>';

    try {
        let response, data;

        if (role === 'staff') {
            // ── STAFF LOGIN: Uses dedicated staff endpoint ──────────────────
            // Backend returns { token, staff: { assignedCanteen, name, ... } }
            // The canteen is embedded in the JWT — no store selection needed.
            response = await fetch(`${API}/api/staff/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: reg, password: pw }),
            });
            data = await response.json();

            if (response.ok) {
                btn.classList.add('success');
                btn.innerHTML = `
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Welcome ${data.staff.name}!</span>
                `;

                // Store JWT + staff info — NO assignedStore selection needed
                localStorage.setItem('staffToken', data.token);
                localStorage.setItem('staffData', JSON.stringify(data.staff));
                localStorage.setItem('userRole', 'staff');

                // Legacy keys that staff.html reads
                localStorage.setItem('token', data.token);
                localStorage.setItem('studentData', JSON.stringify({
                    name: data.staff.name,
                    canteen: data.staff.assignedCanteen,
                    role: 'staff'
                }));
                localStorage.setItem('assignedStore', data.staff.assignedCanteen);

                setTimeout(() => {
                    window.location.href = 'frontend/staff.html';
                }, 1200);

            } else {
                btn.disabled = false;
                btn.innerHTML = '<span>Login</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
                showError('pass-group', 'pass-error', data.message || 'Invalid credentials');
            }

        } else {
            // ── STUDENT / FACULTY LOGIN: Original endpoint ──────────────────
            response = await fetch(`${API}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ registrationNumber: reg, password: pw, role }),
            });
            data = await response.json();

            if (response.ok) {
                btn.classList.add('success');
                btn.innerHTML = `
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Verified!</span>
                `;

                localStorage.setItem('token', data.token);
                localStorage.setItem('studentData', JSON.stringify(data.user));
                localStorage.setItem('studentRegNo', data.user.registrationNumber);
                localStorage.setItem('userRole', data.user.role);

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1200);

            } else {
                btn.disabled = false;
                btn.innerHTML = '<span>Login</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
                showError('pass-group', 'pass-error', data.message || 'Invalid Credentials');
            }
        }

    } catch (error) {
        console.error(error);
        btn.disabled = false;
        btn.innerHTML = '<span>Login</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
        alert('Server Error. Make sure backend is running.');
    }

    return false;
}

// ===== SHOW / CLEAR ERRORS =====
function showError(groupId, errorId, msg) {
    const wrap = document.querySelector(`#${groupId} .input-wrap`);
    const err  = document.getElementById(errorId);
    wrap.classList.add('error', 'shake');
    err.textContent = msg;
    err.classList.add('show');
    setTimeout(() => wrap.classList.remove('shake'), 400);
}

function clearErrors() {
    document.querySelectorAll('.input-wrap').forEach(w => w.classList.remove('error', 'shake'));
    document.querySelectorAll('.error-msg').forEach(e => { e.classList.remove('show'); e.textContent = ''; });
}

// Clear errors on focus
document.querySelectorAll('#login-form input, #login-form select').forEach(el => {
    el.addEventListener('focus', clearErrors);
});

// ===== MOBILE FOOTER =====
function setupMobile() {
    const breakpoint = 992;
    if (window.innerWidth > breakpoint) {
        document.querySelectorAll('.mobile-footer').forEach(e => e.remove());
        return;
    }
    if (document.querySelector('.mobile-footer')) return;

    const footer = document.createElement('div');
    footer.className = 'mobile-footer fade-in';
    footer.innerHTML = `
        <div class="mobile-footer-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div>
                <span>Lovely Professional University</span>
                <span>Phagwara, Punjab – 144411</span>
            </div>
        </div>
        <div class="mobile-footer-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <a href="https://www.lpu.in" target="_blank">www.lpu.in</a>
        </div>
        <div class="mobile-footer-social">
            <span>Follow us on</span>
            <div class="social-icons">
                <a href="https://www.instagram.com/lpuuniversity/" target="_blank" aria-label="Instagram" class="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="https://www.facebook.com/LPUUniversity/" target="_blank" aria-label="Facebook" class="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="https://x.com/lpuuniversity" target="_blank" aria-label="X" class="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="https://www.linkedin.com/school/h.l.-agrawal-b.ed.-college-betul/?originalSubdomain=in" target="_blank" aria-label="LinkedIn" class="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            </div>
        </div>
    `;
    document.getElementById('login-page').appendChild(footer);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    setupMobile();
    window.addEventListener('resize', setupMobile);
});