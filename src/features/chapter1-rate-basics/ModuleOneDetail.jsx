import React, { useState } from 'react';
import ChemicalFormula from '../../components/chemistry/ChemicalFormula';

/**
 * Komponen ModuleOneDetail (Lembar Belajar Laboratorium Modul 1)
 *
 * Dirancang khusus untuk siswa SMA Kelas XI yang mempelajari:
 * 1. Pengertian Laju Reaksi
 * 2. Kaitan Konsep Mol, Molaritas (M = mol/L), dan Satuan Waktu
 * 3. Hubungan Koefisien Stoikiometri Reaksi
 * 4. Pengamatan Makroskopis di Laboratorium
 *
 * Catatan untuk Pemula React:
 * - `useState` digunakan untuk menyimpan bagian materi aktif yang sedang dibaca siswa.
 * - State kalkulator praktikum (`initialMoles`, `finalMoles`, `volumeLiters`, `timeSeconds`)
 *   memungkinkan perhitungan interaktif langsung tanpa me-reload halaman browser.
 */
export default function ModuleOneDetail({ chapter, onClose }) {
  // State untuk memilih tab/bagian materi aktif (default: bagian pertama 'sec-1-1')
  const [activeSectionId, setActiveSectionId] = useState(
    chapter.learningSections ? chapter.learningSections[0].id : 'sec-1-1'
  );

  // State untuk Kalkulator Interaktif Lembar Kerja Mol & Laju Reaksi
  const [initialMoles, setInitialMoles] = useState(0.8); // Mol awal zat A
  const [finalMoles, setFinalMoles] = useState(0.4); // Mol sisa zat A
  const [volumeLiters, setVolumeLiters] = useState(2.0); // Volume larutan (Liter)
  const [timeSeconds, setTimeSeconds] = useState(20); // Selang waktu reaksi (detik)

  // Perhitungan matematis konseptual
  const initialConcentration = volumeLiters > 0 ? initialMoles / volumeLiters : 0;
  const finalConcentration = volumeLiters > 0 ? finalMoles / volumeLiters : 0;
  const deltaConcentration = finalConcentration - initialConcentration;
  const deltaMoles = finalMoles - initialMoles;
  const reactionRate =
    timeSeconds > 0 ? Math.abs(deltaConcentration / timeSeconds) : 0;

  // Menemukan data bagian yang sedang dipilih siswa
  const activeSection =
    chapter.learningSections?.find((sec) => sec.id === activeSectionId) ||
    chapter.learningSections?.[0];

  return (
    <section className="lab-worksheet-section" id="modul-1-belajar">
      {/* Header Lembar Kerja Laboratorium */}
      <div className="worksheet-header">
        <div className="worksheet-tag">
          📋 Lembar Belajar Praktikum Virtual Kimia SMA
        </div>
        <div className="worksheet-title-row">
          <div>
            <h2 className="worksheet-title">
              Modul 1: {chapter.title}
            </h2>
            <p className="worksheet-subtitle">
              Eksplorasi Konsep Laju Reaksi, Hubungan Mol terhadap Volume (Molaritas), dan Laju Pengurangan Pereaksi.
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

      {/* RUANG RUMUS KHUSUS & PENJELASAN KONSEP MOL */}
      <div className="formula-sheet-box">
        <div className="formula-sheet-header">
          <span className="formula-sheet-icon">📐</span>
          <div>
            <h3 className="formula-sheet-title">Ruang Rumus & Penurunan Konsep Mol</h3>
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

      {/* KALKULATOR INTERAKTIF LEMBAR KERJA: LATIHAN PERHITUNGAN MOL & LAJU */}
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
                💬 <strong>Arti Fisis:</strong> Dalam setiap detik pada wadah 1 liter, zat A bereaksi sebanyak {reactionRate.toFixed(4)} mol.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

