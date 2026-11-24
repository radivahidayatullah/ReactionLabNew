import React, { useState, useEffect, useRef } from 'react';
import ChemicalFormula from '../../components/chemistry/ChemicalFormula';

/**
 * Komponen ModuleTwoDetail (Bab 2: Teori Tumbukan & Simulator Partikel)
 *
 * Dioptimalkan secara lengkap sesuai PRD Bab 5.2 & AGENT.md:
 * - 4 Bagian Belajar:
 *   2.1 Gerak dan Tumbukan Partikel
 *   2.2 Tumbukan Efektif vs Tidak Efektif
 *   2.3 Energi Aktivasi (Ea) & Orientasi Ruang Tepat
 *   2.4 Kompleks Teraktivasi & Diagram Transisi
 * - Alur Penyelidikan Ilmiah Terarah (Predict -> Simulate -> Observe -> Conclude)
 * - Simulator Teori Tumbukan Interaktif HTML5 Canvas dengan kontrol suhu & konsentrasi
 * - Visualisasi Skematis Orientasi Tumbukan Partikel
 * - Uji Pemahaman Cepat Bab 2 & Navigasi ke Kuis 10 Soal
 *
 * Catatan untuk Pemula React:
 * - `useRef` digunakan untuk memegang elemen `<canvas>` dan data partikel tanpa memicu re-render berlebih.
 * - `requestAnimationFrame` menghasilkan animasi partikel 60fps yang mulus.
 * - `useEffect` mengelola siklus hidup animasi (memulai loop saat aktif dan membersihkan saat komponen ditutup).
 */
