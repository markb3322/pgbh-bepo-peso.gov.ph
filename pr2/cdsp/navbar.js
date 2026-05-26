(function () {
  'use strict';

  const CSS_ID = 'cdsp-navbar-styles';
  const SB_URL = 'https://iharcxdakmyxjpqpcbnb.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloYXJjeGRha215eGpwcXBjYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODc0NDEsImV4cCI6MjA5NDA2MzQ0MX0.5BE8ckW-3g5mJmXyrDWO_cytfI-_JrMaV4LQip7pbvs';

  const NAV_ITEMS = [
    { id: 'nav-home',      href: 'index.html',        label: 'Home',              emoji: '🏠' },
    { id: 'nav-map',       href: 'map.html',          label: 'Map',               emoji: '🗺️' },
    { id: 'nav-records',   href: 'list_record.html',  label: 'Manage Records',    emoji: '📋' },
    { id: 'nav-schools',   href: 'add_school.html',   label: 'Schools',           emoji: '🏫' },
    { id: 'nav-locations', href: 'add_location.html', label: 'Locations',         emoji: '📍' },
    { id: 'nav-reports',   href: 'report.html',       label: 'Reports',           emoji: '📊' },
  ];

  const PAGE_MAP = {
    'index.html':        'nav-home',
    '':                  'nav-home',
    'map.html':          'nav-map',
    'cdsp_map.html':     'nav-map',
    'list_record.html':  'nav-records',
    'add_school.html':   'nav-schools',
    'school.html':       'nav-schools',
    'add_location.html': 'nav-locations',
    'location.html':     'nav-locations',
    'add_lugar.html':    'nav-locations',
    'report.html':       'nav-reports',
  };

  function ensureStyles() {
    if (document.getElementById(CSS_ID)) return;
    const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

:root {
  --cdsp-topbar-h:  64px;
  --cdsp-sidebar-w: 260px;
  --cdsp-sidebar-collapsed-w: 68px;
  --cdsp-bg:        #ffffff;
  --cdsp-bg2:       #f8fafc;
  --cdsp-bg3:       #f1f5f9;
  --cdsp-line:      #e2e8f0;
  --cdsp-line2:     #cbd5e1;
  --cdsp-text:      #0f172a;
  --cdsp-text2:     #475569;
  --cdsp-muted:     #94a3b8;
  --cdsp-accent:    #0f766e;
  --cdsp-accent-d:  #0d5f59;
  --cdsp-accent-l:  #e6f7f5;
  --cdsp-accent-g:  rgba(15,118,110,0.1);
  --cdsp-danger:    #dc2626;
  --cdsp-sidebar-bg:#0a1f1c;
  --cdsp-sidebar-line: rgba(255,255,255,0.06);
  --cdsp-font:      'DM Sans', system-ui, sans-serif;
  --cdsp-mono:      'DM Mono', monospace;
  --cdsp-ease:      cubic-bezier(0.4,0,0.2,1);
  --cdsp-shadow:    0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06);
  --cdsp-mobile-bar-h: 60px;
}

*, *::before, *::after { box-sizing: border-box; }

/* ══════════════════════════════════════
   TOPBAR
══════════════════════════════════════ */
.cdsp-topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--cdsp-topbar-h);
  background: var(--cdsp-bg);
  border-bottom: 1px solid var(--cdsp-line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 0 20px;
  z-index: 1000;
  font-family: var(--cdsp-font);
  box-shadow: var(--cdsp-shadow);
}

.cdsp-topbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.cdsp-logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.18s;
  text-decoration: none;
}
.cdsp-logo-area:hover { opacity: 0.85; }

.cdsp-logo-img {
  width: 38px; height: 38px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--cdsp-accent);
  box-shadow: 0 0 0 3px var(--cdsp-accent-g);
}
.cdsp-logo-img img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.cdsp-logo-fallback {
  width: 100%; height: 100%;
  background: var(--cdsp-accent);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 16px; font-weight: 700;
  font-family: var(--cdsp-mono);
}

.cdsp-brand-text { display: flex; flex-direction: column; line-height: 1.2; }
.cdsp-brand-title {
  font-size: 14px; font-weight: 700;
  color: var(--cdsp-text);
  letter-spacing: -0.3px;
}
.cdsp-brand-sub {
  font-size: 10.5px;
  color: var(--cdsp-muted);
  font-weight: 400;
  letter-spacing: 0.1px;
}

