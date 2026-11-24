import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import ModuleCard from './components/common/ModuleCard';
import ModuleOneDetail from './features/chapter1-rate-basics/ModuleOneDetail';
import ModuleTwoDetail from './features/chapter2-collision-theory/ModuleTwoDetail';
import ModuleThreeDetail from './features/chapter3-rate-factors/ModuleThreeDetail';
import ModuleFourDetail from './features/chapter4-data-analysis/ModuleFourDetail';
import ModuleFiveDetail from './features/chapter5-evaluation/ModuleFiveDetail';
import InteractiveQuiz from './features/quiz/InteractiveQuiz';
import AuthPage from './features/auth/AuthPage';
import TeacherPanel from './features/teacher/TeacherPanel';
import ChemicalFormula from './components/chemistry/ChemicalFormula';
import { COURSE_CHAPTERS } from './data/courseChapters';
import { getStoredData, setStoredData, STORAGE_KEYS } from './utils/storage';
import { subscribeToAuthChanges, logOut } from './services/firebase';
import { recordModuleVisited } from './utils/studentTracker';
import './App.css';

/**
 * Komponen Utama: ReactionLab 11 App
 *
 * Mengelola navigasi halaman (Routing Berbasis State untuk Pemula React):
 * - 'home'     : Beranda utama, kartu 5 modul kurikulum, ruang rumus & konsep mol
 * - 'module-1' : Lembar belajar laboratorium lengkap Bab 1 (Laju & Mol)
 * - 'module-2' : Lembar praktikum virtual Bab 2 (Teori Tumbukan & Simulator Partikel)
 * - 'module-3' : Laboratorium virtual Bab 3 (Uji 4 Variabel Faktor Laju Reaksi)
 * - 'module-4' : Lembar analisis data Bab 4 (Penentuan Orde Reaksi & Diagram Energi)
 * - 'module-5' : Lembar evaluasi komprehensif & diagnostik Bab 5
 * - 'quiz'     : Halaman kuis interaktif 10 soal kinetika kimia
 * - 'auth'     : Halaman autentikasi terpadu (Login Google, Register nama/email/kelas, Lupa Password)
 */
