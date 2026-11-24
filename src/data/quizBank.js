/**
 * Bank Soal Kuis Interaktif Laju Reaksi (ReactionLab 11)
 * Berisi 10 soal tervalidasi sesuai standar kurikulum Kimia SMA Kelas XI (Fase F)
 * dan spesifikasi PRD.
 *
 * Tingkatan Kognitif:
 * - Level 1: Pemahaman Konsep Dasar & Notasi (Soal 1–2)
 * - Level 2: Teori Tumbukan & Faktor Laju Reaksi (Soal 3–8)
 * - Level 3: Analisis Data Eksperimen & Diagram Energi (Soal 9–10)
 */

export const REACTION_RATE_QUIZ_QUESTIONS = [
  {
    id: 1,
    level: 'Level 1: Konsep Dasar',
    category: 'Pengertian Laju Reaksi',
    question: 'Pernyataan berikut yang paling tepat mendefinisikan laju reaksi kimia adalah...',
    options: [
      'Waktu total yang dibutuhkan reaktan hingga seluruhnya habis tanpa sisa.',
      'Berkurangnya konsentrasi reaktan atau bertambahnya konsentrasi produk per satuan waktu.',
      'Jumlah tumbukan antarpartikel yang terjadi dalam wadah tertutup setiap menit.',
      'Perubahan massa total zat di dalam labu reaksi selama reaksi berlangsung.'
    ],
    correctAnswerIndex: 1,
    hint: 'Pikirkan tentang apa yang terjadi pada jumlah partikel pereaksi (reaktan) dan hasil reaksi (produk) seiring berjalannya waktu reaksi.',
    explanation: 'Laju reaksi kimia secara ilmiah didefinisikan sebagai berkurangnya konsentrasi pereaksi (reaktan) atau bertambahnya konsentrasi hasil reaksi (produk) per satuan waktu (umumnya per detik).'
  },
  {
    id: 2,
    level: 'Level 1: Konsep Mol',
    category: 'Molaritas & Satuan Laju',
    question: 'Jika 0,60 mol gas pereaksi A terlarut dalam wadah 2,0 Liter bereaksi selama 15 detik hingga tersisa 0,30 mol, maka laju berkurangnya pereaksi A adalah...',
    options: [
      '0,010 mol·L⁻¹·s⁻¹',
      '0,020 mol·L⁻¹·s⁻¹',
      '0,050 mol·L⁻¹·s⁻¹',
      '0,150 mol·L⁻¹·s⁻¹'
    ],
    correctAnswerIndex: 0,
    hint: 'Hitung terlebih dahulu perubahan konsentrasi molaritas Δ[A] = Δn / V, lalu bagi dengan selang waktu Δt.',
    explanation: 'Konsentrasi awal [A]₁ = 0,60 mol / 2,0 L = 0,30 M. Konsentrasi akhir [A]₂ = 0,30 mol / 2,0 L = 0,15 M. Perubahan konsentrasi |Δ[A]| = 0,15 M. Laju r_A = 0,15 M / 15 s = 0,010 M/s atau 0,010 mol·L⁻¹·s⁻¹.'
  },
  {
    id: 3,
    level: 'Level 2: Stoikiometri Laju',
    category: 'Hubungan Koefisien Reaksi',
    question: 'Pada reaksi sintesis amonia: N₂(g) + 3H₂(g) → 2NH₃(g), jika laju pembentukan gas NH₃ adalah 0,040 M/s, maka laju berkurangnya gas H₂ adalah...',
    options: [
      '0,020 M/s',
      '0,040 M/s',
      '0,060 M/s',
      '0,120 M/s'
    ],
    correctAnswerIndex: 2,
    hint: 'Gunakan perbandingan koefisien stoikiometri reaksi: r(H₂) / 3 = r(NH₃) / 2.',
    explanation: 'Berdasarkan hukum perbandingan koefisien: r(H₂) = (koefisien H₂ / koefisien NH₃) × r(NH₃) = (3 / 2) × 0,040 M/s = 0,060 M/s.'
  },
  {
    id: 4,
    level: 'Level 2: Fenomena Makroskopis',
    category: 'Pengamatan Laboratorium',
    question: 'Dua siswa melarutkan tablet effervescent vitamin C dengan massa sama ke dalam air. Siswa A menggunakan tablet utuh, sedangkan Siswa B menumbuk tablet menjadi serbuk halus. Hasil pengamatan menunjukkan reaksi Siswa B selesai lebih cepat karena...',
    options: [
      'Tablet serbuk memiliki energi aktivasi yang jauh lebih rendah daripada tablet utuh.',
      'Bentuk serbuk memperluas bidang sentuh partikel sehingga frekuensi tumbukan meningkat.',
      'Suhu air pada percobaan Siswa B secara spontan meningkat tajam.',
      'Tablet serbuk melepaskan katalis alami yang mempercepat laju reaksi.'
    ],
    correctAnswerIndex: 1,
    hint: 'Mengapa memecah padatan menjadi butiran kecil memperbanyak bagian zat yang langsung bersentuhan dengan pelarut air?',
    explanation: 'Penghalusan zat padat memperluas luas permukaan bidang kontak (sentuh). Luas bidang sentuh yang lebih besar memungkinkan lebih banyak partikel reaktan saling bersentuhan dan bertumbukan pada saat bersamaan, sehingga frekuensi tumbukan meningkat dan reaksi berlangsung lebih cepat.'
  },
  {
    id: 5,
    level: 'Level 2: Teori Tumbukan',
    category: 'Tumbukan Efektif',
    question: 'Menurut teori tumbukan, reaksi kimia hanya akan terjadi jika partikel-partikel pereaksi bertumbukan secara efektif. Syarat utama tumbukan efektif adalah...',
    options: [
      'Partikel bergerak dengan kecepatan cahaya di dalam ruang hampa.',
      'Partikel memiliki massa identik dan bertumbukan secara lenting sempurna.',
      'Partikel bertumbukan dengan energi yang cukup (≥ energi aktivasi) dan orientasi ruang yang tepat.',
      'Semua partikel memiliki muatan listrik berlawanan dan saling tarik-menarik.'
    ],
    correctAnswerIndex: 2,
    hint: 'Ingat bahwa tidak semua tumbukan menghasilkan reaksi; partikel harus memiliki energi minimal tertentu dan posisi saling berhadapan yang sesuai.',
    explanation: 'Tumbukan efektif memerlukan dua syarat mutlak: (1) energi kinetik partikel yang bertumbukan harus sama dengan atau melampaui Energi Aktivasi (Ea), dan (2) orientasi (posisi arah ruang) partikel saat bertumbukan harus tepat untuk memungkinkan pemutusan ikatan lama dan pembentukan ikatan baru.'
  },
  {
    id: 6,
    level: 'Level 2: Pengaruh Suhu',
    category: 'Faktor-Faktor Laju Reaksi',
    question: 'Alasan ilmiah mendasar mengapa kenaikan suhu larutan dapat mempercepat laju reaksi secara signifikan adalah...',
    options: [
      'Kenaikan suhu menurunkan energi aktivasi reaksi secara drastis.',
      'Kenaikan suhu meningkatkan energi kinetik rata-rata partikel sehingga fraksi partikel dengan energi ≥ Ea bertambah banyak.',
      'Kenaikan suhu menambah volume pelarut dan menurunkan massa jenis reaktan.',
      'Kenaikan suhu mengubah reaksi endoterm menjadi reaksi eksoterm.'
    ],
    correctAnswerIndex: 1,
    hint: 'Perhatikan distribusi energi partikel (Maxwell-Boltzmann): apa yang terjadi pada jumlah partikel yang energinya mampu melompati bukit energi aktivasi?',
    explanation: 'Kenaikan suhu meningkatkan energi kinetik rata-rata seluruh partikel. Akibatnya, kurva distribusi energi bergeser ke kanan sehingga fraksi (persentase) partikel yang memiliki energi melampaui energi aktivasi (E ≥ Ea) meningkat pesat, menghasilkan lebih banyak tumbukan efektif.'
  },
  {
    id: 7,
    level: 'Level 2: Pengaruh Konsentrasi',
    category: 'Faktor-Faktor Laju Reaksi',
    question: 'Bagaimana penambahan konsentrasi reaktan dalam larutan memengaruhi laju reaksi dari sudut pandang model partikel?',
    options: [
      'Membuat partikel menjadi lebih besar sehingga lebih mudah tertabrak.',
      'Meningkatkan kerapatan partikel per satuan volume sehingga frekuensi tumbukan antarpartikel meningkat.',
      'Menyediakan jalur reaksi alternatif dengan energi aktivasi yang lebih rendah.',
      'Menghilangkan gaya tolak-menolak antarinti atom pereaksi.'
    ],
    correctAnswerIndex: 1,
    hint: 'Bayangkan ruangan yang diisi 10 orang vs ruangan sama yang diisi 50 orang yang sedang berjalan acak.',
    explanation: 'Konsentrasi yang lebih tinggi berarti jumlah partikel per satuan volume (kerapatan) lebih banyak. Jarak rata-rata antarpartikel menjadi lebih rapat, sehingga peluang dan frekuensi tumbukan antarpartikel per detik menjadi jauh lebih tinggi.'
  },
  {
    id: 8,
    level: 'Level 2: Pengaruh Katalis',
    category: 'Katalisator',
    question: 'Pernyataan yang BENAR mengenai peran katalis dalam mempercepat laju reaksi kimia adalah...',
    options: [
      'Katalis ikut bereaksi dan mengubah nilai perubahan entalpi (ΔH) keseluruhan reaksi.',
      'Katalis menyediakan mekanisme reaksi alternatif dengan energi aktivasi (Ea) yang lebih rendah.',
      'Katalis menggeser posisi kesetimbangan reaksi ke arah produk pada suhu yang sama.',
      'Katalis habis terpakai dan menjadi produk akhir reaksi baru.'
    ],
    correctAnswerIndex: 1,
    hint: 'Katalis tidak mengubah tingkat energi awal reaktan maupun produk, hanya menurunkan puncak "bukit" rintangan reaksi.',
    explanation: 'Katalis bekerja dengan cara menawarkan jalur reaksi alternatif yang memiliki rintangan Energi Aktivasi (Ea) lebih rendah. Katalis tidak mengubah nilai entalpi reaksi (ΔH), tidak mengubah posisi kesetimbangan pada suhu tertentu, dan diperoleh kembali di akhir reaksi tanpa mengalami perubahan kimia permanen.'
  },
  {
    id: 9,
    level: 'Level 3: Analisis Data',
    category: 'Interpretasi Data Eksperimen',
    question: 'Perhatikan data eksperimen reaksi: A + B → C berikut:\n• Pada t = 0 s, konsentrasi A = 0,80 M\n• Pada t = 10 s, konsentrasi A = 0,50 M\n• Pada t = 20 s, konsentrasi A = 0,30 M\nBerdasarkan data tersebut, laju rata-rata berkurangnya zat A pada selang waktu 10 hingga 20 detik adalah...',
    options: [
      '0,010 M/s',
      '0,020 M/s',
      '0,025 M/s',
      '0,030 M/s'
    ],
    correctAnswerIndex: 1,
    hint: 'Hitung selang waktu Δt = 20 - 10 = 10 detik, dan perubahan konsentrasi Δ[A] = 0,30 - 0,50 = -0,20 M.',
    explanation: 'Pada rentang t = 10 s sampai t = 20 s: Δt = 20 - 10 = 10 s. Perubahan konsentrasi |Δ[A]| = |0,30 M - 0,50 M| = 0,20 M. Laju rata-rata r = |Δ[A]| / Δt = 0,20 M / 10 s = 0,020 M/s.'
  },
  {
    id: 10,
    level: 'Level 3: Diagram Energi',
    category: 'Analisis Profil Energi',
    question: 'Pada suatu diagram profil energi, energi pereaksi berada pada +60 kJ/mol, puncak kompleks teraktivasi tanpa katalis berada pada +150 kJ/mol, dan energi produk berada pada +20 kJ/mol. Nilai energi aktivasi (Ea) reaksi maju tanpa katalis dan perubahan entalpi (ΔH) reaksi adalah...',
    options: [
      'Ea = 90 kJ/mol dan ΔH = -40 kJ/mol (Eksoterm)',
      'Ea = 150 kJ/mol dan ΔH = +40 kJ/mol (Endoterm)',
      'Ea = 70 kJ/mol dan ΔH = -60 kJ/mol (Eksoterm)',
      'Ea = 90 kJ/mol dan ΔH = +40 kJ/mol (Endoterm)'
    ],
    correctAnswerIndex: 0,
    hint: 'Ea reaksi maju = Energi puncak - Energi reaktan. ΔH = Energi produk - Energi reaktan.',
    explanation: 'Energi Aktivasi reaksi maju Ea = Energi Puncak (150 kJ/mol) - Energi Pereaksi (60 kJ/mol) = 90 kJ/mol. Perubahan entalpi reaksi ΔH = Energi Produk (20 kJ/mol) - Energi Pereaksi (60 kJ/mol) = -40 kJ/mol (bernilai negatif karena reaksi melepaskan kalor / eksoterm).'
  }
];

