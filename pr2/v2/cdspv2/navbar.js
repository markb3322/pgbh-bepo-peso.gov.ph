/**
 * navbar.js — BEPO-PESO Admin Navigation System
 * Design: Glassmorphism + Bottom Bar + Warm Amber/Orange
 * Fixed: School name connected via school_id from events table
 * Displays: Profile picture, full name (first_name + last_name), and ID number
 */

(function () {
  'use strict';

  const CSS_ID = 'cdsp-navbar-styles';
  const SB_URL = 'https://iharcxdakmyxjpqpcbnb.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloYXJjeGRha215eGpwcXBjYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODc0NDEsImV4cCI6MjA5NDA2MzQ0MX0.5BE8ckW-3g5mJmXyrDWO_cytfI-_JrMaV4LQip7pbvs';

  const NAV_ITEMS = [
    { id: 'nav-home',     href: 'index.html',       label: 'Home',      icon: '🏠' },
    { id: 'nav-map',      href: 'map.html',         label: 'Map',       icon: '🗺️' },
    { id: 'nav-calendar', href: 'calendar.html',    label: 'Calendar',  icon: '📅' },
    { id: 'nav-records',  href: 'list_record.html', label: 'Records',   icon: '📋' },
    { id: 'nav-schools',  href: 'add_school.html',  label: 'Schools',   icon: '🏫' },
    { id: 'nav-reports',  href: 'report.html',      label: 'Reports',   icon: '📊' },
  ];

  const PAGE_MAP = {
    'index.html':       'nav-home',
    '':                 'nav-home',
    'map.html':         'nav-map',
    'cdsp_map.html':    'nav-map',
    'calendar.html':    'nav-calendar',
    'list_record.html': 'nav-records',
    'add_school.html':  'nav-schools',
    'school.html':      'nav-schools',
    'report.html':      'nav-reports',
  };

  const MUNICIPALITY_COORDS = {
    'Alburquerque': [9.6078, 123.9586], 'Antequera': [9.7856, 123.8933], 'Baclayon': [9.6229, 123.9128],
    'Balilihan': [9.7567, 123.9683], 'Calape': [9.8883, 123.8733], 'Catigbian': [9.8578, 123.9922],
    'Clarin': [9.9683, 124.0244], 'Corella': [9.6883, 123.9217], 'Cortes': [9.7222, 123.8767],
    'Dauis': [9.6244, 123.8592], 'Loon': [9.8000, 123.7900], 'Maribojoc': [9.7472, 123.8467],
    'Panglao': [9.5794, 123.7564], 'Sikatuna': [9.6881, 123.9744], 'Tubigon': [9.9550, 123.9611],
    'Tagbilaran City': [9.6558, 123.8542], 'City of Tagbilaran': [9.6558, 123.8542],
    'Bien Unido': [10.1431, 124.3822], 'Buenavista': [10.0828, 124.1150], 'Carmen': [9.8256, 124.1942],
    'Dagohoy': [9.9167, 124.3167], 'Danao': [9.9533, 124.2211], 'Getafe': [10.1514, 124.1558],
    'Inabanga': [10.0317, 124.0714], 'President Carlos P. Garcia': [10.1239, 124.5572],
    'Sagbayan': [9.9144, 124.0942], 'San Miguel': [9.9967, 124.3392], 'Talibon': [10.1531, 124.3247],
    'Trinidad': [10.0797, 124.3422], 'Ubay': [10.0600, 124.4731], 'Alicia': [9.8911, 124.4433],
    'Anda': [9.7419, 124.5719], 'Batuan': [9.7853, 124.1431], 'Bilar': [9.7097, 124.1058],
    'Candijay': [9.8192, 124.4972], 'Dimiao': [9.6208, 124.1628], 'Duero': [9.7117, 124.4075],
    'Garcia Hernandez': [9.6197, 124.2967], 'Guindulman': [9.7658, 124.4886], 'Jagna': [9.6500, 124.3725],
    'Lila': [9.5944, 124.0992], 'Loay': [9.5994, 124.0117], 'Loboc': [9.6383, 124.0364],
    'Mabini': [9.8639, 124.5214], 'Pilar': [9.8589, 124.3461], 'Sevilla': [9.7033, 124.0489],
    'Sierra Bullones': [9.8156, 124.2961], 'Valencia': [9.6150, 124.2092], 'San Isidro': [9.9419, 124.0786]
  };

  let schoolsData = [];

  function ensureStyles() {
    if (document.getElementById(CSS_ID)) return;
    const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');

:root {
  --topbar-h:        60px;
  --bottom-bar-h:    68px;

  /* Amber / Orange palette */
  --accent:          #f59e0b;
  --accent-2:        #ea580c;
  --accent-glow:     rgba(245, 158, 11, 0.35);
  --accent-dim:      rgba(245, 158, 11, 0.12);
  --accent-dim2:     rgba(234, 88, 12, 0.10);

  /* Glass surfaces */
  --glass-bg:        rgba(255, 255, 255, 0.72);
  --glass-border:    rgba(255, 255, 255, 0.55);
  --glass-shadow:    0 8px 32px rgba(15, 10, 0, 0.12);
  --glass-blur:      blur(20px) saturate(180%);

  /* Text */
  --text:            #1a0f00;
  --text2:           #5a4a38;
  --muted:           #a08060;

  /* Background mesh */
  --page-bg:         #fff8f0;

  --font:            'Outfit', system-ui, sans-serif;
  --mono:            'JetBrains Mono', monospace;

  --radius-pill:     100px;
  --radius-lg:       20px;
  --radius-md:       14px;
  --radius-sm:       10px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--page-bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(245,158,11,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(234,88,12,0.12) 0%, transparent 55%);
  min-height: 100vh;
}

/* ===================== TOPBAR ===================== */
.cdsp-topbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--topbar-h);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  font-family: var(--font);
}

.cdsp-topbar-left  { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.cdsp-topbar-center{ flex: 1; display: flex; align-items: center; justify-content: center; }
.cdsp-topbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

/* Logo */
.cdsp-logo-area { display: flex; align-items: center; gap: 10px; text-decoration: none; }

.cdsp-logo-mark {
  width: 36px; height: 36px; border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 4px 14px var(--accent-glow);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #fff;
  font-family: var(--mono); flex-shrink: 0; overflow: hidden;
}
.cdsp-logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cdsp-logo-initials { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }

.cdsp-brand-text  { display: flex; flex-direction: column; line-height: 1.25; }
.cdsp-brand-title { font-size: 13px; font-weight: 700; color: var(--text); letter-spacing: -0.3px; }
.cdsp-brand-sub   { font-size: 9.5px; color: var(--muted); font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; }

/* Datetime */
.cdsp-datetime {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--mono);
  font-size: 11.5px; color: var(--text2);
  white-space: nowrap; user-select: none;
  background: var(--accent-dim);
  border: 1px solid rgba(245,158,11,0.2);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
}
.cdsp-datetime .dt-time   { font-weight: 600; color: var(--text); font-size: 12.5px; }
.cdsp-datetime .dt-divider{ width: 1px; height: 14px; background: rgba(245,158,11,0.3); }
.cdsp-datetime .dt-date   { color: var(--muted); font-size: 10.5px; }

/* Bell */
.cdsp-reminder {
  position: relative; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  transition: all 0.25s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
}
.cdsp-reminder:hover {
  background: var(--accent-dim);
  border-color: rgba(245,158,11,0.4);
  box-shadow: 0 0 0 4px var(--accent-glow);
  transform: scale(1.08);
}
.cdsp-reminder i { font-size: 17px; color: var(--text2); }
.cdsp-reminder-badge {
  position: absolute; top: -3px; right: -3px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: white; font-size: 9px; font-weight: 700;
  min-width: 17px; height: 17px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px; font-family: var(--mono);
  border: 2px solid white;
  box-shadow: 0 2px 6px var(--accent-glow);
}

/* Profile chip */
.cdsp-profile-chip {
  display: flex; align-items: center; gap: 10px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-pill);
  padding: 4px 14px 4px 4px;
  cursor: pointer;
  max-width: 220px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  transition: all 0.25s ease;
}
.cdsp-profile-chip:hover {
  background: var(--accent-dim);
  border-color: rgba(245,158,11,0.4);
  box-shadow: 0 4px 18px var(--accent-glow);
}