.cdsp-topbar-right { display: flex; align-items: center; gap: 12px; }

.cdsp-profile-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 12px 4px 4px;
  background: var(--cdsp-bg3); border: 1px solid var(--cdsp-line);
  border-radius: 40px; cursor: pointer; transition: all 0.18s;
  max-width: 200px; overflow: hidden;
}
.cdsp-profile-chip:hover { background: var(--cdsp-accent-l); border-color: var(--cdsp-accent); }

.cdsp-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--cdsp-accent-l); border: 2px solid var(--cdsp-line2);
  flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.cdsp-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.cdsp-avatar svg { width: 15px; height: 15px; stroke: var(--cdsp-accent); stroke-width: 1.8; fill: none; stroke-linecap: round; }

.cdsp-profile-name {
  font-size: 12.5px; font-weight: 600; color: var(--cdsp-text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;
}
.cdsp-profile-role {
  font-size: 10px; color: var(--cdsp-muted); font-weight: 400; white-space: nowrap;
}

/* ══════════════════════════════════════
   OVERLAY (mobile)
══════════════════════════════════════ */
.cdsp-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.45); backdrop-filter: blur(2px);
  z-index: 998; transition: opacity 0.25s;
}
.cdsp-overlay.active { display: block; }

/* ══════════════════════════════════════
   SIDEBAR
══════════════════════════════════════ */
.cdsp-sidebar {
  position: fixed;
  top: var(--cdsp-topbar-h); left: 0; bottom: 0;
  width: var(--cdsp-sidebar-w);
  background: var(--cdsp-sidebar-bg);
  display: flex; flex-direction: column;
  z-index: 999; font-family: var(--cdsp-font);
  transition: width 0.28s var(--cdsp-ease), transform 0.28s var(--cdsp-ease);
  overflow: hidden;
}
.cdsp-sidebar.collapsed {
  width: var(--cdsp-sidebar-collapsed-w);
}

.cdsp-sidebar::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
}

.cdsp-sidebar-user {
  padding: 20px 16px 16px;
  border-bottom: 1px solid var(--cdsp-sidebar-line);
  display: flex; align-items: center; gap: 12px;
  flex-shrink: 0; transition: padding 0.28s var(--cdsp-ease);
}
.cdsp-sidebar.collapsed .cdsp-sidebar-user {
  padding: 20px 12px 16px;
  justify-content: center;
}

.cdsp-sidebar-avatar {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--cdsp-accent-g); border: 2px solid rgba(15,118,110,0.3);
  overflow: hidden; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.cdsp-sidebar-avatar img { width: 100%; height: 100%; object-fit: cover; }
.cdsp-sidebar-avatar svg { width: 18px; height: 18px; stroke: rgba(255,255,255,0.5); stroke-width: 1.7; fill: none; stroke-linecap: round; }

.cdsp-sidebar-user-info { overflow: hidden; transition: opacity 0.2s, width 0.28s; }
.cdsp-sidebar.collapsed .cdsp-sidebar-user-info { opacity: 0; width: 0; }

