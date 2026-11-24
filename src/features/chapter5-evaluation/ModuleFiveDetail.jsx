import React from 'react';
import { getStoredData, STORAGE_KEYS } from '../../utils/storage';

/**
 * Komponen ModuleFiveDetail (Bab 5: Evaluasi Akhir & Diagnostik Pemahaman)
 *
 * Dioptimalkan secara lengkap sesuai PRD:
 * - Menampilkan Matriks Evaluasi 3 Tingkat Kognitif
 * - Menampilkan Riwayat Skor Terakhir Siswa dari LocalStorage
 * - Analisis Area Penguasaan & Pembahasan Diagnostik
 * - Tombol Aksi Menuju Halaman Kuis Interaktif 10 Soal
 */
export default function ModuleFiveDetail({ chapter, onStartQuiz, onClose }) {
  // Ambil riwayat kuis terakhir dari localStorage (jika sudah pernah mengerjakan)
  const quizHistory = getStoredData(STORAGE_KEYS.QUIZ_HISTORY, null);
  const lastAttempt = quizHistory ? quizHistory['final_eval'] : null;

  return (
    <section className="lab-worksheet-section" id="modul-5-evaluasi">
      {/* Header Lembar Evaluasi */}
      <div className="worksheet-header">
        <div className="worksheet-tag">
          🏆 Lembar Evaluasi Akhir &amp; Diagnostik • Bab 5
        </div>
        <div className="worksheet-title-row">
          <div>
            <h2 className="worksheet-title">
              {chapter.title}
            </h2>
            <p className="worksheet-subtitle">
              Instrumen pengujian komprehensif untuk mengukur pemahaman konsep mol, teori tumbukan, faktor laju reaksi, serta analisis data eksperimen.
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              title="Tutup Lembar Evaluasi"
            >
              ✕ Tutup Lembar
            </button>
          )}
        </div>
      </div>

      {/* Ringkasan Skor Terakhir (Jika ada) */}
      {lastAttempt ? (
        <div className="quiz-result-summary-card">
          <div className="result-badge-row">
            <span className="badge badge-success">✓ Hasil Evaluasi Tersimpan</span>
            <span className="text-muted-sm">Waktu: {new Date(lastAttempt.completedAt).toLocaleString('id-ID')}</span>
          </div>
          <div className="result-stats-grid">
            <div className="stat-box">
              <span className="stat-label">Skor Akhir</span>
              <span className="stat-score">{lastAttempt.score} <span className="stat-max">/ 100</span></span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Jawaban Benar</span>
              <span className="stat-number">{lastAttempt.correctCount} dari {lastAttempt.totalQuestions} Soal</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Tingkat Penguasaan</span>
              <span className={`stat-badge ${lastAttempt.score >= 75 ? 'badge-mastered' : 'badge-needs-practice'}`}>
                {lastAttempt.score >= 75 ? '🎉 Tuntas & Sangat Baik' : '📖 Perlu Pemantapan'}
              </span>
            </div>
          </div>
          <div className="result-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onStartQuiz}
            >
              🔄 Ulangi Tes Kuis (10 Soal)
            </button>
          </div>
        </div>
      ) : (
        <div className="evaluation-hero-card">
          <div className="eval-hero-icon">📝</div>
          <div className="eval-hero-content">
            <h3 className="eval-hero-title">Siap Menguji Penguasaan Kinetika Kimia Anda?</h3>
            <p className="eval-hero-desc">
              Tes akhir ini memuat <strong>10 soal terstruktur</strong> yang mencakup konsep dasar laju reaksi, penerapan konsep mol dan molaritas, teori tumbukan, hingga analisis data grafik laboratorium.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onStartQuiz}
            >
              Mulai Tes Evaluasi 10 Soal Sekarang ➔
            </button>
          </div>
        </div>
      )}

      {/* Matriks Kompetensi 3 Tingkat Kognitif (PRD 5.5) */}
      <div className="cognitive-matrix-section">
        <div className="section-header">
          <div className="section-eyebrow">Struktur Evaluasi Diagnostik</div>
          <h3 className="section-title">Matriks Penguasaan Materi (3 Tingkat Kognitif)</h3>
          <p className="section-desc">
            Evaluasi ini dirancang bertingkat untuk mengukur pemahaman konsep faktual hingga penalaran data ilmiah.
          </p>
        </div>

        <div className="levels-grid">
          {chapter.evaluationSections?.map((lvl) => (
            <div key={lvl.id} className="level-card">
              <div className="level-badge">{lvl.levelTitle.split(':')[0]}</div>
              <h4 className="level-title">{lvl.levelTitle.split(':')[1] || lvl.levelTitle}</h4>
              <p className="level-desc">{lvl.desc}</p>
              <div className="level-target">
                <strong>Target Keberhasilan:</strong> {lvl.targetMastery}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendasi Pemantapan Konsep (PRD 5.5) */}
      <div className="recommendations-box">
        <div className="rec-header">
          <span className="rec-icon">🧭</span>
          <div>
            <h4 className="rec-title">Panduan &amp; Rekomendasi Belajar Mandiri</h4>
            <p className="rec-desc">Langkah yang disarankan setelah menyelesaikan tes evaluasi:</p>
          </div>
        </div>

        <div className="rec-items-list">
          <div className="rec-item">
            <span className="rec-bullet">1</span>
            <div>
              <strong>Skor 80–100 (Penguasaan Sangat Baik):</strong>
              <p>Anda telah menguasai keterkaitan konsep mol, stoikiometri laju, dan teori tumbukan. Siap melanjutkan ke materi orde reaksi dan hukum laju reaksi kuantitatif.</p>
            </div>
          </div>
          <div className="rec-item">
            <span className="rec-bullet">2</span>
            <div>
              <strong>Skor 60–79 (Penguasaan Cukup):</strong>
              <p>Buka kembali <strong>Modul 1</strong> untuk memantapkan penurunan rumus laju molaritas (\(\Delta M/\Delta t\)) dan perhatikan kembali pembahasan pada soal yang keliru.</p>
            </div>
          </div>
          <div className="rec-item">
            <span className="rec-bullet">3</span>
            <div>
              <strong>Skor di bawah 60 (Perlu Penguatan Konsep):</strong>
              <p>Pelajari secara bertahap kartu bagian belajar 1.1 sampai 1.4 dan coba gunakan kalkulator praktikum untuk melatih intuisi perhitungan mol terhadap volume dan waktu.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Aksi */}
      <div className="eval-footer-cta">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onStartQuiz}
        >
          Buka Halaman Kuis Interaktif 10 Soal ➔
        </button>
      </div>
    </section>
  );
}

