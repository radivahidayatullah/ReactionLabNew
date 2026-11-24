import React, { useState } from 'react';
import ChemicalFormula from '../../components/chemistry/ChemicalFormula';

/**
 * Komponen ModuleOneDetail (Bab 1: Mengenal Laju Reaksi & Konsep Mol)
 *
 * Dioptimalkan secara menyeluruh sesuai PRD Bab 5.1:
 * - 4 Bagian Belajar lengkap (1.1 s.d. 1.4)
 * - Tabel & Visualisasi Grafik SVG Konsentrasi vs Waktu
 * - Pertanyaan Diagnostik Interaktif dengan Umpan Balik Langsung
 * - Ruang Rumus Spesifik Konsep Mol (M = n/V, satuan mol·L⁻¹·s⁻¹)
 * - Kalkulator Perhitungan Laju Interaktif
 * - Tombol Lanjut ke Kuis Pemahaman 10 Soal
 */
export default function ModuleOneDetail({ chapter, onClose, onNavigateToQuiz }) {
  // State untuk memilih tab/bagian materi aktif
  const [activeSectionId, setActiveSectionId] = useState(
    chapter.learningSections ? chapter.learningSections[0].id : 'sec-1-1'
  );

  // State untuk Pertanyaan Diagnostik PRD
  const [diagnosticSelected, setDiagnosticSelected] = useState(null);
  const [showDiagnosticFeedback, setShowDiagnosticFeedback] = useState(false);

  // State untuk Kalkulator Interaktif Lembar Kerja Mol & Laju Reaksi
  const [initialMoles, setInitialMoles] = useState(0.8);
  const [finalMoles, setFinalMoles] = useState(0.4);
  const [volumeLiters, setVolumeLiters] = useState(2.0);
  const [timeSeconds, setTimeSeconds] = useState(20);

  // Perhitungan matematis konseptual
  const initialConcentration = volumeLiters > 0 ? initialMoles / volumeLiters : 0;
  const finalConcentration = volumeLiters > 0 ? finalMoles / volumeLiters : 0;
  const deltaConcentration = finalConcentration - initialConcentration;
  const deltaMoles = finalMoles - initialMoles;
  const reactionRate =
    timeSeconds > 0 ? Math.abs(deltaConcentration / timeSeconds) : 0;

  // Data ilustrasi kurva konsentrasi vs waktu untuk grafik SVG
  const concentrationData = [
    { t: 0, concA: initialConcentration.toFixed(2), concB: 0.0 },
    { t: Math.round(timeSeconds * 0.25), concA: (initialConcentration - (initialConcentration - finalConcentration) * 0.45).toFixed(2), concB: ((initialConcentration - finalConcentration) * 0.45).toFixed(2) },
    { t: Math.round(timeSeconds * 0.5), concA: (initialConcentration - (initialConcentration - finalConcentration) * 0.75).toFixed(2), concB: ((initialConcentration - finalConcentration) * 0.75).toFixed(2) },
    { t: Math.round(timeSeconds * 0.75), concA: (initialConcentration - (initialConcentration - finalConcentration) * 0.90).toFixed(2), concB: ((initialConcentration - finalConcentration) * 0.90).toFixed(2) },
    { t: timeSeconds, concA: finalConcentration.toFixed(2), concB: (initialConcentration - finalConcentration).toFixed(2) }
  ];

  const activeSection =
    chapter.learningSections?.find((sec) => sec.id === activeSectionId) ||
    chapter.learningSections?.[0];

  return (
    <section className="lab-worksheet-section" id="modul-1-belajar">
      {/* Header Lembar Kerja Laboratorium */}
      <div className="worksheet-header">
        <div className="worksheet-tag">
          📋 Lembar Belajar Praktikum Virtual Kimia SMA • Modul 1
        </div>
        <div className="worksheet-title-row">
          <div>
            <h2 className="worksheet-title">
              {chapter.title}
            </h2>
            <p className="worksheet-subtitle">
              Eksplorasi Konsep Laju Reaksi, Hubungan Mol terhadap Volume (Molaritas), Grafik Perubahan Konsentrasi, dan Laju Pengurangan Pereaksi.
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              title="Tutup Tampilan Detail"
            >
              ✕ Tutup Lembar
            </button>
          )}
        </div>
      </div>

      {/* Navigasi Kartu Bagian Belajar (1.1, 1.2, 1.3, 1.4) */}
      <div className="learning-sections-nav" role="tablist" aria-label="Bagian Belajar Modul 1">
        {chapter.learningSections?.map((section) => {
          const isCurrent = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              className={`section-tab-btn ${isCurrent ? 'active' : ''}`}
              onClick={() => setActiveSectionId(section.id)}
            >
              <span className="tab-number">{section.sectionNumber}</span>
              <span className="tab-title-text">{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Konten Utama Bagian Belajar yang Aktif */}
      {activeSection && (
        <div className="active-section-card">
          <div className="section-card-badge">
            Bagian {activeSection.sectionNumber}
          </div>
          <h3 className="section-heading">{activeSection.title}</h3>
          <p className="section-summary-lead">{activeSection.conceptSummary}</p>

          <div className="section-points-grid">
            {activeSection.points.map((point, index) => (
              <div key={index} className="point-card">
                <span className="point-icon">💡</span>
                <span className="point-text">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TABEL DATA & GRAFIK KONSENTRASI TERHADAP WAKTU (PRD 5.1)      */}
      {/* ============================================================ */}
      <div className="lab-graph-card">
        <div className="card-header-styled">
          <span className="card-badge-accent">📊 Data Simulasi &amp; Grafik</span>
          <h3 className="card-title-styled">Profil Perubahan Konsentrasi terhadap Waktu [Reaksi: A → B]</h3>
          <p className="card-desc-styled">
            Perhatikan bagaimana konsentrasi reaktan [A] menurun seiring waktu sementara konsentrasi produk [B] bertambah dengan laju yang setara.
          </p>
        </div>

        <div className="graph-table-grid">
          {/* Tabel Pengamatan Konsentrasi */}
          <div className="data-table-container">
            <table className="lab-table" aria-label="Tabel Data Konsentrasi terhadap Waktu">
              <thead>
                <tr>
                  <th>Waktu t (s)</th>
                  <th>[A] Reaktan (M)</th>
                  <th>[B] Produk (M)</th>
                </tr>
              </thead>
              <tbody>
                {concentrationData.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.t}</strong></td>
                    <td className="reactant-val">{row.concA}</td>
                    <td className="product-val">{row.concB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-caption">
              ℹ️ <em>Data Simulasi:</em> Menggambarkan reaksi orde 1 berorde stabil dalam wadah {volumeLiters.toFixed(1)} L.
            </div>
          </div>

          {/* Grafik SVG Sederhana & Ringan */}
          <div className="svg-chart-container">
            <svg
              viewBox="0 0 320 180"
              className="concentration-svg"
              role="img"
              aria-label="Grafik Konsentrasi terhadap Waktu"
            >
              {/* Sumbu X dan Y */}
              <line x1="40" y1="140" x2="300" y2="140" stroke="#94a3b8" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="140" stroke="#94a3b8" strokeWidth="2" />

              {/* Garis Grid Halus */}
              <line x1="40" y1="80" x2="300" y2="80" stroke="#e2e8f0" strokeDasharray="3,3" />
              <line x1="170" y1="20" x2="170" y2="140" stroke="#e2e8f0" strokeDasharray="3,3" />

              {/* Kurva Reaktan A (Berkurang - Warna Biru) */}
              <path
                d="M 40,30 Q 150,110 300,125"
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
              />

              {/* Kurva Produk B (Bertambah - Warna Hijau) */}
              <path
                d="M 40,140 Q 150,60 300,45"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
              />

              {/* Label Sumbu */}
              <text x="290" y="160" fontSize="10" fill="#64748b" textAnchor="end">Waktu (s) ➔</text>
              <text x="15" y="25" fontSize="10" fill="#64748b" transform="rotate(-90 20,25)">[M] Konsentrasi</text>

              {/* Titik Label Kurva */}
              <circle cx="270" cy="120" r="4" fill="#0284c7" />
              <text x="278" y="124" fontSize="11" fontWeight="bold" fill="#0284c7">[A] Reaktan</text>

              <circle cx="270" cy="50" r="4" fill="#10b981" />
              <text x="278" y="54" fontSize="11" fontWeight="bold" fill="#10b981">[B] Produk</text>
            </svg>
            <div className="chart-legend-row">
              <span className="legend-chip blue">● Reaktan [A] berkurang (-Δ[A]/Δt)</span>
              <span className="legend-chip green">● Produk [B] bertambah (+Δ[B]/Δt)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* RUANG RUMUS KHUSUS & PENJELASAN KONSEP MOL                    */}
      {/* ============================================================ */}
      <div className="formula-sheet-box">
        <div className="formula-sheet-header">
          <span className="formula-sheet-icon">📐</span>
          <div>
            <h3 className="formula-sheet-title">Ruang Rumus &amp; Penurunan Konsep Mol</h3>
            <p className="formula-sheet-desc">
              Memahami bagaimana konsep mol dijabarkan menjadi laju konsentrasi per satuan waktu (mol·L⁻¹·s⁻¹).
            </p>
          </div>
        </div>

        <div className="formula-grid">
          {/* Kartu Rumus 1: Definisi Molaritas dari Mol */}
          <div className="formula-item-card">
            <div className="formula-item-label">1. Konsentrasi Molaritas (M)</div>
            <div className="formula-display">
              <span className="formula-symbol">[M]</span> ={' '}
              <span className="formula-fraction">
                <span className="fraction-top">n (jumlah mol zat terlarut)</span>
                <span className="fraction-bottom">V (Volume larutan dalam Liter)</span>
              </span>
            </div>
            <p className="formula-note">
              <strong>Spesifik Konsep Mol:</strong> 1 Molar berarti terdapat 1 mol zat terlarut dalam setiap 1 Liter larutan (1 mol/L). Jika volume tetap, perubahan konsentrasi berbanding lurus dengan perubahan mol zat.
            </p>
          </div>

          {/* Kartu Rumus 2: Definisi Laju Reaksi Rata-Rata */}
          <div className="formula-item-card">
            <div className="formula-item-label">2. Laju Reaksi Rata-Rata (r atau v)</div>
            <div className="formula-display">
              <span className="formula-symbol">r</span> ={' '}
              <span className="formula-fraction">
                <span className="fraction-top">|Δ[M]|</span>
                <span className="fraction-bottom">Δt</span>
              </span>
              {' '}= {' '}
              <span className="formula-fraction">
                <span className="fraction-top">|Δn (mol)|</span>
                <span className="fraction-bottom">V (Liter) × Δt (detik)</span>
              </span>
            </div>
            <p className="formula-note">
              <strong>Satuan:</strong> mol·L⁻¹·s⁻¹ (atau M/detik). Laju reaksi selalu bernilai positif karena menggambarkan besarnya kecepatan perubahan.
            </p>
          </div>

          {/* Kartu Rumus 3: Perbandingan Koefisien & Stoikiometri Laju */}
          <div className="formula-item-card formula-item-card--wide">
            <div className="formula-item-label">3. Hubungan Perbandingan Koefisien Stoikiometri</div>
            <div className="formula-subtext">
              Untuk reaksi kimia umum:{' '}
              <code>aA + bB → cC + dD</code>
            </div>
            <div className="formula-display formula-display--scroll">
              <span className="formula-symbol">r</span> = -{' '}
              <span className="formula-fraction">
                <span className="fraction-top">1</span>
                <span className="fraction-bottom">a</span>
              </span>
              <span className="formula-fraction">
                <span className="fraction-top">Δ[A]</span>
                <span className="fraction-bottom">Δt</span>
              </span>{' '}
              = -{' '}
              <span className="formula-fraction">
                <span className="fraction-top">1</span>
                <span className="fraction-bottom">b</span>
              </span>
              <span className="formula-fraction">
                <span className="fraction-top">Δ[B]</span>
                <span className="fraction-bottom">Δt</span>
              </span>{' '}
              = +{' '}
              <span className="formula-fraction">
                <span className="fraction-top">1</span>
                <span className="fraction-bottom">c</span>
              </span>
              <span className="formula-fraction">
                <span className="fraction-top">Δ[C]</span>
                <span className="fraction-bottom">Δt</span>
              </span>{' '}
              = +{' '}
              <span className="formula-fraction">
                <span className="fraction-top">1</span>
                <span className="fraction-bottom">d</span>
              </span>
              <span className="formula-fraction">
                <span className="fraction-top">Δ[D]</span>
                <span className="fraction-bottom">Δt</span>
              </span>
            </div>
            <div className="formula-legend">
              <div className="legend-item">
                <span className="legend-badge minus">Tanda (-)</span>
                <span>Konsentrasi reaktan <strong>berkurang</strong> karena bereaksi membentuk produk.</span>
              </div>
              <div className="legend-item">
                <span className="legend-badge plus">Tanda (+)</span>
                <span>Konsentrasi produk <strong>bertambah</strong> seiring waktu berjalan.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* KALKULATOR INTERAKTIF LEMBAR KERJA: LATIHAN PERHITUNGAN MOL  */}
      {/* ============================================================ */}
      <div className="interactive-calc-card">
        <div className="calc-header">
          <div className="calc-badge">🧪 Praktikum Mandiri</div>
          <h3 className="calc-title">Simulasi Perhitungan Laju Berdasarkan Jumlah Mol</h3>
          <p className="calc-subtitle">
            Ubah nilai jumlah mol awal, mol sisa, volume wadah, dan waktu untuk melihat bagaimana perubahan konsentrasi dan laju reaksi dihitung secara matematis.
          </p>
          <div className="calc-reaction-badge">
            Contoh Model: Reaktan <ChemicalFormula formula="A(aq) -> B(aq)" /> dalam wadah bervolume tetap.
          </div>
        </div>

        <div className="calc-grid">
          {/* Kolom Kontrol Input Variabel */}
          <div className="calc-inputs-panel">
            <div className="input-group">
              <label htmlFor="input-moles-initial" className="input-label">
                <span>Jumlah Mol Awal Reaktan A (n₁)</span>
                <span className="input-val-badge">{initialMoles.toFixed(2)} mol</span>
              </label>
              <input
                id="input-moles-initial"
                type="range"
                min="0.2"
                max="2.0"
                step="0.05"
                value={initialMoles}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setInitialMoles(val);
                  if (finalMoles > val) setFinalMoles(val * 0.5);
                }}
                className="range-slider"
              />
            </div>

            <div className="input-group">
              <label htmlFor="input-moles-final" className="input-label">
                <span>Jumlah Mol Sisa Reaktan A (n₂)</span>
                <span className="input-val-badge">{finalMoles.toFixed(2)} mol</span>
              </label>
              <input
                id="input-moles-final"
                type="range"
                min="0.0"
                max={initialMoles}
                step="0.05"
                value={finalMoles}
                onChange={(e) => setFinalMoles(parseFloat(e.target.value))}
                className="range-slider"
              />
              <span className="input-hint">Catatan: Mol sisa harus lebih kecil atau sama dengan mol awal.</span>
            </div>

            <div className="input-group">
              <label htmlFor="input-volume" className="input-label">
                <span>Volume Wadah / Larutan (V)</span>
                <span className="input-val-badge">{volumeLiters.toFixed(1)} Liter</span>
              </label>
              <input
                id="input-volume"
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={volumeLiters}
                onChange={(e) => setVolumeLiters(parseFloat(e.target.value))}
                className="range-slider"
              />
            </div>

            <div className="input-group">
              <label htmlFor="input-time" className="input-label">
                <span>Selang Waktu Reaksi (Δt)</span>
                <span className="input-val-badge">{timeSeconds} detik</span>
              </label>
              <input
                id="input-time"
                type="range"
                min="5"
                max="60"
                step="5"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(parseInt(e.target.value, 10))}
                className="range-slider"
              />
            </div>
          </div>

          {/* Kolom Hasil & Penjabaran Langkah Demi Langkah */}
          <div className="calc-results-panel">
            <h4 className="results-panel-title">Penjabaran Langkah Perhitungan:</h4>

            <div className="step-box">
              <div className="step-num">Langkah 1: Menghitung Perubahan Mol (Δn)</div>
              <div className="step-calc">
                Δn = n₂ - n₁ = {finalMoles.toFixed(2)} - {initialMoles.toFixed(2)} ={' '}
                <strong>{deltaMoles.toFixed(2)} mol</strong>
              </div>
            </div>

            <div className="step-box">
              <div className="step-num">Langkah 2: Menghitung Molaritas Awal & Sisa</div>
              <div className="step-calc">
                [A]₁ = {initialMoles.toFixed(2)} mol / {volumeLiters.toFixed(1)} L ={' '}
                <strong>{initialConcentration.toFixed(3)} M</strong>
                <br />
                [A]₂ = {finalMoles.toFixed(2)} mol / {volumeLiters.toFixed(1)} L ={' '}
                <strong>{finalConcentration.toFixed(3)} M</strong>
                <br />
                Δ[A] = {finalConcentration.toFixed(3)} - {initialConcentration.toFixed(3)} ={' '}
                <strong>{deltaConcentration.toFixed(3)} M</strong>
              </div>
            </div>

            <div className="step-box step-box--highlight">
              <div className="step-num">Langkah 3: Laju Berkurangnya Reaktan A (r_A)</div>
              <div className="step-calc">
                r_A = - (Δ[A] / Δt) = - ({deltaConcentration.toFixed(3)} M / {timeSeconds} s)
              </div>
              <div className="final-rate-display">
                <span className="final-rate-label">Laju Reaksi:</span>
                <span className="final-rate-number">
                  {reactionRate.toFixed(4)} <span className="rate-unit">mol·L⁻¹·s⁻¹ (M/s)</span>
                </span>
              </div>
              <div className="rate-conclusion">
                💬 <strong>Arti Fisis:</strong> Dalam setiap detik pada larutan bervolume {volumeLiters.toFixed(1)} Liter, zat A bereaksi sebesar {reactionRate.toFixed(4)} Molar.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PERTANYAAN DIAGNOSTIK PEMAHAMAN PRD (Bab 1 PRD 5.1)           */}
      {/* ============================================================ */}
      <div className="diagnostic-question-box">
        <div className="diagnostic-badge">❓ Uji Penalaran Konsep Bab 1</div>
        <h4 className="diagnostic-title">
          Pertanyaan Diagnostik: Dua Reaksi Menghasilkan Jumlah Gas Sama
        </h4>
        <p className="diagnostic-prompt">
          <em>&quot;Reaksi X dan Reaksi Y masing-masing mereaksikan 2 gram pita magnesium dengan asam klorida dan sama-sama menghasilkan 50 mL gas H₂. Namun, Reaksi X selesai dalam waktu 15 detik, sedangkan Reaksi Y baru selesai dalam waktu 45 detik. Apa kesimpulan yang tepat mengenai laju reaksinya?&quot;</em>
        </p>

        <div className="diagnostic-options">
          {[
            {
              id: 'opt-a',
              text: 'Reaksi X dan Reaksi Y memiliki laju reaksi yang persis sama karena volume total gas yang dihasilkan sama (50 mL).',
              isCorrect: false,
              feedback: 'Kurang tepat. Laju reaksi bukan hanya melihat jumlah akhir zat yang terbentuk, melainkan berapa banyak zat terbentuk dalam satuan waktu (kecepatan).'
            },
            {
              id: 'opt-b',
              text: 'Laju reaksi X tiga kali lebih cepat dibandingkan reaksi Y karena waktu yang dibutuhkan Reaksi X sepertiga dari Reaksi Y.',
              isCorrect: true,
              feedback: 'Tepat sekali! Laju reaksi berbanding terbalik dengan waktu (r ∝ 1/t). Karena waktu Reaksi X adalah 15 detik dan Reaksi Y adalah 45 detik, maka r_X / r_Y = 45 / 15 = 3 kali lebih cepat.'
            },
            {
              id: 'opt-c',
              text: 'Reaksi Y memiliki laju lebih cepat karena memiliki waktu interaksi partikel lebih lama.',
              isCorrect: false,
              feedback: 'Salah. Reaksi yang membutuhkan waktu lebih lama berarti laju reaksinya lebih lambat.'
            }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`diagnostic-opt-btn ${diagnosticSelected?.id === opt.id ? 'selected' : ''}`}
              onClick={() => {
                setDiagnosticSelected(opt);
                setShowDiagnosticFeedback(true);
              }}
            >
              <span className="opt-indicator">
                {diagnosticSelected?.id === opt.id ? '🔘' : '⚪'}
              </span>
              <span className="opt-text">{opt.text}</span>
            </button>
          ))}
        </div>

        {showDiagnosticFeedback && diagnosticSelected && (
          <div
            className={`diagnostic-feedback-banner ${
              diagnosticSelected.isCorrect ? 'correct' : 'incorrect'
            }`}
          >
            <strong>{diagnosticSelected.isCorrect ? '✅ Jawaban Benar!' : '⚠️ Perlu Diteliti Kembali:'}</strong>{' '}
            {diagnosticSelected.feedback}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* NAVIGASI LANJUTAN: MENUJU KUIS 10 SOAL                       */}
      {/* ============================================================ */}
      <div className="module-footer-nav">
        <div className="footer-nav-text">
          <strong>Modul 1 Selesai Dipelajari!</strong>
          <p>Uji pemahaman konsep mol, molaritas, dan laju reaksi Anda melalui Kuis Interaktif 10 Soal.</p>
        </div>
        {onNavigateToQuiz && (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={onNavigateToQuiz}
          >
            Ikuti Kuis Interaktif (10 Soal) ➔
          </button>
        )}
      </div>
    </section>
  );
}
