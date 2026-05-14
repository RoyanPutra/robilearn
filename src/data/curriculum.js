const lv = (id,name,diff,desc,type,p={}) => ({id,name,diff,desc,type,p});
const stage = (id,name,icon,desc,levels,isExam=false) => ({id,name,icon,desc,levels,isExam});

export const CURRICULUM = {
  /* ═══ MATH ═══ */
  math_dasar: [
    stage('md_s1','Mengenal Angka','1️⃣','Kenali angka 1–10',[
      lv('md_s1_l0','Tingkat 1','easy','Angka 1–5',   'angka',      {min:1,max:5, count:5}),
      lv('md_s1_l1','Tingkat 2','mid', 'Angka 1–8',   'angka',      {min:1,max:8, count:6}),
      lv('md_s1_l2','Tingkat 3','hard','Angka 1–10',  'angka',      {min:1,max:10,count:7}),
    ]),
    stage('md_s2','Berhitung','🧮','Hitung benda',[
      lv('md_s2_l0','Tingkat 1','easy','Hitung 1–5',  'berhitung',  {max:5, count:5}),
      lv('md_s2_l1','Tingkat 2','mid', 'Hitung 1–8',  'berhitung',  {max:8, count:6}),
      lv('md_s2_l2','Tingkat 3','hard','Hitung 1–10', 'berhitung',  {max:10,count:7}),
    ]),
    stage('md_s3','Penjumlahan','➕','Belajar menambahkan',[
      lv('md_s3_l0','Tingkat 1','easy','Hasil ≤ 5',   'penjumlahan',{max:5, count:5}),
      lv('md_s3_l1','Tingkat 2','mid', 'Hasil ≤ 8',   'penjumlahan',{max:8, count:6}),
      lv('md_s3_l2','Tingkat 3','hard','Hasil ≤ 10',  'penjumlahan',{max:10,count:7}),
    ]),
    stage('md_exam','Ujian Akhir','🏆','Ujian semua kemampuan',[lv('md_exam_l0','Ujian','exam','10 soal','mixed_math_dasar',{count:10})],true),
  ],
  math_menengah: [
    stage('mm_s1','Angka 11–20','🔢','Kenali angka belasan',[
      lv('mm_s1_l0','Tingkat 1','easy','Angka 11–15','angka',{min:11,max:15,count:5}),
      lv('mm_s1_l1','Tingkat 2','mid', 'Angka 11–18','angka',{min:11,max:18,count:6}),
      lv('mm_s1_l2','Tingkat 3','hard','Angka 11–20','angka',{min:11,max:20,count:7}),
    ]),
    stage('mm_s2','Pengurangan','➖','Belajar mengurangi',[
      lv('mm_s2_l0','Tingkat 1','easy','Kurang ≤ 10','pengurangan',{max:10,count:5}),
      lv('mm_s2_l1','Tingkat 2','mid', 'Kurang ≤ 15','pengurangan',{max:15,count:6}),
      lv('mm_s2_l2','Tingkat 3','hard','Kurang ≤ 20','pengurangan',{max:20,count:7}),
    ]),
    stage('mm_s3','Campuran +−','🎲','Tambah & kurang bersama',[
      lv('mm_s3_l0','Tingkat 1','easy','Campuran ≤ 10','mixed_add_sub',{max:10,count:5}),
      lv('mm_s3_l1','Tingkat 2','mid', 'Campuran ≤ 15','mixed_add_sub',{max:15,count:6}),
      lv('mm_s3_l2','Tingkat 3','hard','Campuran ≤ 20','mixed_add_sub',{max:20,count:7}),
    ]),
    stage('mm_s4','Pola Angka','🔢','Kenali pola bilangan',[
      lv('mm_s4_l0','Tingkat 1','easy','Pola +2',    'pola_angka',{count:5}),
      lv('mm_s4_l1','Tingkat 2','mid', 'Pola +5',    'pola_angka',{count:6}),
      lv('mm_s4_l2','Tingkat 3','hard','Pola beragam','pola_angka',{count:7}),
    ]),
    stage('mm_exam','Ujian Akhir','🏆','Ujian menengah',[lv('mm_exam_l0','Ujian','exam','10 soal','mixed_math_menengah',{count:10})],true),
  ],
  math_tinggi: [
    stage('mt_s1','Perkalian','✖️','Perkalian dasar',[
      lv('mt_s1_l0','Tingkat 1','easy','Kali 2',    'perkalian',{tables:[2],  count:6}),
      lv('mt_s1_l1','Tingkat 2','mid', 'Kali 5',    'perkalian',{tables:[5],  count:6}),
      lv('mt_s1_l2','Tingkat 3','hard','Kali 2 & 5','perkalian',{tables:[2,5],count:7}),
    ]),
    stage('mt_s2','Pembagian','➗','Membagi angka',[
      lv('mt_s2_l0','Tingkat 1','easy','Bagi 2',  'pembagian',{divisors:[2],  count:6}),
      lv('mt_s2_l1','Tingkat 2','mid', 'Bagi 5',  'pembagian',{divisors:[5],  count:6}),
      lv('mt_s2_l2','Tingkat 3','hard','Campuran','pembagian',{divisors:[2,5],count:7}),
    ]),
    stage('mt_s3','Semua Operasi','🎯','Semua operasi bersama',[
      lv('mt_s3_l0','Tingkat 1','easy','×÷ mudah',  'mixed_mul_div', {count:6}),
      lv('mt_s3_l1','Tingkat 2','mid', 'Semua ops',  'mixed_all_math',{count:7}),
      lv('mt_s3_l2','Tingkat 3','hard','Tantangan',  'mixed_all_math',{count:8}),
    ]),
    stage('mt_s4','Bangun Datar','🔵','Kenali bentuk geometri',[
      lv('mt_s4_l0','Tingkat 1','easy','Sisi & sudut', 'bangun_datar',{count:5}),
      lv('mt_s4_l1','Tingkat 2','mid', 'Jenis bangun', 'bangun_datar',{count:6}),
      lv('mt_s4_l2','Tingkat 3','hard','Sifat bangun', 'bangun_datar',{count:7}),
    ]),
    stage('mt_exam','Ujian Akhir','🏆','Ujian matematika',[lv('mt_exam_l0','Ujian','exam','10 soal','mixed_all_math',{count:10})],true),
  ],

  /* ═══ PENGETAHUAN ═══ */
  pengetahuan_dasar: [
    stage('pd_s1','Binatang','🦁','Kenali hewan',[
      lv('pd_s1_l0','Tingkat 1','easy','Hewan umum',   'binatang',      {pool:'easy',count:5}),
      lv('pd_s1_l1','Tingkat 2','mid', 'Lebih banyak', 'binatang',      {pool:'mid', count:6}),
      lv('pd_s1_l2','Tingkat 3','hard','Cocokkan',     'cocok_binatang',{count:1}),
    ]),
    stage('pd_s2','Tumbuhan','🌿','Kenali tanaman',[
      lv('pd_s2_l0','Tingkat 1','easy','Buah & sayur', 'tumbuhan',      {count:5}),
      lv('pd_s2_l1','Tingkat 2','mid', 'Bunga & pohon','tumbuhan',      {count:6}),
      lv('pd_s2_l2','Tingkat 3','hard','Cocokkan',     'cocok_tumbuhan',{count:1}),
    ]),
    stage('pd_s3','Bagian Tubuh','🧍','Kenali anggota tubuh',[
      lv('pd_s3_l0','Tingkat 1','easy','Fungsi tubuh', 'tubuh',{count:5}),
      lv('pd_s3_l1','Tingkat 2','mid', 'Lebih banyak', 'tubuh',{count:6}),
      lv('pd_s3_l2','Tingkat 3','hard','Tebak & cocok','tebak',{count:6}),
    ]),
    stage('pd_exam','Ujian Akhir','🏆','Ujian alam',[lv('pd_exam_l0','Ujian','exam','10 soal','mixed_penget_dasar',{count:10})],true),
  ],
  pengetahuan_menengah: [
    stage('pm_s1','Profesi','👨‍⚕️','Kenali pekerjaan',[
      lv('pm_s1_l0','Tingkat 1','easy','Profesi umum','profesi',      {count:5}),
      lv('pm_s1_l1','Tingkat 2','mid', 'Lebih banyak','profesi',      {count:6}),
      lv('pm_s1_l2','Tingkat 3','hard','Cocokkan',    'cocok_profesi',{count:1}),
    ]),
    stage('pm_s2','Transportasi','🚗','Kenali kendaraan',[
      lv('pm_s2_l0','Tingkat 1','easy','Kendaraan darat','transportasi',{cat:'darat',count:5}),
      lv('pm_s2_l1','Tingkat 2','mid', 'Udara & air',    'transportasi',{cat:'all',  count:6}),
      lv('pm_s2_l2','Tingkat 3','hard','Semua kendaraan','transportasi',{cat:'all',  count:7}),
    ]),
    stage('pm_s3','Makanan','🍚','Kenali makanan',[
      lv('pm_s3_l0','Tingkat 1','easy','Makanan pokok','makanan',{cat:'makanan',count:5}),
      lv('pm_s3_l1','Tingkat 2','mid', 'Sayur & buah', 'makanan',{cat:'sayur',  count:6}),
      lv('pm_s3_l2','Tingkat 3','hard','Semua makanan','makanan',{cat:'all',    count:7}),
    ]),
    stage('pm_s4','Indonesia','🇮🇩','Kenali negara kita',[
      lv('pm_s4_l0','Tingkat 1','easy','Ibukota & simbol','provinsi',   {count:5}),
      lv('pm_s4_l1','Tingkat 2','mid', 'Budaya & tradisi','seni_budaya',{count:6}),
      lv('pm_s4_l2','Tingkat 3','hard','Campuran Indonesia','provinsi', {count:7}),
    ]),
    stage('pm_exam','Ujian Akhir','🏆','Ujian pengetahuan',[lv('pm_exam_l0','Ujian','exam','10 soal','mixed_penget_menengah',{count:10})],true),
  ],
  pengetahuan_tinggi: [
    stage('pt_s1','Alam & Cuaca','🌤️','Gejala alam',[
      lv('pt_s1_l0','Tingkat 1','easy','Cuaca',      'alam', {count:5}),
      lv('pt_s1_l1','Tingkat 2','mid', 'Gejala alam','alam', {count:6}),
      lv('pt_s1_l2','Tingkat 3','hard','Sains alam', 'sains',{count:7}),
    ]),
    stage('pt_s2','Bentuk & Warna','🔵','Bentuk di sekitar',[
      lv('pt_s2_l0','Tingkat 1','easy','Bentuk dasar','bentuk',{count:5}),
      lv('pt_s2_l1','Tingkat 2','mid', 'Cocokkan',   'cocok', {count:1}),
      lv('pt_s2_l2','Tingkat 3','hard','Tebak',      'tebak', {count:6}),
    ]),
    stage('pt_s3','Sains Dasar','🔬','Sains pertama',[
      lv('pt_s3_l0','Tingkat 1','easy','Sains mudah',    'sains',{count:5}),
      lv('pt_s3_l1','Tingkat 2','mid', 'Sains sedang',   'sains',{count:6}),
      lv('pt_s3_l2','Tingkat 3','hard','Sains menantang','sains',{count:7}),
    ]),
    stage('pt_exam','Ujian Akhir','🏆','Ujian sains',[lv('pt_exam_l0','Ujian','exam','10 soal','mixed_penget_tinggi',{count:10})],true),
  ],

  /* ═══ BAHASA ═══ */
  bahasa_dasar: [
    stage('ba_s1','Mengenal Huruf','🔤','Huruf A–Z',[
      lv('ba_s1_l0','Tingkat 1','easy','Huruf A–F','huruf',{count:5}),
      lv('ba_s1_l1','Tingkat 2','mid', 'Huruf G–M','huruf',{count:6}),
      lv('ba_s1_l2','Tingkat 3','hard','Huruf N–Z','huruf',{count:7}),
    ]),
    stage('ba_s2','Kata Sederhana','📝','Membaca kata',[
      lv('ba_s2_l0','Tingkat 1','easy','Kata 3 huruf','kata',{count:5}),
      lv('ba_s2_l1','Tingkat 2','mid', 'Kata 4 huruf','kata',{count:6}),
      lv('ba_s2_l2','Tingkat 3','hard','Kata 5 huruf','kata',{count:7}),
    ]),
    stage('ba_s3','Tebak Kata','🔍','Tebak dari gambar',[
      lv('ba_s3_l0','Tingkat 1','easy','Benda sehari-hari','tebak',   {count:5}),
      lv('ba_s3_l1','Tingkat 2','mid', 'Binatang & alam',  'binatang',{pool:'easy',count:6}),
      lv('ba_s3_l2','Tingkat 3','hard','Campuran',         'tebak',   {count:7}),
    ]),
    stage('ba_exam','Ujian Akhir','🏆','Ujian bahasa dasar',[lv('ba_exam_l0','Ujian','exam','10 soal','mixed_bahasa',{count:10})],true),
  ],
  bahasa_menengah: [
    stage('bm_s1','Lawan Kata','↔️','Kata berlawanan',[
      lv('bm_s1_l0','Tingkat 1','easy','Antonim dasar', 'lawan_kata',{count:5}),
      lv('bm_s1_l1','Tingkat 2','mid', 'Antonim sedang','lawan_kata',{count:6}),
      lv('bm_s1_l2','Tingkat 3','hard','Antonim lanjut','lawan_kata',{count:7}),
    ]),
    stage('bm_s2','Sinonim','🔗','Kata yang sama artinya',[
      lv('bm_s2_l0','Tingkat 1','easy','Sinonim mudah', 'sinonim',{count:5}),
      lv('bm_s2_l1','Tingkat 2','mid', 'Sinonim sedang','sinonim',{count:6}),
      lv('bm_s2_l2','Tingkat 3','hard','Sinonim lanjut','sinonim',{count:7}),
    ]),
    stage('bm_s3','Kosa Kata','📖','Perkaya kosa kata',[
      lv('bm_s3_l0','Tingkat 1','easy','Kata mudah', 'lawan_kata', {count:5}),
      lv('bm_s3_l1','Tingkat 2','mid', 'Kata sedang','sinonim',    {count:6}),
      lv('bm_s3_l2','Tingkat 3','hard','Campuran',   'mixed_bahasa',{count:7}),
    ]),
    stage('bm_exam','Ujian Akhir','🏆','Ujian bahasa menengah',[lv('bm_exam_l0','Ujian','exam','10 soal','mixed_bahasa',{count:10})],true),
  ],
  bahasa_tinggi: [
    stage('bt_s1','Ejaan Kata','✏️','Eja dengan benar',[
      lv('bt_s1_l0','Tingkat 1','easy','Ejaan mudah', 'kata',        {count:5}),
      lv('bt_s1_l1','Tingkat 2','mid', 'Ejaan sedang','kata',        {count:6}),
      lv('bt_s1_l2','Tingkat 3','hard','Campuran',    'mixed_bahasa',{count:7}),
    ]),
    stage('bt_s2','Lawan Kata Lanjut','↔️','Antonim tingkat lanjut',[
      lv('bt_s2_l0','Tingkat 1','easy','Antonim baru', 'lawan_kata_lanjut',{count:5}),
      lv('bt_s2_l1','Tingkat 2','mid', 'Antonim lanjut','lawan_kata_lanjut',{count:6}),
      lv('bt_s2_l2','Tingkat 3','hard','Semua antonim', 'lawan_kata_lanjut',{count:7}),
    ]),
    stage('bt_s3','Kalimat','✍️','Susun & lengkapi kalimat',[
      lv('bt_s3_l0','Tingkat 1','easy','Kalimat mudah', 'kalimat',{count:5}),
      lv('bt_s3_l1','Tingkat 2','mid', 'Kalimat sedang','kalimat',{count:6}),
      lv('bt_s3_l2','Tingkat 3','hard','Kalimat lanjut','kalimat',{count:7}),
    ]),
    stage('bt_exam','Ujian Akhir','🏆','Ujian bahasa tinggi',[lv('bt_exam_l0','Ujian','exam','10 soal','mixed_bahasa',{count:10})],true),
  ],

  /* ═══ SENI ═══ */
  seni_dasar: [
    stage('sa_s1','Mengenal Warna','🌈','Warna-warni',[
      lv('sa_s1_l0','Tingkat 1','easy','Warna primer',  'warna',{count:5}),
      lv('sa_s1_l1','Tingkat 2','mid', 'Warna sekunder','warna',{count:6}),
      lv('sa_s1_l2','Tingkat 3','hard','Semua warna',   'warna',{count:7}),
    ]),
    stage('sa_s2','Mengenal Bentuk','🔵','Berbagai bentuk',[
      lv('sa_s2_l0','Tingkat 1','easy','Bentuk dasar','bentuk',{count:5}),
      lv('sa_s2_l1','Tingkat 2','mid', 'Cocokkan',    'cocok', {count:1}),
      lv('sa_s2_l2','Tingkat 3','hard','Tebak bentuk','tebak', {count:6}),
    ]),
    stage('sa_s3','Alat Musik','🎵','Alat musik Indonesia',[
      lv('sa_s3_l0','Tingkat 1','easy','Alat musik umum','alat_musik', {count:5}),
      lv('sa_s3_l1','Tingkat 2','mid', 'Lebih banyak',   'alat_musik', {count:6}),
      lv('sa_s3_l2','Tingkat 3','hard','Cocokkan',       'cocok_musik',{count:1}),
    ]),
    stage('sa_exam','Ujian Akhir','🏆','Ujian seni dasar',[lv('sa_exam_l0','Ujian','exam','10 soal','mixed_seni',{count:10})],true),
  ],
  seni_menengah: [
    stage('sm_s1','Warna Campuran','🎨','Mencampur warna',[
      lv('sm_s1_l0','Tingkat 1','easy','Campuran primer','warna_campur',{count:5}),
      lv('sm_s1_l1','Tingkat 2','mid', 'Campuran lanjut','warna_campur',{count:6}),
      lv('sm_s1_l2','Tingkat 3','hard','Semua campuran', 'warna_campur',{count:7}),
    ]),
    stage('sm_s2','Seni Budaya','🏮','Kesenian tradisional',[
      lv('sm_s2_l0','Tingkat 1','easy','Tari tradisional','seni_budaya',{count:5}),
      lv('sm_s2_l1','Tingkat 2','mid', 'Seni daerah',     'seni_budaya',{count:6}),
      lv('sm_s2_l2','Tingkat 3','hard','Budaya Indonesia','seni_budaya',{count:7}),
    ]),
    stage('sm_s3','Ekspresi & Emosi','😊','Ekspresi wajah',[
      lv('sm_s3_l0','Tingkat 1','easy','Emosi dasar', 'ekspresi',{count:5}),
      lv('sm_s3_l1','Tingkat 2','mid', 'Lebih banyak','ekspresi',{count:6}),
      lv('sm_s3_l2','Tingkat 3','hard','Semua emosi', 'ekspresi',{count:7}),
    ]),
    stage('sm_s4','Nada & Musik','🎵','Kenali nada dan alat musik',[
      lv('sm_s4_l0','Tingkat 1','easy','Tangga nada',  'nada_musik',{count:5}),
      lv('sm_s4_l1','Tingkat 2','mid', 'Alat musik',   'alat_musik',{count:6}),
      lv('sm_s4_l2','Tingkat 3','hard','Musik budaya', 'nada_musik', {count:7}),
    ]),
    stage('sm_exam','Ujian Akhir','🏆','Ujian seni menengah',[lv('sm_exam_l0','Ujian','exam','10 soal','mixed_seni',{count:10})],true),
  ],
  seni_tinggi: [
    stage('st_s1','Pola & Tekstur','🔷','Kenali pola',[
      lv('st_s1_l0','Tingkat 1','easy','Pola sederhana','bentuk',    {count:5}),
      lv('st_s1_l1','Tingkat 2','mid', 'Pola lanjut',  'cocok',     {count:1}),
      lv('st_s1_l2','Tingkat 3','hard','Tebak pola',   'mixed_seni',{count:6}),
    ]),
    stage('st_s2','Karya Seni','🖼️','Kenali karya seni',[
      lv('st_s2_l0','Tingkat 1','easy','Seni mudah', 'mixed_seni',{count:5}),
      lv('st_s2_l1','Tingkat 2','mid', 'Seni sedang','mixed_seni',{count:6}),
      lv('st_s2_l2','Tingkat 3','hard','Seni lanjut','mixed_seni',{count:7}),
    ]),
    stage('st_s3','Kreasi Bebas','✏️','Uji kreativitas',[
      lv('st_s3_l0','Tingkat 1','easy','Kreasi mudah', 'warna',       {count:5}),
      lv('st_s3_l1','Tingkat 2','mid', 'Kreasi sedang','warna_campur',{count:6}),
      lv('st_s3_l2','Tingkat 3','hard','Kreasi bebas', 'mixed_seni',  {count:7}),
    ]),
    stage('st_exam','Ujian Akhir','🏆','Ujian seni tinggi',[lv('st_exam_l0','Ujian','exam','10 soal','mixed_seni',{count:10})],true),
  ],

  /* ═══ IPA BARU ═══ */
  ipa_dasar: [
    stage('id_s1','Tubuh Kita','🧍','Kenali anggota tubuh & fungsinya',[
      lv('id_s1_l0','Tingkat 1','easy','Anggota tubuh luar',  'tubuh_ipa',{level:'easy',count:5}),
      lv('id_s1_l1','Tingkat 2','mid', 'Fungsi organ tubuh',  'tubuh_ipa',{level:'mid', count:6}),
      lv('id_s1_l2','Tingkat 3','hard','Organ dalam tubuh',   'tubuh_ipa',{level:'hard',count:7}),
    ]),
    stage('id_s2','Tumbuhan','🌱','Bagian & fungsi tumbuhan',[
      lv('id_s2_l0','Tingkat 1','easy','Bagian tumbuhan',      'tumbuhan_ipa',{level:'easy',count:5}),
      lv('id_s2_l1','Tingkat 2','mid', 'Fungsi bagian tumbuhan','tumbuhan_ipa',{level:'mid',count:6}),
      lv('id_s2_l2','Tingkat 3','hard','Proses tumbuhan',      'tumbuhan_ipa',{level:'hard',count:7}),
    ]),
    stage('id_s3','Hewan','🐾','Ciri & pengelompokan hewan',[
      lv('id_s3_l0','Tingkat 1','easy','Hewan darat & air',   'hewan_ipa',{level:'easy',count:5}),
      lv('id_s3_l1','Tingkat 2','mid', 'Cara berkembangbiak', 'hewan_ipa',{level:'mid', count:6}),
      lv('id_s3_l2','Tingkat 3','hard','Ciri khas hewan',     'hewan_ipa',{level:'hard',count:7}),
    ]),
    stage('id_exam','Ujian Akhir','🏆','Ujian IPA Dasar',[lv('id_exam_l0','Ujian','exam','10 soal','mixed_ipa_dasar',{count:10})],true),
  ],
  ipa_menengah: [
    stage('im_s1','Cuaca & Iklim','🌤️','Gejala alam & cuaca',[
      lv('im_s1_l0','Tingkat 1','easy','Jenis cuaca',  'cuaca_ipa',{level:'easy',count:5}),
      lv('im_s1_l1','Tingkat 2','mid', 'Gejala alam',  'cuaca_ipa',{level:'mid', count:6}),
      lv('im_s1_l2','Tingkat 3','hard','Siklus air',   'cuaca_ipa',{level:'hard',count:7}),
    ]),
    stage('im_s2','Materi & Benda','🧪','Sifat benda di sekitar kita',[
      lv('im_s2_l0','Tingkat 1','easy','Sifat benda',    'materi_ipa',{level:'easy',count:5}),
      lv('im_s2_l1','Tingkat 2','mid', 'Wujud benda',    'materi_ipa',{level:'mid', count:6}),
      lv('im_s2_l2','Tingkat 3','hard','Perubahan benda','materi_ipa',{level:'hard',count:7}),
    ]),
    stage('im_s3','Lingkungan','🌿','Menjaga lingkungan hidup',[
      lv('im_s3_l0','Tingkat 1','easy','Lingkungan bersih','lingkungan_ipa',{level:'easy',count:5}),
      lv('im_s3_l1','Tingkat 2','mid', 'Daur ulang',      'lingkungan_ipa',{level:'mid', count:6}),
      lv('im_s3_l2','Tingkat 3','hard','Ekosistem',       'lingkungan_ipa',{level:'hard',count:7}),
    ]),
    stage('im_exam','Ujian Akhir','🏆','Ujian IPA Menengah',[lv('im_exam_l0','Ujian','exam','10 soal','mixed_ipa_menengah',{count:10})],true),
  ],
  ipa_tinggi: [
    stage('it_s1','Energi & Gerak','⚡','Gaya, gerak & energi',[
      lv('it_s1_l0','Tingkat 1','easy','Jenis energi',  'energi_ipa',{level:'easy',count:5}),
      lv('it_s1_l1','Tingkat 2','mid', 'Sumber energi', 'energi_ipa',{level:'mid', count:6}),
      lv('it_s1_l2','Tingkat 3','hard','Energi & gerak','energi_ipa',{level:'hard',count:7}),
    ]),
    stage('it_s2','Tata Surya','🌙','Planet & benda langit',[
      lv('it_s2_l0','Tingkat 1','easy','Planet tata surya',   'tata_surya',{level:'easy',count:5}),
      lv('it_s2_l1','Tingkat 2','mid', 'Bulan & matahari',    'tata_surya',{level:'mid', count:6}),
      lv('it_s2_l2','Tingkat 3','hard','Benda langit lainnya','tata_surya',{level:'hard',count:7}),
    ]),
    stage('it_s3','Sains Lanjut','🔭','Konsep sains lanjutan',[
      lv('it_s3_l0','Tingkat 1','easy','Sains mudah',    'mixed_ipa_tinggi',{count:5}),
      lv('it_s3_l1','Tingkat 2','mid', 'Sains sedang',   'mixed_ipa_tinggi',{count:6}),
      lv('it_s3_l2','Tingkat 3','hard','Sains menantang','mixed_ipa_tinggi',{count:7}),
    ]),
    stage('it_exam','Ujian Akhir','🏆','Ujian IPA Tinggi',[lv('it_exam_l0','Ujian','exam','10 soal','mixed_ipa_tinggi',{count:10})],true),
  ],
};

export function getStages(subjectId, diffKey) {
  return CURRICULUM[`${subjectId}_${diffKey}`] || [];
}

export function isDiffUnlocked(subjectId, diffKey, completedLevels) {
  if (diffKey === 'dasar') return true;
  const prevKey = diffKey === 'menengah' ? 'dasar' : 'menengah';
  const prev = getStages(subjectId, prevKey).filter(s => !s.isExam);
  return prev.every(st => st.levels.some(l => completedLevels.includes(l.id)));
}