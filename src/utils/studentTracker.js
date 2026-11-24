import { getStoredData, setStoredData, STORAGE_KEYS } from './storage';
import { INITIAL_STUDENT_ROSTER, TOTAL_LEARNING_ITEMS } from '../data/mockStudents';

/**
 * Utilitas Pelacak Progres & Pengelola Roster Siswa untuk Panel Guru
 */

/**
 * Mencatat modul yang telah dikunjungi oleh siswa ke dalam LocalStorage
 */
export function recordModuleVisited(moduleId) {
  if (!moduleId) return;
  const currentProgress = getStoredData(STORAGE_KEYS.PROGRESS, []);
  if (!currentProgress.includes(moduleId)) {
    const updated = [...currentProgress, moduleId];
    setStoredData(STORAGE_KEYS.PROGRESS, updated);
  }
}

/**
 * Mengambil daftar modul yang telah diselesaikan oleh siswa saat ini
 */
export function getStudentCompletedModules() {
  const visitedModules = getStoredData(STORAGE_KEYS.PROGRESS, []);
  const quizHistory = getStoredData(STORAGE_KEYS.QUIZ_HISTORY, null);
  const completed = [...visitedModules];

  if (quizHistory && quizHistory.final_eval && !completed.includes('quiz')) {
    completed.push('quiz');
  }

  return completed;
}

/**
 * Mengambil dan mensinkronkan seluruh roster siswa untuk ditampilkan pada Panel Guru
 */
export function getTeacherStudentRoster(currentUser = null) {
  const storedRoster = getStoredData(STORAGE_KEYS.STUDENTS_ROSTER, INITIAL_STUDENT_ROSTER);
  let roster = [...storedRoster];

  // Jika ada siswa yang sedang login pada sesi ini, sinkronkan datanya ke paling atas
  if (currentUser && currentUser.className !== 'Guru / Pendidik') {
    const completedModules = getStudentCompletedModules();
    const quizHistory = getStoredData(STORAGE_KEYS.QUIZ_HISTORY, null);

    const quizScore = quizHistory?.final_eval?.score ?? null;
    const correctCount = quizHistory?.final_eval?.correctCount ?? 0;
    const totalQuestions = quizHistory?.final_eval?.totalQuestions ?? 10;

    // Hitung persentase ketuntasan
    const completionPercentage = Math.round((completedModules.length / TOTAL_LEARNING_ITEMS) * 100);

    let statusNote = 'Sedang Belajar';
    if (quizScore !== null) {
      if (quizScore >= 85) statusNote = 'Tuntas Sangat Baik';
      else if (quizScore >= 75) statusNote = 'Tuntas';
      else statusNote = 'Perlu Remedial Kuis';
    } else if (completedModules.length > 0) {
      statusNote = `${completedModules.length} Modul Terbuka (Belum Kuis)`;
    }

    const currentStudentRow = {
      id: `current_${currentUser.uid || currentUser.id || 'active'}`,
      name: currentUser.name || 'Siswa Aktif',
      email: currentUser.email || 'siswa@reactionlab.edu',
      className: currentUser.className || 'XI Fase F 1',
      lastLogin: currentUser.loggedInAt || new Date().toISOString(),
      quizScore: quizScore,
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      completionPercentage: completionPercentage,
      completedModules: completedModules,
      statusNote: statusNote,
      isCurrentSession: true
    };

    // Hapus duplikat nama/email yang sama di daftar seed
    roster = roster.filter(
      (s) => s.email.toLowerCase() !== currentStudentRow.email.toLowerCase()
    );

    // Letakkan siswa aktif di urutan pertama
    roster.unshift(currentStudentRow);
  }

  return roster;
}

/**
 * Format tanggal dan waktu standar Indonesia (WIB)
 */
export function formatIndonesianDateTime(isoString) {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;

    const dateOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const dateStr = d.toLocaleDateString('id-ID', dateOptions);
    const timeStr = d.toLocaleTimeString('id-ID', timeOptions);

    return `${dateStr}, ${timeStr} WIB`;
  } catch {
    return isoString;
  }
}

/**
 * Format waktu relatif yang intuitif untuk guru
 */
export function getRelativeTimeText(isoString) {
  if (!isoString) return '-';
  try {
    const now = new Date();
    const past = new Date(isoString);
    const diffSec = Math.floor((now - past) / 1000);

    if (diffSec < 60) return 'Baru saja';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} mnt lalu`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} jam lalu`;
    if (diffSec < 172800) return 'Kemarin';
    return `${Math.floor(diffSec / 86400)} hari lalu`;
  } catch {
    return '-';
  }
}

/**
 * Ekspor Data Roster Siswa ke format berkas CSV (Kompatibel Excel / Google Sheets)
 */
export function exportRosterToCSV(studentList, selectedClass = 'Semua') {
  if (!studentList || studentList.length === 0) return;

  const headers = [
    'No',
    'Nama Lengkap Siswa',
    'Kelas / Rombel',
    'Alamat Email Siswa',
    'Waktu Login Terakhir',
    'Skor Kuis (Skala 100)',
    'Status Kuis',
    'Persentase Pengerjaan (%)',
    'Jumlah Modul Selesai (dari 6)',
    'Catatan Kelulusan'
  ];

  const rows = studentList.map((s, idx) => {
    const scoreText = s.quizScore !== null ? s.quizScore : 'Belum Kuis';
    const quizStatus = s.quizScore !== null ? (s.quizScore >= 75 ? 'Tuntas' : 'Remedial') : 'Belum Mulai';
    const formattedDate = formatIndonesianDateTime(s.lastLogin).replace(',', '');
    const cleanName = `"${s.name.replace(/"/g, '""')}"`;
    const cleanClass = `"${s.className.replace(/"/g, '""')}"`;
    const cleanEmail = `"${s.email.replace(/"/g, '""')}"`;
    const cleanNote = `"${s.statusNote.replace(/"/g, '""')}"`;

    return [
      idx + 1,
      cleanName,
      cleanClass,
      cleanEmail,
      `"${formattedDate}"`,
      scoreText,
      quizStatus,
      `${s.completionPercentage}%`,
      `${s.completedModules ? s.completedModules.length : 0}/6`,
      cleanNote
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().slice(0, 10);
  const classSlug = selectedClass.replace(/\s+/g, '_');
  const filename = `Rekap_Nilai_ReactionLab11_${classSlug}_${timestamp}.csv`;

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

