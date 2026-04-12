const rnd  = a => a[Math.floor(Math.random()*a.length)];
const shuf = a => [...a].sort(()=>Math.random()-.5);
const range= (a,b) => Math.floor(Math.random()*(b-a+1))+a;

/* ══════════════════════════════════════════
   DATA POOLS — semua pool diperbesar
══════════════════════════════════════════ */

/* ── Binatang ── */
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
  {e:'🐢',n:'Kura-kura',o:['Kura-kura','Kadal','Buaya','Biawak']},
  {e:'🐇',n:'Marmot',  o:['Marmot','Kelinci','Hamster','Tikus']},
];
const AM=[
  {e:'🦁',n:'Singa',   o:['Singa','Harimau','Cheetah','Macan']},
  {e:'🐘',n:'Gajah',   o:['Gajah','Badak','Kuda Nil','Jerapah']},
  {e:'🦒',n:'Jerapah', o:['Jerapah','Gajah','Zebra','Unta']},
  {e:'🐅',n:'Harimau', o:['Harimau','Singa','Cheetah','Leopard']},
  {e:'🦓',n:'Zebra',   o:['Zebra','Kuda','Keledai','Kijang']},
  {e:'🦊',n:'Rubah',   o:['Rubah','Serigala','Anjing','Hyena']},
  {e:'🐻',n:'Beruang', o:['Beruang','Gorila','Panda','Koala']},
  {e:'🦏',n:'Badak',   o:['Badak','Gajah','Kuda Nil','Bison']},
  {e:'🐊',n:'Buaya',   o:['Buaya','Biawak','Iguana','Komodo']},
  {e:'🦋',n:'Kupu-kupu',o:['Kupu-kupu','Ngengat','Capung','Lebah']},
  {e:'🐍',n:'Ular',    o:['Ular','Kadal','Biawak','Kobra']},
  {e:'🦜',n:'Burung Beo',o:['Burung Beo','Kakak Tua','Nuri','Murai']},
];

/* ── Tumbuhan ── */
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
  {e:'🌴',n:'Pohon Kelapa',   o:['Pohon Kelapa','Pohon Pisang','Pohon Mangga','Bambu']},
  {e:'🌺',n:'Kembang Sepatu', o:['Kembang Sepatu','Mawar','Melati','Anggrek']},
  {e:'🍀',n:'Semanggi',       o:['Semanggi','Rumput','Pakis','Lumut']},
];

/* ── Tubuh ── */
const TBP=[
  {e:'👁️',q:'Dipakai untuk melihat?',           a:'Mata',    o:['Mata','Hidung','Telinga','Mulut']},
  {e:'👃',q:'Dipakai untuk mencium bau?',        a:'Hidung',  o:['Hidung','Mata','Mulut','Telinga']},
  {e:'👂',q:'Dipakai untuk mendengar?',          a:'Telinga', o:['Telinga','Mata','Hidung','Rambut']},
  {e:'👄',q:'Dipakai untuk makan & bicara?',     a:'Mulut',   o:['Mulut','Hidung','Pipi','Telinga']},
  {e:'🦵',q:'Digunakan untuk berjalan?',         a:'Kaki',    o:['Kaki','Tangan','Bahu','Pinggang']},
  {e:'💪',q:'Digunakan untuk memegang benda?',   a:'Tangan',  o:['Tangan','Kaki','Jari Kaki','Bahu']},
  {e:'🦷',q:'Digunakan untuk mengunyah makanan?',a:'Gigi',    o:['Gigi','Lidah','Bibir','Mulut']},
  {e:'👅',q:'Digunakan untuk merasakan rasa?',   a:'Lidah',   o:['Lidah','Gigi','Bibir','Pipi']},
  {e:'🫀',q:'Organ yang memompa darah?',          a:'Jantung', o:['Jantung','Paru-paru','Hati','Ginjal']},
  {e:'🧠',q:'Organ untuk berpikir?',             a:'Otak',    o:['Otak','Jantung','Hati','Paru-paru']},
];

/* ── Tebak benda ── */
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
  {e:'🎂',q:'Makanan manis saat ulang tahun?',    a:'Kue',     o:['Kue','Roti','Biskuit','Permen']},
  {e:'🪑',q:'Dipakai untuk duduk?',               a:'Kursi',   o:['Kursi','Meja','Sofa','Bangku']},
  {e:'🛏️',q:'Dipakai untuk tidur?',               a:'Kasur',   o:['Kasur','Bantal','Selimut','Sofa']},
];

