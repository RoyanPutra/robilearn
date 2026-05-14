/* ══════════════════════════════════════════════════════════
   questions.js — RobiLearn LENGKAP Minggu 3
   Semua soal + IPA + tipe baru
══════════════════════════════════════════════════════════ */
const rnd  = a => a[Math.floor(Math.random()*a.length)];
const shuf = a => [...a].sort(()=>Math.random()-.5);
const range= (a,b) => Math.floor(Math.random()*(b-a+1))+a;

/* ══ POOLS LAMA ══ */
const AE=[
  {e:'🐶',n:'Anjing',  o:['Anjing','Kucing','Kelinci','Hamster']},
  {e:'🐱',n:'Kucing',  o:['Kucing','Anjing','Tikus','Kelinci']},
  {e:'🐸',n:'Katak',   o:['Katak','Kadal','Ular','Buaya']},
  {e:'🐧',n:'Penguin', o:['Penguin','Bebek','Angsa','Burung']},
  {e:'🐔',n:'Ayam',    o:['Ayam','Bebek','Angsa','Kalkun']},
  {e:'🐷',n:'Babi',    o:['Babi','Sapi','Domba','Kambing']},
  {e:'🐮',n:'Sapi',    o:['Sapi','Kerbau','Banteng','Domba']},
  {e:'🐰',n:'Kelinci', o:['Kelinci','Tikus','Marmot','Hamster']},
  {e:'🐹',n:'Hamster', o:['Hamster','Tikus','Kelinci','Marmot']},
  {e:'🦆',n:'Bebek',   o:['Bebek','Angsa','Ayam','Kalkun']},
];
const AM=[
  {e:'🦁',n:'Singa',    o:['Singa','Harimau','Cheetah','Macan']},
  {e:'🐘',n:'Gajah',    o:['Gajah','Badak','Kuda Nil','Jerapah']},
  {e:'🦒',n:'Jerapah',  o:['Jerapah','Gajah','Zebra','Unta']},
  {e:'🐅',n:'Harimau',  o:['Harimau','Singa','Cheetah','Leopard']},
  {e:'🦓',n:'Zebra',    o:['Zebra','Kuda','Keledai','Kijang']},
  {e:'🦊',n:'Rubah',    o:['Rubah','Serigala','Anjing','Hyena']},
  {e:'🐻',n:'Beruang',  o:['Beruang','Gorila','Panda','Koala']},
  {e:'🦏',n:'Badak',    o:['Badak','Gajah','Kuda Nil','Bison']},
  {e:'🐊',n:'Buaya',    o:['Buaya','Biawak','Iguana','Komodo']},
  {e:'🦋',n:'Kupu-kupu',o:['Kupu-kupu','Ngengat','Capung','Lebah']},
];
const TP=[
  {e:'🌹',n:'Mawar',          o:['Mawar','Melati','Anggrek','Tulip']},
  {e:'🌻',n:'Bunga Matahari', o:['Bunga Matahari','Marigold','Dahlia','Kenanga']},
  {e:'🍎',n:'Apel',           o:['Apel','Pir','Persik','Anggur']},
  {e:'🍌',n:'Pisang',         o:['Pisang','Mangga','Pepaya','Durian']},
  {e:'🌽',n:'Jagung',         o:['Jagung','Wortel','Labu','Ubi']},
  {e:'🥦',n:'Brokoli',        o:['Brokoli','Kembang Kol','Kubis','Bayam']},
  {e:'🍓',n:'Stroberi',       o:['Stroberi','Ceri','Anggur','Raspberry']},
  {e:'🥕',n:'Wortel',         o:['Wortel','Lobak','Ubi','Jahe']},
  {e:'🍉',n:'Semangka',       o:['Semangka','Melon','Labu','Blewah']},
  {e:'🍊',n:'Jeruk',          o:['Jeruk','Lemon','Limau','Grapefruit']},
];
const TBP=[
  {e:'👁️',q:'Dipakai untuk melihat?',           a:'Mata',    o:['Mata','Hidung','Telinga','Mulut']},
  {e:'👃',q:'Dipakai untuk mencium bau?',        a:'Hidung',  o:['Hidung','Mata','Mulut','Telinga']},
  {e:'👂',q:'Dipakai untuk mendengar?',          a:'Telinga', o:['Telinga','Mata','Hidung','Rambut']},
  {e:'👄',q:'Dipakai untuk makan & bicara?',     a:'Mulut',   o:['Mulut','Hidung','Pipi','Telinga']},
  {e:'🦵',q:'Digunakan untuk berjalan?',         a:'Kaki',    o:['Kaki','Tangan','Bahu','Pinggang']},
  {e:'💪',q:'Digunakan untuk memegang benda?',   a:'Tangan',  o:['Tangan','Kaki','Jari Kaki','Bahu']},
  {e:'🦷',q:'Digunakan untuk mengunyah makanan?',a:'Gigi',    o:['Gigi','Lidah','Bibir','Mulut']},
  {e:'👅',q:'Digunakan untuk merasakan rasa?',   a:'Lidah',   o:['Lidah','Gigi','Bibir','Pipi']},
];
const TBK=[
  {e:'🏠',q:'Tempat tinggal kita?',              a:'Rumah',   o:['Rumah','Gedung','Toko','Kantor']},
  {e:'📚',q:'Tempat menyimpan pelajaran?',        a:'Buku',    o:['Buku','Tas','Pensil','Penghapus']},
  {e:'✏️',q:'Dipakai untuk menulis?',             a:'Pensil',  o:['Pensil','Pulpen','Spidol','Krayon']},
  {e:'🎒',q:'Dipakai untuk membawa buku?',        a:'Tas',     o:['Tas','Koper','Plastik','Keranjang']},
  {e:'⏰',q:'Dipakai untuk melihat waktu?',       a:'Jam',     o:['Jam','Kalender','HP','Komputer']},
  {e:'🌙',q:'Bersinar di langit malam?',          a:'Bulan',   o:['Bulan','Bintang','Matahari','Lampu']},
  {e:'☀️',q:'Bersinar di siang hari?',             a:'Matahari',o:['Matahari','Bulan','Bintang','Lampu']},
  {e:'🚌',q:'Kendaraan umum untuk banyak orang?', a:'Bus',     o:['Bus','Angkot','Truk','Kereta']},
  {e:'✈️',q:'Kendaraan yang terbang di langit?',  a:'Pesawat', o:['Pesawat','Balon','Helikopter','Roket']},
  {e:'🪑',q:'Dipakai untuk duduk?',               a:'Kursi',   o:['Kursi','Meja','Sofa','Bangku']},
  {e:'🛏️',q:'Dipakai untuk tidur?',               a:'Kasur',   o:['Kasur','Bantal','Selimut','Sofa']},
];
const PP=[
  {e:'👨‍⚕️',n:'Dokter',   o:['Dokter','Perawat','Bidan','Apoteker']},
  {e:'👩‍🏫',n:'Guru',     o:['Guru','Dosen','Pengasuh','Konselor']},
  {e:'👮', n:'Polisi',   o:['Polisi','Satpam','Tentara','Pemadam']},
  {e:'👨‍🍳',n:'Koki',     o:['Koki','Pelayan','Kasir','Pramusaji']},
  {e:'👨‍🌾',n:'Petani',   o:['Petani','Nelayan','Peternak','Kuli']},
  {e:'✈️', n:'Pilot',    o:['Pilot','Kopilot','Pramugari','Teknisi']},
  {e:'👨‍🚒',n:'Pemadam',  o:['Pemadam Kebakaran','Polisi','Satpam','Tentara']},
  {e:'👨‍🔧',n:'Mekanik',  o:['Mekanik','Teknisi','Tukang','Insinyur']},
  {e:'👨‍⚖️',n:'Hakim',    o:['Hakim','Jaksa','Pengacara','Notaris']},
];
const TRP=[
  {e:'🚗', n:'Mobil',      cat:'darat',o:['Mobil','Motor','Truk','Bus']},
  {e:'🚌', n:'Bus',        cat:'darat',o:['Bus','Truk','Mobil','Angkot']},
  {e:'🚂', n:'Kereta',     cat:'darat',o:['Kereta','Trem','MRT','LRT']},
  {e:'🏍️', n:'Motor',      cat:'darat',o:['Motor','Mobil','Sepeda','Skuter']},
  {e:'🚲', n:'Sepeda',     cat:'darat',o:['Sepeda','Motor','Skuter','Becak']},
  {e:'✈️', n:'Pesawat',    cat:'udara',o:['Pesawat','Helikopter','Balon','Roket']},
  {e:'🚁', n:'Helikopter', cat:'udara',o:['Helikopter','Pesawat','Drone','Balon']},
  {e:'⛵', n:'Perahu',     cat:'air',  o:['Perahu','Kapal','Sampan','Feri']},
  {e:'🚢', n:'Kapal',      cat:'air',  o:['Kapal','Perahu','Feri','Yacht']},
];
const MKP=[
  {e:'🍚',n:'Nasi',    cat:'makanan'},{e:'🍜',n:'Mie',     cat:'makanan'},
  {e:'🍞',n:'Roti',    cat:'makanan'},{e:'🍳',n:'Telur',   cat:'makanan'},
  {e:'🥕',n:'Wortel',  cat:'sayur'  },{e:'🥦',n:'Brokoli', cat:'sayur'  },
  {e:'🌽',n:'Jagung',  cat:'sayur'  },{e:'🍆',n:'Terong',  cat:'sayur'  },
  {e:'🍎',n:'Apel',    cat:'buah'   },{e:'🍌',n:'Pisang',  cat:'buah'   },
  {e:'🍊',n:'Jeruk',   cat:'buah'   },{e:'🍉',n:'Semangka',cat:'buah'   },
  {e:'🍓',n:'Stroberi',cat:'buah'   },{e:'🍇',n:'Anggur',  cat:'buah'   },
];
const ALP=[
  {e:'⛈️',q:'Cuaca dengan hujan deras & petir?', a:'Badai',       o:['Badai','Hujan','Mendung','Gerimis']},
  {e:'🌈',q:'Muncul setelah hujan di langit?',   a:'Pelangi',     o:['Pelangi','Aurora','Awan','Sinar']},
  {e:'🌋',q:'Gunung yang mengeluarkan lahar?',   a:'Gunung Berapi',o:['Gunung Berapi','Gunung','Bukit','Tebing']},
  {e:'❄️',q:'Butiran es putih dari langit?',      a:'Salju',       o:['Salju','Hujan Es','Embun','Kabut']},
  {e:'🌤️',q:'Cuaca cerah dengan sedikit awan?',  a:'Cerah',       o:['Cerah','Mendung','Berawan','Gerimis']},
  {e:'🌊',q:'Gelombang besar di lautan?',         a:'Ombak',       o:['Ombak','Banjir','Tsunami','Badai']},
  {e:'🌪️',q:'Angin yang berputar sangat kencang?',a:'Tornado',    o:['Tornado','Badai','Topan','Angin']},
];
const SNP=[
  {e:'🌈',q:'Berapa jumlah warna dalam pelangi?',    a:'7',          o:['7','5','6','8']},
  {e:'🌍',q:'Planet kita bernama?',                  a:'Bumi',       o:['Bumi','Mars','Venus','Jupiter']},
  {e:'💧',q:'Air membeku menjadi?',                  a:'Es',         o:['Es','Uap','Embun','Kabut']},
  {e:'🌿',q:'Tumbuhan butuh apa untuk berfotosintesis?',a:'Cahaya Matahari',o:['Cahaya Matahari','Air Hujan','Angin','Tanah']},
  {e:'🕷️',q:'Berapa jumlah kaki laba-laba?',          a:'8',          o:['8','6','4','10']},
  {e:'🐝',q:'Serangga penghasil madu?',              a:'Lebah',      o:['Lebah','Kupu-kupu','Semut','Lalat']},
  {e:'🌙',q:'Benda langit yang bersinar di malam hari?',a:'Bulan',   o:['Bulan','Bintang','Matahari','Planet']},
  {e:'🌱',q:'Bagian tumbuhan yang menyerap air?',    a:'Akar',       o:['Akar','Daun','Batang','Bunga']},
  {e:'🦋',q:'Serangga yang bermetamorfosis dari ulat?',a:'Kupu-kupu',o:['Kupu-kupu','Ngengat','Capung','Lebah']},
  {e:'🌞',q:'Bintang terdekat dengan Bumi?',         a:'Matahari',   o:['Matahari','Bulan','Venus','Mars']},
];
const BTP=[
  {n:'Lingkaran',      svg:'<circle cx="60" cy="60" r="50" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/>'},
  {n:'Segitiga',       svg:'<polygon points="60,10 110,110 10,110" fill="#22C55E" stroke="#15803D" stroke-width="4"/>'},
  {n:'Persegi',        svg:'<rect x="10" y="10" width="100" height="100" fill="#F59E0B" stroke="#B45309" stroke-width="4"/>'},
  {n:'Bintang',        svg:'<polygon points="60,10 72,45 108,45 79,68 89,103 60,82 31,103 41,68 12,45 48,45" fill="#8B5CF6" stroke="#6D28D9" stroke-width="3"/>'},
  {n:'Persegi Panjang',svg:'<rect x="5" y="30" width="110" height="60" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>'},
  {n:'Belah Ketupat',  svg:'<polygon points="60,10 110,60 60,110 10,60" fill="#EC4899" stroke="#BE185D" stroke-width="4"/>'},
];
const HP=[
  {h:'A',e:'🍎',k:'Apel'},{h:'B',e:'🎈',k:'Balon'},{h:'C',e:'🐛',k:'Cacing'},
  {h:'D',e:'🐑',k:'Domba'},{h:'E',e:'🦅',k:'Elang'},{h:'G',e:'🐘',k:'Gajah'},
  {h:'H',e:'🌧️',k:'Hujan'},{h:'I',e:'🐟',k:'Ikan'},{h:'J',e:'🦒',k:'Jerapah'},
  {h:'K',e:'🐱',k:'Kucing'},{h:'L',e:'🪰',k:'Lalat'},{h:'M',e:'🌙',k:'Malam'},
  {h:'N',e:'🎶',k:'Nada'},{h:'P',e:'🌴',k:'Pohon'},{h:'R',e:'🏠',k:'Rumah'},
  {h:'S',e:'🦁',k:'Singa'},{h:'T',e:'🌻',k:'Tulip'},{h:'U',e:'🐛',k:'Ulat'},
  {h:'W',e:'🍉',k:'Warung'},{h:'Z',e:'🦓',k:'Zebra'},
];
const KP=[
  {e:'🐈',k:'KUCING',  s:['ANJING','BURUNG','TIKUS']},
  {e:'🍎',k:'APEL',    s:['JERUK','PEPAYA','MANGGA']},
  {e:'☀️',k:'MATAHARI',s:['BULAN','BINTANG','AWAN']},
  {e:'🏠',k:'RUMAH',   s:['GEDUNG','SEKOLAH','TOKO']},
  {e:'🌻',k:'BUNGA',   s:['POHON','DAUN','AKAR']},
  {e:'✈️',k:'PESAWAT', s:['KAPAL','KERETA','MOBIL']},
  {e:'🐘',k:'GAJAH',   s:['SINGA','ZEBRA','JERAPAH']},
  {e:'🍌',k:'PISANG',  s:['MANGGA','JERUK','APEL']},
  {e:'🚗',k:'MOBIL',   s:['MOTOR','TRUK','BUS']},
  {e:'📚',k:'BUKU',    s:['TAS','PENSIL','PENGHAPUS']},
  {e:'🌊',k:'OMBAK',   s:['SUNGAI','DANAU','RAWA']},
  {e:'🎈',k:'BALON',   s:['BOLA','LAYANG','KELERENG']},
];
const LKP=[
  {k:'Besar',  l:'Kecil', o:['Kecil','Tinggi','Lebar','Lurus']},
  {k:'Panas',  l:'Dingin',o:['Dingin','Sejuk','Beku','Basah']},
  {k:'Cerah',  l:'Gelap', o:['Gelap','Mendung','Redup','Suram']},
  {k:'Cepat',  l:'Lambat',o:['Lambat','Pelan','Santai','Diam']},
  {k:'Tinggi', l:'Rendah',o:['Rendah','Pendek','Kecil','Datar']},
  {k:'Panjang',l:'Pendek',o:['Pendek','Kecil','Tipis','Sempit']},
  {k:'Terang', l:'Redup', o:['Redup','Gelap','Suram','Pudar']},
  {k:'Kuat',   l:'Lemah', o:['Lemah','Loyo','Lelah','Lunglai']},
  {k:'Kaya',   l:'Miskin',o:['Miskin','Susah','Sederhana','Papa']},
  {k:'Benar',  l:'Salah', o:['Salah','Keliru','Tidak Tepat','Beda']},
  {k:'Senang', l:'Sedih', o:['Sedih','Murung','Menangis','Duka']},
];
const LAWAN_LANJUT=[
  {k:'Rajin',  l:'Malas',   o:['Malas','Sibuk','Diam','Santai']},
  {k:'Jujur',  l:'Bohong',  o:['Bohong','Salah','Keliru','Dusta']},
  {k:'Berani', l:'Pengecut',o:['Pengecut','Malu','Ragu','Takut']},
  {k:'Tebal',  l:'Tipis',   o:['Tipis','Kurus','Ramping','Pipih']},
  {k:'Awal',   l:'Akhir',   o:['Akhir','Tengah','Belakang','Selesai']},
  {k:'Siang',  l:'Malam',   o:['Malam','Sore','Petang','Dini Hari']},
  {k:'Atas',   l:'Bawah',   o:['Bawah','Tengah','Samping','Belakang']},
  {k:'Keras',  l:'Lunak',   o:['Lunak','Lembek','Halus','Lentur']},
  {k:'Diam',   l:'Berisik', o:['Berisik','Bising','Ramai','Gaduh']},
  {k:'Lurus',  l:'Bengkok', o:['Bengkok','Belok','Menikung','Bergelombang']},
];
const KALIMAT_POOL=[
  {q:'Kata yang tepat: "Saya ___ ke sekolah naik bus"', a:'pergi',  o:['pergi','datang','tiba','pulang'],   icon:'🚌'},
  {q:'Pilih kata benda: meja, berlari, merah, indah',   a:'meja',   o:['meja','berlari','merah','indah'],   icon:'🪑'},
  {q:'Pilih kata kerja: tidur, buku, panas, biru',      a:'tidur',  o:['tidur','buku','panas','biru'],      icon:'😴'},
  {q:'Pilih kata sifat: cantik, berlari, meja, rumah',  a:'cantik', o:['cantik','berlari','meja','rumah'],  icon:'✨'},
  {q:'"Andi ___ nasi goreng dengan lahap" — kata yang tepat?',a:'makan',o:['makan','minum','melihat','membeli'],icon:'🍳'},
  {q:'Kalimat tanya diakhiri dengan tanda?',            a:'Tanda Tanya', o:['Tanda Tanya','Titik','Koma','Seru'], icon:'❓'},
  {q:'Kalimat perintah biasanya diakhiri dengan tanda?',a:'Seru',   o:['Seru','Tanya','Titik','Koma'],     icon:'❗'},
];
const SIN=[
  {k:'Besar',  a:'Raksasa', o:['Raksasa','Kecil','Tipis','Ringan']},
  {k:'Cantik', a:'Indah',   o:['Indah','Jelek','Polos','Biasa']},
  {k:'Senang', a:'Bahagia', o:['Bahagia','Sedih','Marah','Bingung']},
  {k:'Pintar', a:'Cerdas',  o:['Cerdas','Bodoh','Malas','Nakal']},
  {k:'Cepat',  a:'Kilat',   o:['Kilat','Lambat','Pelan','Santai']},
  {k:'Takut',  a:'Gentar',  o:['Gentar','Berani','Santai','Tenang']},
  {k:'Marah',  a:'Murka',   o:['Murka','Senang','Sedih','Diam']},
  {k:'Lelah',  a:'Capek',   o:['Capek','Segar','Kuat','Bersemangat']},
];
const WP=[
  {e:'🔴',n:'Merah', o:['Merah','Biru','Hijau','Kuning']},
  {e:'🔵',n:'Biru',  o:['Biru','Merah','Ungu','Hijau']},
  {e:'🟢',n:'Hijau', o:['Hijau','Kuning','Biru','Merah']},
  {e:'🟡',n:'Kuning',o:['Kuning','Oranye','Merah','Hijau']},
  {e:'🟠',n:'Oranye',o:['Oranye','Merah','Kuning','Coklat']},
  {e:'🟣',n:'Ungu',  o:['Ungu','Pink','Biru','Merah']},
  {e:'⬛',n:'Hitam', o:['Hitam','Abu-abu','Putih','Coklat']},
  {e:'⬜',n:'Putih', o:['Putih','Krem','Abu-abu','Silver']},
  {e:'🟤',n:'Coklat',o:['Coklat','Merah','Hitam','Abu-abu']},
];
const WCP=[
  {q:'Merah + Kuning = ?',a:'Oranye',  o:['Oranye','Hijau','Ungu','Coklat']},
  {q:'Biru + Kuning = ?', a:'Hijau',   o:['Hijau','Ungu','Coklat','Merah']},
  {q:'Merah + Biru = ?',  a:'Ungu',    o:['Ungu','Coklat','Hitam','Hijau']},
  {q:'Merah + Putih = ?', a:'Pink',    o:['Pink','Oranye muda','Salmon','Ungu muda']},
  {q:'Hitam + Putih = ?', a:'Abu-abu', o:['Abu-abu','Krem','Coklat muda','Silver']},
  {q:'Biru + Putih = ?',  a:'Biru Muda',o:['Biru Muda','Hijau Muda','Ungu Muda','Pink']},
  {q:'Kuning + Putih = ?',a:'Krem',    o:['Krem','Kuning Muda','Emas','Gading']},
];
const AMP=[
  {e:'🎹',n:'Piano',   o:['Piano','Gitar','Biola','Drum']},
  {e:'🎸',n:'Gitar',   o:['Gitar','Bass','Ukulele','Mandolin']},
  {e:'🥁',n:'Drum',    o:['Drum','Bedug','Kendang','Gendang']},
  {e:'🎺',n:'Terompet',o:['Terompet','Seruling','Saxophone','Klarinet']},
  {e:'🎻',n:'Biola',   o:['Biola','Cello','Viola','Kontrabas']},
  {e:'🪗',n:'Akordeon',o:['Akordeon','Piano','Harmonika','Organ']},
  {e:'🎷',n:'Saxophone',o:['Saxophone','Terompet','Klarinet','Seruling']},
  {e:'🪘',n:'Kendang', o:['Kendang','Drum','Bedug','Gendang']},
];
const SBP=[
  {e:'💃',q:'Tari daerah Jawa yang terkenal?',    a:'Tari Serimpi',o:['Tari Serimpi','Tari Saman','Tari Kecak','Tari Pendet']},
  {e:'🪘',q:'Alat musik tradisional Jawa?',        a:'Gamelan',    o:['Gamelan','Angklung','Kolintang','Sasando']},
  {e:'🏮',q:'Batik adalah kain khas dari negara?', a:'Indonesia',  o:['Indonesia','Malaysia','Thailand','Filipina']},
  {e:'🎪',q:'Tari Saman berasal dari daerah?',     a:'Aceh',       o:['Aceh','Bali','Jawa','Sulawesi']},
  {e:'🎭',q:'Wayang adalah kesenian dari?',        a:'Jawa',       o:['Jawa','Bali','Sunda','Betawi']},
  {e:'🎨',q:'Angklung adalah alat musik dari?',    a:'Sunda',      o:['Sunda','Jawa','Bali','Batak']},
  {e:'🎵',q:'Lagu daerah "Apuse" berasal dari?',   a:'Papua',      o:['Papua','Maluku','NTT','Sulawesi']},
];
const EKP=[
  {e:'😊',n:'Senang',  o:['Senang','Sedih','Marah','Takut']},
  {e:'😢',n:'Sedih',   o:['Sedih','Senang','Kaget','Bingung']},
  {e:'😡',n:'Marah',   o:['Marah','Senang','Sedih','Malu']},
  {e:'😨',n:'Takut',   o:['Takut','Berani','Senang','Santai']},
  {e:'🤔',n:'Bingung', o:['Bingung','Pikir','Penasaran','Ragu']},
  {e:'😲',n:'Kaget',   o:['Kaget','Senang','Takut','Bingung']},
  {e:'😴',n:'Ngantuk', o:['Ngantuk','Lelah','Malas','Bosan']},
  {e:'🤩',n:'Kagum',   o:['Kagum','Senang','Bersemangat','Antusias']},
];
const POLA_ANGKA=[
  {q:'2, 4, 6, 8, ... ?',    a:'10',o:['10','9','11','12'],  icon:'🔢'},
  {q:'5, 10, 15, 20, ... ?', a:'25',o:['25','22','24','30'], icon:'🔢'},
  {q:'1, 3, 5, 7, ... ?',    a:'9', o:['8','9','10','11'],   icon:'🔢'},
  {q:'10, 20, 30, 40, ... ?',a:'50',o:['45','50','55','60'], icon:'🔢'},
  {q:'3, 6, 9, 12, ... ?',   a:'15',o:['13','14','15','16'], icon:'🔢'},
  {q:'2, 4, 8, 16, ... ?',   a:'32',o:['24','30','32','36'], icon:'🔢'},
  {q:'100, 90, 80, 70, ... ?',a:'60',o:['50','60','65','70'],icon:'🔢'},
  {q:'1, 4, 9, 16, ... ?',   a:'25',o:['20','24','25','36'], icon:'🔢'},
];
const BANGUN_DATAR=[
  {q:'Persegi memiliki berapa sisi?',        a:'4',   o:['3','4','5','6'],  icon:'🟦'},
  {q:'Segitiga memiliki berapa sudut?',       a:'3',   o:['2','3','4','5'],  icon:'🔺'},
  {q:'Lingkaran memiliki berapa sisi?',       a:'0',   o:['0','1','2','4'],  icon:'⭕'},
  {q:'Persegi panjang memiliki berapa sisi?', a:'4',   o:['2','3','4','6'],  icon:'▬'},
  {q:'Bangun datar dengan 3 sisi disebut?',   a:'Segitiga',o:['Lingkaran','Segitiga','Persegi','Trapesium'],icon:'🔺'},
  {q:'Bangun dengan 4 sisi sama panjang?',    a:'Persegi',o:['Persegi','Persegi Panjang','Belah Ketupat','Trapesium'],icon:'🟦'},
  {q:'Bangun tidak memiliki sudut?',          a:'Lingkaran',o:['Lingkaran','Segitiga','Persegi','Oval'],icon:'⭕'},
];
const NADA_MUSIK=[
  {q:'Nada pertama dalam tangga nada?',         a:'Do',    o:['Do','Re','Mi','La'],     icon:'🎵'},
  {q:'Nada setelah "Do" adalah?',               a:'Re',    o:['Re','Mi','Fa','Sol'],    icon:'🎵'},
  {q:'Berapa jumlah nada dalam tangga nada?',   a:'7',     o:['5','6','7','8'],         icon:'🎼'},
  {q:'"Do Re Mi Fa Sol ..." selanjutnya?',      a:'La',    o:['La','Si','Do','Ti'],     icon:'🎵'},
  {q:'Alat musik yang dipukul disebut?',         a:'Perkusi',o:['Perkusi','Tiup','Gesek','Petik'],icon:'🥁'},
  {q:'Biola dimainkan dengan cara?',             a:'Digesek',o:['Digesek','Dipetik','Ditiup','Dipukul'],icon:'🎻'},
  {q:'Gitar dimainkan dengan cara?',             a:'Dipetik',o:['Dipetik','Digesek','Ditiup','Dipukul'],icon:'🎸'},
  {q:'Terompet dimainkan dengan cara?',          a:'Ditiup', o:['Ditiup','Dipetik','Digesek','Dipukul'],icon:'🎺'},
];
const PROVINSI_POOL=[
  {q:'Ibukota provinsi Jawa Barat?',      a:'Bandung',      o:['Bandung','Jakarta','Surabaya','Semarang'],  icon:'🗺️'},
  {q:'Pulau terbesar di Indonesia?',      a:'Kalimantan',   o:['Kalimantan','Sumatera','Jawa','Papua'],     icon:'🏝️'},
  {q:'Ibukota negara Indonesia?',         a:'Jakarta',      o:['Jakarta','Bandung','Surabaya','Bali'],      icon:'🇮🇩'},
  {q:'Bahasa resmi Indonesia adalah?',    a:'Bahasa Indonesia',o:['Bahasa Indonesia','Bahasa Jawa','Bahasa Melayu','Bahasa Sunda'],icon:'🗣️'},
  {q:'Mata uang Indonesia adalah?',       a:'Rupiah',       o:['Rupiah','Dolar','Ringgit','Yen'],           icon:'💰'},
  {q:'Lagu kebangsaan Indonesia adalah?', a:'Indonesia Raya',o:['Indonesia Raya','Garuda Pancasila','Hymne Guru','Bagimu Negeri'],icon:'🎵'},
  {q:'Pancasila memiliki berapa sila?',   a:'5',            o:['3','4','5','6'],                            icon:'🦅'},
  {q:'Lambang negara Indonesia adalah?',  a:'Garuda',       o:['Garuda','Harimau','Gajah','Komodo'],       icon:'🦅'},
];

