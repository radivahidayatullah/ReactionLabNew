import React, { useState, useEffect, useRef } from 'react';
import ChemicalFormula from '../../components/chemistry/ChemicalFormula';

/**
 * Komponen ModuleThreeDetail (Bab 3: Faktor-Faktor yang Memengaruhi Laju Reaksi)
 *
 * Dioptimalkan secara lengkap sesuai PRD Bab 5.3 & AGENT.md:
 * - 4 Bagian Belajar:
 *   3.1 Pengaruh Konsentrasi
 *   3.2 Pengaruh Suhu & Distribusi Maxwell-Boltzmann
 *   3.3 Pengaruh Luas Permukaan Kontak
 *   3.4 Pengaruh Katalis & Jalur Alternatif
 * - Laboratorium Virtual Interaktif Uji Variabel:
 *   Siswa menguji reaksi CaCO3 + 2HCl -> CaCl2 + H2O + CO2
 *   dengan manipulasi konsentrasi, suhu, bentuk padatan, dan katalis.
 * - Stopwatch reaksi, animasi gelembung gas CO2, dan tabel perbandingan eksperimen.
 * - Uji Pemahaman Variabel Kontrol Bab 3.
 */
export default function ModuleThreeDetail({ chapter, onClose, onNavigateToQuiz }) {
  // Tab materi aktif (3.1 s.d. 3.4)
  const [activeSectionId, setActiveSectionId] = useState(
    chapter.learningSections ? chapter.learningSections[0].id : 'sec-3-1'
  );

  // Parameter Laboratorium Virtual
  const [hclConcentration, setHclConcentration] = useState(1.0); // 0.5 M, 1.0 M, 2.0 M
  const [temperatureCelsius, setTemperatureCelsius] = useState(25); // 25 C, 40 C, 60 C
  const [solidForm, setSolidForm] = useState('powder'); // 'chunks' (bongkahan) vs 'powder' (serbuk)
  const [hasCatalyst, setHasCatalyst] = useState(false); // true / false

  // State simulasi eksperimen
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // detik
  const [gasVolume, setGasVolume] = useState(0); // mL (maks 50 mL)
  const [isCompleted, setIsCompleted] = useState(false);

  // Riwayat tabel data eksperimen yang disimpan siswa
  const [experimentLogs, setExperimentLogs] = useState([
    {
      id: 1,
      name: 'Percobaan 1 (Standar)',
      hcl: '1.0 M',
      temp: '25 °C',
      form: 'Bongkahan',
      catalyst: 'Tidak',
      time: '45.0 s',
      rate: '1.11 mL/s'
    }
  ]);

  // Mini Kuis Refleksi Bab 3
  const [selectedQuizOpt, setSelectedQuizOpt] = useState(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

  // Kalkulasi faktor laju relatif fisis
  // Laju dasar ~ 1.0 mL/s
  // Konsentrasi: proporsional terhadap [HCl]
  // Suhu: naik 10 C laju naik ~2x (aturan van 't Hoff)
  // Bentuk: serbuk 2.5x lebih cepat dari bongkahan
  // Katalis: 2.0x lebih cepat
  const tempFactor = Math.pow(2, (temperatureCelsius - 25) / 10);
  const formFactor = solidForm === 'powder' ? 2.5 : 1.0;
  const catalystFactor = hasCatalyst ? 2.0 : 1.0;
  const relativeRate = hclConcentration * tempFactor * formFactor * catalystFactor; // mL per detik
  const targetVolume = 50; // mL

  const timerRef = useRef(null);

  // Loop stopwatch dan penambahan volume gas
  useEffect(() => {
    if (isSimRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => {
          const newTime = prevTime + 0.2;
          const currentVol = Math.min(targetVolume, newTime * relativeRate);
          setGasVolume(currentVol);

          if (currentVol >= targetVolume) {
            clearInterval(timerRef.current);
            setIsSimRunning(false);
            setIsCompleted(true);
          }
          return newTime;
        });
      }, 200);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isSimRunning, relativeRate]);

  // Handler tombol Jalankan / Jeda
  const handleToggleRun = () => {
    if (isCompleted) {
      // Reset dan mulai ulang
      setElapsedTime(0);
      setGasVolume(0);
      setIsCompleted(false);
      setIsSimRunning(true);
    } else {
      setIsSimRunning(!isSimRunning);
    }
  };

  // Handler Reset Lab
  const handleResetLab = () => {
    setIsSimRunning(false);
    setElapsedTime(0);
    setGasVolume(0);
    setIsCompleted(false);
  };

  // Handler Simpan Data ke Tabel
  const handleSaveToLog = () => {
    const newLog = {
      id: experimentLogs.length + 1,
      name: `Percobaan ${experimentLogs.length + 1}`,
      hcl: `${hclConcentration} M`,
      temp: `${temperatureCelsius} °C`,
      form: solidForm === 'powder' ? 'Serbuk Halus' : 'Bongkahan',
      catalyst: hasCatalyst ? 'Ya (+Katalis)' : 'Tidak',
      time: `${elapsedTime.toFixed(1)} s`,
      rate: `${(gasVolume / Math.max(0.1, elapsedTime)).toFixed(2)} mL/s`
    };
    setExperimentLogs([...experimentLogs, newLog]);
  };

  const activeSection =
    chapter.learningSections?.find((sec) => sec.id === activeSectionId) ||
    chapter.learningSections?.[0];

  return (
    <section className="lab-worksheet-section" id="modul-3-belajar">
      {/* Header Lembar Kerja Laboratorium */}
      <div className="worksheet-header">
        <div className="worksheet-tag">
          🧪 Lembar Belajar Praktikum Virtual Kimia SMA • Modul 3
        </div>
        <div className="worksheet-title-row">
          <div>
            <h2 className="worksheet-title">{chapter.title}</h2>
            <p className="worksheet-subtitle">
              Penyelidikan Terarah Variabel Reaksi: Menguji Pengaruh Konsentrasi, Suhu, Luas Permukaan Bidang Sentuh, dan Katalisator terhadap Laju Reaksi Kimia.
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              title="Tutup Lembar Bab 3"
            >
              ✕ Tutup Lembar
            </button>
          )}
        </div>
      </div>

      {/* Navigasi Tab Bagian Belajar Bab 3 */}
      <div className="learning-sections-nav" role="tablist" aria-label="Bagian Belajar Bab 3">
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
                <span className="point-icon">⚗️</span>
                <span className="point-text">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* LABORATORIUM VIRTUAL INTERAKTIF: UJI 4 VARIABEL LAJU          */}
      {/* ============================================================ */}
      <div className="virtual-lab-card" id="virtual-lab-workspace">
        <div className="section-header">
          <div className="section-eyebrow">Laboratorium Virtual Interaktif</div>
          <h3 className="section-title">Investigasi Variabel Laju: Reaksi Kalsium Karbonat &amp; Asam Klorida</h3>
          <p className="section-desc">
            Model Reaksi: <ChemicalFormula formula="CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)" />.
            Tampung 50 mL gas CO₂ pada tabung pengukur dan amati faktor mana yang mempercepat laju pembentukan gas.
          </p>
        </div>

        <div className="virtual-lab-grid">
          {/* Kolom Visualisasi Tabung Reaksi & Gas Collector */}
          <div className="apparatus-panel">
            <div className="apparatus-display">
              {/* Tabung Reaksi Labu */}
              <div className="flask-container">
                <div className="flask-neck"></div>
                <div className="flask-body">
                  {/* Larutan HCl */}
                  <div
                    className="liquid-layer"
                    style={{
                      height: '65%',
                      backgroundColor: hasCatalyst ? 'rgba(56, 189, 248, 0.35)' : 'rgba(224, 242, 254, 0.45)'
                    }}
                  >
                    {/* Partikel Padatan CaCO3 di Dasar */}
                    <div className="solid-sediment">
                      {solidForm === 'powder' ? (
                        <span className="powder-cloud" title="Serbuk CaCO3">░░░░░░░░</span>
                      ) : (
                        <div className="chunks-group" title="Bongkahan CaCO3">
                          <span className="chunk">▲</span>
                          <span className="chunk">◆</span>
                          <span className="chunk">■</span>
                        </div>
                      )}
                    </div>

                    {/* Animasi Gelembung Gas jika Reaksi Berjalan */}
                    {isSimRunning && (
                      <div className="bubbles-stream">
                        <span className="bubble b1">⚪</span>
                        <span className="bubble b2">⚪</span>
                        <span className="bubble b3">⚪</span>
                        <span className="bubble b4">⚪</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="flask-label">Labu Reaksi (CaCO₃ + HCl)</span>
              </div>

              {/* Pipa Penghubung Gas */}
              <div className="connecting-tube">
                <span className="tube-line"></span>
                <span className="tube-flow-arrow">{isSimRunning ? '💨 ➔' : '—'}</span>
              </div>

              {/* Syringe / Gelas Ukur Penampung Gas CO2 */}
              <div className="gas-syringe">
                <div className="syringe-barrel">
                  <div
                    className="syringe-plunger"
                    style={{ width: `${Math.min(100, (gasVolume / targetVolume) * 100)}%` }}
                  >
                    <span className="plunger-label">{gasVolume.toFixed(1)} mL CO₂</span>
                  </div>
                </div>
                <div className="syringe-scale">
                  <span>0 mL</span>
                  <span>25 mL</span>
                  <span>50 mL</span>
                </div>
                <span className="syringe-title">Penampung Gas CO₂</span>
              </div>
            </div>

            {/* Stopwatch & Status */}
            <div className="stopwatch-banner">
              <div className="stopwatch-item">
                <span className="stopwatch-label">⏱️ Waktu Reaksi:</span>
                <span className="stopwatch-digits">{elapsedTime.toFixed(1)} s</span>
              </div>
              <div className="stopwatch-item">
                <span className="stopwatch-label">💨 Volume Gas:</span>
                <span className="stopwatch-digits highlight">{gasVolume.toFixed(1)} / 50 mL</span>
              </div>
              <div className="stopwatch-item">
                <span className="stopwatch-label">📊 Laju Rata-Rata:</span>
                <span className="stopwatch-digits">
                  {(gasVolume / Math.max(0.1, elapsedTime)).toFixed(2)} mL/s
                </span>
              </div>
            </div>

            {isCompleted && (
              <div className="experiment-complete-alert animate-fade-in">
                🎉 <strong>Reaksi Selesai!</strong> 50 mL gas CO₂ berhasil terkumpul dalam waktu <strong>{elapsedTime.toFixed(1)} detik</strong>. Jangan lupa simpan hasil ini ke tabel perbandingan di bawah.
              </div>
            )}
          </div>

          {/* Kolom Kontrol Variabel Manipulasi */}
          <div className="lab-controls-panel">
            <h4 className="controls-panel-title">🎛️ Pengaturan Variabel Eksperimen</h4>

            {/* 1. Konsentrasi HCl */}
            <div className="variable-control-item">
              <label className="variable-label">
                <span>1. Konsentrasi Larutan Asam (HCl)</span>
                <strong className="variable-tag">{hclConcentration} M</strong>
              </label>
              <div className="btn-options-group">
                {[0.5, 1.0, 2.0].map((conc) => (
                  <button
                    key={conc}
                    type="button"
                    className={`btn-opt ${hclConcentration === conc ? 'active' : ''}`}
                    onClick={() => {
                      setHclConcentration(conc);
                      handleResetLab();
                    }}
                  >
                    {conc} M
                  </button>
                ))}
              </div>
              <span className="variable-help">Konsentrasi tinggi memperbanyak partikel H⁺ per liter.</span>
            </div>

            {/* 2. Suhu Larutan */}
            <div className="variable-control-item">
              <label className="variable-label">
                <span>2. Suhu Larutan</span>
                <strong className="variable-tag">{temperatureCelsius} °C</strong>
              </label>
              <div className="btn-options-group">
                {[25, 40, 60].map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    className={`btn-opt ${temperatureCelsius === temp ? 'active' : ''}`}
                    onClick={() => {
                      setTemperatureCelsius(temp);
                      handleResetLab();
                    }}
                  >
                    {temp} °C
                  </button>
                ))}
              </div>
              <span className="variable-help">Suhu tinggi memperbesar fraksi partikel dengan E ≥ Ea.</span>
            </div>

            {/* 3. Bentuk Padatan CaCO3 */}
            <div className="variable-control-item">
              <label className="variable-label">
                <span>3. Luas Permukaan Kalsium Karbonat</span>
                <strong className="variable-tag">{solidForm === 'powder' ? 'Serbuk Halus' : 'Bongkahan'}</strong>
              </label>
              <div className="btn-options-group">
                <button
                  type="button"
                  className={`btn-opt ${solidForm === 'chunks' ? 'active' : ''}`}
                  onClick={() => {
                    setSolidForm('chunks');
                    handleResetLab();
                  }}
                >
                  Bongkahan (Kepingan)
                </button>
                <button
                  type="button"
                  className={`btn-opt ${solidForm === 'powder' ? 'active' : ''}`}
                  onClick={() => {
                    setSolidForm('powder');
                    handleResetLab();
                  }}
                >
                  Serbuk Halus
                </button>
              </div>
              <span className="variable-help">Serbuk memperluas bidang kontak partikel dengan asam.</span>
            </div>

            {/* 4. Katalisator */}
            <div className="variable-control-item">
              <label className="variable-label">
                <span>4. Penambahan Katalisator</span>
                <strong className="variable-tag">{hasCatalyst ? 'Ada Katalis' : 'Tanpa Katalis'}</strong>
              </label>
              <div className="btn-options-group">
                <button
                  type="button"
                  className={`btn-opt ${!hasCatalyst ? 'active' : ''}`}
                  onClick={() => {
                    setHasCatalyst(false);
                    handleResetLab();
                  }}
                >
                  Tanpa Katalis
                </button>
                <button
                  type="button"
                  className={`btn-opt ${hasCatalyst ? 'active' : ''}`}
                  onClick={() => {
                    setHasCatalyst(true);
                    handleResetLab();
                  }}
                >
                  + Tambah Katalis
                </button>
              </div>
              <span className="variable-help">Katalis menurunkan rintangan Ea melalui jalur alternatif.</span>
            </div>

            {/* Tombol Eksekusi Praktikum */}
            <div className="lab-action-buttons">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-full-width"
                onClick={handleToggleRun}
              >
                {isSimRunning ? '⏸️ Jeda Reaksi' : isCompleted ? '🔄 Ulangi Percobaan' : '▶️ Mulai Reaksi'}
              </button>
              <div className="sub-buttons-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleResetLab}
                  disabled={elapsedTime === 0}
                >
                  Reset Stopwatch
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-save"
                  onClick={handleSaveToLog}
                  disabled={elapsedTime === 0}
                >
                  📥 Simpan Data Percobaan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Data Hasil Eksperimen Siswa */}
        <div className="experiment-comparison-table-section">
          <h4 className="table-section-title">📋 Tabel Perbandingan Data Hasil Percobaan Siswa</h4>
          <div className="table-responsive-wrapper">
            <table className="lab-table" aria-label="Tabel Hasil Uji Faktor Laju Reaksi">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Skenario</th>
                  <th>[HCl]</th>
                  <th>Suhu</th>
                  <th>Bentuk Padatan</th>
                  <th>Katalis</th>
                  <th>Waktu Reaksi (s)</th>
                  <th>Laju Rata-Rata</th>
                </tr>
              </thead>
              <tbody>
                {experimentLogs.map((log) => (
                  <tr key={log.id}>
                    <td><strong>{log.id}</strong></td>
                    <td>{log.name}</td>
                    <td>{log.hcl}</td>
                    <td>{log.temp}</td>
                    <td>{log.form}</td>
                    <td>{log.catalyst}</td>
                    <td><strong>{log.time}</strong></td>
                    <td className="product-val">{log.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-note-academic">
            ℹ️ <strong>Catatan Akademik Ilmiah:</strong> Data di atas merupakan <em>Data Simulasi Laboratorium Kimia SMA</em> berdasarkan hukum kinetika laju empiris untuk tujuan perbandingan hipotesis.
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PERTANYAAN REFLEKSI VARIABEL KONTROL BAB 3                   */}
      {/* ============================================================ */}
      <div className="diagnostic-question-box">
        <div className="diagnostic-badge">❓ Uji Penalaran Variabel Kontrol Bab 3</div>
        <h4 className="diagnostic-title">
          Pertanyaan Metode Ilmiah: Menyelidiki Pengaruh Konsentrasi
        </h4>
        <p className="diagnostic-prompt">
          <em>&quot;Jika seorang siswa ingin menyelidiki secara tepat pengaruh konsentrasi larutan HCl terhadap laju reaksi dengan CaCO₃, langkah metodologis mana yang wajib dipenuhi?&quot;</em>
        </p>

        <div className="diagnostic-options">
          {[
            {
              id: 'q3-opt-a',
              text: 'Mengubah konsentrasi HCl (misal 0.5 M dan 2.0 M) sambil menjaga suhu larutan, massa CaCO₃, dan luas permukaan CaCO₃ tetap sama.',
              isCorrect: true,
              feedback: 'Tepat sekali! Dalam metode ilmiah, untuk menguji satu variabel bebas (konsentrasi), variabel lainnya (suhu, bentuk padatan, volume total) harus dijadikan variabel kontrol (dijaga tetap).'
            },
            {
              id: 'q3-opt-b',
              text: 'Mengubah konsentrasi HCl sekaligus memanaskan larutan agar reaksi selesai dalam waktu beberapa detik saja.',
              isCorrect: false,
              feedback: 'Keliru. Jika suhu ikut dinaikkan, kita tidak dapat mengetahui apakah percepatan laju disebabkan oleh konsentrasi yang lebih tinggi atau oleh suhu yang meningkat.'
            },
            {
              id: 'q3-opt-c',
              text: 'Mengganti larutan asam dengan jenis asam lain pada setiap tabung reaksi.',
              isCorrect: false,
              feedback: 'Kurang tepat. Mengganti jenis zat akan mengubah sifat alami reaktan dan mekanisme reaksinya.'
            }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`diagnostic-opt-btn ${selectedQuizOpt?.id === opt.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedQuizOpt(opt);
                setShowQuizFeedback(true);
              }}
            >
              <span className="opt-indicator">{selectedQuizOpt?.id === opt.id ? '🔘' : '⚪'}</span>
              <span className="opt-text">{opt.text}</span>
            </button>
          ))}
        </div>

        {showQuizFeedback && selectedQuizOpt && (
          <div className={`diagnostic-feedback-banner ${selectedQuizOpt.isCorrect ? 'correct' : 'incorrect'}`}>
            <strong>{selectedQuizOpt.isCorrect ? '✅ Kesimpulan Tepat!' : '⚠️ Periksa Kembali:'}</strong>{' '}
            {selectedQuizOpt.feedback}
          </div>
        )}
      </div>

      {/* Navigasi Footer Bab 3 */}
      <div className="module-footer-nav">
        <div className="footer-nav-text">
          <strong>Bab 3 Tuntas Dipelajari!</strong>
          <p>Lanjutkan ke <strong>Bab 4 (Analisis Data &amp; Diagram Energi)</strong> atau uji pemahaman di Kuis 10 Soal.</p>
        </div>
        {onNavigateToQuiz && (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={onNavigateToQuiz}
          >
            Uji Pemahaman di Kuis 10 Soal ➔
          </button>
        )}
      </div>
    </section>
  );
}
