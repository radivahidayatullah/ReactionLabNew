import React from 'react';

/**
 * Komponen ModuleCard
 * Menampilkan kartu modul kurikulum laju reaksi.
 * Jika modul aktif (Bab 1), siswa dapat menekan tombol "Mulai Belajar".
 * Jika modul lain belum dibuka (Bab 2–5), kartu ditampilkan dengan status "Belum Tersedia".
 * 
 * Catatan untuk Pemula React:
 * - Komponen ini menerima props: `chapter`, `isSelected`, `onStartLearning`.
 * - Penggunaan conditional rendering (kondisi ternary `? :`) mengatur tampilan status.
 */
export default function ModuleCard({ chapter, isSelected, onStartLearning }) {
  const isAvailable = chapter.isAvailable;

  return (
    <div
      className={`module-card ${isAvailable ? 'module-card--active' : 'module-card--disabled'} ${
        isSelected ? 'module-card--selected' : ''
      }`}
      aria-disabled={!isAvailable}
    >
      {/* Header Kartu: Ikon & Badge Status */}
      <div className="module-card-header">
        <div className="module-card-badge-wrap">
          <div className="module-icon" aria-hidden="true">
            {chapter.icon}
          </div>
          <div className="module-meta">
            <span className="module-number">Bab {chapter.number}</span>
            <span className="module-duration">⏱️ {chapter.duration}</span>
          </div>
        </div>

        {/* Status Ketersediaan Modul */}
        {isAvailable ? (
          <span className="badge badge-success">
            ● Tersedia
          </span>
        ) : (
          <span className="badge badge-locked">
            🔒 Belum Tersedia
          </span>
        )}
      </div>

      {/* Judul & Deskripsi Modul */}
      <h3 className="module-title">{chapter.title}</h3>
      <p className="module-subtitle">{chapter.subtitle}</p>

      {/* Daftar Bagian Belajar / Topik */}
      <div className="module-topics-container">
        <div className="module-topics-label">
          {isAvailable ? 'Daftar Bagian Belajar:' : 'Rencana Cakupan:'}
        </div>
        <ul className="module-topics-list">
          {chapter.topics.map((topic, index) => (
            <li key={index} className="module-topic-item">
              <span className="topic-bullet">›</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bagian Tombol Aksi */}
      <div className="module-card-footer">
        {isAvailable ? (
          <button
            type="button"
            className="btn btn-primary btn-full-width"
            onClick={() => onStartLearning(chapter)}
            aria-label={`Mulai Belajar ${chapter.title}`}
          >
            Mulai Belajar ➔
          </button>
        ) : (
          <div className="locked-notice-banner">
            <span className="locked-icon">⏳</span>
            <span>{chapter.availabilityNotice || 'Materi belum tersedia saat ini'}</span>
          </div>
        )}
      </div>
    </div>
  );
}