/* ══ IPA POOLS ══ */
const TUBUH_IPA={
  easy:[
    {q:'Organ yang memompa darah?',         a:'Jantung',   o:['Jantung','Paru-paru','Hati','Ginjal'],  icon:'🫀'},
    {q:'Organ untuk bernafas?',             a:'Paru-paru', o:['Paru-paru','Jantung','Hati','Lambung'], icon:'🫁'},
    {q:'Tulang belakang fungsinya?',        a:'Menopang tubuh',o:['Menopang tubuh','Memompa darah','Mencerna makanan','Bernafas'],icon:'🦴'},
    {q:'Makanan dicerna di?',               a:'Lambung',   o:['Lambung','Jantung','Paru-paru','Ginjal'],icon:'🍽️'},
    {q:'Ginjal fungsinya menyaring?',       a:'Darah',     o:['Darah','Makanan','Udara','Air'],         icon:'🫘'},
  ],
  mid:[
    {q:'Otak terletak di dalam?',           a:'Kepala',    o:['Kepala','Dada','Perut','Punggung'],     icon:'🧠'},
    {q:'Berapa jumlah gigi susu anak-anak?',a:'20',        o:['16','18','20','24'],                    icon:'🦷'},
    {q:'Darah berwarna merah karena?',      a:'Hemoglobin',o:['Hemoglobin','Klorofil','Melanin','Albumin'],icon:'🩸'},
    {q:'Tulang pelindung otak disebut?',    a:'Tengkorak', o:['Tengkorak','Rusuk','Tulang Belakang','Pelvis'],icon:'💀'},
    {q:'Vitamin dari sinar matahari?',      a:'Vitamin D', o:['Vitamin D','Vitamin C','Vitamin A','Vitamin B'],icon:'☀️'},
  ],
  hard:[
    {q:'Hormon pengatur gula darah?',       a:'Insulin',   o:['Insulin','Adrenalin','Tiroksin','Estrogen'],icon:'💉'},
    {q:'Jaringan penghubung otot ke tulang?',a:'Tendon',   o:['Tendon','Ligamen','Kartilago','Fasia'],  icon:'🦵'},
    {q:'Menghirup O2, mengeluarkan CO2 disebut?',a:'Respirasi',o:['Respirasi','Fotosintesis','Metabolisme','Sirkulasi'],icon:'💨'},
  ],
};
const TUMBUHAN_IPA={
  easy:[
    {q:'Tumbuhan membuat makanan dengan?',  a:'Fotosintesis',o:['Fotosintesis','Respirasi','Fermentasi','Metabolisme'],icon:'🌿'},
    {q:'Bagian tumbuhan yang menyerap air?',a:'Akar',       o:['Akar','Batang','Daun','Bunga'],         icon:'🌱'},
    {q:'Bagian tumbuhan mengangkut air?',   a:'Batang',     o:['Batang','Akar','Daun','Buah'],          icon:'🌳'},
    {q:'Tumbuhan berfotosintesis menggunakan?',a:'Sinar Matahari',o:['Sinar Matahari','Bulan','Lampu','Api'],icon:'☀️'},
    {q:'Warna daun hijau karena?',          a:'Klorofil',   o:['Klorofil','Hemoglobin','Melanin','Karotin'],icon:'🍃'},
  ],
  mid:[
    {q:'Tumbuhan mengeluarkan air lewat daun?',a:'Transpirasi',o:['Transpirasi','Respirasi','Fotosintesis','Evaporasi'],icon:'💧'},
    {q:'Gas dihasilkan tumbuhan saat fotosintesis?',a:'Oksigen',o:['Oksigen','Karbondioksida','Nitrogen','Hidrogen'],icon:'💨'},
    {q:'Tumbuhan tidak punya akar & daun sejati?',a:'Lumut',o:['Lumut','Paku','Jamur','Alga'],           icon:'🌿'},
  ],
  hard:[
    {q:'Tumbuhan karnivora yang terkenal?',  a:'Kantong Semar',o:['Kantong Semar','Kaktus','Lidah Buaya','Rafflesia'],icon:'🌺'},
    {q:'Proses tumbuhan menghasilkan biji?', a:'Penyerbukan',o:['Penyerbukan','Fotosintesis','Transpirasi','Respirasi'],icon:'🌸'},
  ],
};
const HEWAN_IPA={
  easy:[
    {q:'Hewan yang bertelur dan hidup darat & air?',a:'Katak',o:['Katak','Ayam','Ular','Penyu'],         icon:'🐸'},
    {q:'Hewan mamalia adalah hewan yang?',a:'Menyusui anaknya',o:['Menyusui anaknya','Bertelur','Bersisik','Terbang'],icon:'🐄'},
    {q:'Hewan yang bisa berubah warna kulit?',a:'Bunglon',o:['Bunglon','Kadal','Iguana','Komodo'],        icon:'🦎'},
    {q:'Hewan yang hidupnya di air?',       a:'Ikan',      o:['Ikan','Katak','Buaya','Penyu'],           icon:'🐟'},
    {q:'Hewan yang tidur di musim dingin?',  a:'Beruang',  o:['Beruang','Singa','Gajah','Jerapah'],      icon:'🐻'},
  ],
  mid:[
    {q:'Proses ulat menjadi kupu-kupu?',    a:'Metamorfosis',o:['Metamorfosis','Evolusi','Adaptasi','Migrasi'],icon:'🦋'},
    {q:'Hewan berkembangbiak dengan bertelur disebut?',a:'Ovipar',o:['Ovipar','Vivipar','Ovovivipar','Hermafrodit'],icon:'🥚'},
    {q:'Hewan berkembangbiak dengan melahirkan?',a:'Vivipar',o:['Vivipar','Ovipar','Ovovivipar','Hermaprodit'],icon:'🐣'},
    {q:'Kelelawar mencari makan menggunakan?',a:'Ekolokasi',o:['Ekolokasi','Mata','Hidung','Kumis'],      icon:'🦇'},
  ],
  hard:[
    {q:'Organ bernafas ikan adalah?',       a:'Insang',    o:['Insang','Paru-paru','Kulit','Trakea'],    icon:'🐟'},
    {q:'Lebah menghasilkan madu dari?',     a:'Nektar Bunga',o:['Nektar Bunga','Sari Buah','Embun','Air'],icon:'🐝'},
  ],
};
const CUACA_IPA={
  easy:[
    {q:'Alat pengukur suhu udara?',         a:'Termometer',o:['Termometer','Barometer','Higrometer','Anemometer'],icon:'🌡️'},
    {q:'Hujan terjadi karena awan mengandung?',a:'Air',    o:['Air','Debu','Asap','Gas'],               icon:'🌧️'},
    {q:'Angin adalah udara yang?',           a:'Bergerak', o:['Bergerak','Diam','Panas','Dingin'],      icon:'💨'},
    {q:'Pelangi muncul setelah?',            a:'Hujan',    o:['Hujan','Angin','Badai','Mendung'],       icon:'🌈'},
  ],
  mid:[
    {q:'Gas paling banyak di atmosfer bumi?',a:'Nitrogen', o:['Nitrogen','Oksigen','CO2','Hidrogen'],   icon:'💨'},
    {q:'Lapisan udara yang menyelimuti bumi?',a:'Atmosfer',o:['Atmosfer','Hidrosfer','Litosfer','Biosfer'],icon:'🌍'},
    {q:'Proses penguapan air laut jadi awan?',a:'Evaporasi',o:['Evaporasi','Kondensasi','Presipitasi','Infiltrasi'],icon:'☁️'},
  ],
  hard:[
    {q:'Fenomena penyebab pemanasan global?',a:'Efek Rumah Kaca',o:['Efek Rumah Kaca','El Nino','La Nina','Ozon'],icon:'🌡️'},
    {q:'Proses air dari awan jatuh ke bumi?',a:'Presipitasi',o:['Presipitasi','Evaporasi','Kondensasi','Sublimasi'],icon:'🌧️'},
  ],
};
const MATERI_IPA={
  easy:[
    {q:'Benda yang bentuknya tetap?',       a:'Padat',    o:['Padat','Cair','Gas','Plasma'],            icon:'🪨'},
    {q:'Benda cair mengikuti bentuk?',      a:'Wadahnya', o:['Wadahnya','Dirinya','Beratnya','Volumenya'],icon:'💧'},
    {q:'Es batu adalah air dalam wujud?',   a:'Padat',    o:['Padat','Cair','Gas','Plasma'],            icon:'🧊'},
    {q:'Air mendidih berubah menjadi?',     a:'Uap',      o:['Uap','Es','Padat','Minyak'],              icon:'♨️'},
  ],
  mid:[
    {q:'Perubahan cair menjadi padat?',     a:'Membeku',  o:['Membeku','Mencair','Menguap','Menyublim'], icon:'❄️'},
    {q:'Perubahan padat menjadi cair?',     a:'Mencair',  o:['Mencair','Membeku','Menguap','Mengkristal'],icon:'💧'},
    {q:'Perubahan cair menjadi gas?',       a:'Menguap',  o:['Menguap','Membeku','Mencair','Menyublim'], icon:'♨️'},
  ],
  hard:[
    {q:'Sifat benda bisa kembali ke bentuk semula?',a:'Elastis',o:['Elastis','Plastis','Kaku','Rapuh'],  icon:'🪀'},
    {q:'Perubahan padat langsung jadi gas?', a:'Menyublim',o:['Menyublim','Menguap','Mencair','Membeku'],icon:'💨'},
  ],
};
const LINGKUNGAN_IPA={
  easy:[
    {q:'Membuang sampah sebaiknya di?',     a:'Tempat sampah',o:['Tempat sampah','Sungai','Jalan','Tanah'],icon:'🗑️'},
    {q:'Membakar sampah menyebabkan?',      a:'Polusi Udara',o:['Polusi Udara','Banjir','Gempa','Tsunami'],icon:'🔥'},
    {q:'Menanam pohon bermanfaat untuk?',   a:'Mengurangi Polusi',o:['Mengurangi Polusi','Membuat Panas','Menghalangi Hujan','Merusak Tanah'],icon:'🌳'},
  ],
  mid:[
    {q:'Hewan pemakan tumbuhan disebut?',   a:'Herbivora', o:['Herbivora','Karnivora','Omnivora','Predator'],icon:'🐄'},
    {q:'Hewan pemakan daging disebut?',     a:'Karnivora', o:['Karnivora','Herbivora','Omnivora','Dekomposer'],icon:'🦁'},
    {q:'Manusia termasuk hewan?',           a:'Omnivora',  o:['Omnivora','Herbivora','Karnivora','Insektivora'],icon:'🧑'},
    {q:'Hubungan saling menguntungkan antar makhluk hidup?',a:'Simbiosis Mutualisme',o:['Simbiosis Mutualisme','Parasitisme','Komensalisme','Predasi'],icon:'🌺'},
  ],
  hard:[
    {q:'Rantai makanan dimulai dari?',      a:'Produsen (Tumbuhan)',o:['Produsen (Tumbuhan)','Konsumen','Dekomposer','Predator'],icon:'🌿'},
    {q:'Organisme pengurai sisa makhluk hidup?',a:'Dekomposer',o:['Dekomposer','Produsen','Konsumen','Predator'],icon:'🍄'},
  ],
};
const ENERGI_IPA={
  easy:[
    {q:'Sumber energi terbesar di bumi?',   a:'Matahari',  o:['Matahari','Angin','Air','Api'],          icon:'☀️'},
    {q:'Lampu mengubah energi listrik menjadi?',a:'Energi Cahaya',o:['Energi Cahaya','Energi Panas','Energi Gerak','Energi Bunyi'],icon:'💡'},
    {q:'Kipas angin mengubah listrik menjadi?',a:'Energi Gerak',o:['Energi Gerak','Energi Cahaya','Energi Panas','Energi Bunyi'],icon:'🌀'},
    {q:'Energi tidak akan habis disebut?',  a:'Energi Terbarukan',o:['Energi Terbarukan','Energi Fosil','Energi Nuklir','Energi Batu Bara'],icon:'♻️'},
  ],
  mid:[
    {q:'Baterai menyimpan energi dalam bentuk?',a:'Kimia', o:['Kimia','Listrik','Panas','Cahaya'],      icon:'🔋'},
    {q:'Panel surya mengubah matahari menjadi?',a:'Listrik',o:['Listrik','Panas','Gerak','Bunyi'],      icon:'☀️'},
    {q:'Energi panas bumi disebut?',        a:'Geotermal',  o:['Geotermal','Geoenergi','Fosil','Surya'],icon:'🌋'},
  ],
  hard:[
    {q:'Proses pembelahan atom untuk energi?',a:'Fisi Nuklir',o:['Fisi Nuklir','Fusi Nuklir','Reaksi Kimia','Pembakaran'],icon:'⚛️'},
  ],
};
const TATA_SURYA={
  easy:[
    {q:'Planet terdekat dengan matahari?',  a:'Merkurius',  o:['Merkurius','Venus','Bumi','Mars'],      icon:'🪐'},
    {q:'Planet terbesar di tata surya?',    a:'Jupiter',    o:['Jupiter','Saturnus','Uranus','Neptunus'],icon:'🪐'},
    {q:'Bumi adalah planet ke berapa?',     a:'Ketiga',     o:['Kedua','Ketiga','Keempat','Kelima'],    icon:'🌍'},
    {q:'Satelit alami bumi adalah?',        a:'Bulan',      o:['Bulan','Mars','Venus','Merkurius'],     icon:'🌙'},
  ],
  mid:[
    {q:'Planet yang memiliki cincin indah?',a:'Saturnus',   o:['Saturnus','Jupiter','Uranus','Neptunus'],icon:'🪐'},
    {q:'Benda langit berekor disebut?',     a:'Komet',      o:['Komet','Asteroid','Meteor','Bintang'],  icon:'☄️'},
    {q:'Planet paling jauh dari matahari?', a:'Neptunus',   o:['Neptunus','Uranus','Saturnus','Jupiter'],icon:'🔵'},
  ],
  hard:[
    {q:'Bumi berputar pada porosnya berapa lama?',a:'24 Jam',o:['24 Jam','12 Jam','48 Jam','365 Hari'], icon:'🌍'},
    {q:'Bumi mengelilingi matahari berapa lama?',a:'365 Hari',o:['365 Hari','24 Jam','12 Bulan','7 Hari'],icon:'🌍'},
    {q:'Galaksi tempat tata surya kita?',   a:'Bima Sakti', o:['Bima Sakti','Andromeda','Triangulum','Whirlpool'],icon:'🌌'},
  ],
};