.cdsp-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: #fff;
  flex-shrink: 0; overflow: hidden;
  box-shadow: 0 0 0 3px var(--accent-dim), 0 0 0 5px rgba(245,158,11,0.1);
}
.cdsp-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

.cdsp-profile-info { overflow: hidden; }
.cdsp-profile-name {
  font-size: 12.5px; font-weight: 600; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 130px; line-height: 1.2;
}
.cdsp-profile-role { font-size: 10px; color: var(--muted); font-weight: 500; white-space: nowrap; }

/* ===================== BOTTOM BAR (all screen sizes) ===================== */
.cdsp-bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: var(--bottom-bar-h);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--glass-border);
  box-shadow: 0 -8px 32px rgba(15,10,0,0.10);
  z-index: 1000;
  font-family: var(--font);
}

.cdsp-bottom-nav {
  display: flex; align-items: center; justify-content: space-around;
  height: 100%; list-style: none; padding: 0 4px;
}

.cdsp-bottom-nav li { flex: 1; }

.cdsp-bottom-nav a {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; padding: 8px 4px;
  text-decoration: none;
  color: var(--muted);
  font-size: 10px; font-weight: 600;
  border-radius: var(--radius-md);
  transition: all 0.22s ease;
  position: relative;
}
.cdsp-bottom-nav a .mob-icon {
  font-size: 21px;
  transition: transform 0.22s ease;
}
.cdsp-bottom-nav a:hover {
  color: var(--text2);
  background: var(--accent-dim2);
}
.cdsp-bottom-nav a:hover .mob-icon { transform: translateY(-2px); }