/* ── Profesi ── */
const PP=[
  {e:'👨‍⚕️',n:'Dokter',    o:['Dokter','Perawat','Bidan','Apoteker']},
  {e:'👩‍🏫',n:'Guru',      o:['Guru','Dosen','Pengasuh','Konselor']},
  {e:'👮', n:'Polisi',    o:['Polisi','Satpam','Tentara','Pemadam']},
  {e:'👨‍🍳',n:'Koki',      o:['Koki','Pelayan','Kasir','Pramusaji']},
  {e:'👨‍🌾',n:'Petani',    o:['Petani','Nelayan','Peternak','Kuli']},
  {e:'✈️', n:'Pilot',     o:['Pilot','Kopilot','Pramugari','Teknisi']},
  {e:'👨‍🚒',n:'Pemadam',   o:['Pemadam Kebakaran','Polisi','Satpam','Tentara']},
  {e:'👨‍🔧',n:'Mekanik',   o:['Mekanik','Teknisi','Tukang','Insinyur']},
  {e:'👨‍⚖️',n:'Hakim',     o:['Hakim','Jaksa','Pengacara','Notaris']},
  {e:'🧑‍🎨',n:'Seniman',   o:['Seniman','Pelukis','Pematung','Fotografer']},
];

/* ── Transportasi ── */
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
  {e:'🛶', n:'Sampan',     cat:'air',  o:['Sampan','Perahu','Kano','Rakit']},
];

/* ── Makanan ── */
const MKP=[
  {e:'🍚',n:'Nasi',    cat:'makanan'},
  {e:'🍜',n:'Mie',     cat:'makanan'},
  {e:'🍞',n:'Roti',    cat:'makanan'},
  {e:'🍳',n:'Telur',   cat:'makanan'},
  {e:'🥕',n:'Wortel',  cat:'sayur'},
  {e:'🥦',n:'Brokoli', cat:'sayur'},
  {e:'🌽',n:'Jagung',  cat:'sayur'},
  {e:'🍆',n:'Terong',  cat:'sayur'},
  {e:'🍎',n:'Apel',    cat:'buah'},
  {e:'🍌',n:'Pisang',  cat:'buah'},
  {e:'🍊',n:'Jeruk',   cat:'buah'},
  {e:'🍉',n:'Semangka',cat:'buah'},
  {e:'🍓',n:'Stroberi',cat:'buah'},
  {e:'🍇',n:'Anggur',  cat:'buah'},
];

/* ── Alam ── */
const ALP=[
  {e:'⛈️',q:'Cuaca dengan hujan deras & petir?',  a:'Badai',       o:['Badai','Hujan','Mendung','Gerimis']},
  {e:'🌈',q:'Muncul setelah hujan di langit?',    a:'Pelangi',     o:['Pelangi','Aurora','Awan','Sinar']},
  {e:'🌋',q:'Gunung yang mengeluarkan lahar?',    a:'Gunung Berapi',o:['Gunung Berapi','Gunung','Bukit','Tebing']},
  {e:'❄️',q:'Butiran es putih dari langit?',       a:'Salju',       o:['Salju','Hujan Es','Embun','Kabut']},
  {e:'🌤️',q:'Cuaca cerah dengan sedikit awan?',   a:'Cerah',       o:['Cerah','Mendung','Berawan','Gerimis']},
  {e:'🌊',q:'Gelombang besar di lautan?',          a:'Ombak',       o:['Ombak','Banjir','Tsunami','Badai']},
  {e:'🌪️',q:'Angin yang berputar sangat kencang?', a:'Tornado',    o:['Tornado','Badai','Topan','Angin']},
  {e:'🏔️',q:'Daratan yang sangat tinggi?',         a:'Gunung',     o:['Gunung','Bukit','Tebing','Jurang']},
  {e:'🌵',q:'Tanaman yang hidup di padang pasir?', a:'Kaktus',     o:['Kaktus','Kurma','Akasia','Palem']},
];

/* ── Sains ── */
const SNP=[
  {e:'🌈',q:'Berapa jumlah warna dalam pelangi?',    a:'7',           o:['7','5','6','8']},
  {e:'🌍',q:'Planet kita bernama?',                  a:'Bumi',        o:['Bumi','Mars','Venus','Jupiter']},
  {e:'💧',q:'Air membeku menjadi?',                  a:'Es',          o:['Es','Uap','Embun','Kabut']},
  {e:'🌿',q:'Tumbuhan butuh apa untuk berfotosintesis?',a:'Cahaya Matahari',o:['Cahaya Matahari','Air Hujan','Angin','Tanah']},
  {e:'🕷️',q:'Berapa jumlah kaki laba-laba?',          a:'8',           o:['8','6','4','10']},
  {e:'🐝',q:'Serangga penghasil madu?',              a:'Lebah',       o:['Lebah','Kupu-kupu','Semut','Lalat']},
  {e:'🌙',q:'Benda langit yang bersinar di malam hari?',a:'Bulan',    o:['Bulan','Bintang','Matahari','Planet']},
  {e:'🌱',q:'Bagian tumbuhan yang menyerap air?',    a:'Akar',        o:['Akar','Daun','Batang','Bunga']},
  {e:'🦋',q:'Serangga yang bermetamorfosis dari ulat?',a:'Kupu-kupu', o:['Kupu-kupu','Ngengat','Capung','Lebah']},
  {e:'🌞',q:'Bintang terdekat dengan Bumi?',         a:'Matahari',   o:['Matahari','Bulan','Venus','Mars']},
  {e:'🐟',q:'Hewan yang bernapas dengan insang?',    a:'Ikan',        o:['Ikan','Katak','Buaya','Penyu']},
  {e:'🧲',q:'Benda yang dapat menarik besi?',        a:'Magnet',     o:['Magnet','Batu','Kayu','Plastik']},
];

