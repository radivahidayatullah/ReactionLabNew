import React, { useState, useMemo } from 'react';
import {
  getTeacherStudentRoster,
  formatIndonesianDateTime,
  getRelativeTimeText,
  exportRosterToCSV
} from '../../utils/studentTracker';
import './TeacherPanel.css';

/**
 * Komponen Panel Guru (Teacher Panel) ReactionLab 11
 *
 * Dirancang khusus dan terisolasi dari menu materi/bab siswa:
 * - Menampilkan daftar siswa, kelas/rombel, waktu login, skor kuis, dan persentase ketuntasan belajar.
 * - Dilengkapi fitur filter kelas, pencarian siswa real-time, pengurutan data, dan ekspor CSV.
 * - Menyediakan modal rincian pengerjaan 5 bab modul dan kuis per siswa.
 */
export default function TeacherPanel({ onBackToStudentView, currentUser = null }) {
  // State data roster siswa (tersinkronisasi dengan siswa aktif)
  const [students] = useState(() => getTeacherStudentRoster(currentUser));

  // State filter & pencarian
  const [selectedClass, setSelectedClass] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('score-desc'); // 'score-desc' | 'score-asc' | 'progress-desc' | 'login-desc' | 'name-asc'

  // State modal detail siswa terpilih
  const [selectedStudentDetail, setSelectedStudentDetail] = useState(null);

  // Daftar opsi kelas
  const availableClasses = ['Semua', 'XI Fase F 1', 'XI Fase F 2', 'XI Fase F 3', 'XI MIPA 1'];

  // Modul kurikulum untuk pengecekan detail siswa
  const moduleChecklist = [
    { id: 'module-1', title: 'Bab 1: Mengenal Laju Reaksi & Konsep Mol', icon: '⏱️' },
    { id: 'module-2', title: 'Bab 2: Teori Tumbukan & Simulator Partikel', icon: '💥' },
    { id: 'module-3', title: 'Bab 3: Virtual Lab 4 Faktor Laju Reaksi', icon: '🧪' },
    { id: 'module-4', title: 'Bab 4: Analisis Orde Reaksi & Diagram Energi', icon: '📊' },
    { id: 'module-5', title: 'Bab 5: Evaluasi Akhir & Diagnostik', icon: '🏆' },
    { id: 'quiz', title: 'Kuis Interaktif 10 Soal Kinetika Kimia', icon: '📝' }
  ];

  // Filter dan sorting data siswa
  const filteredStudents = useMemo(() => {
    let result = [...students];

    // 1. Filter Kelas
    if (selectedClass !== 'Semua') {
      result = result.filter((s) => s.className === selectedClass);
    }

    // 2. Pencarian Nama / Email
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
      );
    }

    // 3. Pengurutan Data
    result.sort((a, b) => {
      // Prioritaskan siswa aktif di posisi teratas jika ada
      if (a.isCurrentSession) return -1;
      if (b.isCurrentSession) return 1;

      if (sortBy === 'score-desc') {
        const scoreA = a.quizScore ?? -1;
        const scoreB = b.quizScore ?? -1;
        return scoreB - scoreA;
      }
      if (sortBy === 'score-asc') {
        const scoreA = a.quizScore ?? 999;
        const scoreB = b.quizScore ?? 999;
        return scoreA - scoreB;
      }
      if (sortBy === 'progress-desc') {
        return b.completionPercentage - a.completionPercentage;
      }
      if (sortBy === 'login-desc') {
        return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime();
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name, 'id');
      }
      return 0;
    });

    return result;
  }, [students, selectedClass, searchQuery, sortBy]);

  // Statistik Ringkasan Kelas
  const classStats = useMemo(() => {
    const total = filteredStudents.length;
    if (total === 0) {
      return { total: 0, avgScore: 0, avgProgress: 0, passingCount: 0, passingRate: 0 };
    }

    const studentsWithScore = filteredStudents.filter((s) => s.quizScore !== null);
    const sumScore = studentsWithScore.reduce((acc, curr) => acc + curr.quizScore, 0);
    const avgScore = studentsWithScore.length > 0 ? Math.round(sumScore / studentsWithScore.length) : 0;

    const sumProgress = filteredStudents.reduce((acc, curr) => acc + curr.completionPercentage, 0);
    const avgProgress = Math.round(sumProgress / total);

    const passingCount = filteredStudents.filter((s) => s.quizScore !== null && s.quizScore >= 75).length;
    const passingRate = total > 0 ? Math.round((passingCount / total) * 100) : 0;

    return { total, avgScore, avgProgress, passingCount, passingRate };
  }, [filteredStudents]);

  // Handler ekspor CSV
  const handleExportCSV = () => {
    exportRosterToCSV(filteredStudents, selectedClass);
  };

  return (
    <div className="teacher-panel-container animate-fade-in">
      {/* ============================================================ */}
      {/* 1. HEADER KHUSUS PANEL GURU (TERISOLASI DARI MENU SISWA)     */}
      {/* ============================================================ */}
      <header className="teacher-portal-header">
        <div className="teacher-header-left">
          <div className="teacher-badge-icon" aria-hidden="true">
            👨‍🏫
          </div>
          <div className="teacher-title-wrap">
            <div className="portal-tag-row">
              <span className="teacher-role-badge">Panel Pendidik &amp; Guru Kimia</span>
              <span className="teacher-curriculum-badge">Kurikulum Merdeka • Fase F</span>
            </div>
            <h1 className="teacher-main-title">
              ReactionLab 11: Pemantauan Kelas &amp; Hasil Belajar Siswa
            </h1>
            <p className="teacher-header-sub">
              Pantau kemajuan membaca 5 bab modul kinetika kimia, waktu login aktif, dan rekapitulasi nilai kuis interaktif 10 soal secara terarah.
            </p>
          </div>
        </div>

        <div className="teacher-header-actions">
          <button
            type="button"
            className="btn btn-secondary btn-export-csv"
            onClick={handleExportCSV}
            title="Unduh data tabel dalam format CSV (kompatibel Excel & Google Sheets)"
          >
            📥 Ekspor Rekap (CSV/Excel)
          </button>
          <button
            type="button"
            className="btn btn-primary btn-return-student"
            onClick={onBackToStudentView}
            title="Keluar dari Panel Guru dan kembali ke lembar praktikum siswa"
          >
            ← Kembali ke Lembar Siswa
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. KARTU STATISTIK & METRIK KELAS                            */}
      {/* ============================================================ */}
      <section className="teacher-stats-grid">
        <div className="teacher-stat-card">
          <div className="stat-icon-circle blue">👥</div>
          <div className="stat-content">
            <span className="stat-label">Total Siswa Terpantau</span>
            <span className="stat-value">{classStats.total} <span className="stat-unit">Siswa</span></span>
            <span className="stat-desc">
              {selectedClass === 'Semua' ? 'Gabungan seluruh rombel' : `Rombel: ${selectedClass}`}
            </span>
          </div>
        </div>

        <div className="teacher-stat-card">
          <div className="stat-icon-circle amber">🏆</div>
          <div className="stat-content">
            <span className="stat-label">Rata-rata Skor Kuis</span>
            <span className="stat-value">{classStats.avgScore} <span className="stat-unit">/ 100</span></span>
            <span className="stat-desc">Asesmen Kuis 10 Soal Kinetika Kimia</span>
          </div>
        </div>

        <div className="teacher-stat-card">
          <div className="stat-icon-circle green">📈</div>
          <div className="stat-content">
            <span className="stat-label">Rata-rata Ketuntasan</span>
            <span className="stat-value">{classStats.avgProgress}%</span>
            <span className="stat-desc">Penyelesaian materi Bab 1 s.d. 5 + Kuis</span>
          </div>
        </div>

        <div className="teacher-stat-card">
          <div className="stat-icon-circle purple">✅</div>
          <div className="stat-content">
            <span className="stat-label">Ketuntasan KKM (≥ 75)</span>
            <span className="stat-value">{classStats.passingCount} <span className="stat-unit">({classStats.passingRate}%)</span></span>
            <span className="stat-desc">Siswa mencapai kriteria ketuntasan</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. BILAH KONTROL (FILTER KELAS, PENCARIAN, SORTING)          */}
      {/* ============================================================ */}
      <section className="teacher-controls-card">
        <div className="controls-top-row">
          {/* Filter Tab Kelas */}
          <div className="class-filter-pills" role="tablist" aria-label="Filter Berdasarkan Rombel">
            <span className="filter-label-prefix">Rombel / Kelas:</span>
            {availableClasses.map((cls) => (
              <button
                key={cls}
                type="button"
                className={`class-pill-btn ${selectedClass === cls ? 'active' : ''}`}
                onClick={() => setSelectedClass(cls)}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Pengurutan Data */}
          <div className="sort-group">
            <label htmlFor="sort-select" className="sort-label">
              Urutkan:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="teacher-select"
            >
              <option value="score-desc">🏆 Skor Tertinggi</option>
              <option value="score-asc">📉 Skor Terendah</option>
              <option value="progress-desc">📊 Ketuntasan Tertinggi (%)</option>
              <option value="login-desc">⏱️ Waktu Login Terkini</option>
              <option value="name-asc">🔤 Nama Siswa (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Input Pencarian Nama Siswa */}
        <div className="search-bar-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            placeholder="Cari siswa berdasarkan nama lengkap atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="teacher-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Bersihkan pencarian"
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TABEL PEMANTAUAN HASIL BELAJAR SISWA                      */}
      {/* ============================================================ */}
      <section className="teacher-roster-section">
        <div className="roster-header-bar">
          <div className="roster-title-group">
            <h2 className="roster-heading">Daftar Hasil Belajar &amp; Aktivitas Siswa</h2>
            <span className="roster-count-badge">Menampilkan {filteredStudents.length} dari {students.length} Siswa</span>
          </div>
          <span className="auto-sync-indicator">
            <span className="pulse-dot">●</span> Sinkronisasi Real-Time Aktif
          </span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="teacher-empty-state">
            <span className="empty-icon">🔍</span>
            <h3>Tidak Ditemukan Siswa</h3>
            <p>Tidak ada data siswa yang cocok dengan filter kelas atau kata kunci pencarian Anda.</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSelectedClass('Semua');
                setSearchQuery('');
              }}
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="roster-table-responsive">
            <table className="teacher-table">
              <thead>
                <tr>
                  <th style={{ width: '45px', textAlign: 'center' }}>No</th>
                  <th>Nama Lengkap Siswa</th>
                  <th>Kelas / Rombel</th>
                  <th>Waktu Login Terakhir</th>
                  <th style={{ width: '180px' }}>Status Pengerjaan (%)</th>
                  <th style={{ textAlign: 'center', width: '120px' }}>Skor Kuis (10 Soal)</th>
                  <th style={{ textAlign: 'center', width: '110px' }}>Aksi Rincian</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => {
                  const hasQuiz = student.quizScore !== null;
                  const isPassing = hasQuiz && student.quizScore >= 75;
                  const isCurrent = Boolean(student.isCurrentSession);

                  return (
                    <tr key={student.id} className={isCurrent ? 'row-current-session' : ''}>
                      {/* 1. Nomor Urut */}
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {index + 1}
                      </td>

                      {/* 2. Nama Siswa & Identitas */}
                      <td>
                        <div className="student-profile-cell">
                          <div className={`student-avatar-circle ${isCurrent ? 'avatar-active' : ''}`}>
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="student-name-block">
                            <span className="student-fullname">
                              {student.name}
                              {isCurrent && (
                                <span className="current-user-tag" title="Akun yang sedang Anda gunakan saat ini">
                                  ★ Sesi Aktif
                                </span>
                              )}
                            </span>
                            <span className="student-email-sub">{student.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* 3. Kelas / Rombel */}
                      <td>
                        <span className="class-badge-cell">
                          {student.className}
                        </span>
                      </td>

                      {/* 4. Waktu Login Terakhir */}
                      <td>
                        <div className="login-time-cell">
                          <span className="login-date-text">
                            {formatIndonesianDateTime(student.lastLogin)}
                          </span>
                          <span className="login-relative-badge">
                            {getRelativeTimeText(student.lastLogin)}
                          </span>
                        </div>
                      </td>

                      {/* 5. Persentase Status Pengerjaan */}
                      <td>
                        <div className="progress-cell-wrapper">
                          <div className="progress-text-row">
                            <span className="progress-percent-label">
                              <strong>{student.completionPercentage}%</strong>
                            </span>
                            <span className="progress-items-count">
                              {student.completedModules ? student.completedModules.length : 0}/6 Item
                            </span>
                          </div>
                          <div className="student-progress-track">
                            <div
                              className={`student-progress-bar ${
                                student.completionPercentage === 100
                                  ? 'complete'
                                  : student.completionPercentage >= 60
                                  ? 'mid'
                                  : 'low'
                              }`}
                              style={{ width: `${student.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="status-note-text">{student.statusNote}</span>
                        </div>
                      </td>

                      {/* 6. Skor Kuis (10 Soal) */}
                      <td style={{ textAlign: 'center' }}>
                        {hasQuiz ? (
                          <div className="score-badge-wrap">
                            <span className={`score-badge ${isPassing ? 'pass' : 'remedial'}`}>
                              {student.quizScore} <span className="score-denom">/ 100</span>
                            </span>
                            <span className="score-sub-label">
                              {student.correctCount} dari 10 Benar
                            </span>
                          </div>
                        ) : (
                          <span className="score-badge not-taken" title="Siswa belum menyelesaikan kuis evaluasi 10 soal">
                            Belum Kuis
                          </span>
                        )}
                      </td>

                      {/* 7. Tombol Aksi Detail */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-detail-trigger"
                          onClick={() => setSelectedStudentDetail(student)}
                          title={`Lihat rincian pengerjaan bab untuk ${student.name}`}
                        >
                          👁️ Rincian
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 5. MODAL RINCIAN PENGERJAAN BAB & KUIS SISWA                 */}
      {/* ============================================================ */}
      {selectedStudentDetail && (
        <div className="teacher-modal-backdrop animate-fade-in" onClick={() => setSelectedStudentDetail(null)}>
          <div className="teacher-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="modal-badge-label">📋 Rincian Belajar Mandiri Siswa</span>
                <h3 className="modal-student-name">{selectedStudentDetail.name}</h3>
                <span className="modal-student-sub">
                  {selectedStudentDetail.className} • {selectedStudentDetail.email}
                </span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedStudentDetail(null)}
                title="Tutup Rincian"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Ringkasan Skor & Persentase */}
              <div className="modal-stats-strip">
                <div className="strip-item">
                  <span className="strip-label">Status Ketuntasan</span>
                  <strong className="strip-val">{selectedStudentDetail.completionPercentage}%</strong>
                </div>
                <div className="strip-item">
                  <span className="strip-label">Nilai Kuis (10 Soal)</span>
                  <strong className={`strip-val ${selectedStudentDetail.quizScore >= 75 ? 'text-green' : 'text-amber'}`}>
                    {selectedStudentDetail.quizScore !== null ? `${selectedStudentDetail.quizScore} / 100` : 'Belum Ada'}
                  </strong>
                </div>
                <div className="strip-item">
                  <span className="strip-label">Login Terakhir</span>
                  <strong className="strip-val text-sm">
                    {formatIndonesianDateTime(selectedStudentDetail.lastLogin)}
                  </strong>
                </div>
              </div>

              {/* Checklist 6 Item Pembelajaran */}
              <h4 className="checklist-heading">Capaian per Bagian Kurikulum:</h4>
              <div className="module-checklist-box">
                {moduleChecklist.map((mod) => {
                  const isCompleted = selectedStudentDetail.completedModules?.includes(mod.id);

                  return (
                    <div key={mod.id} className={`checklist-item ${isCompleted ? 'checked' : 'pending'}`}>
                      <span className="item-icon">{mod.icon}</span>
                      <div className="item-info">
                        <span className="item-title">{mod.title}</span>
                        <span className="item-status-text">
                          {isCompleted ? '✓ Telah dipelajari & diselesaikan' : '○ Belum dipelajari'}
                        </span>
                      </div>
                      <span className={`item-badge-pill ${isCompleted ? 'pill-done' : 'pill-wait'}`}>
                        {isCompleted ? 'Tuntas' : 'Tertunda'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSelectedStudentDetail(null)}
              >
                Tutup Rincian Siswa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