.cdsp-sidebar-uname { font-size: 13px; font-weight: 600; color: #fff; line-height: 1.2; white-space: nowrap; }
.cdsp-sidebar-urole { font-size: 10.5px; color: rgba(255,255,255,0.4); font-weight: 400; margin-top: 1px; white-space: nowrap; }

.cdsp-nav-label {
  font-size: 9.5px; font-weight: 700; letter-spacing: 1.2px;
  text-transform: uppercase; color: rgba(255,255,255,0.25);
  padding: 18px 18px 6px;
  transition: opacity 0.2s, padding 0.28s;
  white-space: nowrap; overflow: hidden;
}
.cdsp-sidebar.collapsed .cdsp-nav-label {
  opacity: 0; padding-left: 8px; padding-right: 8px;
}

.cdsp-nav {
  flex: 1; overflow-y: auto; padding: 4px 8px 8px;
  scrollbar-width: none;
}
.cdsp-nav::-webkit-scrollbar { display: none; }
.cdsp-nav ul { list-style: none; margin: 0; padding: 0; }
.cdsp-nav li { margin: 2px 0; }

.cdsp-nav a {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 12px; border-radius: 9px;
  text-decoration: none; color: rgba(255,255,255,0.55);
  font-size: 13.5px; font-weight: 500;
  transition: background 0.15s, color 0.15s, padding 0.28s;
  position: relative; white-space: nowrap; overflow: hidden;
}
.cdsp-sidebar.collapsed .cdsp-nav a {
  padding: 10px 14px; justify-content: center;
}

.cdsp-nav a .nav-icon {
  width: 32px; height: 32px; border-radius: 8px;
  background: transparent; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 18px; transition: background 0.15s;
}
.cdsp-nav a .nav-label {
  transition: opacity 0.2s, width 0.28s;
}
.cdsp-sidebar.collapsed .cdsp-nav a .nav-label {
  opacity: 0; width: 0; display: none;
}

.cdsp-nav a:hover { background: rgba(255,255,255,0.06); color: #fff; }
.cdsp-nav a:hover .nav-icon { background: rgba(255,255,255,0.05); }

.cdsp-nav a.active { background: var(--cdsp-accent); color: #fff; }
.cdsp-nav a.active .nav-icon { background: rgba(255,255,255,0.15); }

.cdsp-nav-divider {
  height: 1px; background: var(--cdsp-sidebar-line);
  margin: 8px 8px;
  transition: margin 0.28s;
}
.cdsp-sidebar.collapsed .cdsp-nav-divider { margin: 8px 12px; }

.cdsp-nav a.danger { color: rgba(248,113,113,0.55); }
.cdsp-nav a.danger:hover { background: rgba(248,113,113,0.1); color: #f87171; }

.cdsp-sidebar-footer {
  padding: 14px 14px; border-top: 1px solid var(--cdsp-sidebar-line);
  flex-shrink: 0; text-align: center; transition: padding 0.28s;
}
.cdsp-sidebar.collapsed .cdsp-sidebar-footer { padding: 14px 6px; }

.cdsp-footer-line1 {
  font-size: 10.5px; font-weight: 600; color: rgba(255,255,255,0.4);
  letter-spacing: 0.1px; margin-bottom: 2px;
  transition: opacity 0.2s;
}
.cdsp-sidebar.collapsed .cdsp-footer-line1 { opacity: 0; font-size: 0; }
.cdsp-footer-line2 {
  font-size: 9px; color: rgba(255,255,255,0.2);
  font-family: var(--cdsp-mono); letter-spacing: 0.2px;
  transition: opacity 0.2s;
}
.cdsp-sidebar.collapsed .cdsp-footer-line2 { opacity: 0; font-size: 0; }

/* ══════════════════════════════════════
   CONTENT SHIFT
══════════════════════════════════════ */
.cdsp-content-shift {
  margin-top: var(--cdsp-topbar-h);
  margin-left: var(--cdsp-sidebar-w);
  transition: margin-left 0.28s var(--cdsp-ease);
  min-height: calc(100vh - var(--cdsp-topbar-h));
}
.cdsp-content-shift.sidebar-collapsed { margin-left: var(--cdsp-sidebar-collapsed-w); }

/* ══════════════════════════════════════
   MOBILE BOTTOM BAR
══════════════════════════════════════ */
.cdsp-mobile-bar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0;
  height: var(--cdsp-mobile-bar-h);
  background: var(--cdsp-sidebar-bg);
  z-index: 1000; padding: 0 4px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
}
.cdsp-mobile-nav {
  display: flex; align-items: center; justify-content: space-around;
  height: 100%; list-style: none; margin: 0; padding: 0;
}
.cdsp-mobile-nav li { flex: 1; text-align: center; }
.cdsp-mobile-nav a {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2px; padding: 6px 2px; text-decoration: none;
  color: rgba(255,255,255,0.45); font-size: 9px; font-weight: 500;
  border-radius: 8px; transition: all 0.15s;
}
.cdsp-mobile-nav a .mob-emoji { font-size: 20px; line-height: 1; }
.cdsp-mobile-nav a .mob-label { font-size: 9px; font-weight: 500; }
.cdsp-mobile-nav a:hover { color: rgba(255,255,255,0.8); }
.cdsp-mobile-nav a.active { color: #fff; background: rgba(15,118,110,0.3); }

.cdsp-mobile-nav a.danger { color: rgba(248,113,113,0.5); }
.cdsp-mobile-nav a.danger:hover { color: rgba(248,113,113,0.8); }
.cdsp-mobile-nav a.danger.active { color: #f87171; background: rgba(248,113,113,0.2); }

/* ══════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════ */
@media (max-width: 900px) {
  .cdsp-sidebar { display: none !important; }
  .cdsp-overlay { display: none !important; }
  .cdsp-mobile-bar { display: flex; }
  .cdsp-content-shift { margin-left: 0 !important; margin-bottom: var(--cdsp-mobile-bar-h); }
  .cdsp-brand-sub { display: none; }
  .cdsp-profile-name, .cdsp-profile-role { display: none; }
  .cdsp-profile-chip { padding: 4px; }
  .cdsp-topbar { padding: 0 14px; }
}

@media (min-width: 901px) {
  .cdsp-mobile-bar { display: none !important; }
}

@media (max-width: 500px) {
  .cdsp-topbar { padding: 0 10px; }
  .cdsp-brand-title { font-size: 12px; }
}
`;
    const style = document.createElement('style');
    style.id = CSS_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────────
     SVG ICONS
  ───────────────────────────────────────── */
  const ICON = {
    user:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
    logout: `<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  };

  /* ─────────────────────────────────────────
     BUILD HTML
  ───────────────────────────────────────── */
  function buildNavHTML(userName, userRole, avatarSrc) {
    const chipAvatar = avatarSrc
      ? `<div class="cdsp-avatar"><img src="${avatarSrc}" alt="Profile" onerror="this.parentElement.innerHTML='${ICON.user.replace(/'/g,'&#39;')}'" /></div>`
      : `<div class="cdsp-avatar">${ICON.user}</div>`;

    const sidebarAvatar = avatarSrc
      ? `<div class="cdsp-sidebar-avatar"><img src="${avatarSrc}" alt="Profile" onerror="this.parentElement.innerHTML='${ICON.user.replace(/'/g,'&#39;')}'" /></div>`
      : `<div class="cdsp-sidebar-avatar">${ICON.user}</div>`;

    const desktopNavHTML = NAV_ITEMS.map(item => `
      <li><a href="${item.href}" id="${item.id}"><span class="nav-icon">${item.emoji}</span><span class="nav-label">${item.label}</span></a></li>`).join('');

    const mobileNavHTML = NAV_ITEMS.map(item => `
      <li><a href="${item.href}" id="mob-${item.id}"><span class="mob-emoji">${item.emoji}</span><span class="mob-label">${item.label}</span></a></li>`).join('');

    return `
<header class="cdsp-topbar" role="banner">
  <div class="cdsp-topbar-left">
    <div class="cdsp-logo-area" id="cdsp-logo-area" title="Toggle sidebar">
      <div class="cdsp-logo-img">
        <img src="image/bepo.png" alt="Logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="cdsp-logo-fallback" style="display:none;">BP</div>
      </div>
      <div class="cdsp-brand-text">
        <div class="cdsp-brand-title">Career Development Support Program</div>
        <div class="cdsp-brand-sub">CDSP · BEPO-PESO</div>
      </div>
    </div>
  </div>
  <div class="cdsp-topbar-right">
    <div class="cdsp-profile-chip" id="cdsp-profile-chip" title="Profile">
      ${chipAvatar}
      <div>
        <div class="cdsp-profile-name">${userName}</div>
        <div class="cdsp-profile-role">${userRole}</div>
      </div>
    </div>
  </div>
</header>

<div class="cdsp-overlay" id="cdsp-overlay" aria-hidden="true"></div>

<aside class="cdsp-sidebar" id="cdsp-sidebar" aria-label="Main navigation">
  <div class="cdsp-sidebar-user">
    ${sidebarAvatar}
    <div class="cdsp-sidebar-user-info">
      <div class="cdsp-sidebar-uname" id="cdsp-sb-name">${userName}</div>
      <div class="cdsp-sidebar-urole">${userRole}</div>
    </div>
  </div>

  <div class="cdsp-nav-label">Main Menu</div>

  <nav class="cdsp-nav" aria-label="Sidebar navigation">
    <ul>
      ${desktopNavHTML}
      <li><div class="cdsp-nav-divider"></div></li>
      <li><a href="logout.html" id="nav-logout" class="danger"><span class="nav-icon">🚪</span><span class="nav-label">Logout</span></a></li>
    </ul>
  </nav>

  <div class="cdsp-sidebar-footer">
    <div class="cdsp-footer-line1">Career Development Support Program</div>
    <div class="cdsp-footer-line2">&copy; BEPO-PESO All Rights Reserved 2k26</div>
  </div>
</aside>

<nav class="cdsp-mobile-bar" id="cdsp-mobile-bar" aria-label="Mobile navigation">
  <ul class="cdsp-mobile-nav">
    ${mobileNavHTML}
    <li><a href="logout.html" id="mob-nav-logout" class="danger"><span class="mob-emoji">🚪</span><span class="mob-label">Logout</span></a></li>
  </ul>
</nav>`;
  }

  /* ─────────────────────────────────────────
     MARK ACTIVE LINK
  ───────────────────────────────────────── */
  function markActive() {
    const page = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const id = PAGE_MAP[page];
    if (id) {
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
      const mobEl = document.getElementById('mob-' + id);
      if (mobEl) mobEl.classList.add('active');
    }
  }

  /* ─────────────────────────────────────────
     SIDEBAR TOGGLE (via logo click)
  ───────────────────────────────────────── */
  function attachBehavior() {
    const logoArea = document.getElementById('cdsp-logo-area');
    const sidebar = document.getElementById('cdsp-sidebar');
    if (!logoArea || !sidebar) return;

    const isMobile = () => window.innerWidth <= 900;

    logoArea.addEventListener('click', () => {
      if (isMobile()) return;
      sidebar.classList.toggle('collapsed');
      document.querySelectorAll('.cdsp-content-shift').forEach(el => {
        el.classList.toggle('sidebar-collapsed');
      });
    });
  }

  /* ─────────────────────────────────────────
     SHIFT MAIN CONTENT
  ───────────────────────────────────────── */
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

  /* ─────────────────────────────────────────
     FETCH PROFILE FROM SUPABASE
  ───────────────────────────────────────── */
  async function fetchProfile() {
    const userId = sessionStorage.getItem('bepo_user_id');
    if (!userId) return null;
    try {
      const res = await fetch(
        `${SB_URL}/rest/v1/members?id=eq.${userId}&select=fullname,nickname,id_number,profile_image,role`,
        {
          headers: {
            'apikey': SB_KEY,
            'Authorization': `Bearer ${SB_KEY}`,
            'Content-Type': 'application/json',
          }
        }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.length > 0 ? data[0] : null;
    } catch (e) {
      console.warn('CDSP Navbar: profile fetch failed', e);
      return null;
    }
  }

  /* ─────────────────────────────────────────
     UPDATE AVATAR & NAME AFTER FETCH
  ───────────────────────────────────────── */
  function updateProfileUI(profile) {
    if (!profile) return;
    const name = profile.nickname || profile.fullname || sessionStorage.getItem('bepo_user_name') || 'Member';
    const role = profile.role || sessionStorage.getItem('bepo_id_number') || 'CDSP';
    const avatar = profile.profile_image || null;

    const chip = document.getElementById('cdsp-profile-chip');
    if (chip) {
      const nameEl = chip.querySelector('.cdsp-profile-name');
      const roleEl = chip.querySelector('.cdsp-profile-role');
      const avatarEl = chip.querySelector('.cdsp-avatar');
      if (nameEl) nameEl.textContent = name;
      if (roleEl) roleEl.textContent = role;
      if (avatarEl && avatar) {
        avatarEl.innerHTML = `<img src="${avatar}" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
      }
    }

    const sbName = document.getElementById('cdsp-sb-name');
    if (sbName) sbName.textContent = name;

    const sbAvatar = document.querySelector('.cdsp-sidebar-avatar');
    if (sbAvatar && avatar) {
      sbAvatar.innerHTML = `<img src="${avatar}" alt="Profile" style="width:100%;height:100%;object-fit:cover;" />`;
    }

    sessionStorage.setItem('bepo_user_name', name);
  }

  /* ─────────────────────────────────────────
     MAIN RENDER
  ───────────────────────────────────────── */
  window.renderCDSPNavbar = async function (options) {
    ensureStyles();
    if (document.getElementById('cdsp-sidebar')) return;

    const sessionName = sessionStorage.getItem('bepo_user_name') || 'Member';
    const sessionRole = sessionStorage.getItem('bepo_id_number') || 'CDSP';

    const container = (options && options.containerSelector)
      ? document.querySelector(options.containerSelector)
      : document.body;
    if (!container) return;

    const tmp = document.createElement('div');
    tmp.innerHTML = buildNavHTML(sessionName, sessionRole, null);

    Array.from(tmp.children).forEach(el => {
      document.body.appendChild(el);
    });

    shiftContent();
    markActive();
    attachBehavior();

    const profile = await fetchProfile();
    if (profile) updateProfileUI(profile);
  };

  /* ─────────────────────────────────────────
     AUTO-INIT
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('cdsp-sidebar')) {
      window.renderCDSPNavbar();
    }
  });

})();