/* ══ MATCH POOLS ══ */
const MB =[{e:'🐶',l:'Anjing'},{e:'🐱',l:'Kucing'},{e:'🐸',l:'Katak'},{e:'🦁',l:'Singa'}];
const MT =[{e:'🌹',l:'Mawar'},{e:'🌻',l:'Bunga Matahari'},{e:'🍎',l:'Apel'},{e:'🌴',l:'Pohon Kelapa'}];
const MPR=[{e:'👨‍⚕️',l:'Dokter'},{e:'👩‍🏫',l:'Guru'},{e:'👮',l:'Polisi'},{e:'👨‍🍳',l:'Koki'}];
const MM =[{e:'🎹',l:'Piano'},{e:'🎸',l:'Gitar'},{e:'🥁',l:'Drum'},{e:'🎺',l:'Terompet'}];
const MC =[{e:'🍎',l:'Apel'},{e:'🐶',l:'Anjing'},{e:'🌙',l:'Bulan'},{e:'🏠',l:'Rumah'}];

/* ══ HELPERS ══ */
function mkC(qtype,display,question,answer,opts){
  return {type:'choice',qtype,display,question,answer:String(answer),
    options:shuf(opts).map(v=>({label:String(v),value:String(v)}))};
}
function mkM(qtype,pairs){ return {type:'match',qtype,pairs:shuf(pairs).slice(0,4)}; }