.cdsp-bottom-nav a.active {
  color: var(--accent-2);
}
.cdsp-bottom-nav a.active .mob-icon { transform: translateY(-3px); }

/* Active pill dot indicator */
.cdsp-bottom-nav a.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%; transform: translateX(-50%);
  width: 18px; height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 4px;
  box-shadow: 0 1px 6px var(--accent-glow);
}

.cdsp-bottom-nav a.danger { color: rgba(239,68,68,0.55); }
.cdsp-bottom-nav a.danger:hover { color: #ef4444; background: rgba(239,68,68,0.08); }

/* ===================== CONTENT SHIFT ===================== */
.cdsp-content-shift {
  margin-top: var(--topbar-h);
  margin-bottom: var(--bottom-bar-h);
  min-height: calc(100vh - var(--topbar-h) - var(--bottom-bar-h));
}

/* ===================== REMINDER MODAL ===================== */
.cdsp-reminder-modal {
  position: fixed; top: 70px; right: 20px;
  width: 380px; max-height: 500px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(15,10,0,0.18), 0 0 0 1px rgba(255,255,255,0.5) inset;
  z-index: 1001;
  display: none; flex-direction: column; overflow: hidden;
}
.cdsp-reminder-modal.active { display: flex; animation: glassSlideDown 0.28s cubic-bezier(0.22,1,0.36,1); }

@keyframes glassSlideDown {
  from { opacity: 0; transform: translateY(-12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.cdsp-reminder-header {
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(234,88,12,0.08));
  border-bottom: 1px solid rgba(245,158,11,0.2);
  font-weight: 700; font-size: 13px; color: var(--text);
  display: flex; justify-content: space-between; align-items: center;
}
.cdsp-reminder-header-actions { display: flex; gap: 8px; }
.cdsp-reminder-header-actions button {
  background: none; border: none; cursor: pointer;
  color: var(--muted); font-size: 13px; padding: 4px;
  border-radius: 6px; transition: all 0.2s;
}
.cdsp-reminder-header-actions button:hover { color: var(--accent-2); background: var(--accent-dim); }

.cdsp-reminder-list { max-height: 420px; overflow-y: auto; padding: 10px; }
.cdsp-reminder-list::-webkit-scrollbar { width: 4px; }
.cdsp-reminder-list::-webkit-scrollbar-track { background: transparent; }
.cdsp-reminder-list::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 4px; }

.cdsp-reminder-item {
  padding: 12px 14px;
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.22s ease;
  border-left: 3px solid var(--accent);
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.6);
  border-left: 3px solid var(--accent);
  backdrop-filter: blur(8px);
}
.cdsp-reminder-item:hover {
  background: rgba(255,248,240,0.85);
  transform: translateX(-3px);
  box-shadow: 4px 0 18px rgba(245,158,11,0.15);
}
.cdsp-reminder-item .event-name  { font-weight: 700; font-size: 12.5px; color: var(--text); margin-bottom: 5px; }
.cdsp-reminder-item .event-details{ font-size: 10px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
.cdsp-reminder-item .event-details span { display: inline-flex; align-items: center; gap: 3px; }

.cdsp-reminder-empty { padding: 30px 20px; text-align: center; color: var(--muted); font-size: 13px; }

.cdsp-reminder-footer {
  padding: 10px 16px;
  border-top: 1px solid rgba(245,158,11,0.15);
  font-size: 10px; color: var(--muted); text-align: center;
  background: rgba(255,248,240,0.5);
}

/* ===================== EVENT MODAL ===================== */
.cdsp-event-modal {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15,10,0,0.5);
  backdrop-filter: blur(8px) saturate(150%);
  z-index: 2000; display: none; align-items: center; justify-content: center;
}
.cdsp-event-modal.active { display: flex; }

.cdsp-modal-container {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  width: 90%; max-width: 750px; max-height: 87vh;
  border-radius: 28px; overflow: hidden;
  box-shadow: 0 30px 80px rgba(15,10,0,0.25), 0 0 0 1px rgba(255,255,255,0.55) inset;
  animation: modalUp 0.32s cubic-bezier(0.22,1,0.36,1);
}
@keyframes modalUp {
  from { opacity: 0; transform: translateY(28px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.cdsp-modal-header {
  padding: 18px 22px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: white; display: flex; justify-content: space-between; align-items: center;
}
.cdsp-modal-header h3 { font-size: 15px; font-weight: 700; }
.cdsp-modal-close {
  background: rgba(255,255,255,0.2); border: none;
  width: 32px; height: 32px; border-radius: 50%;
  cursor: pointer; color: white; font-size: 18px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.cdsp-modal-close:hover { background: rgba(255,255,255,0.35); transform: rotate(90deg); }

.cdsp-modal-body {
  padding: 22px;
  max-height: calc(87vh - 70px);
  overflow-y: auto;
}

.cdsp-event-map {
  height: 260px; border-radius: var(--radius-lg);
  margin-bottom: 20px; overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 20px rgba(15,10,0,0.1);
}

.cdsp-event-info {
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 6px 0;
}

.cdsp-info-row {
  display: flex; padding: 12px 18px;
  border-bottom: 1px solid rgba(245,158,11,0.1);
}
.cdsp-info-row:last-child { border-bottom: none; }

.cdsp-info-label {
  width: 110px; font-weight: 700;
  font-size: 10px; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.7px;
  padding-top: 1px;
}
.cdsp-info-value { flex: 1; font-size: 13px; color: var(--text); font-weight: 500; }
.cdsp-info-description { font-size: 12px; color: var(--text2); line-height: 1.55; margin-top: 3px; }

.cdsp-status-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: var(--radius-pill);
  font-size: 11px; font-weight: 700;
}
.cdsp-status-incomplete {
  background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(234,88,12,0.12));
  color: var(--accent-2);
  border: 1px solid rgba(245,158,11,0.3);
}

/* Orange map pin */
.orange-pin-marker {
  background: var(--accent);
  width: 40px; height: 40px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  position: relative;
  box-shadow: 0 4px 16px rgba(245,158,11,0.5);
  border: 3px solid white;
  cursor: pointer;
  animation: pinPulse 1.8s infinite;
}
@keyframes pinPulse {
  0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.5); }
  70%  { box-shadow: 0 0 0 14px rgba(245,158,11,0); }
  100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
}
.orange-pin-marker i {
  position: absolute;
  transform: rotate(45deg);
  left: 11px; top: 10px;
  font-size: 16px; color: white;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 700px) {
  .cdsp-brand-sub    { display: none; }
  .cdsp-datetime     { display: none; }
  .cdsp-profile-name,
  .cdsp-profile-role { display: none; }
  .cdsp-profile-chip { padding: 4px; }
  .cdsp-topbar       { padding: 0 12px; }
  .cdsp-reminder-modal { right: 8px; left: 8px; width: auto; }
  .cdsp-modal-container { width: 96%; margin: 0; }
  .cdsp-event-map    { height: 190px; }
  .cdsp-bottom-nav a { font-size: 9px; }
  .cdsp-bottom-nav a .mob-icon { font-size: 19px; }
}
`;
    const style = document.createElement('style');
    style.id = CSS_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getInitials(name) {
    if (!name) return 'US';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  }

  function buildNavHTML(userName, userRole, avatarSrc) {
    const initials = getInitials(userName);

    const chipAvatar = avatarSrc
      ? `<div class="cdsp-avatar"><img src="${avatarSrc}" alt="Profile" onerror="this.parentElement.textContent='${initials}'" /></div>`
      : `<div class="cdsp-avatar">${initials}</div>`;

    const bottomNavHTML = NAV_ITEMS.map(item => `
      <li><a href="${item.href}" id="mob-${item.id}">
        <span class="mob-icon">${item.icon}</span>
        <span>${item.label}</span>
      </a></li>`).join('');

    return `
<header class="cdsp-topbar" role="banner">
  <div class="cdsp-topbar-left">
    <div class="cdsp-logo-area">
      <div class="cdsp-logo-mark">
        <img src="image/bepo.png" alt="Logo"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="cdsp-logo-initials" style="display:none">BP</div>
      </div>
      <div class="cdsp-brand-text">
        <div class="cdsp-brand-title">Career Development Support Program</div>
        <div class="cdsp-brand-sub">CDSP · BEPO-PESO</div>
      </div>
    </div>
  </div>

  <div class="cdsp-topbar-center">
    <div class="cdsp-datetime" id="cdsp-datetime">
      <span class="dt-time" id="dt-time">--:--:--</span>
      <span class="dt-divider"></span>
      <span class="dt-date" id="dt-date">---, -- ----</span>
    </div>
  </div>

  <div class="cdsp-topbar-right">
    <div class="cdsp-reminder" id="cdsp-reminder" title="Incomplete Events">
      <i class="fas fa-bell"></i>
      <span class="cdsp-reminder-badge" id="reminder-badge" style="display:none;">0</span>
    </div>
    <div class="cdsp-profile-chip" id="cdsp-profile-chip" title="User Profile">
      ${chipAvatar}
      <div class="cdsp-profile-info">
        <div class="cdsp-profile-name">${userName}</div>
        <div class="cdsp-profile-role">${userRole}</div>
      </div>
    </div>
  </div>
</header>

<!-- Reminder dropdown -->
<div class="cdsp-reminder-modal" id="cdsp-reminder-modal">
  <div class="cdsp-reminder-header">
    <span><i class="fas fa-exclamation-triangle" style="color:var(--accent);margin-right:6px;"></i>Incomplete Events</span>
    <div class="cdsp-reminder-header-actions">
      <button id="refresh-reminder" title="Refresh"><i class="fas fa-sync-alt"></i></button>
      <button id="close-reminder" title="Close"><i class="fas fa-times"></i></button>
    </div>
  </div>
  <div class="cdsp-reminder-list" id="reminder-list">
    <div class="cdsp-reminder-empty"><i class="fas fa-spinner fa-pulse"></i> Loading events…</div>
  </div>
  <div class="cdsp-reminder-footer">
    <i class="fas fa-map-marker-alt" style="color:var(--accent);"></i>&nbsp;Tap any event to view on map
  </div>
</div>

<!-- Event detail modal -->
<div class="cdsp-event-modal" id="cdsp-event-modal">
  <div class="cdsp-modal-container">
    <div class="cdsp-modal-header">
      <h3><i class="fas fa-map-marker-alt" style="margin-right:8px;"></i>Incomplete Event Details</h3>
      <button class="cdsp-modal-close" onclick="document.getElementById('cdsp-event-modal').classList.remove('active')">✕</button>
    </div>
    <div class="cdsp-modal-body">
      <div class="cdsp-event-map" id="event-map"></div>
      <div class="cdsp-event-info" id="event-info">
        <div class="cdsp-info-row"><div class="cdsp-info-label">Event Name</div><div class="cdsp-info-value" id="modal-event-name">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">School</div><div class="cdsp-info-value" id="modal-event-school">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">Municipality</div><div class="cdsp-info-value" id="modal-event-muni">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">Barangay</div><div class="cdsp-info-value" id="modal-event-barangay">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">District</div><div class="cdsp-info-value" id="modal-event-district">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">Date</div><div class="cdsp-info-value" id="modal-event-date">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">Venue</div><div class="cdsp-info-value" id="modal-event-venue">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">Students</div><div class="cdsp-info-value" id="modal-event-students">-</div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">Status</div><div class="cdsp-info-value"><span class="cdsp-status-badge cdsp-status-incomplete" id="modal-event-status">⚠ Incomplete</span></div></div>
        <div class="cdsp-info-row"><div class="cdsp-info-label">Description</div><div class="cdsp-info-value cdsp-info-description" id="modal-event-description">-</div></div>
      </div>
    </div>
  </div>
</div>

<!-- Bottom navigation bar (all screens) -->
<nav class="cdsp-bottom-bar" id="cdsp-bottom-bar" aria-label="Main navigation">
  <ul class="cdsp-bottom-nav">
    ${bottomNavHTML}
    <li><a href="logout.html" id="mob-nav-logout" class="danger">
      <span class="mob-icon">🚪</span>
      <span>Logout</span>
    </a></li>
  </ul>
</nav>`;
  }

  function markActive() {
    const page = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const id = PAGE_MAP[page];
    if (id) {
      const mobEl = document.getElementById('mob-' + id);
      if (mobEl) mobEl.classList.add('active');
    }
  }

  function shiftContent() {
    const selectors = [
      '.app-shell', '#app-shell', '.main-content', '#main-content',
      '.main', '#main', 'main', '.content', '#content',
      '.page-content', '#page-content', '.register-wrapper', '.edit-wrapper',
      '.view-wrapper', '.dashboard', '.page',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) { el.classList.add('cdsp-content-shift'); return; }
    }
  }

  function updateDateTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const phNow = new Date(utc + 3600000 * 8);

    let hours = phNow.getHours();
    const minutes = String(phNow.getMinutes()).padStart(2, '0');
    const seconds = String(phNow.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeStr = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dateStr = `${days[phNow.getDay()]}, ${months[phNow.getMonth()]} ${phNow.getDate()}, ${phNow.getFullYear()}`;

    const timeEl = document.getElementById('dt-time');
    const dateEl = document.getElementById('dt-date');
    if (timeEl) timeEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
  }

  async function fetchProfile() {
    const userId = sessionStorage.getItem('bepo_user_id');
    if (!userId) return null;
    try {
      const res = await fetch(
        `${SB_URL}/rest/v1/members?id=eq.${userId}&select=first_name,last_name,profile_url,role,id_number`,
        { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.length > 0 ? data[0] : null;
    } catch (e) {
      console.warn('CDSP Navbar: profile fetch failed', e);
      return null;
    }
  }

  function updateProfileUI(profile) {
    if (!profile) return;
    const fullname = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    const name  = fullname || sessionStorage.getItem('bepo_user_name') || 'Member';
    const role  = profile.id_number || profile.role || sessionStorage.getItem('bepo_id_number') || 'CDSP';
    const avatar = profile.profile_url || null;
    const initials = getInitials(name);

    const chip = document.getElementById('cdsp-profile-chip');
    if (chip) {
      const nameEl   = chip.querySelector('.cdsp-profile-name');
      const roleEl   = chip.querySelector('.cdsp-profile-role');
      const avatarEl = chip.querySelector('.cdsp-avatar');
      if (nameEl)   nameEl.textContent = name;
      if (roleEl)   roleEl.textContent = role;
      if (avatarEl) {
        avatarEl.innerHTML = avatar
          ? `<img src="${avatar}" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentElement.textContent='${initials}'" />`
          : initials;
      }
    }
    sessionStorage.setItem('bepo_user_name', name);
  }

  async function fetchSchools() {
    try {
      const sb = window.supabase.createClient(
        'https://lfmcgktlmdiwddngytkq.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbWNna3RsbWRpd2Rkbmd5dGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDQ0NTIsImV4cCI6MjA5NTQ4MDQ1Mn0.yRluC6tQAKSfSXsKdDtils5ztk-CLZzjatjOHx1ot2s'
      );
      const { data, error } = await sb.from('schools').select('id, school_name');
      if (error) throw error;
      if (data) schoolsData = data;
      return schoolsData;
    } catch (err) {
      console.error('Error fetching schools:', err);
      return [];
    }
  }

  function getSchoolName(schoolId) {
    if (!schoolId) return 'No school assigned';
    const school = schoolsData.find(s => s.id == schoolId);
    return school ? school.school_name : 'School not found';
  }

  async function fetchIncompleteEvents() {
    try {
      const sb = window.supabase.createClient(
        'https://lfmcgktlmdiwddngytkq.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbWNna3RsbWRpd2Rkbmd5dGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDQ0NTIsImV4cCI6MjA5NTQ4MDQ1Mn0.yRluC6tQAKSfSXsKdDtils5ztk-CLZzjatjOHx1ot2s'
      );
      const { data, error } = await sb
        .from('cdsp_events')
        .select('id, event_name, municipality, barangay, status, district, school_id, description, event_date, venue, total_students')
        .eq('status', 'Incomplete')
        .order('event_date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching incomplete events:', err);
      return [];
    }
  }

  function updateReminderBadge(count) {
    const badge = document.getElementById('reminder-badge');
    if (badge) {
      if (count > 0) { badge.textContent = count > 99 ? '99+' : count; badge.style.display = 'flex'; }
      else badge.style.display = 'none';
    }
  }

  function createOrangePinIcon() {
    return L.divIcon({
      html: `<div class="orange-pin-marker"><i class="fas fa-exclamation-triangle"></i></div>`,
      iconSize: [40, 40], iconAnchor: [20, 38], popupAnchor: [0, -38],
      className: 'custom-orange-pin'
    });
  }

  let currentMap = null;

  function initEventMapWithOrangePin(lat, lng, municipality, eventName) {
    const mapContainer = document.getElementById('event-map');
    if (!mapContainer) return;
    if (currentMap) { currentMap.remove(); currentMap = null; }
    currentMap = L.map('event-map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM &copy; CartoDB', subdomains: 'abcd', maxZoom: 19, minZoom: 3
    }).addTo(currentMap);
    const orangeIcon = createOrangePinIcon();
    const marker = L.marker([lat, lng], { icon: orangeIcon }).addTo(currentMap);
    marker.bindPopup(`<b style="color:var(--accent);">⚠ Incomplete Event</b><br><b>Event:</b> ${escapeHtml(eventName)}<br><b>Location:</b> ${escapeHtml(municipality)}`).openPopup();
  }

  function formatDate(dateString) {
    if (!dateString) return 'No date set';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function showEventDetails(event) {
    const displayMuni = event.municipality === 'City of Tagbilaran' ? 'Tagbilaran City' : event.municipality;
    const schoolName  = getSchoolName(event.school_id);
    const coords = MUNICIPALITY_COORDS[displayMuni] || MUNICIPALITY_COORDS[event.municipality] || [9.83, 124.22];

    document.getElementById('modal-event-name').textContent        = event.event_name;
    document.getElementById('modal-event-school').textContent      = schoolName;
    document.getElementById('modal-event-muni').textContent        = displayMuni;
    document.getElementById('modal-event-barangay').textContent    = event.barangay || 'N/A';
    document.getElementById('modal-event-district').textContent    = event.district || 'N/A';
    document.getElementById('modal-event-date').textContent        = formatDate(event.event_date);
    document.getElementById('modal-event-venue').textContent       = event.venue || 'No venue specified';
    document.getElementById('modal-event-students').textContent    = event.total_students || 0;
    document.getElementById('modal-event-status').innerHTML        = '⚠ Incomplete';
    document.getElementById('modal-event-description').textContent = event.description || 'No description provided';

    document.getElementById('cdsp-event-modal').classList.add('active');
    setTimeout(() => initEventMapWithOrangePin(coords[0], coords[1], displayMuni, event.event_name), 120);
  }

  function showReminderModal(events) {
    const modal         = document.getElementById('cdsp-reminder-modal');
    const listContainer = document.getElementById('reminder-list');
    if (!modal || !listContainer) return;

    if (!events || events.length === 0) {
      listContainer.innerHTML = '<div class="cdsp-reminder-empty"><i class="fas fa-check-circle" style="color:var(--accent);"></i> No incomplete events!</div>';
    } else {
      const grouped = {};
      events.forEach(ev => {
        let muni = ev.municipality === 'City of Tagbilaran' ? 'Tagbilaran City' : ev.municipality;
        if (!grouped[muni]) grouped[muni] = [];
        grouped[muni].push(ev);
      });

      let html = '';
      for (const [muni, muniEvents] of Object.entries(grouped)) {
        html += `<div style="margin-bottom:16px;">
          <div style="font-weight:800;font-size:11.5px;color:var(--accent-2);padding:7px 10px;background:linear-gradient(135deg,rgba(245,158,11,0.13),rgba(234,88,12,0.08));border-radius:10px;margin-bottom:6px;display:flex;align-items:center;gap:8px;border:1px solid rgba(245,158,11,0.2);">
            <i class="fas fa-city"></i> ${escapeHtml(muni)}
            <span style="background:linear-gradient(135deg,var(--accent),var(--accent-2));color:white;padding:2px 9px;border-radius:20px;font-size:10px;margin-left:auto;">${muniEvents.length}</span>
          </div>`;
        muniEvents.forEach(ev => {
          const schoolName = getSchoolName(ev.school_id);
          html += `
            <div class="cdsp-reminder-item"
              data-event-id="${ev.id}"
              data-event-name="${escapeHtml(ev.event_name)}"
              data-event-muni="${escapeHtml(muni)}"
              data-event-barangay="${escapeHtml(ev.barangay || 'N/A')}"
              data-event-district="${ev.district || 'N/A'}"
              data-event-school-id="${ev.school_id || ''}"
              data-event-date="${ev.event_date || ''}"
              data-event-venue="${escapeHtml(ev.venue || '')}"
              data-event-students="${ev.total_students || 0}"
              data-event-description="${escapeHtml(ev.description || 'No description')}">
              <div class="event-name"><i class="fas fa-calendar-alt" style="font-size:10px;margin-right:5px;color:var(--accent);"></i>${escapeHtml(ev.event_name)}</div>
              <div class="event-details">
                <span><i class="fas fa-school"></i> ${escapeHtml(schoolName)}</span>
                <span><i class="fas fa-location-dot"></i> ${escapeHtml(ev.barangay || 'N/A')}</span>
                <span><i class="fas fa-users"></i> ${ev.total_students || 0}</span>
                <span><i class="fas fa-calendar"></i> ${formatDate(ev.event_date)}</span>
              </div>
            </div>`;
        });
        html += `</div>`;
      }
      listContainer.innerHTML = html;

      document.querySelectorAll('.cdsp-reminder-item').forEach(item => {
        item.addEventListener('click', () => {
          showEventDetails({
            event_name:    item.dataset.eventName,
            municipality:  item.dataset.eventMuni,
            barangay:      item.dataset.eventBarangay,
            district:      item.dataset.eventDistrict,
            school_id:     item.dataset.eventSchoolId || null,
            description:   item.dataset.eventDescription,
            event_date:    item.dataset.eventDate,
            venue:         item.dataset.eventVenue,
            total_students:item.dataset.eventStudents,
            status:        'Incomplete'
          });
          modal.classList.remove('active');
        });
      });
    }

    modal.classList.toggle('active');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  async function refreshReminder() {
    const listContainer = document.getElementById('reminder-list');
    if (listContainer) listContainer.innerHTML = '<div class="cdsp-reminder-empty"><i class="fas fa-spinner fa-pulse"></i> Refreshing…</div>';
    const newEvents = await fetchIncompleteEvents();
    window._incompleteEvents = newEvents;
    updateReminderBadge(newEvents.length);
    if (document.getElementById('cdsp-reminder-modal').classList.contains('active')) showReminderModal(newEvents);
  }

  async function setupReminder() {
    const reminderBtn = document.getElementById('cdsp-reminder');
    const refreshBtn  = document.getElementById('refresh-reminder');
    const closeBtn    = document.getElementById('close-reminder');
    if (!reminderBtn) return;

    await fetchSchools();
    const incompleteEvents = await fetchIncompleteEvents();
    updateReminderBadge(incompleteEvents.length);
    window._incompleteEvents = incompleteEvents;

    reminderBtn.addEventListener('click', () => showReminderModal(window._incompleteEvents));

    refreshBtn?.addEventListener('click', e => { e.stopPropagation(); refreshReminder(); });
    closeBtn?.addEventListener('click',   e => { e.stopPropagation(); document.getElementById('cdsp-reminder-modal').classList.remove('active'); });

    document.addEventListener('click', e => {
      const reminderModal = document.getElementById('cdsp-reminder-modal');
      const eventModal    = document.getElementById('cdsp-event-modal');
      const reminder      = document.getElementById('cdsp-reminder');

      if (reminderModal?.classList.contains('active')) {
        if (!reminderModal.contains(e.target) && !reminder?.contains(e.target)) reminderModal.classList.remove('active');
      }
      if (eventModal?.classList.contains('active')) {
        if (e.target === eventModal || e.target.classList?.contains('cdsp-modal-close')) {
          eventModal.classList.remove('active');
          if (currentMap) { currentMap.remove(); currentMap = null; }
        }
      }
    });

    setInterval(async () => {
      const newEvents = await fetchIncompleteEvents();
      window._incompleteEvents = newEvents;
      updateReminderBadge(newEvents.length);
    }, 30000);
  }

  window.renderCDSPNavbar = async function () {
    ensureStyles();
    if (document.getElementById('cdsp-bottom-bar')) return;

    if (typeof L === 'undefined') {
      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      leafletScript.onload = () => console.log('Leaflet loaded');
      document.head.appendChild(leafletScript);
    }

    const sessionName = sessionStorage.getItem('bepo_user_name') || 'Member';
    const sessionRole = sessionStorage.getItem('bepo_id_number') || 'CDSP';

    const tmp = document.createElement('div');
    tmp.innerHTML = buildNavHTML(sessionName, sessionRole, null);
    Array.from(tmp.children).forEach(el => document.body.appendChild(el));

    shiftContent();
    markActive();
    updateDateTime();
    setInterval(updateDateTime, 1000);

    const profile = await fetchProfile();
    if (profile) updateProfileUI(profile);
    await setupReminder();
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('cdsp-bottom-bar')) window.renderCDSPNavbar();
  });

})();