export default function ModuleTwoDetail({ chapter, onClose, onNavigateToQuiz }) {
  // Tab materi aktif (2.1 s.d. 2.4)
  const [activeSectionId, setActiveSectionId] = useState(
    chapter.learningSections ? chapter.learningSections[0].id : 'sec-2-1'
  );

  // Tahap Guided Inquiry: Prediksi siswa sebelum menjalankan simulasi
  const [prediction, setPrediction] = useState(null);
  const [showPredictionFeedback, setShowPredictionFeedback] = useState(false);

  // Parameter simulator partikel
  const [temperature, setTemperature] = useState(300); // Suhu dalam Kelvin (250K - 450K)
  const [concentration, setConcentration] = useState(24); // Jumlah partikel reaktan (12 - 40)
  const [isSimRunning, setIsSimRunning] = useState(true);
  const [metrics, setMetrics] = useState({ totalCollisions: 0, effectiveCollisions: 0 });

  // Mini Kuis Refleksi Bab 2
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(false);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameId = useRef(null);

  // Inisialisasi partikel saat konsentrasi atau suhu diubah
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const baseSpeed = (temperature / 300) * 1.6;

    const newParticles = [];
    for (let i = 0; i < concentration; i++) {
      const type = i % 2 === 0 ? 'A' : 'B'; // Partikel A (Cyan) atau B (Amber)
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.7 + Math.random() * 0.6) * baseSpeed;

      newParticles.push({
        x: 25 + Math.random() * (width - 50),
        y: 25 + Math.random() * (height - 50),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 7,
        type: type,
        state: 'reactant', // 'reactant' atau 'product' (setelah tumbukan efektif)
        orientationAngle: Math.random() * 360 // orientasi ruang partikel
      });
    }

    particlesRef.current = newParticles;
    setMetrics({ totalCollisions: 0, effectiveCollisions: 0 });
  }, [concentration, temperature]);

  // Loop animasi Canvas dan deteksi tumbukan fisika sederhana
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let totalCol = 0;
    let effCol = 0;

    const loop = () => {
      if (isSimRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Latar kisi laboratorium halus (subtle grid)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        const particles = particlesRef.current;

        // Pembaruan posisi partikel & pantulan dinding wadah tertutup
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x - p.radius < 0) {
            p.x = p.radius;
            p.vx = -p.vx;
          } else if (p.x + p.radius > canvas.width) {
            p.x = canvas.width - p.radius;
            p.vx = -p.vx;
          }

          if (p.y - p.radius < 0) {
            p.y = p.radius;
            p.vy = -p.vy;
          } else if (p.y + p.radius > canvas.height) {
            p.y = canvas.height - p.radius;
            p.vy = -p.vy;
          }
        }

        // Deteksi Tumbukan Antar-Partikel
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy);

            if (dist < p1.radius + p2.radius) {
              totalCol++;

              // Arah pantulan lenting
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Kecepatan relatif sebagai representasi energi kinetik
              const relSpeed = Math.hypot(p1.vx - p2.vx, p1.vy - p2.vy);

              // Syarat Tumbukan Efektif Ilmiah:
              // 1. Partikel lawan jenis (A bertumbukan dengan B)
              // 2. Energi kinetik melampaui ambang Energi Aktivasi (Ea)
              // 3. Orientasi tumbukan tepat (disederhanakan dalam model simulasi)
              const activationEnergyThreshold = 3.1 - (temperature - 300) * 0.006;
              const hasProperOrientation = Math.abs(p1.orientationAngle - p2.orientationAngle) > 60;

              if (
                p1.type !== p2.type &&
                p1.state === 'reactant' &&
                p2.state === 'reactant' &&
                relSpeed > activationEnergyThreshold &&
                hasProperOrientation
              ) {
                effCol++;
                p1.state = 'product';
                p2.state = 'product';

                // Efek kilau reaksi sesaat
                ctx.beginPath();
                ctx.arc((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, 16, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
                ctx.fill();
              }

              // Pemisahan partikel agar tidak saling menempel
              const overlap = (p1.radius + p2.radius - dist) / 2;
              p1.x -= overlap * cos;
              p1.y -= overlap * sin;
              p2.x += overlap * cos;
              p2.y += overlap * sin;

              // Pertukaran vektor kecepatan
              const tempVx = p1.vx;
              const tempVy = p1.vy;
              p1.vx = p2.vx;
              p1.vy = p2.vy;
              p2.vx = tempVx;
              p2.vy = tempVy;
            }
          }
        }

        // Penggambaran Partikel di Kanvas
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.state === 'product') {
            ctx.fillStyle = '#10b981'; // Hijau Emerald: Molekul Produk AB
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 8;
          } else if (p.type === 'A') {
            ctx.fillStyle = '#06b6d4'; // Cyan: Reaktan A
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = '#f59e0b'; // Amber: Reaktan B
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 4;
          }

          ctx.fill();
          ctx.shadowBlur = 0; // reset bayangan
        });

        setMetrics({ totalCollisions: totalCol, effectiveCollisions: effCol });
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [isSimRunning, temperature]);

  const activeSection =
    chapter.learningSections?.find((sec) => sec.id === activeSectionId) ||
    chapter.learningSections?.[0];

  const collisionEfficiency =
    metrics.totalCollisions > 0
      ? ((metrics.effectiveCollisions / metrics.totalCollisions) * 100).toFixed(1)
      : '0.0';

  return (
    <section className="lab-worksheet-section" id="modul-2-belajar">
      {/* Header Lembar Kerja Laboratorium */}
      <div className="worksheet-header">
        <div className="worksheet-tag">
          💥 Lembar Belajar Praktikum Virtual Kimia SMA • Modul 2
        </div>
        <div className="worksheet-title-row">
          <div>
            <h2 className="worksheet-title">{chapter.title}</h2>
            <p className="worksheet-subtitle">
              Penyelidikan Tingkat Submikroskopis: Mengapa Tidak Semua Tumbukan Menghasilkan Reaksi, Peran Energi Aktivasi (Ea), dan Pengaruh Orientasi Ruang Partikel.
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              title="Tutup Lembar Bab 2"
            >
              ✕ Tutup Lembar
            </button>
          )}
        </div>
      </div>

      {/* Navigasi Tab Bagian Belajar Bab 2 */}
      <div className="learning-sections-nav" role="tablist" aria-label="Bagian Belajar Bab 2">
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
                <span className="point-icon">🔬</span>
                <span className="point-text">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. GUIDED INQUIRY: TAHAP PREDIKSI SEBELUM SIMULASI           */}
      {/* ============================================================ */}
      <div className="inquiry-prediction-box">
        <div className="inquiry-badge">🤔 Tahap 1: Prediksi Ilmiah Siswa</div>
        <h4 className="inquiry-title">Apa Pengaruh Kenaikan Suhu terhadap Efektivitas Tumbukan?</h4>
        <p className="inquiry-prompt">
          Sebelum menjalankan simulator di bawah ini, buatlah prediksi: <em>&quot;Jika suhu dinaikkan dari 300 K ke 420 K, apakah persentase tumbukan yang menghasilkan produk (tumbukan efektif) akan bertambah, berkurang, atau tetap sama? Mengapa?&quot;</em>
        </p>

        <div className="prediction-options-list">
          {[
            {
              id: 'pred-1',
              text: 'Persentase tumbukan efektif bertambah, karena fraksi partikel dengan energi kinetik melampaui Ea meningkat pesat.',
              isBest: true,
              explanation: 'Prediksi Anda sangat tepat! Kenaikan suhu tidak hanya mempercepat gerak partikel, tetapi meningkatkan proporsi molekul yang energinya mampu melompati bukit rintangan Energi Aktivasi.'
            },
            {
              id: 'pred-2',
              text: 'Hanya total tumbukan yang bertambah, tetapi efektivitas tumbukan tidak berubah.',
              isBest: false,
              explanation: 'Kurang tepat. Menambah konsentrasi memang hanya menambah frekuensi tumbukan, namun kenaikan suhu secara spesifik meningkatkan fraksi energi partikel sehingga rasio efektivitas tumbukan juga melonjak.'
            },
            {
              id: 'pred-3',
              text: 'Tumbukan efektif berkurang karena partikel bergerak terlalu cepat untuk saling berinteraksi.',
              isBest: false,
              explanation: 'Miskonsepsi umum. Kecepatan partikel yang tinggi justru memperbesar energi saat bertumbukan sehingga ikatan lama lebih mudah terputus.'
            }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`prediction-btn ${prediction?.id === item.id ? 'selected' : ''}`}
              onClick={() => {
                setPrediction(item);
                setShowPredictionFeedback(true);
              }}
            >
              <span className="pred-bullet">{prediction?.id === item.id ? '🔘' : '⚪'}</span>
              <span className="pred-text">{item.text}</span>
            </button>
          ))}
        </div>

        {showPredictionFeedback && prediction && (
          <div className={`prediction-feedback ${prediction.isBest ? 'feedback-success' : 'feedback-caution'}`}>
            <strong>{prediction.isBest ? '✅ Hipotesis Tepat:' : '💡 Catatan Guru:'}</strong> {prediction.explanation}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 2. SIMULATOR TEORI TUMBUKAN PARTIKEL 2D (PRD 5.2)            */}
      {/* ============================================================ */}
      <div className="simulation-card" id="simulator-canvas-block">
        <div className="section-header">
          <div className="section-eyebrow">Tahap 2 &amp; 3: Eksperimen &amp; Pengamatan</div>
          <h3 className="section-title">Simulator Teori Tumbukan Interaktif (Model 2D)</h3>
          <p className="section-desc">
            Amati pergerakan partikel reaktan (<span style={{ color: '#06b6d4', fontWeight: 'bold' }}>A: Cyan</span> dan <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>B: Amber</span>). Tumbukan hanya menghasilkan produk (<span style={{ color: '#10b981', fontWeight: 'bold' }}>AB: Hijau</span>) jika energi dan sudut orientasi memenuhi syarat.
          </p>
        </div>

        <div className="simulation-layout">
          {/* Kolom Kanvas Animasi */}
          <div className="canvas-wrapper">
            <canvas
              ref={canvasRef}
              width={600}
              height={320}
              className="sim-canvas-viewport"
              aria-label="Area Simulasi Tumbukan Partikel Kimia"
            />
            <div className="sim-legend-banner">
              <span className="sim-legend-item">
                <span className="color-dot cyan"></span> Reaktan A
              </span>
              <span className="sim-legend-item">
                <span className="color-dot amber"></span> Reaktan B
              </span>
              <span className="sim-legend-item">
                <span className="color-dot emerald"></span> Produk AB (Tumbukan Efektif)
              </span>
            </div>
            <div className="sim-academic-note">
              ℹ️ <strong>Data Simulasi:</strong> Model partikel kinetika 2D disederhanakan untuk kebutuhan pemahaman konseptual (bukan lintasan molekuler atomik riil).
            </div>
          </div>

          {/* Kolom Kontrol Variabel Reaksi */}
          <div className="sim-controls-panel">
            <h4 className="controls-panel-title">🎛️ Manipulasi Variabel Reaksi</h4>

            {/* Kontrol Suhu */}
            <div className="control-group">
              <div className="control-label">
                <span>Suhu Sistem (T)</span>
                <span className="control-val">{temperature} K</span>
              </div>
              <input
                type="range"
                min="250"
                max="450"
                step="5"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="slider-input"
              />
              <span className="control-hint">Menaikkan T meningkatkan kecepatan partikel &amp; fraksi energi \(\ge E_a\).</span>
            </div>

            {/* Kontrol Kerapatan / Konsentrasi */}
            <div className="control-group">
              <div className="control-label">
                <span>Kerapatan Partikel (Konsentrasi)</span>
                <span className="control-val">{concentration} partikel</span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                step="2"
                value={concentration}
                onChange={(e) => setConcentration(Number(e.target.value))}
                className="slider-input"
              />
              <span className="control-hint">Meningkatkan kerapatan memperbanyak frekuensi tumbukan per detik.</span>
            </div>

            {/* Panel Metrik Tumbukan Real-Time */}
            <div className="metrics-scoreboard">
              <div className="metric-cell">
                <span className="metric-title">Total Tumbukan</span>
                <span className="metric-data">{metrics.totalCollisions}</span>
              </div>
              <div className="metric-cell metric-cell--highlight">
                <span className="metric-title">Tumbukan Efektif</span>
                <span className="metric-data">{metrics.effectiveCollisions}</span>
              </div>
              <div className="metric-cell metric-cell--full">
                <span className="metric-title">Rasio Efisiensi Tumbukan:</span>
                <span className="metric-percentage">{collisionEfficiency}%</span>
              </div>
            </div>

            {/* Tombol Interaksi Simulator */}
            <div className="sim-actions-grid">
              <button
                type="button"
                className="btn btn-secondary btn-sim"
                onClick={() => setIsSimRunning(!isSimRunning)}
              >
                {isSimRunning ? '⏸️ Jeda Simulasi' : '▶️ Lanjutkan'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sim"
                onClick={() => {
                  setConcentration((c) => (c === 24 ? 26 : 24)); // Picu reset partikel
                }}
              >
                🔄 Ulangi Eksperimen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. VISUALISASI SKEMATIS: ORIENTASI TUMBUKAN & ENERGI         */}
      {/* ============================================================ */}
      <div className="collision-theory-visual-card">
        <div className="section-header">
          <div className="section-eyebrow">Visualisasi Konseptual</div>
          <h3 className="section-title">Perbandingan Dua Syarat Tumbukan Efektif</h3>
          <p className="section-desc">
            Model reaksi: <ChemicalFormula formula="A-A + B-B -> 2A-B" />. Dua molekul tidak akan bereaksi jika menabrak pada sudut yang salah atau energi kinetiknya tidak cukup untuk memutus ikatan awal.
          </p>
        </div>

        <div className="orientation-comparison-grid">
          {/* Kasus 1: Tumbukan Tidak Efektif */}
          <div className="orientation-card failure-card">
            <div className="orientation-card-header">
              <span className="status-indicator-badge red">❌ Tumbukan Tidak Efektif</span>
              <span className="sub-tag">Orientasi Salah / Energi Rendah</span>
            </div>
            <div className="schematic-drawing">
              <div className="molecule-group">
                <div className="atom-pair">
                  <span className="atom atom-a">A</span>
                  <span className="bond">-</span>
                  <span className="atom atom-a">A</span>
                </div>
                <span className="collide-arrow">➔ ⚡ ⬅</span>
                <div className="atom-pair vertical">
                  <span className="atom atom-b">B</span>
                  <span className="bond">|</span>
                  <span className="atom atom-b">B</span>
                </div>
              </div>
            </div>
            <div className="schematic-result">
              <strong>Hasil:</strong> Partikel hanya terpental kembali sebagai pereaksi asal. Ikatan lama gagal diputus, molekul produk <ChemicalFormula formula="A-B" /> <em>tidak terbentuk</em>.
            </div>
          </div>

          {/* Kasus 2: Tumbukan Efektif */}
          <div className="orientation-card success-card">
            <div className="orientation-card-header">
              <span className="status-indicator-badge green">✅ Tumbukan Efektif</span>
              <span className="sub-tag">Orientasi Sejajar &amp; Energi \(\ge E_a\)</span>
            </div>
            <div className="schematic-drawing">
              <div className="molecule-group">
                <div className="atom-pair">
                  <span className="atom atom-a">A</span>
                  <span className="bond">-</span>
                  <span className="atom atom-a">A</span>
                </div>
                <span className="collide-arrow green">➔ 💥 ⬅</span>
                <div className="atom-pair">
                  <span className="atom atom-b">B</span>
                  <span className="bond">-</span>
                  <span className="atom atom-b">B</span>
                </div>
              </div>
              <div className="trans-arrow">⬇ (Kompleks Teraktivasi)</div>
              <div className="products-formed">
                <span className="atom atom-product">A-B</span>
                <span style={{ margin: '0 0.5rem', fontWeight: 'bold' }}>+</span>
                <span className="atom atom-product">A-B</span>
              </div>
            </div>
            <div className="schematic-result">
              <strong>Hasil:</strong> Terbentuk kompleks teraktivasi berenergi tinggi sesaat, ikatan lama terputus, dan terbentuk 2 molekul produk baru <ChemicalFormula formula="A-B" />.
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. REFLEKSI & UJI PEMAHAMAN CEPAT BAB 2                      */}
      {/* ============================================================ */}
      <div className="diagnostic-question-box">
        <div className="diagnostic-badge">❓ Uji Penalaran Reflektif Bab 2</div>
        <h4 className="diagnostic-title">
          Pertanyaan Analisis: Mengapa Makanan Membusuk Lebih Lambat di Dalam Kulkas?
        </h4>
        <p className="diagnostic-prompt">
          <em>&quot;Berdasarkan teori tumbukan, jelaskan mengapa menurunkan suhu makanan di dalam lemari es (kulkas) dapat memperlambat proses pembusukan bahan makanan secara signifikan?&quot;</em>
        </p>

        <div className="diagnostic-options">
          {[
            {
              id: 'q2-opt-a',
              text: 'Suhu rendah membekukan energi aktivasi pembusukan sehingga nilainya menjadi nol.',
              isCorrect: false,
              feedback: 'Keliru. Energi aktivasi (Ea) adalah karakteristik rintangan reaksi dan tidak berubah hanya karena suhu diturunkan.'
            },
            {
              id: 'q2-opt-b',
              text: 'Suhu rendah menurunkan energi kinetik rata-rata molekul sehingga hanya sedikit fraksi molekul yang energinya mampu melampaui Ea, menurunkan frekuensi tumbukan efektif pembusukan.',
              isCorrect: true,
              feedback: 'Tepat sekali! Pada suhu rendah, sebagian besar partikel tidak memiliki energi kinetik yang cukup (E < Ea) untuk bertumbukan efektif, sehingga laju reaksi pembusukan menurun tajam.'
            },
            {
              id: 'q2-opt-c',
              text: 'Suhu dingin mengubah sifat kimia reaktan menjadi zat yang sama sekali tidak dapat bereaksi.',
              isCorrect: false,
              feedback: 'Kurang tepat. Reaksi pembusukan tetap dapat terjadi, hanya saja lajunya menjadi jauh lebih lambat karena tumbukan efektif jarang terjadi.'
            }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`diagnostic-opt-btn ${quizAnswer?.id === opt.id ? 'selected' : ''}`}
              onClick={() => {
                setQuizAnswer(opt);
                setQuizFeedback(true);
              }}
            >
              <span className="opt-indicator">{quizAnswer?.id === opt.id ? '🔘' : '⚪'}</span>
              <span className="opt-text">{opt.text}</span>
            </button>
          ))}
        </div>

        {quizFeedback && quizAnswer && (
          <div className={`diagnostic-feedback-banner ${quizAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
            <strong>{quizAnswer.isCorrect ? '✅ Kesimpulan Ilmiah Tepat!' : '⚠️ Periksa Kembali Konsep:'}</strong>{' '}
            {quizAnswer.feedback}
          </div>
        )}
      </div>

      {/* Navigasi Footer Bab 2 */}
      <div className="module-footer-nav">
        <div className="footer-nav-text">
          <strong>Bab 2 Tuntas Dipelajari!</strong>
          <p>Anda telah memahami pergerakan partikel dan syarat tumbukan efektif. Lanjutkan untuk menguji penguasaan materi pada Kuis Interaktif 10 Soal.</p>
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

