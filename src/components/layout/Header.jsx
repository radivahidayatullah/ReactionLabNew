import React from 'react';
import './Header.css';

/**
 * Komponen Header Aplikasi ReactionLab 11
 * Menampilkan identitas platform, navigasi cepat ke bagian lembar praktikum,
 * serta status akses terbuka (100% gratis & tanpa login).
 */
export default function Header({ onNavigateToSection }) {
  const handleNavClick = (sectionId) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand / Logo Platform */}
        <div className="header-brand" onClick={() => handleNavClick('hero-section')}>
          <div className="brand-icon-box" aria-hidden="true">
            ⚗️
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">
              ReactionLab <span className="brand-badge">11</span>
            </span>
            <span className="brand-subtitle">Lembar Belajar Laju Reaksi Kimia SMA</span>
          </div>
        </div>

        {/* Navigasi Cepat Halaman */}
        <nav className="header-nav" aria-label="Navigasi Lembar Praktikum">
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('modul-utama')}
          >
            🧪 Modul 1
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('ruang-rumus')}
          >
            📐 Ruang Rumus & Mol
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('peta-kurikulum')}
          >
            🗺️ Rencana Bab
          </button>
        </nav>

        {/* Status Akses Terbuka: Bebas, Tanpa Login, Tanpa Berbayar */}
        <div className="header-meta">
          <div className="open-access-pill" title="Akses Terbuka untuk Siswa & Guru">
            <span className="pill-dot">●</span>
            <span className="pill-text">Akses Terbuka &amp; Gratis</span>
          </div>
        </div>
      </div>
    </header>
  );
}