/* ══ GENERATOR ══ */
export function generateQuestion(type,p={}){
  switch(type){
    /* ── MATH ── */
    case 'angka':{ const n=range(p.min||1,p.max||10),em=rnd(['🍎','🌟','🐶','🎈','🌸','⭐','🏀','🍭']),w=shuf([...Array(p.max||10)].map((_,i)=>i+1).filter(x=>x!==n)).slice(0,3); return mkC('angka',{type:'count',emoji:em,count:n},`Ada berapa ${em} di atas?`,n,[n,...w]); }
    case 'berhitung':{ const n=range(1,p.max||10),em=rnd(['⭐','🎀','🏀','🍭','🌈','🎯','🎪']),w=shuf([...Array(p.max||10)].map((_,i)=>i+1).filter(x=>x!==n)).slice(0,3); return mkC('berhitung',{type:'count',emoji:em,count:n},'Hitung benda ini!',n,[n,...w]); }
    case 'penjumlahan':{ const a=range(1,Math.floor((p.max||10)/2)),b=range(1,(p.max||10)-a),ans=a+b,w=shuf([ans-2,ans-1,ans+1,ans+2].filter(x=>x>0&&x!==ans)).slice(0,3); return mkC('penjumlahan',{type:'eq',a,op:'+',b},`${a} + ${b} = ?`,ans,[ans,...w]); }
    case 'pengurangan':{ const a=range(2,p.max||20),b=range(1,a-1),ans=a-b,w=shuf([ans-2,ans-1,ans+1,ans+2].filter(x=>x>=0&&x!==ans)).slice(0,3); return mkC('pengurangan',{type:'eq',a,op:'−',b},`${a} - ${b} = ?`,ans,[ans,...w]); }
    case 'perkalian':{ const t=rnd(p.tables||[2]),b=range(1,10),ans=t*b,w=shuf([ans-t,ans+t,ans+2*t].filter(x=>x>0&&x!==ans)).slice(0,3); return mkC('perkalian',{type:'eq',a:t,op:'×',b},`${t} × ${b} = ?`,ans,[ans,...w]); }
    case 'pembagian':{ const d=rnd(p.divisors||[2]),q=range(1,10),a=d*q,w=shuf([q-1,q+1,q+2].filter(x=>x>0&&x!==q)).slice(0,3); return mkC('pembagian',{type:'eq',a,op:'÷',b:d},`${a} ÷ ${d} = ?`,q,[q,...w]); }
    case 'pola_angka':{ const q=rnd(POLA_ANGKA); return mkC('pola_angka',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'bangun_datar':{ const q=rnd(BANGUN_DATAR); return mkC('bangun_datar',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'mixed_add_sub':       return generateQuestion(rnd(['penjumlahan','pengurangan']),{max:p.max||15});
    case 'mixed_mul_div':       return generateQuestion(rnd(['perkalian','pembagian']),{tables:[2,5],divisors:[2,5]});
    case 'mixed_all_math':      return generateQuestion(rnd(['penjumlahan','pengurangan','perkalian','pembagian']),{max:20,tables:[2,5],divisors:[2,5]});
    case 'mixed_math_dasar':    return generateQuestion(rnd(['angka','berhitung','penjumlahan']),{min:1,max:10});
    case 'mixed_math_menengah': return generateQuestion(rnd(['penjumlahan','pengurangan','pola_angka']),{max:20});
    /* ── PENGETAHUAN ── */
    case 'binatang':{ const pool=p.pool==='mid'?AM:AE; const q=rnd(pool); return mkC('binatang',{type:'emoji',emoji:q.e},'Hewan apakah ini?',q.n,q.o); }
    case 'tumbuhan':{ const q=rnd(TP); return mkC('tumbuhan',{type:'emoji',emoji:q.e},'Tumbuhan apakah ini?',q.n,q.o); }
    case 'tubuh':{ const q=rnd(TBP); return mkC('tubuh',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'tebak':{ const q=rnd(TBK); return mkC('tebak',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'profesi':{ const q=rnd(PP); return mkC('profesi',{type:'emoji',emoji:q.e},'Apa nama pekerjaan ini?',q.n,q.o); }
    case 'transportasi':{ const pool=p.cat==='all'?TRP:TRP.filter(x=>x.cat===p.cat); const q=rnd(pool); return mkC('transportasi',{type:'emoji',emoji:q.e},'Apa nama kendaraan ini?',q.n,q.o); }
    case 'makanan':{ const pool=p.cat==='all'?MKP:MKP.filter(x=>x.cat===p.cat||x.cat==='buah'); const q=rnd(pool),w=shuf(MKP.filter(x=>x.n!==q.n)).slice(0,3).map(x=>x.n); return mkC('makanan',{type:'emoji',emoji:q.e},'Ini makanan apa?',q.n,[q.n,...w]); }
    case 'alam':{ const q=rnd(ALP); return mkC('alam',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'sains':{ const q=rnd(SNP); return mkC('sains',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'bentuk':{ const b=rnd(BTP),w=shuf(BTP.filter(x=>x.n!==b.n)).slice(0,3).map(x=>x.n); return mkC('bentuk',{type:'svg',svg:b.svg},'Bentuk apakah ini?',b.n,[b.n,...w]); }
    case 'provinsi':{ const q=rnd(PROVINSI_POOL); return mkC('provinsi',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'cocok':          return mkM('cocok',MC);
    case 'cocok_binatang': return mkM('cocok_binatang',MB);
    case 'cocok_tumbuhan': return mkM('cocok_tumbuhan',MT);
    case 'cocok_profesi':  return mkM('cocok_profesi',MPR);
    case 'cocok_musik':    return mkM('cocok_musik',MM);
    case 'mixed_penget_dasar':    return generateQuestion(rnd(['binatang','tumbuhan','tubuh']),{pool:'easy'});
    case 'mixed_penget_menengah': return generateQuestion(rnd(['profesi','transportasi','makanan','provinsi']),{cat:'all'});
    case 'mixed_penget_tinggi':   return generateQuestion(rnd(['alam','sains','bentuk']),{});
    /* ── BAHASA ── */
    case 'huruf':{ const h=rnd(HP),w=shuf(HP.filter(x=>x.h!==h.h)).slice(0,3).map(x=>x.h); return mkC('huruf',{type:'emoji',emoji:h.e},`Huruf apa yang dimulai kata "${h.k}"?`,h.h,[h.h,...w]); }
    case 'kata':{ const k=rnd(KP); return mkC('kata',{type:'emoji',emoji:k.e},'Apa nama benda ini?',k.k,[k.k,...k.s]); }
    case 'lawan_kata':{ const q=rnd(LKP); return mkC('lawan_kata',{type:'emoji',emoji:'↔️'},`Lawan kata dari "${q.k}"?`,q.l,q.o); }
    case 'lawan_kata_lanjut':{ const q=rnd(LAWAN_LANJUT); return mkC('lawan_kata_lanjut',{type:'emoji',emoji:'↔️'},`Lawan kata dari "${q.k}"?`,q.l,q.o); }
    case 'sinonim':{ const q=rnd(SIN); return mkC('sinonim',{type:'emoji',emoji:'🔗'},`Kata lain dari "${q.k}"?`,q.a,q.o); }
    case 'kalimat':{ const q=rnd(KALIMAT_POOL); return mkC('kalimat',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'mixed_bahasa': return generateQuestion(rnd(['huruf','kata','lawan_kata','sinonim','kalimat']),{});
    /* ── SENI ── */
    case 'warna':{ const w=rnd(WP); return mkC('warna',{type:'emoji',emoji:w.e},'Warna apakah ini?',w.n,w.o); }
    case 'warna_campur':{ const q=rnd(WCP); return mkC('warna_campur',{type:'emoji',emoji:'🎨'},q.q,q.a,q.o); }
    case 'alat_musik':{ const q=rnd(AMP); return mkC('alat_musik',{type:'emoji',emoji:q.e},'Alat musik apakah ini?',q.n,q.o); }
    case 'seni_budaya':{ const q=rnd(SBP); return mkC('seni_budaya',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'ekspresi':{ const q=rnd(EKP); return mkC('ekspresi',{type:'emoji',emoji:q.e},'Ekspresi apakah ini?',q.n,q.o); }
    case 'nada_musik':{ const q=rnd(NADA_MUSIK); return mkC('nada_musik',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'mixed_seni': return generateQuestion(rnd(['warna','warna_campur','alat_musik','seni_budaya','ekspresi','nada_musik']),{});
    /* ── IPA ── */
    case 'tubuh_ipa':{ const pool=TUBUH_IPA[p.level||'easy']||TUBUH_IPA.easy; const q=rnd(pool); return mkC('tubuh_ipa',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'tumbuhan_ipa':{ const pool=TUMBUHAN_IPA[p.level||'easy']||TUMBUHAN_IPA.easy; const q=rnd(pool); return mkC('tumbuhan_ipa',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'hewan_ipa':{ const pool=HEWAN_IPA[p.level||'easy']||HEWAN_IPA.easy; const q=rnd(pool); return mkC('hewan_ipa',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'cuaca_ipa':{ const pool=CUACA_IPA[p.level||'easy']||CUACA_IPA.easy; const q=rnd(pool); return mkC('cuaca_ipa',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'materi_ipa':{ const pool=MATERI_IPA[p.level||'easy']||MATERI_IPA.easy; const q=rnd(pool); return mkC('materi_ipa',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'lingkungan_ipa':{ const pool=LINGKUNGAN_IPA[p.level||'easy']||LINGKUNGAN_IPA.easy; const q=rnd(pool); return mkC('lingkungan_ipa',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'energi_ipa':{ const pool=ENERGI_IPA[p.level||'easy']||ENERGI_IPA.easy; const q=rnd(pool); return mkC('energi_ipa',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'tata_surya':{ const pool=TATA_SURYA[p.level||'easy']||TATA_SURYA.easy; const q=rnd(pool); return mkC('tata_surya',{type:'emoji',emoji:q.icon},q.q,q.a,q.o); }
    case 'mixed_ipa_dasar':    return generateQuestion(rnd(['tubuh_ipa','tumbuhan_ipa','hewan_ipa']),{level:rnd(['easy','mid'])});
    case 'mixed_ipa_menengah': return generateQuestion(rnd(['cuaca_ipa','materi_ipa','lingkungan_ipa']),{level:rnd(['easy','mid'])});
    case 'mixed_ipa_tinggi':   return generateQuestion(rnd(['energi_ipa','tata_surya','tubuh_ipa','tumbuhan_ipa']),{level:rnd(['mid','hard'])});
    default: return generateQuestion('tebak',{});
  }
}

/* ══ GENERATE LESSON anti-repeat ══ */
export function generateLesson(levelData){
  const {type,p={}} = levelData;
  const count = p.count||6;
  const mathTypes = ['angka','berhitung','penjumlahan','pengurangan','perkalian','pembagian','pola_angka','bangun_datar','mixed_add_sub','mixed_mul_div','mixed_all_math','mixed_math_dasar','mixed_math_menengah'];
  const isMath = mathTypes.includes(type);
  const questions=[], used=new Set();
  let tries=0;
  while(questions.length<count && tries<count*15){
    tries++;
    const q=generateQuestion(type,p);
    const key = q.type==='match' ? `match_${q.qtype}` : isMath ? q.question : `${q.qtype}__${q.answer}`;
    if(!used.has(key)){ used.add(key); questions.push(q); }
  }
  while(questions.length<count) questions.push(generateQuestion(type,p));
  return questions;
}