export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | 'module-1' | 'module-2' | 'module-3' | 'module-4' | 'module-5' | 'quiz'

  // State pengguna aktif dari LocalStorage (jika ada)
  const [currentUser, setCurrentUser] = useState(() =>
    getStoredData(STORAGE_KEYS.AUTH_USER, null)
  );

  // State mode tamu: aktif jika pengguna memilih "Masuk sebagai Tamu" pada sesi ini
  const [isGuest, setIsGuest] = useState(false);

  // Tampilkan Halaman Login Tersendiri di awal sebelum masuk ke beranda jika belum login
  const [showAuthGate, setShowAuthGate] = useState(() => {
    const stored = getStoredData(STORAGE_KEYS.AUTH_USER, null);
    return !stored;
  });

  const moduleOne = COURSE_CHAPTERS[0];
  const moduleTwo = COURSE_CHAPTERS[1];
  const moduleThree = COURSE_CHAPTERS[2];
  const moduleFour = COURSE_CHAPTERS[3];
  const moduleFive = COURSE_CHAPTERS[4];

  // Handler pergantian tampilan dengan scroll mulus ke atas
  const handleSelectView = (viewName) => {
    setActiveView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Catat modul yang dikunjungi untuk pelacakan ketuntasan belajar siswa
    if (viewName && (viewName.startsWith('module-') || viewName === 'quiz')) {
      recordModuleVisited(viewName);
    }
  };

  // Sinkronisasi Sesi Firebase Authentication secara Otomatis
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        setStoredData(STORAGE_KEYS.AUTH_USER, firebaseUser);
        setShowAuthGate(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handler saat autentikasi sukses (login / register / google sign-in)
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setIsGuest(false);
    setShowAuthGate(false);
    handleSelectView('home');
  };

  // Handler saat pengguna memilih lanjut sebagai tamu (akses terbuka)
  const handleGuestAccess = () => {
    setIsGuest(true);
    setShowAuthGate(false);
    handleSelectView('home');
  };

  // Handler saat pengguna keluar (logout Firebase resmi) -> kembali ke halaman login tersendiri
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
    setStoredData(STORAGE_KEYS.AUTH_USER, null);
    setCurrentUser(null);
    setIsGuest(false);
    setShowAuthGate(true);
    handleSelectView('home');
  };

  // Handler membuka halaman login tersendiri dari dalam aplikasi
  const handleOpenAuth = () => {
    setShowAuthGate(true);
  };

  // Handler pembatalan dari formulir (kembali ke posisi belajar sebelumnya)
  const handleCancelAuth = () => {
    if (isGuest || currentUser) {
      setShowAuthGate(false);
    } else {
      handleGuestAccess();
    }
  };

  // Handler tombol "Mulai Belajar" dari kartu modul
  const handleStartLearning = (chapter) => {
    if (chapter.id === 'ch1') {
      handleSelectView('module-1');
    } else if (chapter.id === 'ch2') {
      handleSelectView('module-2');
    } else if (chapter.id === 'ch3') {
      handleSelectView('module-3');
    } else if (chapter.id === 'ch4') {
      handleSelectView('module-4');
    } else if (chapter.id === 'ch5') {
      handleSelectView('module-5');
    }
  };

  // ============================================================
  // HALAMAN LOGIN TERSENDIRI (SEBELUM MASUK BERANDA & MATERI)
  // ============================================================
  if (showAuthGate) {
    return (
      <AuthPage
        isStandalone={true}
        onAuthSuccess={handleAuthSuccess}
        onGuestAccess={handleGuestAccess}
        onCancel={handleCancelAuth}
      />
    );
  }

  // ============================================================
  // PANEL GURU TERPISAH (TIDAK BERCAMPUR DENGAN MENU ATAU BAB SISWA)
  // ============================================================
  if (activeView === 'teacher-panel') {
    return (
      <div className="teacher-standalone-wrapper animate-fade-in">
        <TeacherPanel
          onBackToStudentView={() => handleSelectView('home')}
          currentUser={currentUser}
        />
      </div>
    );
  }

  // ============================================================
  // APLIKASI UTAMA LEMBAR SISWA (DENGAN HEADER & SELURUH MATERI)
  // ============================================================
  return (
    <div className="app-container">
      {/* Header Aplikasi dengan Navigasi Halaman dan Status Akun */}
      <Header
        activeView={activeView}
        onSelectView={handleSelectView}
        currentUser={currentUser}
        isGuest={isGuest}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {/* ============================================================ */}
        {/* TAMPILAN 1: HALAMAN KUIS INTERAKTIF (10 SOAL)                */}
        {/* ============================================================ */}
        {activeView === 'quiz' && (
          <InteractiveQuiz
            onBackToHome={() => handleSelectView('home')}
            onNavigateToModuleOne={() => handleSelectView('module-1')}
            onNavigateToModuleFive={() => handleSelectView('module-5')}
          />
        )}

        {/* ============================================================ */}
        {/* TAMPILAN 2: LEMBAR BELAJAR LABORATORIUM MODUL 1 (LENGKAP)    */}
        {/* ============================================================ */}
        {activeView === 'module-1' && (
          <div className="view-wrapper animate-fade-in">
            <div className="view-breadcrumb">
              <button
                type="button"
                className="breadcrumb-back-btn"
                onClick={() => handleSelectView('home')}
              >
                ← Kembali ke Beranda
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Bab 1: Mengenal Laju Reaksi &amp; Konsep Mol</span>
            </div>

            <ModuleOneDetail
              chapter={moduleOne}
              onClose={() => handleSelectView('home')}
              onNavigateToQuiz={() => handleSelectView('quiz')}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAMPILAN 3: LEMBAR BELAJAR BAB 2 (TEORI TUMBUKAN & SIMULASI) */}
        {/* ============================================================ */}
        {activeView === 'module-2' && (
          <div className="view-wrapper animate-fade-in">
            <div className="view-breadcrumb">
              <button
                type="button"
                className="breadcrumb-back-btn"
                onClick={() => handleSelectView('home')}
              >
                ← Kembali ke Beranda
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Bab 2: Teori Tumbukan &amp; Simulator Partikel</span>
            </div>

            <ModuleTwoDetail
              chapter={moduleTwo}
              onClose={() => handleSelectView('home')}
              onNavigateToQuiz={() => handleSelectView('quiz')}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAMPILAN 4: LEMBAR BELAJAR BAB 3 (FAKTOR LAJU & LAB VIRTUAL) */}
        {/* ============================================================ */}
        {activeView === 'module-3' && (
          <div className="view-wrapper animate-fade-in">
            <div className="view-breadcrumb">
              <button
                type="button"
                className="breadcrumb-back-btn"
                onClick={() => handleSelectView('home')}
              >
                ← Kembali ke Beranda
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Bab 3: Faktor-Faktor Laju Reaksi</span>
            </div>

            <ModuleThreeDetail
              chapter={moduleThree}
              onClose={() => handleSelectView('home')}
              onNavigateToQuiz={() => handleSelectView('quiz')}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAMPILAN 5: LEMBAR BELAJAR BAB 4 (ANALISIS DATA & DIAGRAM)   */}
        {/* ============================================================ */}
        {activeView === 'module-4' && (
          <div className="view-wrapper animate-fade-in">
            <div className="view-breadcrumb">
              <button
                type="button"
                className="breadcrumb-back-btn"
                onClick={() => handleSelectView('home')}
              >
                ← Kembali ke Beranda
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Bab 4: Analisis Data &amp; Profil Diagram Energi</span>
            </div>

            <ModuleFourDetail
              chapter={moduleFour}
              onClose={() => handleSelectView('home')}
              onNavigateToQuiz={() => handleSelectView('quiz')}
              onNavigateToModuleFive={() => handleSelectView('module-5')}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAMPILAN 6: LEMBAR EVALUASI AKHIR & DIAGNOSTIK BAB 5        */}
        {/* ============================================================ */}
        {activeView === 'module-5' && (
          <div className="view-wrapper animate-fade-in">
            <div className="view-breadcrumb">
              <button
                type="button"
                className="breadcrumb-back-btn"
                onClick={() => handleSelectView('home')}
              >
                ← Kembali ke Beranda
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Bab 5: Evaluasi Akhir &amp; Diagnostik</span>
            </div>

            <ModuleFiveDetail
              chapter={moduleFive}
              onStartQuiz={() => handleSelectView('quiz')}
              onClose={() => handleSelectView('home')}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAMPILAN 7: BERANDA UTAMA (HOME VIEW)                        */}
        {/* ============================================================ */}
        {activeView === 'home' && (
          <div className="home-view animate-fade-in">
            {/* Hero Section */}
            <section className="hero-banner" id="hero-section">
              {/* Notifikasi Pengguna / Banner Status Akun */}
              {currentUser ? (
                <div className="user-welcome-banner animate-fade-in">
                  <span className="welcome-avatar-badge">{currentUser.avatarInitial || '👤'}</span>
                  <div className="welcome-text">
                    <strong>Selamat Datang, {currentUser.name}!</strong> ({currentUser.className}) — Masuk via{' '}
                    {currentUser.provider === 'google' ? 'Akun Google Langsung' : 'Email Siswa'}. Catatan progres kuis dan aktivitas praktikum Anda tersimpan secara lokal.
                  </div>
                </div>
              ) : (
                <div className="auth-reminder-banner animate-fade-in">
                  <div className="reminder-left">
                    <span className="reminder-icon">🔐</span>
                    <div className="reminder-text">
                      <strong>Akun Siswa / Guru:</strong> Masuk atau daftarkan akun Anda (bisa langsung pakai Akun Google) untuk menyimpan rekam jejak kuis &amp; praktikum.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-reminder-auth"
                    onClick={handleOpenAuth}
                  >
                    Masuk / Daftar Akun ➔
                  </button>
                </div>
              )}

              <div className="worksheet-badge-row">
                <span className="worksheet-pill">
                  🔬 Laboratorium Virtual Kimia SMA
                </span>
                <span className="target-pill">
                  🎯 Sasaran: Siswa Kelas XI (Fase F) &amp; Guru Kimia SMA
                </span>
                <span className="free-access-pill">
                  ✨ 100% Bebas Akses • Seluruh 5 Bab Lengkap
                </span>
              </div>

              <h1 className="hero-title">
                ReactionLab: Laboratorium &amp; Lembar Belajar Laju Reaksi
              </h1>

              <p className="hero-description">
                Platform pembelajaran interaktif kinetika kimia SMA yang menghubungkan fenomena makroskopis,
                pergerakan partikel submikroskopis, simulasi faktor reaksi, analisis orde kuantitatif, hingga diagram energi aktivasi.
              </p>

              {/* Persona Pengguna */}
              <div className="user-persona-grid">
                <div className="persona-card">
                  <div className="persona-header">
                    <span className="persona-icon">🎓</span>
                    <span className="persona-role">Untuk Siswa SMA Kelas XI</span>
                  </div>
                  <p className="persona-text">
                    Belajar mandiri dengan runtutan materi terarah: memahami konsep mol &amp; molaritas, melihat tumbukan partikel, menguji faktor laju di lab virtual, hingga menguji penalaran di kuis 10 soal.
                  </p>
                </div>

                <div className="persona-card">
                  <div className="persona-header">
                    <span className="persona-icon">👩‍🏫</span>
                    <span className="persona-role">Untuk Guru Kimia SMA</span>
                  </div>
                  <p className="persona-text">
                    Media peraga praktikum virtual untuk menjelaskan pengaruh 4 variabel reaksi, penentuan orde reaksi, diagram energi, serta memantau skor kuis dan ketuntasan belajar siswa.
                  </p>
                  <button
                    type="button"
                    className="btn-persona-teacher"
                    onClick={() => handleSelectView('teacher-panel')}
                  >
                    Buka Panel Guru (Pemantauan Kelas) ➔
                  </button>
                </div>
              </div>

              {/* Formula Model Reaksi */}
              <div className="lab-sample-strip">
                <span className="strip-title">🧪 Model Reaksi Praktikum:</span>
                <div className="strip-equations">
                  <span className="equation-tag">
                    <ChemicalFormula formula="CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)" />
                  </span>
                  <span className="equation-separator">•</span>
                  <span className="equation-tag">
                    <ChemicalFormula formula="2NO(g) + Cl2(g) -> 2NOCl(g)" />
                  </span>
                </div>
              </div>

              {/* Tombol Aksi Hero */}
              <div className="hero-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => handleSelectView('module-1')}
                >
                  Mulai Bab 1 (Laju &amp; Mol) ➔
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => handleSelectView('module-3')}
                >
                  🧪 Lab Virtual Bab 3
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => handleSelectView('module-4')}
                >
                  📊 Analisis Data Bab 4
                </button>
                <button
                  type="button"
                  className="btn btn-quiz-cta btn-lg"
                  onClick={() => handleSelectView('quiz')}
                >
                  📝 Ikuti Kuis 10 Soal
                </button>
              </div>
            </section>

            {/* Bagian Semua Modul Pembelajaran Aktif (Bab 1 s.d. Bab 5) */}
            <section className="featured-modules-row" id="modul-aktif">
              <div className="section-header">
                <div className="section-eyebrow">Alur Kurikulum Lengkap &amp; Mandiri</div>
                <h2 className="section-title">Semua Modul Pembelajaran (Bab 1 s.d. Bab 5)</h2>
                <p className="section-desc">
                  Seluruh rangkaian materi laju reaksi telah siap digunakan: dari konsep mol, simulator teori tumbukan, laboratorium variabel, penentuan orde reaksi, hingga evaluasi akhir diagnostik.
                </p>
              </div>

              <div className="active-modules-grid">
                {COURSE_CHAPTERS.map((chapter) => (
                  <ModuleCard
                    key={chapter.id}
                    chapter={chapter}
                    isSelected={false}
                    onStartLearning={handleStartLearning}
                  />
                ))}
              </div>
            </section>

            {/* Ruang Rumus & Konsep Mol */}
            <section className="standalone-formula-section" id="ruang-rumus">
              <div className="section-header">
                <div className="section-eyebrow">Panduan Teori &amp; Penurunan Rumus</div>
                <h2 className="section-title">Ruang Rumus Laboratorium: Kaitan Erat Konsep Mol</h2>
                <p className="section-desc">
                  Laju reaksi mengukur berkurangnya jumlah mol zat reaktan terlarut per liter larutan tiap satuan detik.
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
                  Sehingga laju reaksi (<span className="formula-symbol">r</span>) memiliki satuan pasti:
                </p>
                <div className="rate-unit-badge-row">
                  <span className="unit-pill primary">r = |Δ[M]| / Δt</span>
                  <span className="unit-pill accent">Satuan: M/detik atau mol·L⁻¹·s⁻¹</span>
                  <span className="unit-pill" style={{ backgroundColor: '#f1f5f9', color: '#334155' }}>
                    Hukum Laju: r = k [A]ˣ [B]ʸ
                  </span>
                </div>
              </div>
            </section>

            {/* Banner Kurikulum Lengkap */}
            <div className="roadmap-notice-box">
              <div className="notice-icon">🎉</div>
              <div className="notice-content">
                <h5>ReactionLab 11 — Seluruh Modul Siap Digunakan:</h5>
                <p>
                  • <strong>Bab 1:</strong> Fondasi Laju Reaksi, Hubungan Molaritas &amp; Konsep Mol.<br />
                  • <strong>Bab 2:</strong> Teori Tumbukan &amp; Simulator Partikel Kinetik 2D.<br />
                  • <strong>Bab 3:</strong> Laboratorium Virtual Pengaruh 4 Variabel Reaksi (Suhu, Konsentrasi, Luas Permukaan, Katalis).<br />
                  • <strong>Bab 4:</strong> Analisis Data Eksperimen, Penentuan Orde Reaksi, &amp; Diagram Profil Energi.<br />
                  • <strong>Bab 5:</strong> Evaluasi Akhir Komprehensif dengan Kuis Interaktif 10 Soal &amp; Rapor Diagnostik.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Aplikasi */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-logo">⚗️ ReactionLab 11</span>
            <p className="footer-tagline">
              Platform Edukasi Terbuka Kinetika Kimia SMA Kelas XI. Membantu siswa memahami konsep mol, molaritas, teori tumbukan, faktor reaksi, dan orde reaksi melalui lembar belajar terarah.
            </p>
            <div className="footer-principles">
              <span className="principle-pill">✓ 100% Gratis &amp; Terbuka</span>
              <span className="principle-pill">✓ Standar Ilmiah Kimia SMA</span>
              <button
                type="button"
                className="btn-footer-teacher"
                onClick={() => handleSelectView('teacher-panel')}
              >
                👨‍🏫 Panel Guru (Pemantauan Kelas)
              </button>
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