/* ── Bentuk ── */
const BTP=[
  {n:'Lingkaran',      svg:'<circle cx="60" cy="60" r="50" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/>'},
  {n:'Segitiga',       svg:'<polygon points="60,10 110,110 10,110" fill="#22C55E" stroke="#15803D" stroke-width="4"/>'},
  {n:'Persegi',        svg:'<rect x="10" y="10" width="100" height="100" fill="#F59E0B" stroke="#B45309" stroke-width="4"/>'},
  {n:'Bintang',        svg:'<polygon points="60,10 72,45 108,45 79,68 89,103 60,82 31,103 41,68 12,45 48,45" fill="#8B5CF6" stroke="#6D28D9" stroke-width="3"/>'},
  {n:'Persegi Panjang',svg:'<rect x="5" y="30" width="110" height="60" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>'},
  {n:'Belah Ketupat',  svg:'<polygon points="60,10 110,60 60,110 10,60" fill="#EC4899" stroke="#BE185D" stroke-width="4"/>'},
];

/* ── Huruf — emoji diperbaiki ── */
const HP=[
  {h:'A',e:'🍎',k:'Apel'},
  {h:'B',e:'🎈',k:'Balon'},
  {h:'C',e:'🐛',k:'Cacing'},
  {h:'D',e:'🐑',k:'Domba'},
  {h:'E',e:'🦅',k:'Elang'},
  {h:'G',e:'🐘',k:'Gajah'},
  {h:'H',e:'🌧️',k:'Hujan'},
  {h:'I',e:'🐟',k:'Ikan'},
  {h:'J',e:'🦒',k:'Jerapah'},
  {h:'K',e:'🐱',k:'Kucing'},
  {h:'L',e:'🪰',k:'Lalat'},
  {h:'M',e:'🌙',k:'Malam'},
  {h:'N',e:'🎶',k:'Nada'},
  {h:'P',e:'🌴',k:'Pohon'},
  {h:'R',e:'🏠',k:'Rumah'},
  {h:'S',e:'🦁',k:'Singa'},
  {h:'T',e:'🌻',k:'Tulip'},
  {h:'U',e:'🐛',k:'Ulat'},
  {h:'W',e:'🍉',k:'Warung'},
  {h:'Z',e:'🦓',k:'Zebra'},
];

/* ── Kata ── */
const KP=[
  {e:'🐈',k:'KUCING',   s:['ANJING','BURUNG','TIKUS']},
  {e:'🍎',k:'APEL',     s:['JERUK','PEPAYA','MANGGA']},
  {e:'☀️',k:'MATAHARI', s:['BULAN','BINTANG','AWAN']},
  {e:'🏠',k:'RUMAH',    s:['GEDUNG','SEKOLAH','TOKO']},
  {e:'🌻',k:'BUNGA',    s:['POHON','DAUN','AKAR']},
  {e:'✈️',k:'PESAWAT',  s:['KAPAL','KERETA','MOBIL']},
  {e:'🐘',k:'GAJAH',    s:['SINGA','ZEBRA','JERAPAH']},
  {e:'🍌',k:'PISANG',   s:['MANGGA','JERUK','APEL']},
  {e:'🚗',k:'MOBIL',    s:['MOTOR','TRUK','BUS']},
  {e:'📚',k:'BUKU',     s:['TAS','PENSIL','PENGHAPUS']},
  {e:'🌊',k:'OMBAK',    s:['SUNGAI','DANAU','RAWA']},
  {e:'🎈',k:'BALON',    s:['BOLA','LAYANG','KELERENG']},
];

/* ── Lawan kata ── */
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
  {k:'Baru',   l:'Lama',  o:['Lama','Tua','Usang','Kuno']},
];

/* ── Sinonim ── */
const SIN=[
  {k:'Besar',  a:'Raksasa',o:['Raksasa','Kecil','Tipis','Ringan']},
  {k:'Cantik', a:'Indah',  o:['Indah','Jelek','Polos','Biasa']},
  {k:'Senang', a:'Bahagia',o:['Bahagia','Sedih','Marah','Bingung']},
  {k:'Pintar', a:'Cerdas', o:['Cerdas','Bodoh','Malas','Nakal']},
  {k:'Cepat',  a:'Kilat',  o:['Kilat','Lambat','Pelan','Santai']},
  {k:'Takut',  a:'Gentar', o:['Gentar','Berani','Santai','Tenang']},
  {k:'Marah',  a:'Murka',  o:['Murka','Senang','Sedih','Diam']},
  {k:'Lelah',  a:'Capek',  o:['Capek','Segar','Kuat','Bersemangat']},
  {k:'Rumah',  a:'Hunian', o:['Hunian','Toko','Kantor','Gudang']},
  {k:'Melihat',a:'Memandang',o:['Memandang','Mendengar','Meraba','Mencium']},
];

