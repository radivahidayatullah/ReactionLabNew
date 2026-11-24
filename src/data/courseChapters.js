/**
 * Data Struktur Bab Kurikulum ReactionLab 11
 * Bab 1 (Fondasi Laju Reaksi & Konsep Mol) dan Bab 5 (Evaluasi Akhir & Diagnostik)
 * telah dioptimalkan secara komprehensif. Bab 2–4 disiapkan untuk tahap berikutnya.
 */

export const COURSE_CHAPTERS = [
  {
    id: 'ch1',
    number: 1,
    title: 'Mengenal Laju Reaksi & Konsep Mol',
    subtitle: 'Konsep dasar laju reaksi, laju pengurangan reaktan & pembentukan produk, serta kaitan molaritas (M = mol/V) terhadap waktu.',
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
    subtitle: 'Gerak partikel submikroskopis, syarat tumbukan efektif vs tidak efektif, energi aktivasi (Ea), dan orientasi ruang.',
    icon: '💥',
    isAvailable: true,
    duration: '35 Menit',
    availabilityNotice: null,
    topics: [
      '2.1 Gerak Acak Partikel & Frekuensi Tumbukan',
      '2.2 Tumbukan Efektif vs Tumbukan Tidak Efektif',
      '2.3 Energi Aktivasi (Ea) & Orientasi Ruang yang Tepat',
      '2.4 Keadaan Transisi & Kompleks Teraktivasi',
      'Simulasi Interaktif Partikel 2D'
    ],
    learningSections: [
      {
        id: 'sec-2-1',
        sectionNumber: '2.1',
        title: 'Gerak Acak Partikel & Frekuensi Tumbukan',
        conceptSummary: 'Berdasarkan teori kinetik gas dan cairan, partikel zat selalu bergerak lurus secara acak dengan kecepatan tertentu dan terus bertumbukan miliaran kali setiap detik.',
        points: [
          'Partikel pereaksi harus saling bertumbukan fisik agar reaksi kimia dapat terjadi.',
          'Frekuensi tumbukan adalah banyaknya peristiwa tumbukan antarpartikel per satuan volume tiap detik.',
          'Meskipun jumlah tumbukan sangat banyak, tidak semua tumbukan serta-merta menghasilkan perubahan kimia.'
        ]
      },
      {
        id: 'sec-2-2',
        sectionNumber: '2.2',
        title: 'Tumbukan Efektif vs Tumbukan Tidak Efektif',
        conceptSummary: 'Tumbukan efektif adalah tumbukan yang berhasil menghasilkan reaksi kimia (memutus ikatan reaktan dan membentuk produk baru).',
        points: [
          'Tumbukan tidak efektif: Partikel hanya memantul lenting kembali sebagai molekul reaktan semula tanpa terjadi perubahan kimia.',
          'Hanya fraksi kecil dari total tumbukan yang berstatus efektif pada suhu ruang biasa.',
          'Laju reaksi ditentukan secara langsung oleh frekuensi terjadinya tumbukan efektif, bukan sekadar total tumbukan.'
        ]
      },
      {
        id: 'sec-2-3',
        sectionNumber: '2.3',
        title: 'Energi Aktivasi (Ea) & Orientasi Ruang Tepat',
        conceptSummary: 'Agar tumbukan efektif terjadi, dua syarat mutlak harus terpenuhi secara bersamaan.',
        points: [
          'Syarat 1 (Energi Cukup): Partikel yang bertumbukan harus memiliki energi kinetik total sama dengan atau lebih besar dari Energi Aktivasi (E ≥ Ea).',
          'Syarat 2 (Orientasi Ruang Tepat): Molekul-molekul harus saling bertumbukan pada sudut dan posisi arah yang memungkinkan gugus atom saling berikatan.',
          'Jika partikel memiliki energi cukup tetapi sudut tumbukannya meleset, ikatan baru tetap tidak dapat terbentuk.'
        ]
      },
      {
        id: 'sec-2-4',
        sectionNumber: '2.4',
        title: 'Keadaan Transisi & Kompleks Teraktivasi',
        conceptSummary: 'Saat partikel dengan energi cukup bertumbukan dengan orientasi tepat, terbentuk struktur sementara yang disebut kompleks teraktivasi.',
        points: [
          'Kompleks teraktivasi adalah susunan atom transisi yang berenergi sangat tinggi dan bersifat tidak stabil.',
          'Pada keadaan transisi ini, ikatan kimia lama mulai meregang dan melemah, sementara ikatan kimia produk baru mulai terbentuk.',
          'Kompleks teraktivasi segera melepaskan energi berlebih dan terurai menjadi molekul produk reaksi yang stabil.'
        ]
      }
    ]
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Faktor-Faktor yang Memengaruhi Laju Reaksi',
    subtitle: 'Pengaruh konsentrasi, suhu, luas permukaan bidang sentuh, dan katalisator terhadap laju reaksi.',
    icon: '🧪',
    isAvailable: true,
    duration: '45 Menit',
    availabilityNotice: null,
    topics: [
      '3.1 Pengaruh Konsentrasi terhadap Frekuensi Tumbukan',
      '3.2 Pengaruh Suhu & Fraksi Partikel Berenergi Tinggi',
      '3.3 Pengaruh Luas Permukaan Bidang Kontak Padatan',
      '3.4 Peran Katalis & Jalur Reaksi Alternatif',
      'Laboratorium Virtual: Uji Variabel CaCO₃ + HCl'
    ],
    learningSections: [
      {
        id: 'sec-3-1',
        sectionNumber: '3.1',
        title: 'Pengaruh Konsentrasi terhadap Frekuensi Tumbukan',
        conceptSummary: 'Konsentrasi yang lebih tinggi berarti jumlah partikel pereaksi per satuan volume (kerapatan) lebih besar, sehingga frekuensi tumbukan antarpartikel per detik meningkat tajam.',
        points: [
          'Dalam larutan yang pekat, jarak antarpartikel reaktan menjadi sangat dekat.',
          'Peluang bertemunya partikel-partikel untuk bertumbukan menjadi lebih sering terjadi.',
          'Laju reaksi berbanding lurus dengan peningkatan konsentrasi pereaksi pada sebagian besar reaksi.'
        ]
      },
      {
        id: 'sec-3-2',
        sectionNumber: '3.2',
        title: 'Pengaruh Suhu & Distribusi Maxwell-Boltzmann',
        conceptSummary: 'Kenaikan suhu meningkatkan energi kinetik rata-rata partikel. Berdasarkan kurva distribusi Maxwell-Boltzmann, fraksi partikel dengan energi E ≥ Ea bertambah secara eksponensial.',
        points: [
          'Kenaikan suhu tidak sekadar membuat partikel bergerak lebih cepat, melainkan melipatgandakan jumlah molekul yang sanggup melewati rintangan Energi Aktivasi.',
          'Secara empiris (aturan van \'t Hoff), kenaikan suhu sebesar 10 °C umumnya melipatgandakan laju reaksi menjadi 2 hingga 3 kali lebih cepat.',
          'Energi aktivasi (Ea) itu sendiri tidak berubah oleh suhu; yang bertambah adalah populasi partikel yang memiliki energi cukup.'
        ]
      },
      {
        id: 'sec-3-3',
        sectionNumber: '3.3',
        title: 'Pengaruh Luas Permukaan Bidang Kontak Padatan',
        conceptSummary: 'Untuk reaksi heterogen yang melibatkan zat padat, reaksi hanya dapat berlangsung pada permukaan bidang sentuh di mana partikel padatan bersentuhan langsung dengan cairan atau gas.',
        points: [
          'Memecah bongkahan padatan menjadi butiran kecil atau serbuk halus memperluas luas permukaan total yang terpapar.',
          'Partikel asam dapat menabrak lebih banyak atom kalsium karbonat pada waktu yang bersamaan.',
          'Massa total padatan tetap sama, tetapi laju reaksi pada bentuk serbuk berlangsung jauh lebih cepat dibanding bongkahan utuh.'
        ]
      },
      {
        id: 'sec-3-4',
        sectionNumber: '3.4',
        title: 'Peran Katalis & Jalur Reaksi Alternatif',
        conceptSummary: 'Katalis adalah zat yang mempercepat laju reaksi kimia tanpa mengalami perubahan kimiawi permanen di akhir reaksi.',
        points: [
          'Katalis bekerja dengan cara menyediakan mekanisme/tahapan reaksi alternatif yang memiliki Energi Aktivasi (Ea) lebih rendah.',
          'Katalis tidak mengubah tingkat energi reaktan maupun produk, sehingga nilai perubahan entalpi (ΔH) reaksi tetap sama.',
          'Katalis mempercepat reaksi maju dan reaksi balik secara seimbang, sehingga tidak mengubah posisi kesetimbangan pada suhu tertentu.'
        ]
      }
    ]
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Analisis Data & Profil Diagram Energi',
    subtitle: 'Membaca tabel eksperimen, grafik orde reaksi (0, 1, 2), menentukan hukum laju (r = k[A]ˣ[B]ʸ), serta profil energi.',
    icon: '📊',
    isAvailable: true,
    duration: '35 Menit',
    availabilityNotice: null,
    topics: [
      '4.1 Penafsiran Grafik Konsentrasi terhadap Waktu & Bentuk Orde Reaksi',
      '4.2 Menentukan Orde Reaksi & Persamaan Laju (r = k[A]ˣ[B]ʸ)',
      '4.3 Menghitung Nilai Tetapan Laju Reaksi (k) dan Satuannya',
      '4.4 Profil Diagram Energi Reaksi Maju, Balik, dan Katalisator'
    ],
    learningSections: [
      {
        id: 'sec-4-1',
        sectionNumber: '4.1',
        title: 'Penafsiran Grafik Konsentrasi terhadap Waktu & Orde Reaksi',
        conceptSummary: 'Orde reaksi menunjukkan besarnya pengaruh perubahan konsentrasi pereaksi terhadap perubahan laju reaksi.',
        points: [
          'Orde Nol (0): Laju reaksi tidak dipengaruhi konsentrasi reaktan (r = k). Grafik laju vs konsentrasi berupa garis horizontal datar.',
          'Orde Satu (1): Laju reaksi berbanding lurus dengan konsentrasi reaktan (r = k[A]). Jika konsentrasi naik 2x, laju naik 2x.',
          'Orde Dua (2): Laju reaksi sebanding dengan kuadrat konsentrasi reaktan (r = k[A]²). Jika konsentrasi naik 2x, laju melonjak 2² = 4x lipat.'
        ]
      },
      {
        id: 'sec-4-2',
        sectionNumber: '4.2',
        title: 'Menentukan Orde Reaksi dari Data Tabel Eksperimen',
        conceptSummary: 'Orde reaksi tidak dapat ditentukan dari koefisien persamaan reaksi setara, melainkan wajib ditentukan secara eksperimental melalui metode laju awal.',
        points: [
          'Untuk menentukan orde reaktan A, bandingkan dua percobaan di mana konsentrasi reaktan B dijaga konstan.',
          'Gunakan rasio: (r₂ / r₁) = ([A]₂ / [A]₁)ˣ.',
          'Lakukan langkah serupa untuk menentukan orde reaktan B dengan menjaga konsentrasi reaktan A konstan.'
        ]
      },
      {
        id: 'sec-4-3',
        sectionNumber: '4.3',
        title: 'Tetapan Laju Reaksi (k) & Analisis Dimensi Satuan',
        conceptSummary: 'Tetapan laju reaksi (k) adalah konstanta kesebandingan antara laju reaksi dengan konsentrasi reaktan pada suhu tertentu.',
        points: [
          'Nilai k dipengaruhi secara langsung oleh suhu (persamaan Arrhenius: k = A·e^(-Ea/RT)) dan kehadiran katalis.',
          'Satuan k bergantung pada orde total reaksi: Orde 1 memiliki satuan s⁻¹; Orde 2 memiliki satuan M⁻¹·s⁻¹; Orde 3 memiliki satuan M⁻²·s⁻¹.',
          'Semakin besar nilai k, semakin cepat reaksi berlangsung pada konsentrasi pereaksi yang sama.'
        ]
      },
      {
        id: 'sec-4-4',
        sectionNumber: '4.4',
        title: 'Profil Diagram Energi Reaksi Maju, Balik, & Peran Katalis',
        conceptSummary: 'Diagram profil energi memetakan perubahan energi potensial zat sepanjang koordinat jalannya reaksi.',
        points: [
          'Energi Aktivasi Reaksi Maju: Ea = Energi Puncak Kompleks Teraktivasi - Energi Pereaksi.',
          'Perubahan Entalpi Reaksi: ΔH = Energi Produk - Energi Pereaksi (bernilai negatif untuk reaksi eksoterm dan positif untuk endoterm).',
          'Pengaruh Katalis: Menurunkan tinggi bukit energi aktivasi (Ea\' < Ea), tetapi tingkat energi reaktan dan produk tidak berubah (ΔH tetap).'
        ]
      }
    ]
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Evaluasi Akhir & Diagnostik Pemahaman',
    subtitle: 'Tes komprehensif 10 soal laju reaksi, analisis tingkat penguasaan konsep, serta pembahasan dan rekomendasi belajar.',
    icon: '🏆',
    isAvailable: true,
    duration: '30 Menit',
    availabilityNotice: null,
    topics: [
      '5.1 Tes Komprehensif Laju Reaksi (10 Soal Pilihan Ganda)',
      '5.2 Analisis Penguasaan Konsep 3 Tingkat Kognitif',
      '5.3 Pembahasan Saintifik Berbasis Bukti & Model Partikel',
      '5.4 Rekomendasi Pemantapan Materi Khusus'
    ],
    evaluationSections: [
      {
        id: 'eval-level-1',
        levelTitle: 'Tingkat 1: Fondasi Konseptual & Konsep Mol',
        desc: 'Mengukur pemahaman dasar laju reaksi, definisi berkurangnya reaktan/bertambahnya produk, hubungan molaritas (M = n/V), dan satuan laju reaksi.',
        targetMastery: '80% Siswa Menguasai Definisi Fisis & Satuan Internasional'
      },
      {
        id: 'eval-level-2',
        levelTitle: 'Tingkat 2: Teori Tumbukan & Faktor Laju Reaksi',
        desc: 'Menguji penalaran mengenai syarat tumbukan efektif, peranan energi aktivasi (Ea), distribusi Maxwell-Boltzmann terhadap suhu, kerapatan konsentrasi, luas permukaan, dan katalisator.',
        targetMastery: '75% Siswa Menjelaskan Alasan Ilmiah di Balik Perubahan Laju'
      },
      {
        id: 'eval-level-3',
        levelTitle: 'Tingkat 3: Analisis Data Kuantitatif & Diagram Energi',
        desc: 'Menilai kemampuan membaca tabel data perubahan konsentrasi per selang waktu, menghitung laju rata-rata reaksi, serta menafsirkan diagram profil energi (Ea dan ΔH).',
        targetMastery: '70% Siswa Mampu Menyelesaikan Perhitungan Data dan Interpretasi Grafik'
      }
    ]
  }
];
