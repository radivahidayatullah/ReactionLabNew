import React from 'react';
import './Header.css';

/**
 * Komponen Header Aplikasi ReactionLab 11
 * Menampilkan logo, navigasi antar-bab (Bab 1–5, Kuis 10 Soal),
 * status login pengguna (Nama, Kelas, Tombol Keluar), atau tombol Masuk / Daftar.
 */
export default function Header({
  activeView = 'home',
  onSelectView,
  currentUser = null,
  isGuest = false,
  onOpenAuth,
  onLogout
}) {
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand / Logo Platform */}
        <div
          className="header-brand"
          onClick={() => onSelectView('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectView('home')}
        >
          <div className="brand-icon-box" aria-hidden="true">
            ⚗️
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">
              ReactionLab <span className="brand-badge">11</span>
            </span>
            <span className="brand-subtitle">Laboratorium &amp; Lembar Belajar Laju Reaksi</span>
          </div>
        </div>

        {/* Navigasi Halaman Utama */}
        <nav className="header-nav" aria-label="Navigasi Lembar Praktikum">
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => onSelectView('home')}
          >
            🏠 Beranda
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'module-1' ? 'active' : ''}`}
            onClick={() => onSelectView('module-1')}
          >
            ⏱️ Bab 1 (Laju &amp; Mol)
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'module-2' ? 'active' : ''}`}
            onClick={() => onSelectView('module-2')}
          >
            💥 Bab 2 (Teori Tumbukan)
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'module-3' ? 'active' : ''}`}
            onClick={() => onSelectView('module-3')}
          >
            🧪 Bab 3 (Faktor Laju)
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'module-4' ? 'active' : ''}`}
            onClick={() => onSelectView('module-4')}
          >
            📊 Bab 4 (Analisis &amp; Energi)
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'module-5' ? 'active' : ''}`}
            onClick={() => onSelectView('module-5')}
          >
            🏆 Bab 5 (Evaluasi Akhir)
          </button>
          <button
            type="button"
            className={`nav-link-btn nav-link-btn--highlight ${activeView === 'quiz' ? 'active' : ''}`}
            onClick={() => onSelectView('quiz')}
          >
            📝 Kuis (10 Soal)
          </button>
        </nav>

        {/* Sisi Kanan: Akses Khusus Panel Guru & Status Akun Pengguna */}
        <div className="header-meta">
          {/* Tombol Akses Khusus Panel Guru (Terpisah dari Navigasi Bab) */}
          <button
            type="button"
            className="btn-teacher-portal-access"
            onClick={() => onSelectView('teacher-panel')}
            title="Buka Panel Guru (Pemantauan Hasil Asesmen, Skor Kuis, & Ketuntasan Siswa)"
          >
            👨‍🏫 Panel Guru
          </button>

          {currentUser ? (
            <div className="user-profile-badge animate-fade-in" title={`Masuk sebagai: ${currentUser.email}`}>
              <span className="user-avatar">{currentUser.avatarInitial || '👤'}</span>
              <div className="user-info-text">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-class">{currentUser.className}</span>
              </div>
              <button
                type="button"
                className="btn-logout"
                onClick={onLogout}
                title="Keluar dari Akun"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="header-auth-group">
              {isGuest && (
                <span className="guest-badge-pill" title="Anda sedang dalam Mode Akses Terbuka (Tamu)">
                  <span className="pill-dot">●</span> Mode Tamu
                </span>
              )}
              <button
                type="button"
                className="btn-auth-header"
                onClick={onOpenAuth}
                title="Buka Halaman Masuk / Daftar"
              >
                🔑 Masuk / Daftar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