/* ── Warna ── */
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

/* ── Warna campur ── */
const WCP=[
  {q:'Merah + Kuning = ?', a:'Oranye',   o:['Oranye','Hijau','Ungu','Coklat']},
  {q:'Biru + Kuning = ?',  a:'Hijau',    o:['Hijau','Ungu','Coklat','Merah']},
  {q:'Merah + Biru = ?',   a:'Ungu',     o:['Ungu','Coklat','Hitam','Hijau']},
  {q:'Merah + Putih = ?',  a:'Pink',     o:['Pink','Oranye muda','Salmon','Ungu muda']},
  {q:'Hitam + Putih = ?',  a:'Abu-abu',  o:['Abu-abu','Krem','Coklat muda','Silver']},
  {q:'Biru + Putih = ?',   a:'Biru Muda',o:['Biru Muda','Hijau Muda','Ungu Muda','Pink']},
  {q:'Kuning + Putih = ?', a:'Krem',     o:['Krem','Kuning Muda','Emas','Gading']},
];

/* ── Alat Musik ── */
const AMP=[
  {e:'🎹',n:'Piano',    o:['Piano','Gitar','Biola','Drum']},
  {e:'🎸',n:'Gitar',    o:['Gitar','Bass','Ukulele','Mandolin']},
  {e:'🥁',n:'Drum',     o:['Drum','Bedug','Kendang','Gendang']},
  {e:'🎺',n:'Terompet', o:['Terompet','Seruling','Saxophone','Klarinet']},
  {e:'🎻',n:'Biola',    o:['Biola','Cello','Viola','Kontrabas']},
  {e:'🪗',n:'Akordeon', o:['Akordeon','Piano','Harmonika','Organ']},
  {e:'🎷',n:'Saxophone',o:['Saxophone','Terompet','Klarinet','Seruling']},
  {e:'🪘',n:'Kendang',  o:['Kendang','Drum','Bedug','Gendang']},
];

/* ── Seni Budaya ── */
const SBP=[
  {e:'💃',q:'Tari daerah Jawa yang terkenal?',     a:'Tari Serimpi',o:['Tari Serimpi','Tari Saman','Tari Kecak','Tari Pendet']},
  {e:'🪘',q:'Alat musik tradisional Jawa?',         a:'Gamelan',    o:['Gamelan','Angklung','Kolintang','Sasando']},
  {e:'🏮',q:'Batik adalah kain khas dari negara?',  a:'Indonesia',  o:['Indonesia','Malaysia','Thailand','Filipina']},
  {e:'🎪',q:'Tari Saman berasal dari daerah?',      a:'Aceh',       o:['Aceh','Bali','Jawa','Sulawesi']},
  {e:'🎭',q:'Wayang adalah kesenian dari?',         a:'Jawa',       o:['Jawa','Bali','Sunda','Betawi']},
  {e:'🎨',q:'Angklung adalah alat musik dari?',     a:'Sunda',      o:['Sunda','Jawa','Bali','Batak']},
  {e:'👘',q:'Pakaian adat Jepang disebut?',         a:'Kimono',     o:['Kimono','Hanbok','Cheongsam','Sari']},
  {e:'🎵',q:'Lagu daerah "Apuse" berasal dari?',    a:'Papua',      o:['Papua','Maluku','NTT','Sulawesi']},
];

/* ── Ekspresi ── */
const EKP=[
  {e:'😊',n:'Senang',  o:['Senang','Sedih','Marah','Takut']},
  {e:'😢',n:'Sedih',   o:['Sedih','Senang','Kaget','Bingung']},
  {e:'😡',n:'Marah',   o:['Marah','Senang','Sedih','Malu']},
  {e:'😨',n:'Takut',   o:['Takut','Berani','Senang','Santai']},
  {e:'🤔',n:'Bingung', o:['Bingung','Pikir','Penasaran','Ragu']},
  {e:'😲',n:'Kaget',   o:['Kaget','Senang','Takut','Bingung']},
  {e:'😴',n:'Ngantuk', o:['Ngantuk','Lelah','Malas','Bosan']},
  {e:'🤩',n:'Kagum',   o:['Kagum','Senang','Bersemangat','Antusias']},
  {e:'😌',n:'Tenang',  o:['Tenang','Santai','Damai','Rileks']},
];

/* ── Match pairs ── */
const MB =[{e:'🐶',l:'Anjing'},{e:'🐱',l:'Kucing'},{e:'🐸',l:'Katak'},{e:'🦁',l:'Singa'}];
const MT =[{e:'🌹',l:'Mawar'},{e:'🌻',l:'Bunga Matahari'},{e:'🍎',l:'Apel'},{e:'🌴',l:'Pohon Kelapa'}];
const MPR=[{e:'👨‍⚕️',l:'Dokter'},{e:'👩‍🏫',l:'Guru'},{e:'👮',l:'Polisi'},{e:'👨‍🍳',l:'Koki'}];
const MM =[{e:'🎹',l:'Piano'},{e:'🎸',l:'Gitar'},{e:'🥁',l:'Drum'},{e:'🎺',l:'Terompet'}];
const MC =[{e:'🍎',l:'Apel'},{e:'🐶',l:'Anjing'},{e:'🌙',l:'Bulan'},{e:'🏠',l:'Rumah'}];

