/**
 * navbar.js — BEPO-PESO Admin Navigation System
 * Design: Glassmorphism + Collapsible Left Sidebar + Warm Amber/Orange
 * Profile: fetches avatar (base64/URL), first_name + last_name on load
 * Icons: Material-style filled SVG icons
 */

(function () {
  'use strict';

  const CSS_ID = 'cdsp-navbar-styles';
  const SB_URL = 'https://iharcxdakmyxjpqpcbnb.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloYXJjeGRha215eGpwcXBjYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODc0NDEsImV4cCI6MjA5NDA2MzQ0MX0.5BE8ckW-3g5mJmXyrDWO_cytfI-_JrMaV4LQip7pbvs';

  const SIDEBAR_EXPANDED_W = '220px';
  const SIDEBAR_COLLAPSED_W = '64px';
  const SIDEBAR_KEY = 'cdsp_sidebar_collapsed';

  const MAT = {
    home:     `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    map:      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>`,
    records:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    schools:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>`,
    reports:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    logout:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>`,
    menu:     `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`,
    chevron:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`,
  };

  const NAV_ITEMS = [
    { id: 'nav-home',     href: 'index.html',       label: 'Home',     icon: MAT.home     },
    { id: 'nav-map',      href: 'map.html',         label: 'Map',      icon: MAT.map      },
    { id: 'nav-calendar', href: 'calendar.html',    label: 'Calendar', icon: MAT.calendar },
    { id: 'nav-records',  href: 'list_record.html', label: 'Records',  icon: MAT.records  },
    { id: 'nav-schools',  href: 'add_school.html',  label: 'Schools',  icon: MAT.schools  },
    { id: 'nav-reports',  href: 'report.html',      label: 'Reports',  icon: MAT.reports  },
  ];

  const PAGE_MAP = {
    'index.html': 'nav-home', '': 'nav-home',
    'map.html': 'nav-map', 'cdsp_map.html': 'nav-map',
    'calendar.html': 'nav-calendar',
    'list_record.html': 'nav-records',
    'add_school.html': 'nav-schools', 'school.html': 'nav-schools',
    'report.html': 'nav-reports',
  };

  const MUNICIPALITY_COORDS = {
    'Alburquerque':[9.6078,123.9586],'Antequera':[9.7856,123.8933],'Baclayon':[9.6229,123.9128],
    'Balilihan':[9.7567,123.9683],'Calape':[9.8883,123.8733],'Catigbian':[9.8578,123.9922],
    'Clarin':[9.9683,124.0244],'Corella':[9.6883,123.9217],'Cortes':[9.7222,123.8767],
    'Dauis':[9.6244,123.8592],'Loon':[9.8000,123.7900],'Maribojoc':[9.7472,123.8467],
    'Panglao':[9.5794,123.7564],'Sikatuna':[9.6881,123.9744],'Tubigon':[9.9550,123.9611],
    'Tagbilaran City':[9.6558,123.8542],'City of Tagbilaran':[9.6558,123.8542],
    'Bien Unido':[10.1431,124.3822],'Buenavista':[10.0828,124.1150],'Carmen':[9.8256,124.1942],
    'Dagohoy':[9.9167,124.3167],'Danao':[9.9533,124.2211],'Getafe':[10.1514,124.1558],
    'Inabanga':[10.0317,124.0714],'President Carlos P. Garcia':[10.1239,124.5572],
    'Sagbayan':[9.9144,124.0942],'San Miguel':[9.9967,124.3392],'Talibon':[10.1531,124.3247],
    'Trinidad':[10.0797,124.3422],'Ubay':[10.0600,124.4731],'Alicia':[9.8911,124.4433],
    'Anda':[9.7419,124.5719],'Batuan':[9.7853,124.1431],'Bilar':[9.7097,124.1058],
    'Candijay':[9.8192,124.4972],'Dimiao':[9.6208,124.1628],'Duero':[9.7117,124.4075],
    'Garcia Hernandez':[9.6197,124.2967],'Guindulman':[9.7658,124.4886],'Jagna':[9.6500,124.3725],
    'Lila':[9.5944,124.0992],'Loay':[9.5994,124.0117],'Loboc':[9.6383,124.0364],
    'Mabini':[9.8639,124.5214],'Pilar':[9.8589,124.3461],'Sevilla':[9.7033,124.0489],
    'Sierra Bullones':[9.8156,124.2961],'Valencia':[9.6150,124.2092],'San Isidro':[9.9419,124.0786]
  };

  let schoolsData = [];

  /* ─────────────────────── STYLES ─────────────────────── */
  function ensureStyles() {
    if (document.getElementById(CSS_ID)) return;
    const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');

:root {
  --topbar-h:       60px;
  --sidebar-w:      220px;
  --sidebar-w-col:  64px;
  --accent:         #f59e0b;
  --accent-2:       #ea580c;
  --accent-glow:    rgba(245,158,11,0.35);
  --accent-dim:     rgba(245,158,11,0.12);
  --accent-dim2:    rgba(234,88,12,0.10);
  --glass-bg:       rgba(255,255,255,0.78);
  --glass-border:   rgba(255,255,255,0.55);
  --glass-shadow:   0 8px 32px rgba(15,10,0,0.12);
  --glass-blur:     blur(20px) saturate(180%);
  --text:           #1a0f00;
  --text2:          #5a4a38;
  --muted:          #a08060;
  --page-bg:        #fff8f0;
  --font:           'Outfit', system-ui, sans-serif;
  --mono:           'JetBrains Mono', monospace;
  --radius-pill:    100px;
  --radius-lg:      20px;
  --radius-md:      14px;
  --radius-sm:      10px;
  --sidebar-transition: 0.28s cubic-bezier(0.4,0,0.2,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--page-bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(245,158,11,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(234,88,12,0.12) 0%, transparent 55%);
  min-height: 100vh;
}

/* ── TOPBAR ── */
.cdsp-topbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--topbar-h);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px 0 16px;
  z-index: 1001; font-family: var(--font);
  transition: padding-left var(--sidebar-transition);
}
.cdsp-topbar-left  { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.cdsp-topbar-center{ flex: 1; display: flex; align-items: center; justify-content: center; }
.cdsp-topbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

/* Toggle button in topbar */
.cdsp-sidebar-toggle {
  width: 36px; height: 36px; border-radius: var(--radius-sm);
  background: var(--accent-dim); border: 1px solid rgba(245,158,11,0.25);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  transition: all 0.2s ease;
}
.cdsp-sidebar-toggle:hover {
  background: var(--accent-dim);
  box-shadow: 0 0 0 3px var(--accent-glow);
  transform: scale(1.05);
}
.cdsp-sidebar-toggle svg { width: 20px; height: 20px; color: var(--accent-2); }

.cdsp-logo-area { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.cdsp-logo-mark {
  width: 34px; height: 34px; border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 4px 14px var(--accent-glow);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #fff;
  font-family: var(--mono); flex-shrink: 0; overflow: hidden;
}
.cdsp-logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cdsp-logo-initials { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
.cdsp-brand-text { display: flex; flex-direction: column; line-height: 1.25; overflow: hidden; }
.cdsp-brand-title { font-size: 12.5px; font-weight: 700; color: var(--text); letter-spacing: -0.3px; white-space: nowrap; }
.cdsp-brand-sub   { font-size: 9px; color: var(--muted); font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; white-space: nowrap; }

.cdsp-datetime {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 11.5px; color: var(--text2);
  white-space: nowrap; user-select: none;
  background: var(--accent-dim); border: 1px solid rgba(245,158,11,0.2);
  padding: 6px 14px; border-radius: var(--radius-pill);
}
.cdsp-datetime .dt-time   { font-weight: 600; color: var(--text); font-size: 12.5px; }
.cdsp-datetime .dt-divider{ width: 1px; height: 14px; background: rgba(245,158,11,0.3); }
.cdsp-datetime .dt-date   { color: var(--muted); font-size: 10.5px; }

.cdsp-reminder {
  position: relative; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  transition: all 0.25s ease; box-shadow: 0 2px 10px rgba(0,0,0,0.07);
}
.cdsp-reminder:hover {
  background: var(--accent-dim); border-color: rgba(245,158,11,0.4);
  box-shadow: 0 0 0 4px var(--accent-glow); transform: scale(1.08);
}
.cdsp-reminder i { font-size: 17px; color: var(--text2); }
.cdsp-reminder-badge {
  position: absolute; top: -3px; right: -3px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: white; font-size: 9px; font-weight: 700;
  min-width: 17px; height: 17px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px; font-family: var(--mono);
  border: 2px solid white; box-shadow: 0 2px 6px var(--accent-glow);
}

.cdsp-profile-chip {
  display: flex; align-items: center; gap: 10px;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur); border-radius: var(--radius-pill);
  padding: 4px 14px 4px 4px; cursor: pointer; max-width: 220px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07); transition: all 0.25s ease;
}
.cdsp-profile-chip:hover {
  background: var(--accent-dim); border-color: rgba(245,158,11,0.4);
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

/* ── SIDEBAR ── */
.cdsp-sidebar {
  position: fixed; top: var(--topbar-h); left: 0; bottom: 0;
  width: var(--sidebar-w);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-right: 1px solid var(--glass-border);
  box-shadow: 4px 0 24px rgba(15,10,0,0.08);
  z-index: 1000;
  display: flex; flex-direction: column;
  font-family: var(--font);
  transition: width var(--sidebar-transition);
  overflow: hidden;
}
.cdsp-sidebar.collapsed { width: var(--sidebar-w-col); }

/* Nav list */
.cdsp-sidebar-nav { flex: 1; padding: 12px 8px; overflow-y: auto; overflow-x: hidden; }
.cdsp-sidebar-nav::-webkit-scrollbar { width: 3px; }
.cdsp-sidebar-nav::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.2); border-radius: 3px; }
.cdsp-sidebar-nav ul { list-style: none; display: flex; flex-direction: column; gap: 2px; }

.cdsp-sidebar-nav a {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: var(--radius-md);
  text-decoration: none; color: var(--text2);
  font-size: 13.5px; font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s ease; position: relative;
  overflow: hidden;
}
.cdsp-sidebar-nav a:hover {
  background: var(--accent-dim2); color: var(--text);
  transform: translateX(2px);
}
.cdsp-sidebar-nav a.active {
  background: linear-gradient(135deg, rgba(245,158,11,0.18), rgba(234,88,12,0.12));
  color: var(--accent-2);
  box-shadow: inset 3px 0 0 var(--accent);
}
.cdsp-sidebar-nav a.danger { color: rgba(239,68,68,0.6); }
.cdsp-sidebar-nav a.danger:hover { background: rgba(239,68,68,0.08); color: #ef4444; transform: translateX(2px); }

/* Mat icon in sidebar */
.cdsp-nav-icon {
  width: 38px; height: 38px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}
.cdsp-nav-icon svg { width: 22px; height: 22px; }
.cdsp-sidebar-nav a:hover .cdsp-nav-icon { background: rgba(245,158,11,0.1); }
.cdsp-sidebar-nav a.active .cdsp-nav-icon {
  background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,88,12,0.15));
  box-shadow: 0 2px 8px rgba(245,158,11,0.2);
}

.cdsp-nav-label {
  opacity: 1; transition: opacity 0.18s ease, width 0.28s ease;
  overflow: hidden;
}
.cdsp-sidebar.collapsed .cdsp-nav-label { opacity: 0; width: 0; pointer-events: none; }

/* Tooltip for collapsed state */
.cdsp-sidebar.collapsed .cdsp-sidebar-nav a {
  justify-content: center; padding: 10px;
}
.cdsp-sidebar.collapsed .cdsp-sidebar-nav a:hover::after {
  content: attr(data-label);
  position: absolute; left: calc(var(--sidebar-w-col) - 2px);
  top: 50%; transform: translateY(-50%);
  background: var(--text); color: #fff;
  font-size: 12px; font-weight: 600;
  padding: 5px 10px; border-radius: 8px;
  white-space: nowrap; z-index: 2000;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  pointer-events: none;
}

/* Divider */
.cdsp-nav-divider {
  height: 1px; background: rgba(245,158,11,0.12);
  margin: 8px 4px;
}

/* Footer */
.cdsp-sidebar-footer {
  padding: 12px 8px; border-top: 1px solid rgba(245,158,11,0.1);
  transition: all var(--sidebar-transition);
}
.cdsp-footer-inner {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px; overflow: hidden;
}
.cdsp-footer-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
.cdsp-footer-text {
  font-size: 10px; color: var(--muted); font-family: var(--mono);
  white-space: nowrap; opacity: 1; transition: opacity 0.18s ease;
}
.cdsp-sidebar.collapsed .cdsp-footer-text { opacity: 0; }

/* ── CONTENT SHIFT ── */
.cdsp-content-shift {
  margin-top: var(--topbar-h);
  margin-left: var(--sidebar-w);
  min-height: calc(100vh - var(--topbar-h));
  transition: margin-left var(--sidebar-transition);
}
.cdsp-sidebar.collapsed ~ .cdsp-content-shift,
body.sidebar-collapsed .cdsp-content-shift { margin-left: var(--sidebar-w-col); }

/* ── MOBILE OVERLAY ── */
.cdsp-mobile-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(15,10,0,0.45); z-index: 999;
  backdrop-filter: blur(2px);
}
.cdsp-mobile-overlay.active { display: block; }

/* ── REMINDER MODAL ── */
.cdsp-reminder-modal {
  position: fixed; top: 70px; right: 20px;
  width: 380px; max-height: 500px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border); border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(15,10,0,0.18), 0 0 0 1px rgba(255,255,255,0.5) inset;
  z-index: 1002; display: none; flex-direction: column; overflow: hidden;
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
.cdsp-reminder-list::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 4px; }
.cdsp-reminder-item {
  padding: 12px 14px; border-radius: var(--radius-md); margin-bottom: 8px;
  cursor: pointer; transition: all 0.22s ease;
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.6); border-left: 3px solid var(--accent);
  backdrop-filter: blur(8px);
}
.cdsp-reminder-item:hover {
  background: rgba(255,248,240,0.85); transform: translateX(-3px);
  box-shadow: 4px 0 18px rgba(245,158,11,0.15);
}
.cdsp-reminder-item .event-name  { font-weight: 700; font-size: 12.5px; color: var(--text); margin-bottom: 5px; }
.cdsp-reminder-item .event-details { font-size: 10px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
.cdsp-reminder-item .event-details span { display: inline-flex; align-items: center; gap: 3px; }
.cdsp-reminder-empty { padding: 30px 20px; text-align: center; color: var(--muted); font-size: 13px; }
.cdsp-reminder-footer {
  padding: 10px 16px; border-top: 1px solid rgba(245,158,11,0.15);
  font-size: 10px; color: var(--muted); text-align: center;
  background: rgba(255,248,240,0.5);
}

/* ── EVENT MODAL ── */
.cdsp-event-modal {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15,10,0,0.5); backdrop-filter: blur(8px) saturate(150%);
  z-index: 2000; display: none; align-items: center; justify-content: center;
}
.cdsp-event-modal.active { display: flex; }
.cdsp-modal-container {
  background: var(--glass-bg); backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur); border: 1px solid var(--glass-border);
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
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.cdsp-modal-close:hover { background: rgba(255,255,255,0.35); transform: rotate(90deg); }
.cdsp-modal-body { padding: 22px; max-height: calc(87vh - 70px); overflow-y: auto; }
.cdsp-event-map {
  height: 260px; border-radius: var(--radius-lg); margin-bottom: 20px;
  overflow: hidden; border: 1px solid var(--glass-border);
  box-shadow: 0 4px 20px rgba(15,10,0,0.1);
}
.cdsp-event-info {
  background: rgba(255,255,255,0.5); backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border); border-radius: var(--radius-lg); padding: 6px 0;
}
.cdsp-info-row { display: flex; padding: 12px 18px; border-bottom: 1px solid rgba(245,158,11,0.1); }
.cdsp-info-row:last-child { border-bottom: none; }
.cdsp-info-label { width: 110px; font-weight: 700; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.7px; padding-top: 1px; }
.cdsp-info-value { flex: 1; font-size: 13px; color: var(--text); font-weight: 500; }
.cdsp-info-description { font-size: 12px; color: var(--text2); line-height: 1.55; margin-top: 3px; }
.cdsp-status-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: var(--radius-pill); font-size: 11px; font-weight: 700;
}
.cdsp-status-incomplete {
  background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(234,88,12,0.12));
  color: var(--accent-2); border: 1px solid rgba(245,158,11,0.3);
}
.orange-pin-marker {
  background: var(--accent); width: 40px; height: 40px;
  border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
  position: relative; box-shadow: 0 4px 16px rgba(245,158,11,0.5);
  border: 3px solid white; cursor: pointer; animation: pinPulse 1.8s infinite;
}
@keyframes pinPulse {
  0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.5); }
  70%  { box-shadow: 0 0 0 14px rgba(245,158,11,0); }
  100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
}
.orange-pin-marker i { position: absolute; transform: rotate(45deg); left: 11px; top: 10px; font-size: 16px; color: white; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .cdsp-sidebar {
    transform: translateX(-100%);
    transition: transform var(--sidebar-transition), width var(--sidebar-transition);
    width: var(--sidebar-w) !important;
    z-index: 1002;
  }
  .cdsp-sidebar.mobile-open { transform: translateX(0); }
  .cdsp-content-shift { margin-left: 0 !important; }
  .cdsp-datetime { display: none; }
  .cdsp-profile-name, .cdsp-profile-role { display: none; }
  .cdsp-profile-chip { padding: 4px; }
  .cdsp-reminder-modal { right: 8px; left: 8px; width: auto; }
  .cdsp-modal-container { width: 96%; }
  .cdsp-event-map { height: 190px; }
}
@media (max-width: 480px) {
  .cdsp-brand-sub { display: none; }
}
`;
    const style = document.createElement('style');
    style.id = CSS_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ─────────────────────── HELPERS ─────────────────────── */
  function getInitials(name) {
    if (!name) return 'US';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  }
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ─────────────────────── BUILD HTML ─────────────────────── */
  function buildNavHTML(userName, userRole, avatarSrc) {
    const initials = getInitials(userName);
    const chipAvatar = avatarSrc
      ? `<div class="cdsp-avatar"><img src="${avatarSrc}" alt="Profile" onerror="this.style.display='none';this.parentElement.textContent='${initials}'" /></div>`
      : `<div class="cdsp-avatar">${initials}</div>`;

    const navItemsHTML = NAV_ITEMS.map(item => `
      <li>
        <a href="${item.href}" id="${item.id}" data-label="${item.label}">
          <span class="cdsp-nav-icon">${item.icon}</span>
          <span class="cdsp-nav-label">${item.label}</span>
        </a>
      </li>`).join('');

    return `
<header class="cdsp-topbar" role="banner">
  <div class="cdsp-topbar-left">
    <button class="cdsp-sidebar-toggle" id="cdsp-sidebar-toggle" title="Toggle menu" aria-label="Toggle sidebar">
      ${MAT.menu}
    </button>
    <a class="cdsp-logo-area" href="index.html">
      <div class="cdsp-logo-mark">
        <img src="image/bepo.png" alt="Logo"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="cdsp-logo-initials" style="display:none">BP</div>
      </div>
      <div class="cdsp-brand-text">
        <div class="cdsp-brand-title">Career Development Support Program</div>
        <div class="cdsp-brand-sub">CDSP · BEPO-PESO</div>
      </div>
    </a>
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
        <div class="cdsp-profile-name" id="cdsp-profile-name">${userName}</div>
        <div class="cdsp-profile-role" id="cdsp-profile-role">${userRole}</div>
      </div>
    </div>
  </div>
</header>

<div class="cdsp-mobile-overlay" id="cdsp-mobile-overlay"></div>

<aside class="cdsp-sidebar" id="cdsp-sidebar" aria-label="Main navigation">
  <nav class="cdsp-sidebar-nav">
    <ul>
      ${navItemsHTML}
      <li><div class="cdsp-nav-divider"></div></li>
      <li>
        <a href="logout.html" id="nav-logout" class="danger" data-label="Logout">
          <span class="cdsp-nav-icon">${MAT.logout}</span>
          <span class="cdsp-nav-label">Logout</span>
        </a>
      </li>
    </ul>
  </nav>
  <div class="cdsp-sidebar-footer">
    <div class="cdsp-footer-inner">
      <div class="cdsp-footer-dot"></div>
      <div class="cdsp-footer-text">&copy; BEPO-PESO 2026</div>
    </div>
  </div>
</aside>

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

<div class="cdsp-event-modal" id="cdsp-event-modal">
  <div class="cdsp-modal-container">
    <div class="cdsp-modal-header">
      <h3><i class="fas fa-map-marker-alt" style="margin-right:8px;"></i>Incomplete Event Details</h3>
      <button class="cdsp-modal-close" onclick="document.getElementById('cdsp-event-modal').classList.remove('active')">✕</button>
    </div>
    <div class="cdsp-modal-body">
      <div class="cdsp-event-map" id="event-map"></div>
      <div class="cdsp-event-info">
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
</div>`;
  }

  /* ─────────────────────── SIDEBAR TOGGLE ─────────────────────── */
  function isMobile() { return window.innerWidth <= 768; }

  function applySidebarState(collapsed) {
    const sidebar  = document.getElementById('cdsp-sidebar');
    const content  = document.querySelector('.cdsp-content-shift');
    if (!sidebar) return;
    if (isMobile()) {
      sidebar.classList.toggle('mobile-open', !collapsed);
      document.getElementById('cdsp-mobile-overlay')?.classList.toggle('active', !collapsed);
    } else {
      sidebar.classList.toggle('collapsed', collapsed);
      if (content) {
        content.style.marginLeft = collapsed
          ? 'var(--sidebar-w-col)'
          : 'var(--sidebar-w)';
      }
    }
  }

  function setupToggle() {
    const btn     = document.getElementById('cdsp-sidebar-toggle');
    const overlay = document.getElementById('cdsp-mobile-overlay');
    if (!btn) return;

    // Restore saved state (desktop only)
    let collapsed = !isMobile() && localStorage.getItem(SIDEBAR_KEY) === '1';
    applySidebarState(collapsed);

    btn.addEventListener('click', () => {
      if (isMobile()) {
        const sidebar = document.getElementById('cdsp-sidebar');
        const isOpen  = sidebar.classList.contains('mobile-open');
        applySidebarState(isOpen); // toggle: if open → close (collapsed=true), if closed → open
      } else {
        collapsed = !collapsed;
        localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0');
        applySidebarState(collapsed);
      }
    });

    overlay?.addEventListener('click', () => applySidebarState(true));

    window.addEventListener('resize', () => {
      const sidebar = document.getElementById('cdsp-sidebar');
      const content = document.querySelector('.cdsp-content-shift');
      if (!sidebar) return;
      if (isMobile()) {
        sidebar.classList.remove('collapsed');
        if (content) content.style.marginLeft = '0';
        document.getElementById('cdsp-mobile-overlay')?.classList.remove('active');
        sidebar.classList.remove('mobile-open');
      } else {
        sidebar.classList.remove('mobile-open');
        document.getElementById('cdsp-mobile-overlay')?.classList.remove('active');
        collapsed = localStorage.getItem(SIDEBAR_KEY) === '1';
        applySidebarState(collapsed);
      }
    });
  }

  /* ─────────────────────── ACTIVE PAGE ─────────────────────── */
  function markActive() {
    const page = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const id   = PAGE_MAP[page];
    if (id) {
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    }
  }

  function shiftContent() {
    const selectors = [
      '.app-shell','#app-shell','.main-content','#main-content',
      '.main','#main','main','.content','#content',
      '.page-content','#page-content','.register-wrapper','.edit-wrapper',
      '.view-wrapper','.dashboard','.page',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) { el.classList.add('cdsp-content-shift'); return; }
    }
  }

  /* ─────────────────────── CLOCK ─────────────────────── */
  function updateDateTime() {
    const now   = new Date();
    const phNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + 3600000 * 8);
    let h = phNow.getHours();
    const m  = String(phNow.getMinutes()).padStart(2,'0');
    const s  = String(phNow.getSeconds()).padStart(2,'0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const tEl = document.getElementById('dt-time');
    const dEl = document.getElementById('dt-date');
    if (tEl) tEl.textContent = `${String(h).padStart(2,'0')}:${m}:${s} ${ap}`;
    if (dEl) dEl.textContent = `${days[phNow.getDay()]}, ${months[phNow.getMonth()]} ${phNow.getDate()}, ${phNow.getFullYear()}`;
  }

  /* ─────────────────────── PROFILE ─────────────────────── */
  async function fetchProfile() {
    const userId = sessionStorage.getItem('bepo_user_id');
    if (!userId) return null;
    try {
      const res = await fetch(
        `${SB_URL}/rest/v1/members?id=eq.${userId}&select=first_name,last_name,middle_initial,profile_url,role,id_number`,
        { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return (data && data.length > 0) ? data[0] : null;
    } catch (e) {
      console.warn('CDSP Navbar: profile fetch failed', e);
      return null;
    }
  }

  function applyProfileToChip(profile) {
    if (!profile) return;
    const mi       = profile.middle_initial ? ` ${profile.middle_initial}.` : '';
    const fullName = `${profile.first_name || ''}${mi} ${profile.last_name || ''}`.trim() || 'Member';
    const idNum    = profile.id_number || profile.role || 'CDSP';
    const avatarSrc = profile.profile_url || null;
    const initials  = getInitials(fullName);

    const nameEl = document.getElementById('cdsp-profile-name');
    const roleEl = document.getElementById('cdsp-profile-role');
    if (nameEl) nameEl.textContent = fullName;
    if (roleEl) roleEl.textContent = idNum;

    const chip     = document.getElementById('cdsp-profile-chip');
    const avatarEl = chip?.querySelector('.cdsp-avatar');
    if (avatarEl) {
      if (avatarSrc) {
        avatarEl.innerHTML = `<img src="${avatarSrc}" alt="${escapeHtml(fullName)}"
          style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
          onerror="this.style.display='none';this.parentElement.textContent='${initials}'" />`;
      } else {
        avatarEl.textContent = initials;
      }
    }
    sessionStorage.setItem('bepo_user_name', fullName);
    sessionStorage.setItem('bepo_id_number',  idNum);
  }

  /* ─────────────────────── SCHOOLS ─────────────────────── */
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
    } catch (err) { console.error('Error fetching schools:', err); return []; }
  }
  function getSchoolName(schoolId) {
    if (!schoolId) return 'No school assigned';
    const s = schoolsData.find(x => x.id == schoolId);
    return s ? s.school_name : 'School not found';
  }

  /* ─────────────────────── EVENTS ─────────────────────── */
  async function fetchIncompleteEvents() {
    try {
      const sb = window.supabase.createClient(
        'https://lfmcgktlmdiwddngytkq.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbWNna3RsbWRpd2Rkbmd5dGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDQ0NTIsImV4cCI6MjA5NTQ4MDQ1Mn0.yRluC6tQAKSfSXsKdDtils5ztk-CLZzjatjOHx1ot2s'
      );
      const { data, error } = await sb
        .from('cdsp_events')
        .select('id,event_name,municipality,barangay,status,district,school_id,description,event_date,venue,total_students')
        .eq('status','Incomplete')
        .order('event_date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (err) { console.error('Error fetching incomplete events:', err); return []; }
  }

  function updateReminderBadge(count) {
    const badge = document.getElementById('reminder-badge');
    if (!badge) return;
    if (count > 0) { badge.textContent = count > 99 ? '99+' : count; badge.style.display = 'flex'; }
    else badge.style.display = 'none';
  }

  /* ─────────────────────── MAP ─────────────────────── */
  function createOrangePinIcon() {
    return L.divIcon({
      html: `<div class="orange-pin-marker"><i class="fas fa-exclamation-triangle"></i></div>`,
      iconSize:[40,40], iconAnchor:[20,38], popupAnchor:[0,-38], className:'custom-orange-pin'
    });
  }
  let currentMap = null;
  function initEventMapWithOrangePin(lat, lng, municipality, eventName) {
    const mc = document.getElementById('event-map');
    if (!mc) return;
    if (currentMap) { currentMap.remove(); currentMap = null; }
    currentMap = L.map('event-map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM &copy; CartoDB', subdomains: 'abcd', maxZoom: 19, minZoom: 3
    }).addTo(currentMap);
    L.marker([lat, lng], { icon: createOrangePinIcon() }).addTo(currentMap)
      .bindPopup(`<b style="color:var(--accent);">⚠ Incomplete Event</b><br><b>Event:</b> ${escapeHtml(eventName)}<br><b>Location:</b> ${escapeHtml(municipality)}`).openPopup();
  }
  function formatDate(ds) {
    if (!ds) return 'No date set';
    return new Date(ds).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  }

  function showEventDetails(ev) {
    const displayMuni = ev.municipality === 'City of Tagbilaran' ? 'Tagbilaran City' : ev.municipality;
    const coords = MUNICIPALITY_COORDS[displayMuni] || MUNICIPALITY_COORDS[ev.municipality] || [9.83, 124.22];
    document.getElementById('modal-event-name').textContent        = ev.event_name;
    document.getElementById('modal-event-school').textContent      = getSchoolName(ev.school_id);
    document.getElementById('modal-event-muni').textContent        = displayMuni;
    document.getElementById('modal-event-barangay').textContent    = ev.barangay || 'N/A';
    document.getElementById('modal-event-district').textContent    = ev.district || 'N/A';
    document.getElementById('modal-event-date').textContent        = formatDate(ev.event_date);
    document.getElementById('modal-event-venue').textContent       = ev.venue || 'No venue specified';
    document.getElementById('modal-event-students').textContent    = ev.total_students || 0;
    document.getElementById('modal-event-status').innerHTML        = '⚠ Incomplete';
    document.getElementById('modal-event-description').textContent = ev.description || 'No description provided';
    document.getElementById('cdsp-event-modal').classList.add('active');
    setTimeout(() => initEventMapWithOrangePin(coords[0], coords[1], displayMuni, ev.event_name), 120);
  }

  /* ─────────────────────── REMINDER ─────────────────────── */
  function showReminderModal(events) {
    const modal = document.getElementById('cdsp-reminder-modal');
    const list  = document.getElementById('reminder-list');
    if (!modal || !list) return;
    if (!events || !events.length) {
      list.innerHTML = '<div class="cdsp-reminder-empty"><i class="fas fa-check-circle" style="color:var(--accent);"></i> No incomplete events!</div>';
    } else {
      const grouped = {};
      events.forEach(ev => {
        const muni = ev.municipality === 'City of Tagbilaran' ? 'Tagbilaran City' : ev.municipality;
        (grouped[muni] = grouped[muni] || []).push(ev);
      });
      let html = '';
      for (const [muni, evs] of Object.entries(grouped)) {
        html += `<div style="margin-bottom:16px;">
          <div style="font-weight:800;font-size:11.5px;color:var(--accent-2);padding:7px 10px;background:linear-gradient(135deg,rgba(245,158,11,0.13),rgba(234,88,12,0.08));border-radius:10px;margin-bottom:6px;display:flex;align-items:center;gap:8px;border:1px solid rgba(245,158,11,0.2);">
            <i class="fas fa-city"></i> ${escapeHtml(muni)}
            <span style="background:linear-gradient(135deg,var(--accent),var(--accent-2));color:white;padding:2px 9px;border-radius:20px;font-size:10px;margin-left:auto;">${evs.length}</span>
          </div>`;
        evs.forEach(ev => {
          const sn = getSchoolName(ev.school_id);
          html += `<div class="cdsp-reminder-item"
            data-event-name="${escapeHtml(ev.event_name)}"
            data-event-muni="${escapeHtml(muni)}"
            data-event-barangay="${escapeHtml(ev.barangay||'N/A')}"
            data-event-district="${ev.district||'N/A'}"
            data-event-school-id="${ev.school_id||''}"
            data-event-date="${ev.event_date||''}"
            data-event-venue="${escapeHtml(ev.venue||'')}"
            data-event-students="${ev.total_students||0}"
            data-event-description="${escapeHtml(ev.description||'No description')}">
            <div class="event-name"><i class="fas fa-calendar-alt" style="font-size:10px;margin-right:5px;color:var(--accent);"></i>${escapeHtml(ev.event_name)}</div>
            <div class="event-details">
              <span><i class="fas fa-school"></i> ${escapeHtml(sn)}</span>
              <span><i class="fas fa-location-dot"></i> ${escapeHtml(ev.barangay||'N/A')}</span>
              <span><i class="fas fa-users"></i> ${ev.total_students||0}</span>
              <span><i class="fas fa-calendar"></i> ${formatDate(ev.event_date)}</span>
            </div>
          </div>`;
        });
        html += '</div>';
      }
      list.innerHTML = html;
      list.querySelectorAll('.cdsp-reminder-item').forEach(item => {
        item.addEventListener('click', () => {
          showEventDetails({
            event_name:     item.dataset.eventName,
            municipality:   item.dataset.eventMuni,
            barangay:       item.dataset.eventBarangay,
            district:       item.dataset.eventDistrict,
            school_id:      item.dataset.eventSchoolId || null,
            description:    item.dataset.eventDescription,
            event_date:     item.dataset.eventDate,
            venue:          item.dataset.eventVenue,
            total_students: item.dataset.eventStudents,
            status:         'Incomplete'
          });
          modal.classList.remove('active');
        });
      });
    }
    modal.classList.toggle('active');
  }

  async function refreshReminder() {
    const list = document.getElementById('reminder-list');
    if (list) list.innerHTML = '<div class="cdsp-reminder-empty"><i class="fas fa-spinner fa-pulse"></i> Refreshing…</div>';
    const evs = await fetchIncompleteEvents();
    window._incompleteEvents = evs;
    updateReminderBadge(evs.length);
    if (document.getElementById('cdsp-reminder-modal').classList.contains('active')) showReminderModal(evs);
  }

  async function setupReminder() {
    const reminderBtn = document.getElementById('cdsp-reminder');
    if (!reminderBtn) return;
    await fetchSchools();
    const evs = await fetchIncompleteEvents();
    updateReminderBadge(evs.length);
    window._incompleteEvents = evs;

    reminderBtn.addEventListener('click', () => showReminderModal(window._incompleteEvents));
    document.getElementById('refresh-reminder')?.addEventListener('click', e => { e.stopPropagation(); refreshReminder(); });
    document.getElementById('close-reminder')?.addEventListener('click',   e => { e.stopPropagation(); document.getElementById('cdsp-reminder-modal').classList.remove('active'); });

    document.addEventListener('click', e => {
      const rm = document.getElementById('cdsp-reminder-modal');
      const em = document.getElementById('cdsp-event-modal');
      if (rm?.classList.contains('active') && !rm.contains(e.target) && !reminderBtn.contains(e.target)) rm.classList.remove('active');
      if (em?.classList.contains('active') && (e.target === em || e.target.classList?.contains('cdsp-modal-close'))) {
        em.classList.remove('active');
        if (currentMap) { currentMap.remove(); currentMap = null; }
      }
    });

    setInterval(async () => {
      const ne = await fetchIncompleteEvents();
      window._incompleteEvents = ne;
      updateReminderBadge(ne.length);
    }, 30000);
  }

  /* ─────────────────────── MAIN RENDER ─────────────────────── */
  window.renderCDSPNavbar = async function () {
    ensureStyles();
    if (document.getElementById('cdsp-sidebar')) return;

    if (typeof L === 'undefined') {
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      document.head.appendChild(s);
    }

    const sessionName = sessionStorage.getItem('bepo_user_name') || 'Loading…';
    const sessionRole = sessionStorage.getItem('bepo_id_number') || '';

    const tmp = document.createElement('div');
    tmp.innerHTML = buildNavHTML(sessionName, sessionRole, null);
    Array.from(tmp.children).forEach(el => document.body.appendChild(el));

    shiftContent();
    markActive();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setupToggle();

    const profile = await fetchProfile();
    applyProfileToChip(profile);

    await setupReminder();
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('cdsp-sidebar')) window.renderCDSPNavbar();
  });

})();
