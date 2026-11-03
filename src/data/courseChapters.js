/**
 * Data Struktur Bab Kurikulum ReactionLab 11
 * Dirancang untuk alur belajar terstruktur Kimia SMA Kelas XI.
 * Saat ini Bab 1 berstatus aktif ("Tersedia"), sedangkan Bab 2–5 diberi keterangan "Belum Tersedia".
 */

export const COURSE_CHAPTERS = [
  {
    id: 'ch1',
    number: 1,
    title: 'Mengenal Laju Reaksi & Konsep Mol',
    subtitle: 'Konsep dasar, laju pengurangan reaktan & pembentukan produk, serta kaitan molaritas (mol/L) terhadap waktu.',
    icon: '⏱️',
    isAvailable: true,
    duration: '25 Menit',
    availabilityNotice: null,
    topics: [
      '1.1 Pengertian Laju Reaksi & Hakikat Kinetika Kimia',
      '1.2 Hubungan Molaritas (M = mol/V) terhadap Satuan Waktu (detik)',
      '1.3 Perbandingan Koefisien Reaksi & Perubahan Mol Zat',
      '1.4 Indikator Makroskopis Pengamatan Laju di Laboratorium'
    ],
    // Rincian materi bagian belajar untuk lembar belajar laboratorium
    learningSections: [
      {
        id: 'sec-1-1',
        sectionNumber: '1.1',
        title: 'Pengertian Laju Reaksi & Kinetika Kimia',
        conceptSummary: 'Laju reaksi menyatakan seberapa cepat reaktan berubah menjadi produk dalam reaksi kimia. Dalam kehidupan sehari-hari, ada reaksi yang sangat cepat (ledakan kembang api) dan reaksi yang lambat (perkaratan besi).',
        points: [
          'Kinetika kimia adalah cabang ilmu kimia yang mempelajari laju reaksi dan mekanisme terjadinya reaksi.',
          'Laju reaksi diukur dari besarnya perubahan jumlah zat (reaktan berkurang atau produk bertambah) dalam rentang waktu tertentu.',
          'Reaksi kimia berlangsung karena adanya interaksi antarpartikel pereaksi seiring berjalannya waktu.'
        ]
      },
      {
        id: 'sec-1-2',
        sectionNumber: '1.2',
        title: 'Molaritas (M = mol/Volume) & Satuan Laju Reaksi',
        conceptSummary: 'Dalam larutan, jumlah partikel yang bereaksi dinyatakan dalam konsentrasi molar (Molaritas, M), yaitu jumlah mol zat terlarut per liter larutan.',
        points: [
          'Rumus Molaritas: [M] = n (mol) / V (Liter).',
          'Laju Reaksi (r) = perubahan konsentrasi per selang waktu: r = -Δ[Reaktan]/Δt = +Δ[Produk]/Δt.',
          'Satuan internasional laju reaksi: M/detik (M·s⁻¹) atau mol·L⁻¹·s⁻¹.',
          'Tanda negatif (-) menunjukkan berkurangnya konsentrasi reaktan, tanda positif (+) menunjukkan bertambahnya produk.'
        ]
      },
      {
        id: 'sec-1-3',
        sectionNumber: '1.3',
        title: 'Kaitan Konsep Mol, Koefisien, & Stoikiometri Laju',
        conceptSummary: 'Perbandingan laju berkurangnya reaktan dan bertambahnya produk sebanding dengan koefisien reaksi masing-masing zat.',
        points: [
          'Untuk reaksi: aA + bB → cC + dD, berlaku perbandingan: r = -(1/a)·(Δ[A]/Δt) = -(1/b)·(Δ[B]/Δt) = +(1/c)·(Δ[C]/Δt) = +(1/d)·(Δ[D]/Δt).',
          'Contoh: Pada reaksi N₂ + 3H₂ → 2NH₃, jika gas H₂ berkurang 3 mol/L per detik, maka gas NH₃ terbentuk dengan laju 2 mol/L per detik.',
          'Stoikiometri reaksi memastikan hukum kekekalan massa dan jumlah mol atom tetap terjaga selama reaksi berlangsung.'
        ]
      },
      {
        id: 'sec-1-4',
        sectionNumber: '1.4',
        title: 'Indikator Pengamatan Laju di Laboratorium',
        conceptSummary: 'Di laboratorium kimia, kita mengamati laju reaksi melalui gejala makroskopis terukur.',
        points: [
          'Pembentukan gas: Volume gas yang ditampung dalam syringe atau buret per satuan waktu (contoh: CaCO₃ + HCl → CO₂).',
          'Pengurangan massa: Berkurangnya massa wadah reaksi terbuka akibat gas yang terlepas keluar.',
          'Perubahan warna atau kekeruhan: Waktu yang diperlukan hingga tanda silang di bawah labu tidak terlihat lagi (contoh: Na₂S₂O₃ + HCl → endapan belerang S).'
        ]
      }
    ]
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Teori Tumbukan & Simulasi Partikel',
    subtitle: 'Gerak partikel, tumbukan efektif vs tidak efektif, orientasi tumbukan, dan energi aktivasi (Ea).',
    icon: '💥',
    isAvailable: false,
    duration: '35 Menit',
    availabilityNotice: 'Belum Tersedia — Menunggu tahap pengembangan Bab 2',
    topics: [
      '2.1 Gerak dan Tumbukan Partikel',
      '2.2 Syarat Tumbukan Efektif',
      '2.3 Energi Aktivasi (Ea) dan Kompleks Teraktivasi',
      'Simulasi Interaktif Partikel 2D'
    ]
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Faktor-Faktor yang Memengaruhi Laju Reaksi',
    subtitle: 'Pengaruh konsentrasi, suhu, luas permukaan bidang sentuh, dan katalis terhadap laju reaksi.',
    icon: '🧪',
    isAvailable: false,
    duration: '45 Menit',
    availabilityNotice: 'Belum Tersedia — Dijadwalkan menyusul pada Bab 3 (Lab Virtual & Kuis Formatif)',
    topics: [
      '3.1 Pengaruh Konsentrasi terhadap Frekuensi Tumbukan',
      '3.2 Pengaruh Suhu & Fraksi Partikel Berenergi Tinggi',
      '3.3 Pengaruh Luas Permukaan Bidang Kontak',
      '3.4 Peran Katalis & Jalur Reaksi Alternatif'
    ]
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Analisis Data & Profil Diagram Energi',
    subtitle: 'Membaca tabel eksperimen, grafik laju reaksi, serta membandingkan diagram energi reaksi.',
    icon: '📊',
    isAvailable: false,
    duration: '30 Menit',
    availabilityNotice: 'Belum Tersedia — Dijadwalkan menyusul pada Bab 4 (Panel Guru & Database Hasil)',
    topics: [
      '4.1 Penafsiran Grafik Konsentrasi terhadap Waktu',
      '4.2 Menentukan Orde Reaksi & Persamaan Laju',
      '4.3 Profil Diagram Energi dengan dan tanpa Katalis'
    ]
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Evaluasi Akhir & Diagnostik Pemahaman',
    subtitle: 'Uji komprehensif penalaran kinetika kimia dan umpan balik diagnostik tingkat penguasaan.',
    icon: '🏆',
    isAvailable: false,
    duration: '40 Menit',
    availabilityNotice: 'Belum Tersedia — Dijadwalkan menyusul pada Bab 5',
    topics: [
      'Tes Diagnostik Akhir Kinetika Kimia',
      'Pembahasan Komprehensif Berbasis Teori Tumbukan',
      'Rekomendasi Pemantapan Konsep'
    ]
  }
];