/* ══ HELPERS ══ */
function mkC(qtype,display,question,answer,opts) {
  return {type:'choice',qtype,display,question,answer:String(answer),
    options:shuf(opts).map(v=>({label:String(v),value:String(v)}))};
}
function mkM(qtype,pairs) { return {type:'match',qtype,pairs:shuf(pairs).slice(0,4)}; }

/* ══ GENERATOR ══ */
export function generateQuestion(type, p={}) {
  switch(type) {
    case 'angka': {
      const n=range(p.min||1,p.max||10),em=rnd(['🍎','🌟','🐶','🎈','🌸','⭐','🏀','🍭','🎯']);
      const w=shuf([...Array(p.max||10)].map((_,i)=>i+1).filter(x=>x!==n)).slice(0,3);
      return mkC('angka',{type:'count',emoji:em,count:n},`Ada berapa ${em} di atas?`,n,[n,...w]);
    }
    case 'berhitung': {
      const n=range(1,p.max||10),em=rnd(['⭐','🎀','🏀','🍭','🌈','🎯','🎪','🦋','🌺']);
      const w=shuf([...Array(p.max||10)].map((_,i)=>i+1).filter(x=>x!==n)).slice(0,3);
      return mkC('berhitung',{type:'count',emoji:em,count:n},'Hitung benda ini!',n,[n,...w]);
    }
    case 'penjumlahan': {
      const a=range(1,Math.floor((p.max||10)/2)),b=range(1,(p.max||10)-a),ans=a+b;
      const w=shuf([ans-2,ans-1,ans+1,ans+2].filter(x=>x>0&&x!==ans)).slice(0,3);
      return mkC('penjumlahan',{type:'eq',a,op:'+',b},`${a} + ${b} = ?`,ans,[ans,...w]);
    }
    case 'pengurangan': {
      const a=range(2,p.max||20),b=range(1,a-1),ans=a-b;
      const w=shuf([ans-2,ans-1,ans+1,ans+2].filter(x=>x>=0&&x!==ans)).slice(0,3);
      return mkC('pengurangan',{type:'eq',a,op:'−',b},`${a} - ${b} = ?`,ans,[ans,...w]);
    }
    case 'perkalian': {
      const t=rnd(p.tables||[2]),b=range(1,10),ans=t*b;
      const w=shuf([ans-t,ans+t,ans+2*t].filter(x=>x>0&&x!==ans)).slice(0,3);
      return mkC('perkalian',{type:'eq',a:t,op:'×',b},`${t} × ${b} = ?`,ans,[ans,...w]);
    }
    case 'pembagian': {
      const d=rnd(p.divisors||[2]),q=range(1,10),a=d*q;
      const w=shuf([q-1,q+1,q+2].filter(x=>x>0&&x!==q)).slice(0,3);
      return mkC('pembagian',{type:'eq',a,op:'÷',b:d},`${a} ÷ ${d} = ?`,q,[q,...w]);
    }
    case 'mixed_add_sub':       return generateQuestion(rnd(['penjumlahan','pengurangan']),{max:p.max||15});
    case 'mixed_mul_div':       return generateQuestion(rnd(['perkalian','pembagian']),{tables:[2,5],divisors:[2,5]});
    case 'mixed_all_math':      return generateQuestion(rnd(['penjumlahan','pengurangan','perkalian','pembagian']),{max:20,tables:[2,5],divisors:[2,5]});
    case 'mixed_math_dasar':    return generateQuestion(rnd(['angka','berhitung','penjumlahan']),{min:1,max:10});
    case 'mixed_math_menengah': return generateQuestion(rnd(['penjumlahan','pengurangan','mixed_add_sub']),{max:20});
    case 'binatang':     { const pool=p.pool==='mid'?AM:AE; const q=rnd(pool); return mkC('binatang',{type:'emoji',emoji:q.e},'Hewan apakah ini?',q.n,q.o); }
    case 'tumbuhan':     { const q=rnd(TP); return mkC('tumbuhan',{type:'emoji',emoji:q.e},'Tumbuhan apakah ini?',q.n,q.o); }
    case 'tubuh':        { const q=rnd(TBP); return mkC('tubuh',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'tebak':        { const q=rnd(TBK); return mkC('tebak',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'profesi':      { const q=rnd(PP); return mkC('profesi',{type:'emoji',emoji:q.e},'Apa nama pekerjaan ini?',q.n,q.o); }
    case 'transportasi': {
      const pool=p.cat==='all'?TRP:TRP.filter(x=>x.cat===p.cat);
      const q=rnd(pool); return mkC('transportasi',{type:'emoji',emoji:q.e},'Apa nama kendaraan ini?',q.n,q.o);
    }
    case 'makanan': {
      const pool=p.cat==='all'?MKP:MKP.filter(x=>x.cat===p.cat||x.cat==='buah');
      const q=rnd(pool),w=shuf(MKP.filter(x=>x.n!==q.n)).slice(0,3).map(x=>x.n);
      return mkC('makanan',{type:'emoji',emoji:q.e},'Ini makanan apa?',q.n,[q.n,...w]);
    }
    case 'alam':         { const q=rnd(ALP); return mkC('alam',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'sains':        { const q=rnd(SNP); return mkC('sains',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'bentuk':       { const b=rnd(BTP),w=shuf(BTP.filter(x=>x.n!==b.n)).slice(0,3).map(x=>x.n); return mkC('bentuk',{type:'svg',svg:b.svg},'Bentuk apakah ini?',b.n,[b.n,...w]); }
    case 'cocok':           return mkM('cocok',MC);
    case 'cocok_binatang':  return mkM('cocok_binatang',MB);
    case 'cocok_tumbuhan':  return mkM('cocok_tumbuhan',MT);
    case 'cocok_profesi':   return mkM('cocok_profesi',MPR);
    case 'cocok_musik':     return mkM('cocok_musik',MM);
    case 'mixed_penget_dasar':    return generateQuestion(rnd(['binatang','tumbuhan','tubuh']),{pool:'easy'});
    case 'mixed_penget_menengah': return generateQuestion(rnd(['profesi','transportasi','makanan']),{cat:'all'});
    case 'mixed_penget_tinggi':   return generateQuestion(rnd(['alam','sains','bentuk']),{});
    case 'huruf':      { const h=rnd(HP),w=shuf(HP.filter(x=>x.h!==h.h)).slice(0,3).map(x=>x.h); return mkC('huruf',{type:'emoji',emoji:h.e},`Huruf apa yang dimulai kata "${h.k}"?`,h.h,[h.h,...w]); }
    case 'kata':       { const k=rnd(KP); return mkC('kata',{type:'emoji',emoji:k.e},'Apa nama benda ini?',k.k,[k.k,...k.s]); }
    case 'lawan_kata': { const q=rnd(LKP); return mkC('lawan_kata',{type:'emoji',emoji:'↔️'},`Lawan kata dari "${q.k}" adalah?`,q.l,q.o); }
    case 'sinonim':    { const q=rnd(SIN); return mkC('sinonim',{type:'emoji',emoji:'🔗'},`Kata lain dari "${q.k}" adalah?`,q.a,q.o); }
    case 'mixed_bahasa': return generateQuestion(rnd(['huruf','kata','lawan_kata','sinonim']),{});
    case 'warna':        { const w=rnd(WP); return mkC('warna',{type:'emoji',emoji:w.e},'Warna apakah ini?',w.n,w.o); }
    case 'warna_campur': { const q=rnd(WCP); return mkC('warna_campur',{type:'emoji',emoji:'🎨'},q.q,q.a,q.o); }
    case 'alat_musik':   { const q=rnd(AMP); return mkC('alat_musik',{type:'emoji',emoji:q.e},'Alat musik apakah ini?',q.n,q.o); }
    case 'seni_budaya':  { const q=rnd(SBP); return mkC('seni_budaya',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'ekspresi':     { const q=rnd(EKP); return mkC('ekspresi',{type:'emoji',emoji:q.e},'Ekspresi apakah ini?',q.n,q.o); }
    case 'mixed_seni':   return generateQuestion(rnd(['warna','warna_campur','alat_musik','seni_budaya','ekspresi']),{});
    default: return generateQuestion('tebak',{});
  }
}

/* ══ GENERATE LESSON — anti-repeat kuat ══ */
export function generateLesson(levelData) {
  const { type, p = {} } = levelData;
  const count = p.count || 6;

  // Untuk tipe math: key dari soal lengkap (bisa sama jawaban beda angka)
  // Untuk tipe pengetahuan: key dari jawaban saja (hindari soal konsep sama)
  const mathTypes = ['angka','berhitung','penjumlahan','pengurangan','perkalian','pembagian',
                     'mixed_add_sub','mixed_mul_div','mixed_all_math','mixed_math_dasar','mixed_math_menengah'];

  const isMath = mathTypes.includes(type);
  const questions = [];
  const usedKeys  = new Set();
  let   tries     = 0;

  while (questions.length < count && tries < count * 15) {
    tries++;
    const q = generateQuestion(type, p);

    // Buat key unik
    let key;
    if (q.type === 'match') {
      key = `match_${q.qtype}`;
    } else if (isMath) {
      // Math: boleh jawaban sama asal soalnya beda
      key = q.question;
    } else {
      // Pengetahuan/bahasa/seni: cegah jawaban sama muncul lagi
      key = `${q.qtype}__${q.answer}`;
    }

    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      questions.push(q);
    }
  }

  // Fallback kalau pool habis
  while (questions.length < count) {
    questions.push(generateQuestion(type, p));
  }

  return questions;
}


/* ══════════════════════════════════════
   TAMBAHAN: Generator soal tipe baru
══════════════════════════════════════ */

/* ── Word Builder pools ── */
const WORD_POOL = [
  { word:'APEL',    emoji:'🍎', hint:'Buah berwarna merah' },
  { word:'BUKU',    emoji:'📚', hint:'Tempat ilmu pengetahuan' },
  { word:'KUCING',  emoji:'🐱', hint:'Hewan peliharaan berbulu' },
  { word:'RUMAH',   emoji:'🏠', hint:'Tempat tinggal kita' },
  { word:'POHON',   emoji:'🌳', hint:'Tumbuhan yang tinggi' },
  { word:'PISANG',  emoji:'🍌', hint:'Buah berwarna kuning' },
  { word:'GAJAH',   emoji:'🐘', hint:'Hewan berbelalai panjang' },
  { word:'SINGA',   emoji:'🦁', hint:'Raja hutan' },
  { word:'BUNGA',   emoji:'🌸', hint:'Tumbuhan yang harum' },
  { word:'IKAN',    emoji:'🐟', hint:'Hewan yang hidup di air' },
  { word:'BOLA',    emoji:'⚽', hint:'Dipakai untuk bermain' },
  { word:'WORTEL',  emoji:'🥕', hint:'Sayur berwarna oranye' },
  { word:'ZEBRA',   emoji:'🦓', hint:'Hewan bergaris hitam-putih' },
  { word:'MOBIL',   emoji:'🚗', hint:'Kendaraan beroda empat' },
  { word:'BULAN',   emoji:'🌙', hint:'Bersinar di malam hari' },
  { word:'NASI',    emoji:'🍚', hint:'Makanan pokok orang Indonesia' },
  { word:'SEPATU',  emoji:'👟', hint:'Dipakai di kaki saat keluar' },
  { word:'JERUK',   emoji:'🍊', hint:'Buah berwarna oranye yang asam' },
];

/* ── TypeAnswer pools ── */
const TYPE_MATH = [
  { q:'2 + 3 = ?',   a:'5',  emoji:'➕' },
  { q:'5 + 4 = ?',   a:'9',  emoji:'➕' },
  { q:'7 - 3 = ?',   a:'4',  emoji:'➖' },
  { q:'10 - 6 = ?',  a:'4',  emoji:'➖' },
  { q:'3 × 2 = ?',   a:'6',  emoji:'✖️' },
  { q:'4 × 2 = ?',   a:'8',  emoji:'✖️' },
  { q:'6 ÷ 2 = ?',   a:'3',  emoji:'➗' },
  { q:'10 ÷ 2 = ?',  a:'5',  emoji:'➗' },
  { q:'4 + 5 = ?',   a:'9',  emoji:'➕' },
  { q:'8 - 5 = ?',   a:'3',  emoji:'➖' },
];
const TYPE_BAHASA = [
  { q:'Apa nama ibukota Indonesia?',       a:'Jakarta',    emoji:'🇮🇩' },
  { q:'Apa warna daun yang sehat?',        a:'Hijau',      emoji:'🌿' },
  { q:'Berapa kaki kucing?',               a:'4',          emoji:'🐱' },
  { q:'Apa nama planet kita?',             a:'Bumi',       emoji:'🌍' },
  { q:'Siapa nama presiden pertama RI?',   a:'Soekarno',   emoji:'🏛️' },
  { q:'Berapa hari dalam seminggu?',       a:'7',          emoji:'📅' },
  { q:'Apa nama hewan terbesar di darat?', a:'Gajah',      emoji:'🐘' },
  { q:'Berapa bulan dalam setahun?',       a:'12',         emoji:'📆' },
];

/* ── PictureQuiz pools ── */
const PIC_ANIMALS = [
  { q:'Mana yang merupakan hewan laut?', answer:'Ikan', options:[{emoji:'🐟',label:'Ikan'},{emoji:'🦁',label:'Singa'},{emoji:'🐘',label:'Gajah'},{emoji:'🐶',label:'Anjing'}] },
  { q:'Mana yang bisa terbang?',         answer:'Burung', options:[{emoji:'🐦',label:'Burung'},{emoji:'🐟',label:'Ikan'},{emoji:'🐮',label:'Sapi'},{emoji:'🐢',label:'Kura-kura'}] },
  { q:'Mana hewan yang bertelur?',       answer:'Ayam', options:[{emoji:'🐔',label:'Ayam'},{emoji:'🐶',label:'Anjing'},{emoji:'🐱',label:'Kucing'},{emoji:'🐄',label:'Sapi'}] },
  { q:'Mana yang merupakan serangga?',   answer:'Lebah', options:[{emoji:'🐝',label:'Lebah'},{emoji:'🐟',label:'Ikan'},{emoji:'🦁',label:'Singa'},{emoji:'🐸',label:'Katak'}] },
  { q:'Mana hewan pemakan rumput?',      answer:'Sapi', options:[{emoji:'🐄',label:'Sapi'},{emoji:'🦁',label:'Singa'},{emoji:'🐺',label:'Serigala'},{emoji:'🦊',label:'Rubah'}] },
];
const PIC_FOODS = [
  { q:'Mana yang termasuk sayuran?',   answer:'Wortel', options:[{emoji:'🥕',label:'Wortel'},{emoji:'🍎',label:'Apel'},{emoji:'🍌',label:'Pisang'},{emoji:'🍓',label:'Stroberi'}] },
  { q:'Mana yang termasuk buah?',      answer:'Mangga', options:[{emoji:'🥭',label:'Mangga'},{emoji:'🥦',label:'Brokoli'},{emoji:'🥕',label:'Wortel'},{emoji:'🌽',label:'Jagung'}] },
  { q:'Mana makanan yang manis?',      answer:'Kue', options:[{emoji:'🎂',label:'Kue'},{emoji:'🍚',label:'Nasi'},{emoji:'🥦',label:'Brokoli'},{emoji:'🥕',label:'Wortel'}] },
  { q:'Mana minuman yang sehat?',      answer:'Air Putih', options:[{emoji:'💧',label:'Air Putih'},{emoji:'🥤',label:'Soda'},{emoji:'☕',label:'Kopi'},{emoji:'🍺',label:'Bir'}] },
];
const PIC_SHAPES = [
  { q:'Mana bentuk lingkaran?',        answer:'⭕', options:[{emoji:'⭕',label:'⭕'},{emoji:'🔺',label:'🔺'},{emoji:'🟦',label:'🟦'},{emoji:'⭐',label:'⭐'}] },
  { q:'Mana bentuk bintang?',          answer:'⭐', options:[{emoji:'⭐',label:'⭐'},{emoji:'⭕',label:'⭕'},{emoji:'🟦',label:'🟦'},{emoji:'🔺',label:'🔺'}] },
  { q:'Mana bentuk segitiga?',         answer:'🔺', options:[{emoji:'🔺',label:'🔺'},{emoji:'⭕',label:'⭕'},{emoji:'🟦',label:'🟦'},{emoji:'⭐',label:'⭐'}] },
];

/* ── Speed mode pools (soal cepat) ── */
const SPEED_MATH = [
  {q:'1+1',a:'2'},{q:'2+2',a:'4'},{q:'3+3',a:'6'},{q:'4+4',a:'8'},{q:'5+5',a:'10'},
  {q:'2+3',a:'5'},{q:'3+4',a:'7'},{q:'4+5',a:'9'},{q:'5+6',a:'11'},{q:'6+4',a:'10'},
  {q:'5-2',a:'3'},{q:'7-3',a:'4'},{q:'8-4',a:'4'},{q:'9-5',a:'4'},{q:'10-3',a:'7'},
  {q:'2×2',a:'4'},{q:'2×3',a:'6'},{q:'2×4',a:'8'},{q:'2×5',a:'10'},{q:'5×2',a:'10'},
];

/* ── Generators untuk tipe baru ── */
export function generateWordBuilder() {
  const item = rnd(WORD_POOL);
  return { type:'word_builder', qtype:'word_builder', word:item.word, emoji:item.emoji, hint:item.hint };
}

export function generateTypeAnswer(subject = 'math') {
  const pool = subject === 'math' ? TYPE_MATH : TYPE_BAHASA;
  const item = rnd(pool);
  return { type:'type_answer', qtype:'type_answer', question:item.q, answer:item.a, emoji:item.emoji };
}

export function generatePictureQuiz(cat = 'animals') {
  const pool = cat === 'foods' ? PIC_FOODS : cat === 'shapes' ? PIC_SHAPES : PIC_ANIMALS;
  const item = rnd(pool);
  return { type:'picture_quiz', qtype:'picture_quiz', question:item.q, answer:item.answer, options:item.options };
}

export function generateSpeedQuestion() {
  const item = rnd(SPEED_MATH);
  // Buat pilihan jawaban
  const correct = parseInt(item.a);
  const opts = [correct, correct+1, correct-1, correct+2].filter(x=>x>=0).slice(0,4);
  return mkC('speed', {type:'emoji',emoji:'⚡'}, `${item.q} = ?`, item.a,
    opts.map(String));
}

/* ── generateLesson extended ── */
export function generateLessonExtended(levelData) {
  const { type, p = {} } = levelData;

  // Tipe khusus baru
  if (type === 'word_builder')  return Array.from({length: p.count||4}, generateWordBuilder);
  if (type === 'type_answer')   return Array.from({length: p.count||6}, () => generateTypeAnswer(p.subject||'math'));
  if (type === 'picture_quiz')  return Array.from({length: p.count||5}, () => generatePictureQuiz(p.cat||'animals'));
  if (type === 'speed_mode')    return Array.from({length: p.count||10}, generateSpeedQuestion);

  // Default ke generateLesson biasa
  return generateLesson(levelData);
}