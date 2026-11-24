import React from 'react';
import './Header.css';

/**
 * Komponen Top Header Aplikasi ReactionLab 11
 * Versi baru yang lebih simpel, bersih, dan elegan setelah navigasi dipindahkan ke Sidebar samping.
 * Menampilkan:
 * - Tombol hamburger (toggle sidebar mobile & desktop)
 * - Breadcrumb / indikator halaman aktif
 * - Status mode siswa & tombol akses cepat ke Panel Guru
 * - Status profil pengguna / tombol Masuk-Daftar
 */
export default function Header({
  activeView = 'home',
  onSelectView,
  currentUser = null,
  isGuest = false,
  onOpenAuth,
  onLogout,
  onToggleSidebar
}) {
  const VIEW_MAP = {
    'home': {
      category: 'ReactionLab 11',
      title: 'Beranda Laboratorium',
      icon: '🏠'
    },
    'module-1': {
      category: 'Materi Belajar',
      title: 'Bab 1: Konsep Laju Reaksi & Mol',
      icon: '⏱️'
    },
    'module-2': {
      category: 'Praktikum Virtual',
      title: 'Bab 2: Teori Tumbukan & Simulator',
      icon: '💥'
    },
    'module-3': {
      category: 'Laboratorium Virtual',
      title: 'Bab 3: 4 Faktor Laju Reaksi',
      icon: '🧪'
    },
    'module-4': {
      category: 'Analisis Data',
      title: 'Bab 4: Penentuan Orde & Diagram Ea',
      icon: '📊'
    },
    'module-5': {
      category: 'Evaluasi Pembelajaran',
      title: 'Bab 5: Evaluasi Mandiri & Diagnostik',
      icon: '🏆'
    },
    'quiz': {
      category: 'Asesmen Mandiri',
      title: 'Kuis Interaktif 10 Soal',
      icon: '📝'
    },
    'teacher-panel': {
      category: 'Portal Pengajar',
      title: 'Panel Pemantauan Guru',
      icon: '👨‍🏫'
    }
  };

  const currentInfo = VIEW_MAP[activeView] || VIEW_MAP['home'];

  return (
    <header className="app-top-header">
      <div className="top-header-inner">
        {/* Sisi Kiri: Tombol Hamburger Menu & Indikator Halaman */}
        <div className="top-header-left">
          <button
            type="button"
            className="btn-hamburger"
            onClick={onToggleSidebar}
            aria-label="Buka / Tutup Menu Navigasi"
            title="Menu Samping"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Indikator Lokasi Halaman yang Bersih & Simpel */}
          <div className="header-location-pill">
            <span className="location-category">{currentInfo.category}</span>
            <span className="location-divider">/</span>
            <span className="location-title">
              <span className="location-icon" aria-hidden="true">{currentInfo.icon}</span>
              {currentInfo.title}
            </span>
          </div>
        </div>

        {/* Sisi Kanan: Status Kurikulum, Akses Guru & Status Akun */}
        <div className="top-header-right">
          {/* Badge Kurikulum (Ringkas) */}
          <span className="curriculum-badge" title="Materi Standar Kurikulum Merdeka Kimia Fase F (Kelas XI SMA)">
            <span className="badge-dot">●</span> Fase F · Kelas XI SMA
          </span>

          {/* Tombol Akses Panel Guru Cepat */}
          <button
            type="button"
            className="btn-quick-teacher"
            onClick={() => onSelectView('teacher-panel')}
            title="Buka Panel Guru (Pemantauan Hasil Asesmen & Nilai Siswa)"
          >
            👨‍🏫 Panel Guru
          </button>

          {/* Status Akun Pengguna / Tombol Masuk */}
          {currentUser ? (
            <div className="user-top-pill" title={`Masuk sebagai: ${currentUser.email}`}>
              <span className="user-top-avatar">
                {currentUser.avatarInitial || '👤'}
              </span>
              <div className="user-top-text">
                <span className="user-top-name">{currentUser.name}</span>
                <span className="user-top-role">{currentUser.className || 'Siswa'}</span>
              </div>
              <button
                type="button"
                className="btn-top-logout"
                onClick={onLogout}
                title="Keluar dari Akun"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="top-auth-group">
              {isGuest && (
                <span className="top-guest-badge" title="Mode Tamu">
                  Tamu
                </span>
              )}
              <button
                type="button"
                className="btn-top-auth"
                onClick={onOpenAuth}
                title="Masuk atau Daftar Akun"
              >
                🔑 Masuk
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
