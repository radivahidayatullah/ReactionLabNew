import React, { useState } from 'react';
import ChemicalFormula from '../../components/chemistry/ChemicalFormula';

/**
 * Komponen ModuleFourDetail (Bab 4: Analisis Data & Profil Diagram Energi)
 *
 * Dioptimalkan secara lengkap sesuai PRD Bab 5.4 & AGENT.md:
 * - 4 Bagian Belajar:
 *   4.1 Penafsiran Grafik Konsentrasi terhadap Waktu (Orde 0, 1, 2)
 *   4.2 Menentukan Orde Reaksi & Persamaan Laju (r = k[A]^x[B]^y)
 *   4.3 Profil Diagram Energi Maju, Balik, dan Peran Katalis
 *   4.4 Investigasi Data Percobaan Kinetika Kimia
 * - Fitur Interaktif 1: Kalkulator & Penjabaran Penentuan Orde Reaksi
 * - Fitur Interaktif 2: Diagram Profil Energi SVG Interaktif (Toggle Jalur Katalis vs Non-Katalis)
 * - Uji Penalaran Analisis Data (Level 3)
 */
export default function ModuleFourDetail({ chapter, onClose, onNavigateToQuiz, onNavigateToModuleFive }) {
  // Tab materi aktif (4.1 s.d. 4.4)
  const [activeSectionId, setActiveSectionId] = useState(
    chapter.learningSections ? chapter.learningSections[0].id : 'sec-4-1'
  );

  // State untuk Diagram Energi Interaktif
  // 'both' (Keduanya) | 'uncatalyzed' (Tanpa Katalis) | 'catalyzed' (Dengan Katalis)
  const [catalystViewMode, setCatalystViewMode] = useState('both');

  // Mini Kuis Analisis Orde Reaksi
  const [userQuizChoice, setUserQuizChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const activeSection =
    chapter.learningSections?.find((sec) => sec.id === activeSectionId) ||
    chapter.learningSections?.[0];

  return (
    <section className="lab-worksheet-section" id="modul-4-belajar">
      {/* Header Lembar Kerja Laboratorium */}
      <div className="worksheet-header">
        <div className="worksheet-tag">
          📊 Lembar Belajar Praktikum Virtual Kimia SMA • Modul 4
        </div>
        <div className="worksheet-title-row">
          <div>
            <h2 className="worksheet-title">{chapter.title}</h2>
            <p className="worksheet-subtitle">
              Analisis Kuantitatif Kinetika Kimia: Penentuan Orde Reaksi dari Data Eksperimen, Perhitungan Tetapan Laju (k), dan Penafsiran Diagram Profil Energi Reaksi.
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              title="Tutup Lembar Bab 4"
            >
              ✕ Tutup Lembar
            </button>
          )}
        </div>
      </div>

      {/* Navigasi Tab Bagian Belajar Bab 4 */}
      <div className="learning-sections-nav" role="tablist" aria-label="Bagian Belajar Bab 4">
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
                <span className="point-icon">📈</span>
                <span className="point-text">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. FITUR INTERAKTIF: PENENTUAN ORDE REAKSI DARI DATA TABEL   */}
      {/* ============================================================ */}
      <div className="order-calculation-card">
        <div className="section-header">
          <div className="section-eyebrow">Analisis Data Empiris</div>
          <h3 className="section-title">Metode Penentuan Orde Reaksi &amp; Persamaan Laju</h3>
          <p className="section-desc">
            Model Reaksi: <ChemicalFormula formula="2NO(g) + Cl2(g) -> 2NOCl(g)" />.
            Tentukan orde reaksi terhadap NO, orde reaksi terhadap Cl₂, dan nilai tetapan laju reaksi (\(k\)) berdasarkan data 3 percobaan laboratorium berikut:
          </p>
        </div>

        {/* Tabel Data Eksperimen Kinetika */}
        <div className="data-table-container">
          <table className="lab-table" aria-label="Tabel Data Percobaan Kinetika Reaksi NO dan Cl2">
            <thead>
              <tr>
                <th>Percobaan</th>
                <th>Konsentrasi Awal [NO] (M)</th>
                <th>Konsentrasi Awal [Cl₂] (M)</th>
                <th>Laju Awal Reaksi (r, M/s)</th>
                <th>Catatan Analisis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1</strong></td>
                <td>0.10</td>
                <td>0.10</td>
                <td className="product-val">0.020</td>
                <td>Kondisi Baseline</td>
              </tr>
              <tr className="highlight-row">
                <td><strong>2</strong></td>
                <td><strong>0.20 (2x)</strong></td>
                <td>0.10 (Tetap)</td>
                <td className="product-val"><strong>0.080 (4x)</strong></td>
                <td>Membandingkan Percobaan 1 &amp; 2: Menentukan Orde NO</td>
              </tr>
              <tr className="highlight-row-alt">
                <td><strong>3</strong></td>
                <td>0.10 (Tetap)</td>
                <td><strong>0.20 (2x)</strong></td>
                <td className="product-val"><strong>0.040 (2x)</strong></td>
                <td>Membandingkan Percobaan 1 &amp; 3: Menentukan Orde Cl₂</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kotak Penjabaran Matematis Langkah Demi Langkah */}
        <div className="steps-reasoning-grid">
          {/* Langkah 1 */}
          <div className="reasoning-step-box">
            <div className="step-badge">Langkah 1: Orde terhadap NO (x)</div>
            <p className="step-text">
              Pilih Percobaan 1 dan 2 di mana konsentrasi [Cl₂] dibuat tetap (0.10 M):
            </p>
            <div className="step-math">
              (r₂ / r₁) = ([NO]₂ / [NO]₁)ˣ<br />
              (0.080 / 0.020) = (0.20 / 0.10)ˣ<br />
              4 = 2ˣ ➔ <strong>x = 2 (Orde Dua terhadap NO)</strong>
            </div>
            <span className="step-conclusion">Arti: Melipatgandakan [NO] mempercepat laju sebesar 2² = 4 kali lipat.</span>
          </div>

          {/* Langkah 2 */}
          <div className="reasoning-step-box">
            <div className="step-badge">Langkah 2: Orde terhadap Cl₂ (y)</div>
            <p className="step-text">
              Pilih Percobaan 1 dan 3 di mana konsentrasi [NO] dibuat tetap (0.10 M):
            </p>
            <div className="step-math">
              (r₃ / r₁) = ([Cl₂]₃ / [Cl₂]₁)ʸ<br />
              (0.040 / 0.020) = (0.20 / 0.10)ʸ<br />
              2 = 2ʸ ➔ <strong>y = 1 (Orde Satu terhadap Cl₂)</strong>
            </div>
            <span className="step-conclusion">Arti: Melipatgandakan [Cl₂] mempercepat laju sebesar 2¹ = 2 kali lipat.</span>
          </div>

          {/* Langkah 3: Hasil Akhir Persamaan Laju */}
          <div className="reasoning-step-box reasoning-step-box--primary">
            <div className="step-badge step-badge--green">Langkah 3: Persamaan Laju &amp; Nilai k</div>
            <div className="final-law-display">
              <span className="rate-formula-label">Persamaan Hukum Laju:</span>
              <div className="law-equation">r = k [NO]² [Cl₂]¹</div>
              <span className="total-order">Orde Total Reaksi: 2 + 1 = 3</span>
            </div>
            <div className="k-value-box">
              Hitung tetapan k menggunakan data Percobaan 1:<br />
              k = r / ([NO]² [Cl₂]) = 0.020 / (0.10² × 0.10) = <strong>20 M⁻²·s⁻¹</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. DIAGRAM PROFIL ENERGI SVG INTERAKTIF (PRD 5.4)             */}
      {/* ============================================================ */}
      <div className="energy-diagram-section">
        <div className="section-header">
          <div className="section-eyebrow">Visualisasi Termodinamika &amp; Kinetika</div>
          <h3 className="section-title">Diagram Profil Energi: Pengaruh Katalisator terhadap Ea</h3>
          <p className="section-desc">
            Amati bagaimana katalisator menyediakan jalur mekanisme alternatif dengan Energi Aktivasi (\(E_a\)) yang lebih rendah, tanpa mengubah tingkat energi awal reaktan maupun energi akhir produk.
          </p>
        </div>

        {/* Kontrol Toggle Tampilan Diagram */}
        <div className="diagram-toggle-bar">
          <span className="toggle-label">Pilih Mode Tampilan Jalur Reaksi:</span>
          <div className="toggle-buttons">
            <button
              type="button"
              className={`btn-toggle ${catalystViewMode === 'both' ? 'active' : ''}`}
              onClick={() => setCatalystViewMode('both')}
            >
              🔄 Bandingkan Kedua Jalur
            </button>
            <button
              type="button"
              className={`btn-toggle ${catalystViewMode === 'uncatalyzed' ? 'active' : ''}`}
              onClick={() => setCatalystViewMode('uncatalyzed')}
            >
              🔴 Jalur Tanpa Katalis (Normal)
            </button>
            <button
              type="button"
              className={`btn-toggle ${catalystViewMode === 'catalyzed' ? 'active' : ''}`}
              onClick={() => setCatalystViewMode('catalyzed')}
            >
              🟢 Jalur Berkatalis (Alternatif)
            </button>
          </div>
        </div>

        <div className="energy-svg-card">
          <svg
            viewBox="0 0 700 360"
            className="energy-profile-svg"
            role="img"
            aria-label="Diagram Profil Energi Reaksi dengan dan tanpa Katalis"
          >
            {/* Sumbu X dan Y */}
            <line x1="80" y1="310" x2="650" y2="310" stroke="#64748b" strokeWidth="2.5" />
            <line x1="80" y1="40" x2="80" y2="310" stroke="#64748b" strokeWidth="2.5" />

            {/* Label Sumbu */}
            <text x="640" y="335" fontSize="13" fontWeight="bold" fill="#475569" textAnchor="end">
              Koordinat Reaksi (Proses Reaksi Berjalan) ➔
            </text>
            <text x="35" y="45" fontSize="13" fontWeight="bold" fill="#475569" transform="rotate(-90 40,45)">
              Energi Potensial (kJ/mol)
            </text>

            {/* Garis Energi Reaktan (+60 kJ/mol) */}
            <line x1="80" y1="210" x2="220" y2="210" stroke="#0284c7" strokeWidth="3" />
            <text x="140" y="200" fontSize="12" fontWeight="bold" fill="#0284c7" textAnchor="middle">
              Pereaksi (+60 kJ/mol)
            </text>

            {/* Garis Energi Produk (+20 kJ/mol) */}
            <line x1="500" y1="260" x2="640" y2="260" stroke="#0f172a" strokeWidth="3" />
            <text x="570" y="250" fontSize="12" fontWeight="bold" fill="#0f172a" textAnchor="middle">
              Hasil Reaksi (+20 kJ/mol)
            </text>

            {/* Garis Dasar Entalpi Reaktan ke Produk */}
            <line x1="220" y1="210" x2="560" y2="210" stroke="#cbd5e1" strokeDasharray="4,4" />
            <line x1="500" y1="260" x2="560" y2="260" stroke="#cbd5e1" strokeDasharray="4,4" />

            {/* Panah Perubahan Entalpi ΔH = -40 kJ/mol */}
            <line x1="550" y1="212" x2="550" y2="258" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="565" y="238" fontSize="12" fontWeight="bold" fill="#dc2626">
              ΔH = -40 kJ/mol (Eksoterm)
            </text>

            {/* JALUR 1: TANPA KATALIS (Puncak 160 kJ/mol, Ea = 100 kJ/mol) */}
            {(catalystViewMode === 'both' || catalystViewMode === 'uncatalyzed') && (
              <g className="uncatalyzed-path animate-fade-in">
                {/* Kurva Kubik */}
                <path
                  d="M 220,210 C 270,70 330,70 370,70 C 410,70 460,180 500,260"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                />
                <circle cx="370" cy="70" r="5" fill="#ef4444" />
                <text x="370" y="55" fontSize="12" fontWeight="bold" fill="#ef4444" textAnchor="middle">
                  Kompleks Teraktivasi Tanpa Katalis (+160 kJ)
                </text>

                {/* Panah Ea Tanpa Katalis */}
                <line x1="260" y1="208" x2="260" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                <text x="245" y="145" fontSize="12" fontWeight="bold" fill="#ef4444" textAnchor="end">
                  Ea = 100 kJ
                </text>
              </g>
            )}

            {/* JALUR 2: DENGAN KATALIS (Puncak 110 kJ/mol, Ea' = 50 kJ/mol) */}
            {(catalystViewMode === 'both' || catalystViewMode === 'catalyzed') && (
              <g className="catalyzed-path animate-fade-in">
                {/* Kurva Kubik Jalur Katalis */}
                <path
                  d="M 220,210 C 280,120 330,120 370,120 C 410,120 460,190 500,260"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeDasharray="6,4"
                />
                <circle cx="370" cy="120" r="5" fill="#10b981" />
                <text x="370" y="140" fontSize="12" fontWeight="bold" fill="#10b981" textAnchor="middle">
                  Jalur Alternatif Berkatalis (+110 kJ)
                </text>

                {/* Panah Ea Berkatalis */}
                <line x1="320" y1="208" x2="320" y2="125" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
                <text x="330" y="170" fontSize="12" fontWeight="bold" fill="#047857">
                  Ea&apos; = 50 kJ
                </text>
              </g>
            )}
          </svg>

          {/* Legend & Analisis Fakta Ilmiah */}
          <div className="energy-legend-box">
            <div className="legend-row">
              <span className="legend-item-tag red">━ Jalur Tanpa Katalis: Energi Aktivasi Tinggi (Ea = 100 kJ/mol)</span>
              <span className="legend-item-tag green">╍╍ Jalur Berkatalis: Energi Aktivasi Rendah (Ea&apos; = 50 kJ/mol)</span>
            </div>
            <div className="energy-principles-summary">
              <strong>🔬 Fakta Kinetika Penting:</strong>
              <ul>
                <li>Katalisator <strong>menurunkan energi aktivasi (\(E_a\))</strong> sehingga partikel lebih mudah melampaui puncak kompleks teraktivasi.</li>
                <li>Tingkat energi pereaksi (+60 kJ) dan produk (+20 kJ) <strong>tidak berubah sama sekali</strong>. Oleh karena itu, perubahan entalpi reaksi (\(\Delta H\)) bernilai tetap (-40 kJ/mol).</li>
                <li>Katalis mempercepat reaksi maju dan reaksi balik secara setara, sehingga <strong>tidak menggeser posisi kesetimbangan kimia</strong> pada suhu tertentu.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. UJI ANALISIS DATA KUANTITATIF (LEVEL 3)                   */}
      {/* ============================================================ */}
      <div className="diagnostic-question-box">
        <div className="diagnostic-badge">❓ Uji Penalaran Analisis Data Bab 4</div>
        <h4 className="diagnostic-title">
          Soal Aplikasi Hukum Laju: Memprediksi Laju pada Kondisi Baru
        </h4>
        <p className="diagnostic-prompt">
          <em>&quot;Berdasarkan persamaan laju yang telah ditemukan di atas: <code>r = k [NO]² [Cl₂]</code> dengan nilai <code>k = 20 M⁻²·s⁻¹</code>. Berapakah laju reaksi jika konsentrasi NO dinaikkan menjadi 0.30 M dan konsentrasi Cl₂ menjadi 0.20 M?&quot;</em>
        </p>

        <div className="diagnostic-options">
          {[
            {
              id: 'q4-opt-a',
              text: '0.120 M/s',
              isCorrect: false,
              feedback: 'Kurang tepat. Pastikan Anda memangkatkan konsentrasi [NO] dengan orde 2: [0.30]² = 0.09.'
            },
            {
              id: 'q4-opt-b',
              text: '0.360 M/s',
              isCorrect: true,
              feedback: 'Luar biasa tepat! Perhitungan: r = 20 × (0.30)² × (0.20)¹ = 20 × 0.09 × 0.20 = 0.360 M/s.'
            },
            {
              id: 'q4-opt-c',
              text: '0.060 M/s',
              isCorrect: false,
              feedback: 'Keliru. Periksa kembali perkalian orde reaksi total terhadap nilai k.'
            }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`diagnostic-opt-btn ${userQuizChoice?.id === opt.id ? 'selected' : ''}`}
              onClick={() => {
                setUserQuizChoice(opt);
                setShowFeedback(true);
              }}
            >
              <span className="opt-indicator">{userQuizChoice?.id === opt.id ? '🔘' : '⚪'}</span>
              <span className="opt-text">{opt.text}</span>
            </button>
          ))}
        </div>

        {showFeedback && userQuizChoice && (
          <div className={`diagnostic-feedback-banner ${userQuizChoice.isCorrect ? 'correct' : 'incorrect'}`}>
            <strong>{userQuizChoice.isCorrect ? '✅ Jawaban Sangat Akurat!' : '⚠️ Periksa Kembali Perhitungan:'}</strong>{' '}
            {userQuizChoice.feedback}
          </div>
        )}
      </div>

      {/* Navigasi Footer Bab 4 */}
      <div className="module-footer-nav">
        <div className="footer-nav-text">
          <strong>Bab 4 Selesai Dipelajari!</strong>
          <p>Seluruh materi inti kinetika kimia (Bab 1–4) telah Anda selesaikan. Sekarang saatnya menguji penguasaan komprehensif pada Bab 5 atau Kuis Interaktif.</p>
        </div>
        <div className="footer-nav-actions">
          {onNavigateToModuleFive && (
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onNavigateToModuleFive}
            >
              Lanjut ke Bab 5 (Evaluasi Akhir) ➔
            </button>
          )}
          {onNavigateToQuiz && (
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onNavigateToQuiz}
            >
              Ikuti Kuis 10 Soal
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

