import React from 'react';
import './Sidebar.css';

/**
 * Komponen Sidebar Navigasi ReactionLab 11
 * Menampilkan navigasi sisi samping dengan desain minimalis, rapi, dan mudah diakses.
 */
export default function Sidebar({
  activeView = 'home',
  onSelectView,
  currentUser = null,
  isGuest = false,
  onOpenAuth,
  onLogout,
  isOpen = false,
  onClose
}) {
  const handleItemClick = (viewId) => {
    onSelectView(viewId);
    if (onClose) {
      onClose();
    }
  };

  const navSections = [
    {
      title: 'MENU UTAMA',
      items: [
        {
          id: 'home',
          label: 'Beranda',
          subtitle: 'Ringkasan & Kurikulum',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'MATERI & PRAKTIKUM',
      items: [
        {
          id: 'module-1',
          label: 'Bab 1 · Konsep Laju & Mol',
          subtitle: 'Pengertian Laju & Molaritas',
          badge: 'Bab 1',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )
        },
        {
          id: 'module-2',
          label: 'Bab 2 · Teori Tumbukan',
          subtitle: 'Simulator Partikel 2D',
          badge: 'Bab 2',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          )
        },
        {
          id: 'module-3',
          label: 'Bab 3 · Faktor Laju Reaksi',
          subtitle: 'Lab Virtual 4 Variabel',
          badge: 'Bab 3',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31L4.2 18.2A2 2 0 0 0 5.8 21h12.4a2 2 0 0 0 1.6-2.8L14 9.31V2" />
              <path d="M8.5 2h7" />
              <path d="M7 16h10" />
            </svg>
          )
        },
        {
          id: 'module-4',
          label: 'Bab 4 · Analisis & Energi',
          subtitle: 'Orde Reaksi & Diagram Ea',
          badge: 'Bab 4',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
              <line x1="2" y1="20" x2="22" y2="20" />
            </svg>
          )
        },
        {
          id: 'module-5',
          label: 'Bab 5 · Evaluasi Mandiri',
          subtitle: 'Rangkuman & Diagnostik',
          badge: 'Bab 5',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'ASESMEN & PENGAJAR',
      items: [
        {
          id: 'quiz',
          label: 'Kuis Interaktif',
          subtitle: 'Evaluasi Pemahaman',
          badge: '10 Soal',
          isHighlight: true,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path d="m9 14 2 2 4-4" />
            </svg>
          )
        },
        {
          id: 'teacher-panel',
          label: 'Panel Guru',
          subtitle: 'Monitoring & Rekap Kelas',
          badge: 'Khusus Guru',
          isTeacher: true,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <>
      {/* Overlay Backdrop untuk Layar Mobile / Tablet */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`} aria-label="Menu Samping Navigasi">
        {/* Header Sidebar: Brand & Logo */}
        <div className="sidebar-brand-wrapper">
          <div
            className="sidebar-brand"
            onClick={() => handleItemClick('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleItemClick('home')}
          >
            <div className="sidebar-brand-icon">
              ⚗️
            </div>
            <div className="sidebar-brand-info">
              <div className="sidebar-brand-title">
                ReactionLab <span className="sidebar-badge-num">11</span>
              </div>
              <div className="sidebar-brand-desc">Laju Reaksi Kimia SMA</div>
            </div>
          </div>

          {/* Tombol Tutup Sidebar pada Mobile */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Tutup Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Daftar Navigasi Berkelompok */}
        <nav className="sidebar-nav-container">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="sidebar-nav-group">
              <div className="sidebar-group-title">{section.title}</div>
              <div className="sidebar-group-items">
                {section.items.map((item) => {
                  const isActive = activeView === item.id;
                  let itemClasses = 'sidebar-nav-item';
                  if (isActive) itemClasses += ' active';
                  if (item.isHighlight) itemClasses += ' is-highlight';
                  if (item.isTeacher) itemClasses += ' is-teacher';

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={itemClasses}
                      onClick={() => handleItemClick(item.id)}
                      title={item.label}
                    >
                      <span className="sidebar-item-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <div className="sidebar-item-text">
                        <span className="sidebar-item-label">{item.label}</span>
                        {item.subtitle && (
                          <span className="sidebar-item-subtitle">{item.subtitle}</span>
                        )}
                      </div>
                      {item.badge && (
                        <span className="sidebar-item-badge">{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Sidebar: Status Akun / Profil Pengguna */}
        <div className="sidebar-footer">
          {currentUser ? (
            <div className="sidebar-user-card">
              <div className="sidebar-user-avatar">
                {currentUser.avatarInitial || '👤'}
              </div>
              <div className="sidebar-user-details">
                <span className="sidebar-user-name" title={currentUser.name}>
                  {currentUser.name}
                </span>
                <span className="sidebar-user-class">
                  {currentUser.className || 'Siswa XI'}
                </span>
              </div>
              <button
                type="button"
                className="sidebar-btn-logout"
                onClick={onLogout}
                title="Keluar dari akun"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="sidebar-auth-card">
              {isGuest && (
                <div className="sidebar-guest-indicator">
                  <span className="guest-dot">●</span> Mode Akses Tamu
                </div>
              )}
              <button
                type="button"
                className="sidebar-btn-login"
                onClick={onOpenAuth}
              >
                <span>🔑</span> Masuk / Daftar
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
