import React, { useState } from 'react';
import Header from './components/layout/Header';
import ModuleCard from './components/common/ModuleCard';
import ModuleOneDetail from './features/chapter1-rate-basics/ModuleOneDetail';
import ChemicalFormula from './components/chemistry/ChemicalFormula';
import { COURSE_CHAPTERS } from './data/courseChapters';
import './App.css';

/**
 * Komponen Utama: ReactionLab 11 App
 *
 * Beranda Lembar Belajar Laboratorium untuk Kinetika Kimia & Laju Reaksi.
 * Sesuai PRD:
 * - Menampilkan judul, sasaran pengguna, penjelasan singkat.
 * - Menampilkan Kartu Modul 1 dengan tombol "Mulai Belajar".
 * - Menampilkan kartu modul lain (Bab 2–5) dengan keterangan "Belum Tersedia".
 * - Ruang rumus yang lapang dengan penjelasan spesifik mengenai konsep mol (M = n/V, satuan mol/L·s).
 * - Tidak meminta data pribadi siswa (tanpa login) dan bebas dari fitur berbayar.
 */
export default function App() {
  // Bab pertama (Bab 1) aktif sebagai materi awal
  const moduleOne = COURSE_CHAPTERS[0];

  // State apakah Lembar Belajar Modul 1 sedang terbuka penuh
  // Pemula React: `useState` menampung status boolean true/false untuk membuka atau menutup panel materi
  const [isStudyingModuleOne, setIsStudyingModuleOne] = useState(true);

  // Handler tombol "Mulai Belajar"
  const handleStartLearning = (chapter) => {
    if (chapter.id === 'ch1') {
      setIsStudyingModuleOne(true);
      // Gulir mulus ke lembar materi
      setTimeout(() => {
        const el = document.getElementById('modul-1-belajar');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  // Handler navigasi dari header
  const handleNavigateToSection = (sectionId) => {
    if (sectionId === 'modul-utama') {
      setIsStudyingModuleOne(true);
      setTimeout(() => {
        const el = document.getElementById('modul-1-belajar');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Header Aplikasi */}
      <Header onNavigateToSection={handleNavigateToSection} />

      <main className="main-content">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: Judul, Sasaran Pengguna, Penjelasan Singkat */}
        {/* ============================================================ */}
        <section className="hero-banner" id="hero-section">
          {/* Metadata Lembar Belajar Lab */}
          <div className="worksheet-badge-row">
            <span className="worksheet-pill">
              🔬 Laboratorium Virtual Kimia SMA
            </span>
            <span className="target-pill">
              🎯 Sasaran: Siswa Kelas XI (Fase F) &amp; Guru Kimia SMA
            </span>
            <span className="free-access-pill">
              ✨ 100% Bebas Akses • Tanpa Login Siswa
            </span>
          </div>

          <h1 className="hero-title">
            ReactionLab: Lembar Belajar &amp; Latihan Laju Reaksi
          </h1>

          <p className="hero-description">
            Platform pembelajaran digital interaktif yang dirancang khusus untuk membantu siswa SMA
            memahami kinetika kimia secara mendalam. Hubungkan fenomena perubahan nyata di laboratorium
            dengan pergerakan partikel reaktan serta penurunan matematis berbasis <strong>konsep mol</strong> dan <strong>molaritas</strong>.
          </p>

          {/* Kartu Sasaran Pengguna & Kebutuhan Belajar */}
          <div className="user-persona-grid">
            <div className="persona-card">
              <div className="persona-header">
                <span className="persona-icon">🎓</span>
                <span className="persona-role">Untuk Siswa SMA Kelas XI</span>
              </div>
              <p className="persona-text">
                Belajar mandiri secara terstruktur tanpa hafalan rumus kosong. Pahami mengapa laju dinyatakan dalam <em>mol per liter tiap detik</em>, amati perubahan zat, dan latih perhitungan dengan umpan balik visual langsung.
              </p>
            </div>

            <div className="persona-card">
              <div className="persona-header">
                <span className="persona-icon">👩‍🏫</span>
                <span className="persona-role">Untuk Guru Kimia SMA</span>
              </div>
              <p className="persona-text">
                Media peraga digital interaktif di kelas yang membedah keterkaitan stoikiometri koefisien reaksi, grafik konsentrasi terhadap waktu, serta persiapan praktikum uji faktor laju reaksi.
              </p>
            </div>
          </div>

          {/* Formula Strip Sampel Laboratorium */}
          <div className="lab-sample-strip">
            <span className="strip-title">🧪 Model Reaksi Praktikum:</span>
            <div className="strip-equations">
              <span className="equation-tag">
                <ChemicalFormula formula="CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)" />
              </span>
              <span className="equation-separator">•</span>
              <span className="equation-tag">
                <ChemicalFormula formula="Na2S2O3(aq) + 2HCl(aq) -> 2NaCl(aq) + SO2(g) + S(s) + H2O(l)" />
              </span>
            </div>
          </div>

          {/* Tombol Aksi Utama */}
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => handleStartLearning(moduleOne)}
            >
              Mulai Belajar Modul 1 ➔
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => {
                const el = document.getElementById('ruang-rumus');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Lihat Ruang Rumus &amp; Mol 📐
            </button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. MODUL 1 AKTIF: KARTU MODUL & LEMBAR BELAJAR INTERAKTIF    */}
        {/* ============================================================ */}
        <section className="featured-module-section" id="modul-utama">
          <div className="section-header">
            <div className="section-eyebrow">Modul Pembelajaran Aktif</div>
            <h2 className="section-title">Modul 1: Mengenal Laju Reaksi &amp; Konsep Mol</h2>
            <p className="section-desc">
              Modul ini merupakan fondasi utama kinetika kimia. Pelajari bagaimana berkurangnya mol reaktan atau bertambahnya mol produk dihitung dalam satuan konsentrasi molaritas per detik.
            </p>
          </div>

          {/* Kartu Modul 1 dengan Tombol Mulai Belajar */}
          <div className="module-highlight-wrapper">
            <ModuleCard
              chapter={moduleOne}
              isSelected={isStudyingModuleOne}
              onStartLearning={handleStartLearning}
            />
          </div>

          {/* Lembar Belajar Lengkap Modul 1 (Aktif) */}
          {isStudyingModuleOne && (
            <div className="module-detail-container">
              <ModuleOneDetail
                chapter={moduleOne}
                onClose={() => setIsStudyingModuleOne(false)}
              />
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* 3. RUANG RUMUS & PENJELASAN KHUSUS KONSEP MOL                */}
        {/* ============================================================ */}
        <section className="standalone-formula-section" id="ruang-rumus">
          <div className="section-header">
            <div className="section-eyebrow">Panduan Teori &amp; Penurunan Rumus</div>
            <h2 className="section-title">Ruang Rumus Laboratorium: Kaitan Erat Konsep Mol</h2>
            <p className="section-desc">
              Laju reaksi bukan sekadar kecepatan biasa, melainkan perubahan jumlah mol zat yang larut dalam volume tertentu tiap satuan waktu.
            </p>
          </div>

          <div className="mol-concept-infobox">
            <div className="mol-info-header">
              <span className="mol-icon">💡</span>
              <h4>Mengapa Menggunakan Molaritas (mol/Liter) dan Bukan Satuan Gram?</h4>
            </div>
            <p className="mol-info-body">
              Dalam reaksi kimia, partikel-partikel bereaksi berdasarkan perbandingan <strong>jumlah mol (jumlah partikel)</strong>, bukan perbandingan massa dalam gram. Molaritas (<span className="formula-symbol">[M]</span>) mengukur kerapatan partikel terlarut:
            </p>
            <div className="mol-formula-callout">
              <span className="callout-symbol">[M]</span> ={' '}
              <span className="callout-fraction">
                <span>Jumlah Mol Zat (n, mol)</span>
                <span>Volume Larutan (V, Liter)</span>
              </span>
              {' '}➔{' '}
              <span className="callout-unit">Satuan: mol·L⁻¹</span>
            </div>
            <p className="mol-info-body">
              Sehingga jika reaksi terjadi selama selang waktu <strong>Δt detik</strong>, laju reaksinya (<span className="formula-symbol">r</span>) memiliki satuan pasti:
            </p>
            <div className="rate-unit-badge-row">
              <span className="unit-pill primary">r = |Δ[M]| / Δt</span>
              <span className="unit-pill accent">Satuan: M/detik atau mol·L⁻¹·s⁻¹</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. RENCANA BAB LAIN (BAB 2–5): DIBERI KETERANGAN BELUM TERSEDIA */}
        {/* ============================================================ */}
        <section className="upcoming-chapters-section" id="peta-kurikulum">
          <div className="section-header">
            <div className="section-eyebrow">Rencana Kurikulum Berkelanjutan</div>
            <h2 className="section-title">Peta Pembelajaran Lengkap (Bab 1–5)</h2>
            <p className="section-desc">
              Modul di bawah ini merupakan kelanjutan dari Bab 1. Saat ini kartu rencana lain diberi tanda <strong>Belum Tersedia</strong> karena disiapkan untuk rilis bertahap sesuai spesifikasi PRD.
            </p>
          </div>

          <div className="upcoming-grid">
            {COURSE_CHAPTERS.slice(1).map((chapter) => (
              <ModuleCard
                key={chapter.id}
                chapter={chapter}
                isSelected={false}
                onStartLearning={() => {}}
              />
            ))}
          </div>

          {/* Banner Catatan Roadmap PRD */}
          <div className="roadmap-notice-box">
            <div className="notice-icon">📌</div>
            <div className="notice-content">
              <h5>Catatan Alur Pengembangan Berkelanjutan:</h5>
              <p>
                • <strong>Bab 1 (Aktif Saat Ini):</strong> Fondasi Laju Reaksi, Hubungan Molaritas &amp; Konsep Mol, Lembar Kerja Mandiri.<br />
                • <strong>Bab 2 &amp; Bab 3:</strong> Teori Tumbukan, Simulator Partikel, Laboratorium Virtual Pengaruh Faktor Laju &amp; Kuis Formatif (Local First).<br />
                • <strong>Bab 4 &amp; Bab 5:</strong> Analisis Data Eksperimen, Diagram Energi, Evaluasi Akhir Diagnostik, serta Panel Guru &amp; Database Hasil.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* 5. FOOTER: Informasi Hakikat & Standar Proyek                */}
      {/* ============================================================ */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-logo">⚗️ ReactionLab 11</span>
            <p className="footer-tagline">
              Platform Edukasi Terbuka Kinetika Kimia SMA Kelas XI. Membantu siswa memahami konsep mol, molaritas, dan laju reaksi melalui lembar belajar terarah.
            </p>
            <div className="footer-principles">
              <span className="principle-pill">✓ 100% Gratis &amp; Terbuka</span>
              <span className="principle-pill">✓ Tanpa Login / Tanpa Identitas Siswa</span>
              <span className="principle-pill">✓ Standar Ilmiah Kimia SMA</span>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-ref">
              Sesuai panduan dokumen <code>PRD.md</code> &amp; <code>AGENT.md</code>.
            </div>
            <div className="footer-copyright">
              © 2026 ReactionLab 11 — Laboratorium &amp; Lembar Belajar Laju Reaksi.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
