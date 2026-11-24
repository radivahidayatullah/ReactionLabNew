import React, { useState } from 'react';
import { setStoredData, STORAGE_KEYS } from '../../utils/storage';
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  resetUserPassword
} from '../../services/firebase';

/**
 * Komponen AuthPage (Halaman Autentikasi ReactionLab 11)
 *
 * Terhubung langsung dengan Firebase Authentication Resmi:
 * 1. Log In (Masuk dengan Email/Password atau Akun Google Popup)
 * 2. Register (Pendaftaran akun siswa: Nama, Akun Email, Kelas, Kata Sandi)
 * 3. Forgot Password (Pengiriman email reset kata sandi resmi Firebase)
 */
function AuthPage({ onAuthSuccess, onGuestAccess, onCancel, isStandalone = false }) {
  // Mode aktif: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState('login');

  // State Formulir Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State Formulir Register (Nama, Akun Email, Kelas, Kata Sandi)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regClass, setRegClass] = useState('XI Fase F 1');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // State Formulir Lupa Kata Sandi
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Status feedback dan loading
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bersihkan notifikasi saat berpindah mode
  const switchMode = (mode) => {
    setAuthMode(mode);
    setErrorMsg('');
    setSuccessMsg('');
    setForgotSent(false);
  };

  // ============================================================
  // 1. HANDLER MASUK DENGAN AKUN GOOGLE SUNワン (FIREBASE POPUP)
  // ============================================================
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsGoogleLoading(true);

    try {
      const res = await signInWithGoogle();
      setIsGoogleLoading(false);

      if (res.success && res.user) {
        setSuccessMsg('Berhasil masuk dengan Akun Google!');
        setStoredData(STORAGE_KEYS.AUTH_USER, res.user);
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(res.user);
        }, 350);
      } else {
        setErrorMsg(res.error || 'Gagal masuk dengan Akun Google.');
      }
    } catch (err) {
      setIsGoogleLoading(false);
      console.error('Google Sign-In Error:', err);
      setErrorMsg('Terjadi kendala saat menghubungkan ke akun Google.');
    }
  };

  // ============================================================
  // 2. HANDLER LOGIN DENGAN EMAIL & PASSWORD SUNワン (FIREBASE AUTH)
  // ============================================================
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Mohon isi alamat email dan kata sandi Anda.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signInWithEmail(loginEmail, loginPassword);
      setIsSubmitting(false);

      if (res.success && res.user) {
        setSuccessMsg('Berhasil masuk! Mengarahkan ke materi...');
        setStoredData(STORAGE_KEYS.AUTH_USER, res.user);
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(res.user);
        }, 350);
      } else {
        setErrorMsg(res.error || 'Email atau kata sandi tidak valid.');
      }
    } catch (err) {
      setIsSubmitting(false);
      console.error('Email Login Error:', err);
      setErrorMsg('Terjadi kesalahan saat masuk akun.');
    }
  };

  // ============================================================
  // 3. HANDLER REGISTER SISWA BARU SUNワン (FIREBASE CREATE USER)
  // ============================================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName.trim()) {
      setErrorMsg('Nama lengkap siswa wajib diisi.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMsg('Alamat email tidak valid.');
      return;
    }
    if (!regClass.trim()) {
      setErrorMsg('Pilih atau isi kelas Anda.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('Kata sandi minimal harus 6 karakter.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerWithEmail(
        regEmail,
        regPassword,
        regName,
        regClass
      );
      setIsSubmitting(false);

      if (res.success && res.user) {
        setSuccessMsg('Akun siswa berhasil dibuat di Firebase! Selamat datang di ReactionLab 11.');
        setStoredData(STORAGE_KEYS.AUTH_USER, res.user);
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(res.user);
        }, 400);
      } else {
        setErrorMsg(res.error || 'Pendaftaran akun gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setIsSubmitting(false);
      console.error('Register Error:', err);
      setErrorMsg('Terjadi kendala saat mendaftarkan akun.');
    }
  };

  // ============================================================
  // 4. HANDLER LUPA KATA SANDI SUNワン (FIREBASE RESET PASSWORD)
  // ============================================================
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!forgotEmail || !forgotEmail.includes('@')) {
      setErrorMsg('Mohon masukkan alamat email yang valid.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await resetUserPassword(forgotEmail);
      setIsSubmitting(false);

      if (res.success) {
        setForgotSent(true);
        setSuccessMsg(res.message);
      } else {
        setErrorMsg(res.error || 'Gagal mengirim email reset kata sandi.');
      }
    } catch (err) {
      setIsSubmitting(false);
      console.error('Reset Password Error:', err);
      setErrorMsg('Terjadi kendala saat mengirim permintaan reset sandi.');
    }
  };

  // ============================================================
  // RENDER KARTU FORMULIR AUTENTIKASI (LOGIN / REGISTER / FORGOT)
  // ============================================================
  const renderAuthCard = () => (
    <div className="auth-card">
      {/* Tombol Tutup / Kembali (aktif jika bukan mode gerbang awal standalone) */}
      {onCancel && !isStandalone && (
        <button
          type="button"
          className="auth-close-btn"
          onClick={onCancel}
          title="Kembali ke Beranda"
        >
          ✕
        </button>
      )}

      {/* Brand & Judul Header Autentikasi */}
      <div className="auth-header">
        <div className="auth-logo-badge" aria-hidden="true">
          ⚗️
        </div>
        <h2 className="auth-title">
          {authMode === 'login' && 'Masuk ke ReactionLab 11'}
          {authMode === 'register' && 'Daftar Akun Siswa Baru'}
          {authMode === 'forgot' && 'Atur Ulang Kata Sandi'}
        </h2>
        <p className="auth-subtitle">
          {authMode === 'login' && 'Simpan rekam jejak latihan, riwayat kuis, dan progres praktikum kinetika kimia Anda.'}
          {authMode === 'register' && 'Lengkapi profil belajar kimia Anda untuk menyimpan skor kuis dan capaian modul.'}
          {authMode === 'forgot' && 'Masukkan email terdaftar untuk menerima petunjuk pemulihan kata sandi.'}
        </p>
      </div>

      {/* Banner Pesan Error / Sukses */}
      {errorMsg && (
        <div className="auth-alert-banner alert-danger animate-fade-in" role="alert">
          <span>⚠️ {errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="auth-alert-banner alert-success animate-fade-in" role="alert">
          <span>✅ {successMsg}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* FORM 1: MASUK (LOG IN)                                       */}
      {/* ============================================================ */}
      {authMode === 'login' && (
        <div className="auth-form-container">
          {/* Tombol Masuk dengan Akun Google */}
          <button
            type="button"
            className="btn-google-auth"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <span>🔄 Menghubungkan ke Akun Google...</span>
            ) : (
              <>
                <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Lanjutkan dengan Akun Google</span>
              </>
            )}
          </button>

          <div className="auth-divider">
            <span>atau masuk dengan email</span>
          </div>

          {/* Form Email & Password */}
          <form onSubmit={handleEmailLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Akun Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="contoh: siswa@sekolah.sch.id"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="login-password" className="form-label">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  className="link-btn-sm"
                  onClick={() => switchMode('forgot')}
                >
                  Lupa kata sandi?
                </button>
              </div>
              <input
                id="login-password"
                type="password"
                placeholder="Masukkan kata sandi akun"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full-width btn-auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Memproses Masuk...' : 'Masuk ke Akun ➔'}
            </button>
          </form>

          <div className="auth-switch-footer">
            <span>Belum memiliki akun siswa?</span>{' '}
            <button
              type="button"
              className="link-btn-highlight"
              onClick={() => switchMode('register')}
            >
              Daftar sekarang
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* FORM 2: REGISTER (NAMA, EMAIL, KELAS, KATA SANDI)            */}
      {/* ============================================================ */}
      {authMode === 'register' && (
        <div className="auth-form-container">
          {/* Opsi Google Cepat */}
          <button
            type="button"
            className="btn-google-auth"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Daftar Cepat dengan Akun Google</span>
          </button>

          <div className="auth-divider">
            <span>atau lengkapi formulir pendaftaran</span>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="reg-name" className="form-label">
                Nama Lengkap Siswa <span className="req">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                placeholder="contoh: Radiva Hidayatullah"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">
                Akun Email <span className="req">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                placeholder="contoh: radiva@siswa.sch.id"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-class" className="form-label">
                Kelas / Rombel SMA <span className="req">*</span>
              </label>
              <select
                id="reg-class"
                value={regClass}
                onChange={(e) => setRegClass(e.target.value)}
                className="form-select"
              >
                <option value="XI Fase F 1">XI Fase F 1 (Kurikulum Merdeka)</option>
                <option value="XI Fase F 2">XI Fase F 2 (Kurikulum Merdeka)</option>
                <option value="XI Fase F 3">XI Fase F 3 (Kurikulum Merdeka)</option>
                <option value="XI MIPA 1">XI MIPA 1 (Peminatan Sains)</option>
                <option value="XI MIPA 2">XI MIPA 2 (Peminatan Sains)</option>
                <option value="XI MIPA 3">XI MIPA 3 (Peminatan Sains)</option>
                <option value="Guru / Pendidik">Guru / Tenaga Pendidik Kimia</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">
                Kata Sandi Baru <span className="req">*</span>
              </label>
              <input
                id="reg-password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm" className="form-label">
                Ulangi Kata Sandi <span className="req">*</span>
              </label>
              <input
                id="reg-confirm"
                type="password"
                placeholder="Masukkan kata sandi yang sama"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full-width btn-auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mendaftarkan Akun...' : 'Buat Akun Siswa Baru ➔'}
            </button>
          </form>

          <div className="auth-switch-footer">
            <span>Sudah memiliki akun?</span>{' '}
            <button
              type="button"
              className="link-btn-highlight"
              onClick={() => switchMode('login')}
            >
              Masuk di sini
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* FORM 3: FORGET PASSWORD (LUPA KATA SANDI)                    */}
      {/* ============================================================ */}
      {authMode === 'forgot' && (
        <div className="auth-form-container">
          {!forgotSent ? (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="form-group">
                <label htmlFor="forgot-email" className="form-label">
                  Email Akun Terdaftar
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="Masukkan email akun siswa Anda"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="form-input"
                  required
                />
                <span className="input-hint">
                  Kami akan mengirimkan instruksi dan tautan pemulihan kata sandi ke alamat ini.
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full-width btn-auth-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim Email...' : 'Kirim Tautan Atur Ulang Sandi ➔'}
              </button>
            </form>
          ) : (
            <div className="forgot-success-box animate-fade-in">
              <div className="success-icon">📬</div>
              <h4>Email Pemulihan Terkirim</h4>
              <p>
                Silakan periksa kotak masuk email Anda (termasuk folder spam). Klik tautan di dalam email untuk membuat kata sandi baru.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-full-width"
                onClick={() => switchMode('login')}
              >
                Kembali ke Halaman Masuk
              </button>
            </div>
          )}

          <div className="auth-switch-footer">
            <button
              type="button"
              className="link-btn-secondary"
              onClick={() => switchMode('login')}
            >
              ← Kembali ke Halaman Masuk
            </button>
          </div>
        </div>
      )}

      {/* Box Opsi Akses Terbuka / Mode Tamu */}
      <div className="auth-guest-box">
        <div className="guest-box-header">
          <span className="guest-box-icon">🚀</span>
          <div className="guest-box-text">
            <strong>Ingin Langsung Belajar Tanpa Akun?</strong>
            <p>ReactionLab 11 100% bebas akses. Anda dapat langsung membuka seluruh materi Bab 1–5 dan kuis interaktif tanpa mendaftar.</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-guest-portal"
          onClick={onGuestAccess || onCancel}
        >
          Masuk sebagai Tamu (Mode Terbuka) ➔
        </button>
      </div>
    </div>
  );

  // Jika dipanggil sebagai halaman portal awal tersendiri (sebelum masuk ke beranda)
  if (isStandalone) {
    return (
      <div className="portal-page-wrapper animate-fade-in">
        <div className="portal-container">
          {/* Sisi Kiri: Informasi Laboratorium & Panduan Kurikulum SMA */}
          <div className="portal-hero-pane">
            <div className="portal-brand-row">
              <div className="portal-logo-icon" aria-hidden="true">⚗️</div>
              <div className="portal-brand-meta">
                <span className="portal-brand-title">ReactionLab <span className="brand-badge">11</span></span>
                <span className="portal-brand-sub">Platform Kimia SMA Kelas XI</span>
              </div>
            </div>

            <div className="portal-hero-content">
              <div className="portal-badge-pill">
                🔬 Gerbang Masuk Laboratorium Kinetika Kimia
              </div>

              <h1 className="portal-heading">
                Laboratorium &amp; Lembar Belajar Laju Reaksi
              </h1>

              <p className="portal-subheading">
                Platform pembelajaran interaktif berbasis fenomena makroskopis, simulasi kinetik partikel submikroskopis, praktikum virtual faktor laju, dan kalkulator orde kuantitatif.
              </p>

              {/* Sorotan 4 Modul Lengkap */}
              <div className="portal-highlights-grid">
                <div className="portal-highlight-card">
                  <span className="highlight-icon">⏱️</span>
                  <div>
                    <strong>Bab 1: Konsep Mol &amp; Laju</strong>
                    <p>Molaritas, grafik konsentrasi vs waktu, dan kalkulator mol.</p>
                  </div>
                </div>

                <div className="portal-highlight-card">
                  <span className="highlight-icon">💥</span>
                  <div>
                    <strong>Bab 2: Teori Tumbukan</strong>
                    <p>Simulator partikel 2D kinetik, orientasi efektif, dan energi aktivasi (Ea).</p>
                  </div>
                </div>

                <div className="portal-highlight-card">
                  <span className="highlight-icon">🧪</span>
                  <div>
                    <strong>Bab 3: Virtual Lab 4 Faktor</strong>
                    <p>Uji CaCO₃ + HCl dengan tabung gas CO₂ dan stopwatch presisi.</p>
                  </div>
                </div>

                <div className="portal-highlight-card">
                  <span className="highlight-icon">📊</span>
                  <div>
                    <strong>Bab 4 &amp; 5: Analisis &amp; Kuis</strong>
                    <p>Kalkulator orde reaksi, diagram energi katalis, dan kuis 10 soal.</p>
                  </div>
                </div>
              </div>

              {/* Jaminan Bebas Akses */}
              <div className="portal-guarantee-row">
                <span className="guarantee-pill">✓ 100% Gratis &amp; Terbuka</span>
                <span className="guarantee-pill">✓ Standar Kurikulum Merdeka Fase F</span>
                <span className="guarantee-pill">✓ Mendukung Mode Akses Tamu</span>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Kartu Autentikasi Mandiri */}
          <div className="portal-card-pane">
            {renderAuthCard()}
          </div>
        </div>
      </div>
    );
  }

  // Tampilan kartu autentikasi standar (misal saat dipanggil dari dalam aplikasi)
  return (
    <div className="auth-page-wrapper animate-fade-in">
      {renderAuthCard()}
    </div>
  );
}

export { AuthPage };
export default AuthPage;


