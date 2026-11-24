import React, { useState } from 'react';
import { REACTION_RATE_QUIZ_QUESTIONS } from '../../data/quizBank';
import { setStoredData, STORAGE_KEYS } from '../../utils/storage';

/**
 * Komponen Halaman Kuis Interaktif (10 Soal Laju Reaksi)
 *
 * Dirancang khusus untuk siswa pemula React:
 * - Menggunakan Hooks `useState` untuk melacak nomor soal aktif (`currentIndex`),
 *   jawaban siswa (`selectedAnswers`), status periksa (`isSubmitted`),
 *   dan petunjuk hint (`showHint`).
 * - Menyimpan hasil kuis secara aman ke LocalStorage (`reactionlab11_quiz_history_v1`)
 *   tanpa meminta data pribadi atau akun siswa.
 */
export default function InteractiveQuiz({ onBackToHome, onNavigateToModuleOne, onNavigateToModuleFive }) {
  const questions = REACTION_RATE_QUIZ_QUESTIONS;
  const totalQuestions = questions.length;

  // State kuis
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionIndex }
  const [checkedAnswers, setCheckedAnswers] = useState({}); // { [questionId]: boolean (sudah klik periksa?) }
  const [showHint, setShowHint] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQuestion.id];
  const isChecked = checkedAnswers[currentQuestion.id];

  // Handler memilih opsi
  const handleSelectOption = (optionIndex) => {
    if (isChecked) return; // Jika sudah diperiksa, kunci pilihan
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  // Handler periksa jawaban saat ini
  const handleCheckAnswer = () => {
    if (selectedOption === undefined) return;
    setCheckedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  };

  // Handler tombol lanjut ke soal berikutnya
  const handleNextQuestion = () => {
    setShowHint(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Selesai semua soal, simpan hasil ke localStorage
      finishQuiz();
    }
  };

  // Handler tombol kembali ke soal sebelumnya
  const handlePrevQuestion = () => {
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Selesaikan kuis dan hitung skor
  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);

    // Simpan ke localStorage dengan format terpusat
    const quizResult = {
      score,
      correctCount,
      totalQuestions,
      answers: selectedAnswers,
      completedAt: new Date().toISOString()
    };

    setStoredData(STORAGE_KEYS.QUIZ_HISTORY, {
      final_eval: quizResult
    });

    setIsQuizCompleted(true);
  };

  // Ulangi kuis dari awal
  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setCheckedAnswers({});
    setShowHint(false);
    setIsQuizCompleted(false);
  };

  // Hitung jumlah jawaban benar untuk laporan akhir
  const calculateFinalStats = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    const score = Math.round((correct / totalQuestions) * 100);
    return { correct, score };
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // ============================================================
  // TAMPILAN 1: RAPOR HASIL KUIS (JIKA SELESAI)
  // ============================================================
  if (isQuizCompleted) {
    const { correct, score } = calculateFinalStats();
    const isPassing = score >= 75;

    return (
      <div className="quiz-page-container">
        <div className="quiz-report-card">
          <div className="report-header">
            <span className="report-badge">🏆 Rapor Evaluasi Kuis Laju Reaksi</span>
            <h2 className="report-title">
              {isPassing ? 'Selamat! Pemahaman Anda Sangat Baik' : 'Evaluasi Selesai: Terus Semangat Belajar!'}
            </h2>
            <p className="report-desc">
              Berikut adalah rekapitulasi hasil evaluasi kuis 10 soal kinetika kimia Anda. Data ini tersimpan secara lokal pada perangkat Anda.
            </p>
          </div>

          {/* Skor Box */}
          <div className="score-summary-box">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-denom">/ 100</span>
            </div>
            <div className="score-details">
              <div className="score-item">
                <span className="score-item-label">Jawaban Benar:</span>
                <span className="score-item-val correct">{correct} Soal</span>
              </div>
              <div className="score-item">
                <span className="score-item-label">Jawaban Salah / Kosong:</span>
                <span className="score-item-val incorrect">{totalQuestions - correct} Soal</span>
              </div>
              <div className="score-item">
                <span className="score-item-label">Status Ketuntasan:</span>
                <span className={`status-pill ${isPassing ? 'pass' : 'need-review'}`}>
                  {isPassing ? '✓ Tuntas Pemahaman Konsep' : '⚠️ Perlu Penguatan Materi'}
                </span>
              </div>
            </div>
          </div>

          {/* Rincian Analisis Jawaban Per Soal */}
          <div className="report-breakdown-section">
            <h3 className="breakdown-title">Daftar Hasil per Soal:</h3>
            <div className="breakdown-list">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isUserCorrect = userAns === q.correctAnswerIndex;
                return (
                  <div
                    key={q.id}
                    className={`breakdown-item ${isUserCorrect ? 'item-correct' : 'item-incorrect'}`}
                  >
                    <div className="breakdown-item-header">
                      <span className="breakdown-q-num">Soal {idx + 1}: {q.category}</span>
                      <span className="breakdown-q-badge">
                        {isUserCorrect ? '✅ Benar' : '❌ Salah'}
                      </span>
                    </div>
                    <p className="breakdown-q-text">{q.question}</p>
                    <div className="breakdown-q-expl">
                      <strong>Pembahasan:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tombol Aksi Akhir */}
          <div className="report-actions-row">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleRestartQuiz}
            >
              🔄 Ulangi Kuis (10 Soal)
            </button>
            {onNavigateToModuleOne && (
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onNavigateToModuleOne}
              >
                ⏱️ Buka Kembali Modul 1
              </button>
            )}
            {onNavigateToModuleFive && (
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onNavigateToModuleFive}
              >
                🏆 Lihat Diagnostik Bab 5
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onBackToHome}
            >
              🏠 Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // TAMPILAN 2: HALAMAN INTERAKTIF SOAL DEMI SOAL
  // ============================================================
  return (
    <div className="quiz-page-container">
      {/* Top Bar Navigasi Kuis */}
      <div className="quiz-top-bar">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onBackToHome}
        >
          ← Kembali ke Beranda
        </button>
        <div className="quiz-title-wrap">
          <span className="quiz-main-title">📝 Kuis Interaktif Laju Reaksi</span>
          <span className="quiz-subtitle-text">10 Soal Pilihan Ganda &amp; Pembahasan Saintifik</span>
        </div>
        <div className="quiz-progress-text">
          Soal <strong>{currentIndex + 1}</strong> dari <strong>{totalQuestions}</strong>
        </div>
      </div>

      {/* Progress Bar Kuis */}
      <div className="quiz-progress-track">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Lompat Cepat Nomor Soal (Quick Question Selector) */}
      <div className="question-pills-row" aria-label="Navigasi Nomor Soal">
        {questions.map((q, idx) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={q.id}
              type="button"
              className={`q-pill-btn ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
              onClick={() => {
                setShowHint(false);
                setCurrentIndex(idx);
              }}
              title={`Buka Soal ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* KARTU SOAL AKTIF */}
      <div className="quiz-card">
        {/* Meta Soal (Kategori & Tingkat Kognitif) */}
        <div className="quiz-card-meta">
          <span className="badge badge-primary">{currentQuestion.level}</span>
          <span className="badge badge-category">{currentQuestion.category}</span>
        </div>

        {/* Teks Pertanyaan */}
        <h3 className="quiz-question-text">{currentQuestion.question}</h3>

        {/* Tombol Bantuan Petunjuk (Hint) */}
        <div className="hint-wrapper">
          <button
            type="button"
            className="btn-hint"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? '🙈 Tutup Petunjuk' : '💡 Butuh Petunjuk Berpikir?'}
          </button>
          {showHint && (
            <div className="hint-box animate-fade-in">
              <strong>Petunjuk Guru:</strong> {currentQuestion.hint}
            </div>
          )}
        </div>

        {/* Daftar Opsi Jawaban (A, B, C, D) */}
        <div className="options-list" role="radiogroup">
          {currentQuestion.options.map((optionText, optIndex) => {
            const isSelected = selectedOption === optIndex;
            const isCorrectOption = optIndex === currentQuestion.correctAnswerIndex;

            let optionClass = 'option-btn';
            if (isSelected) optionClass += ' selected';
            if (isChecked) {
              if (isCorrectOption) optionClass += ' correct-opt';
              else if (isSelected && !isCorrectOption) optionClass += ' wrong-opt';
            }

            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <button
                key={optIndex}
                type="button"
                className={optionClass}
                onClick={() => handleSelectOption(optIndex)}
                disabled={isChecked}
              >
                <span className="option-letter">{optionLetters[optIndex]}</span>
                <span className="option-text">{optionText}</span>
                {isChecked && isCorrectOption && <span className="opt-status-icon">✓</span>}
                {isChecked && isSelected && !isCorrectOption && (
                  <span className="opt-status-icon">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Kotak Pembahasan (Tampil setelah menekan tombol "Periksa") */}
        {isChecked && (
          <div className="explanation-box animate-fade-in">
            <div className="explanation-header">
              <span className="explanation-icon">
                {selectedOption === currentQuestion.correctAnswerIndex ? '🎉' : '📖'}
              </span>
              <strong>
                {selectedOption === currentQuestion.correctAnswerIndex
                  ? 'Jawaban Anda Tepat!'
                  : 'Jawaban Belum Tepat'}
              </strong>
            </div>
            <p className="explanation-content">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Tombol Aksi Navigasi Soal */}
        <div className="quiz-card-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
          >
            ← Soal Sebelumnya
          </button>

          <div className="footer-right-actions">
            {!isChecked ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCheckAnswer}
                disabled={selectedOption === undefined}
              >
                Periksa Jawaban
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextQuestion}
              >
                {currentIndex === totalQuestions - 1 ? 'Lihat Hasil Kuis ➔' : 'Soal Berikutnya ➔'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

