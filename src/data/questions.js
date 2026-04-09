const rnd  = a => a[Math.floor(Math.random()*a.length)];
const shuf = a => [...a].sort(()=>Math.random()-.5);
const range= (a,b) => Math.floor(Math.random()*(b-a+1))+a;

const AE=[{e:'🐶',n:'Anjing',o:['Anjing','Kucing','Kelinci','Hamster']},{e:'🐱',n:'Kucing',o:['Kucing','Anjing','Tikus','Kelinci']},{e:'🐸',n:'Katak',o:['Katak','Kadal','Ular','Buaya']},{e:'🐧',n:'Penguin',o:['Penguin','Bebek','Angsa','Burung']},{e:'🐔',n:'Ayam',o:['Ayam','Bebek','Angsa','Kalkun']},{e:'🐷',n:'Babi',o:['Babi','Sapi','Domba','Kambing']},{e:'🐮',n:'Sapi',o:['Sapi','Kerbau','Banteng','Domba']},{e:'🐰',n:'Kelinci',o:['Kelinci','Tikus','Marmot','Hamster']}];
const AM=[{e:'🦁',n:'Singa',o:['Singa','Harimau','Cheetah','Macan']},{e:'🐘',n:'Gajah',o:['Gajah','Badak','Kuda Nil','Jerapah']},{e:'🦒',n:'Jerapah',o:['Jerapah','Gajah','Zebra','Unta']},{e:'🐅',n:'Harimau',o:['Harimau','Singa','Cheetah','Leopard']},{e:'🦓',n:'Zebra',o:['Zebra','Kuda','Keledai','Kijang']},{e:'🦊',n:'Rubah',o:['Rubah','Serigala','Anjing','Hyena']}];
const TP=[{e:'🌹',n:'Mawar',o:['Mawar','Melati','Anggrek','Tulip']},{e:'🌻',n:'Bunga Matahari',o:['Bunga Matahari','Marigold','Dahlia','Kenanga']},{e:'🍎',n:'Apel',o:['Apel','Pir','Persik','Anggur']},{e:'🍌',n:'Pisang',o:['Pisang','Mangga','Pepaya','Durian']},{e:'🌽',n:'Jagung',o:['Jagung','Wortel','Labu','Ubi']},{e:'🥦',n:'Brokoli',o:['Brokoli','Kembang Kol','Kubis','Bayam']}];
const TBP=[{e:'👁️',q:'Dipakai untuk melihat?',a:'Mata',o:['Mata','Hidung','Telinga','Mulut']},{e:'👃',q:'Dipakai untuk mencium bau?',a:'Hidung',o:['Hidung','Mata','Mulut','Telinga']},{e:'👂',q:'Dipakai untuk mendengar?',a:'Telinga',o:['Telinga','Mata','Hidung','Rambut']},{e:'👄',q:'Dipakai untuk makan & bicara?',a:'Mulut',o:['Mulut','Hidung','Pipi','Telinga']},{e:'🦵',q:'Digunakan untuk berjalan?',a:'Kaki',o:['Kaki','Tangan','Bahu','Pinggang']},{e:'💪',q:'Digunakan untuk memegang?',a:'Tangan',o:['Tangan','Kaki','Jari Kaki','Bahu']}];
const TBK=[{e:'🏠',q:'Tempat tinggal kita?',a:'Rumah',o:['Rumah','Gedung','Toko','Kantor']},{e:'📚',q:'Tempat menyimpan pelajaran?',a:'Buku',o:['Buku','Tas','Pensil','Penghapus']},{e:'✏️',q:'Dipakai untuk menulis?',a:'Pensil',o:['Pensil','Pulpen','Spidol','Krayon']},{e:'🎒',q:'Dipakai untuk membawa buku?',a:'Tas',o:['Tas','Koper','Plastik','Keranjang']},{e:'⏰',q:'Dipakai untuk melihat waktu?',a:'Jam',o:['Jam','Kalender','HP','Komputer']},{e:'🌙',q:'Bersinar di langit malam?',a:'Bulan',o:['Bulan','Bintang','Matahari','Lampu']}];
const PP=[{e:'👨‍⚕️',n:'Dokter',o:['Dokter','Perawat','Bidan','Apoteker']},{e:'👩‍🏫',n:'Guru',o:['Guru','Dosen','Pengasuh','Konselor']},{e:'👮',n:'Polisi',o:['Polisi','Satpam','Tentara','Pemadam']},{e:'👨‍🍳',n:'Koki',o:['Koki','Pelayan','Kasir','Pramusaji']},{e:'👨‍🌾',n:'Petani',o:['Petani','Nelayan','Peternak','Berkebun']},{e:'✈️',n:'Pilot',o:['Pilot','Kopilot','Pramugari','Teknisi']}];
const TRP=[{e:'🚗',n:'Mobil',cat:'darat',o:['Mobil','Motor','Truk','Bus']},{e:'🚌',n:'Bus',cat:'darat',o:['Bus','Truk','Mobil','Angkot']},{e:'🚂',n:'Kereta',cat:'darat',o:['Kereta','Trem','MRT','LRT']},{e:'✈️',n:'Pesawat',cat:'udara',o:['Pesawat','Helikopter','Balon','Roket']},{e:'🚁',n:'Helikopter',cat:'udara',o:['Helikopter','Pesawat','Drone','Balon']},{e:'⛵',n:'Perahu',cat:'air',o:['Perahu','Kapal','Sampan','Feri']},{e:'🚢',n:'Kapal',cat:'air',o:['Kapal','Perahu','Feri','Yacht']}];
const MKP=[{e:'🍚',n:'Nasi',cat:'makanan'},{e:'🍜',n:'Mie',cat:'makanan'},{e:'🥕',n:'Wortel',cat:'sayur'},{e:'🥦',n:'Brokoli',cat:'sayur'},{e:'🍎',n:'Apel',cat:'buah'},{e:'🍌',n:'Pisang',cat:'buah'},{e:'🍊',n:'Jeruk',cat:'buah'},{e:'🍉',n:'Semangka',cat:'buah'}];
const ALP=[{e:'⛈️',q:'Cuaca dengan hujan deras & petir',a:'Badai',o:['Badai','Hujan','Mendung','Gerimis']},{e:'🌈',q:'Muncul setelah hujan di langit',a:'Pelangi',o:['Pelangi','Aurora','Awan','Sinar']},{e:'🌋',q:'Gunung yang mengeluarkan lahar',a:'Gunung Berapi',o:['Gunung Berapi','Gunung','Bukit','Tebing']},{e:'❄️',q:'Butiran es putih dari langit',a:'Salju',o:['Salju','Hujan Es','Embun','Kabut']},{e:'🌤️',q:'Cuaca cerah dengan sedikit awan',a:'Cerah',o:['Cerah','Mendung','Berawan','Gerimis']}];
const SNP=[{e:'🌈',q:'Berapa jumlah warna dalam pelangi?',a:'7',o:['7','5','6','8']},{e:'🌍',q:'Planet kita bernama?',a:'Bumi',o:['Bumi','Mars','Venus','Jupiter']},{e:'💧',q:'Air membeku menjadi?',a:'Es',o:['Es','Uap','Embun','Kabut']},{e:'🌿',q:'Tumbuhan butuh apa untuk tumbuh?',a:'Cahaya Matahari',o:['Cahaya Matahari','Air Hujan','Angin','Tanah']},{e:'🕷️',q:'Berapa jumlah kaki laba-laba?',a:'8',o:['8','6','4','10']}];
const BTP=[{n:'Lingkaran',svg:'<circle cx="60" cy="60" r="50" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/>'},{n:'Segitiga',svg:'<polygon points="60,10 110,110 10,110" fill="#22C55E" stroke="#15803D" stroke-width="4"/>'},{n:'Persegi',svg:'<rect x="10" y="10" width="100" height="100" fill="#F59E0B" stroke="#B45309" stroke-width="4"/>'},{n:'Bintang',svg:'<polygon points="60,10 72,45 108,45 79,68 89,103 60,82 31,103 41,68 12,45 48,45" fill="#8B5CF6" stroke="#6D28D9" stroke-width="3"/>'},{n:'Persegi Panjang',svg:'<rect x="5" y="30" width="110" height="60" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/>'}];
const HP=[{h:'A',e:'🍎',k:'Apel'},{h:'B',e:'🎈',k:'Balon'},{h:'C',e:'🎂',k:'Cake'},{h:'D',e:'🦆',k:'Domba'},{h:'E',e:'🦅',k:'Elang'},{h:'G',e:'🐘',k:'Gajah'},{h:'H',e:'🌈',k:'Hujan'},{h:'I',e:'🐟',k:'Ikan'},{h:'J',e:'🦒',k:'Jerapah'},{h:'K',e:'🐱',k:'Kucing'},{h:'L',e:'🦋',k:'Lalat'},{h:'M',e:'🌙',k:'Malam'},{h:'N',e:'🎶',k:'Nada'},{h:'P',e:'🌴',k:'Pohon'},{h:'S',e:'🦁',k:'Singa'},{h:'T',e:'🌻',k:'Tulip'},{h:'U',e:'🐛',k:'Ulat'},{h:'Z',e:'🦓',k:'Zebra'}];
const KP=[{e:'🐈',k:'KUCING',s:['ANJING','BURUNG','TIKUS']},{e:'🍎',k:'APEL',s:['JERUK','PEPAYA','MANGGA']},{e:'🌞',k:'MATAHARI',s:['BULAN','BINTANG','AWAN']},{e:'🏠',k:'RUMAH',s:['GEDUNG','SEKOLAH','TOKO']},{e:'🌻',k:'BUNGA',s:['POHON','DAUN','AKAR']},{e:'✈️',k:'PESAWAT',s:['KAPAL','KERETA','MOBIL']}];
const LKP=[{k:'Besar',l:'Kecil',o:['Kecil','Tinggi','Lebar','Lurus']},{k:'Panas',l:'Dingin',o:['Dingin','Sejuk','Beku','Basah']},{k:'Cerah',l:'Gelap',o:['Gelap','Mendung','Redup','Suram']},{k:'Cepat',l:'Lambat',o:['Lambat','Pelan','Santai','Diam']},{k:'Tinggi',l:'Rendah',o:['Rendah','Pendek','Kecil','Datar']}];
const SIN=[{k:'Besar',a:'Raksasa',o:['Raksasa','Kecil','Tipis','Ringan']},{k:'Cantik',a:'Indah',o:['Indah','Jelek','Polos','Biasa']},{k:'Senang',a:'Bahagia',o:['Bahagia','Sedih','Marah','Bingung']},{k:'Pintar',a:'Cerdas',o:['Cerdas','Bodoh','Malas','Nakal']}];
const WP=[{e:'🔴',n:'Merah',o:['Merah','Biru','Hijau','Kuning']},{e:'🔵',n:'Biru',o:['Biru','Merah','Ungu','Hijau']},{e:'🟢',n:'Hijau',o:['Hijau','Kuning','Biru','Merah']},{e:'🟡',n:'Kuning',o:['Kuning','Oranye','Merah','Hijau']},{e:'🟠',n:'Oranye',o:['Oranye','Merah','Kuning','Coklat']},{e:'🟣',n:'Ungu',o:['Ungu','Pink','Biru','Merah']}];
const WCP=[{q:'Merah + Kuning = ?',a:'Oranye',o:['Oranye','Hijau','Ungu','Coklat']},{q:'Biru + Kuning = ?',a:'Hijau',o:['Hijau','Ungu','Coklat','Merah']},{q:'Merah + Biru = ?',a:'Ungu',o:['Ungu','Coklat','Hitam','Hijau']},{q:'Merah + Putih = ?',a:'Pink',o:['Pink','Oranye muda','Salmon','Ungu muda']},{q:'Hitam + Putih = ?',a:'Abu-abu',o:['Abu-abu','Krem','Coklat muda','Silver']}];
const AMP=[{e:'🎹',n:'Piano',o:['Piano','Gitar','Biola','Drum']},{e:'🎸',n:'Gitar',o:['Gitar','Bass','Ukulele','Mandolin']},{e:'🥁',n:'Drum',o:['Drum','Bedug','Kendang','Gendang']},{e:'🎺',n:'Terompet',o:['Terompet','Seruling','Saxophone','Klarinet']},{e:'🎻',n:'Biola',o:['Biola','Cello','Viola','Kontrabas']}];
const SBP=[{e:'💃',q:'Tari daerah Jawa yang terkenal?',a:'Tari Serimpi',o:['Tari Serimpi','Tari Saman','Tari Kecak','Tari Pendet']},{e:'🪘',q:'Alat musik tradisional Jawa?',a:'Gamelan',o:['Gamelan','Angklung','Kolintang','Sasando']},{e:'🏮',q:'Batik adalah kain khas dari negara?',a:'Indonesia',o:['Indonesia','Malaysia','Thailand','Filipina']},{e:'🎪',q:'Tari Saman berasal dari daerah?',a:'Aceh',o:['Aceh','Bali','Jawa','Sulawesi']}];
const EKP=[{e:'😊',n:'Senang',o:['Senang','Sedih','Marah','Takut']},{e:'😢',n:'Sedih',o:['Sedih','Senang','Kaget','Bingung']},{e:'😡',n:'Marah',o:['Marah','Senang','Sedih','Malu']},{e:'😨',n:'Takut',o:['Takut','Berani','Senang','Santai']},{e:'🤔',n:'Bingung',o:['Bingung','Pikir','Penasaran','Ragu']}];

const MB=[{e:'🐶',l:'Anjing'},{e:'🐱',l:'Kucing'},{e:'🐸',l:'Katak'},{e:'🦁',l:'Singa'}];
const MT=[{e:'🌹',l:'Mawar'},{e:'🌻',l:'Bunga Matahari'},{e:'🍎',l:'Apel'},{e:'🌴',l:'Pohon Kelapa'}];
const MPR=[{e:'👨‍⚕️',l:'Dokter'},{e:'👩‍🏫',l:'Guru'},{e:'👮',l:'Polisi'},{e:'👨‍🍳',l:'Koki'}];
const MM=[{e:'🎹',l:'Piano'},{e:'🎸',l:'Gitar'},{e:'🥁',l:'Drum'},{e:'🎺',l:'Terompet'}];
const MC=[{e:'🍎',l:'Apel'},{e:'🐶',l:'Anjing'},{e:'🌙',l:'Bulan'},{e:'🏠',l:'Rumah'}];

function mkC(qtype,display,question,answer,opts) {
  return {type:'choice',qtype,display,question,answer:String(answer),options:shuf(opts).map(v=>({label:String(v),value:String(v)}))};
}
function mkM(qtype,pairs) { return {type:'match',qtype,pairs:shuf(pairs).slice(0,4)}; }

export function generateQuestion(type, p={}) {
  switch(type) {
    case 'angka': { const n=range(p.min||1,p.max||10),em=rnd(['🍎','🌟','🐶','🎈','🌸']),w=shuf([...Array(p.max||10)].map((_,i)=>i+1).filter(x=>x!==n)).slice(0,3); return mkC('angka',{type:'count',emoji:em,count:n},`Ada berapa ${em} di atas?`,n,[n,...w]); }
    case 'berhitung': { const n=range(1,p.max||10),em=rnd(['⭐','🎀','🏀','🍭','🌈']),w=shuf([...Array(p.max||10)].map((_,i)=>i+1).filter(x=>x!==n)).slice(0,3); return mkC('berhitung',{type:'count',emoji:em,count:n},'Hitung benda ini!',n,[n,...w]); }
    case 'penjumlahan': { const a=range(1,Math.floor((p.max||10)/2)),b=range(1,(p.max||10)-a),ans=a+b,w=shuf([ans-2,ans-1,ans+1,ans+2].filter(x=>x>0&&x!==ans)).slice(0,3); return mkC('penjumlahan',{type:'eq',a,op:'+',b},`${a} + ${b} = ?`,ans,[ans,...w]); }
    case 'pengurangan': { const a=range(2,p.max||20),b=range(1,a-1),ans=a-b,w=shuf([ans-2,ans-1,ans+1,ans+2].filter(x=>x>=0&&x!==ans)).slice(0,3); return mkC('pengurangan',{type:'eq',a,op:'−',b},`${a} - ${b} = ?`,ans,[ans,...w]); }
    case 'perkalian': { const t=rnd(p.tables||[2]),b=range(1,10),ans=t*b,w=shuf([ans-t,ans+t,ans+2*t].filter(x=>x>0&&x!==ans)).slice(0,3); return mkC('perkalian',{type:'eq',a:t,op:'×',b},`${t} × ${b} = ?`,ans,[ans,...w]); }
    case 'pembagian': { const d=rnd(p.divisors||[2]),q=range(1,10),a=d*q,w=shuf([q-1,q+1,q+2].filter(x=>x>0&&x!==q)).slice(0,3); return mkC('pembagian',{type:'eq',a,op:'÷',b:d},`${a} ÷ ${d} = ?`,q,[q,...w]); }
    case 'mixed_add_sub':        return generateQuestion(rnd(['penjumlahan','pengurangan']),{max:p.max||15});
    case 'mixed_mul_div':        return generateQuestion(rnd(['perkalian','pembagian']),{tables:[2,5],divisors:[2,5]});
    case 'mixed_all_math':       return generateQuestion(rnd(['penjumlahan','pengurangan','perkalian','pembagian']),{max:20,tables:[2,5],divisors:[2,5]});
    case 'mixed_math_dasar':     return generateQuestion(rnd(['angka','berhitung','penjumlahan']),{min:1,max:10});
    case 'mixed_math_menengah':  return generateQuestion(rnd(['penjumlahan','pengurangan','mixed_add_sub']),{max:20});
    case 'binatang':  { const q=rnd(p.pool==='mid'?AM:AE); return mkC('binatang',{type:'emoji',emoji:q.e},'Hewan apakah ini?',q.n,q.o); }
    case 'tumbuhan':  { const q=rnd(TP);  return mkC('tumbuhan',{type:'emoji',emoji:q.e},'Tumbuhan apakah ini?',q.n,q.o); }
    case 'tubuh':     { const q=rnd(TBP); return mkC('tubuh',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'tebak':     { const q=rnd(TBK); return mkC('tebak',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'profesi':   { const q=rnd(PP);  return mkC('profesi',{type:'emoji',emoji:q.e},'Apa nama pekerjaan ini?',q.n,q.o); }
    case 'transportasi': { const pool=p.cat==='all'?TRP:TRP.filter(x=>x.cat===p.cat); const q=rnd(pool); return mkC('transportasi',{type:'emoji',emoji:q.e},'Apa nama kendaraan ini?',q.n,q.o); }
    case 'makanan':   { const pool=p.cat==='all'?MKP:MKP.filter(x=>x.cat===p.cat||x.cat==='buah'); const q=rnd(pool),w=shuf(MKP.filter(x=>x.n!==q.n)).slice(0,3).map(x=>x.n); return mkC('makanan',{type:'emoji',emoji:q.e},'Ini makanan apa?',q.n,[q.n,...w]); }
    case 'alam':      { const q=rnd(ALP); return mkC('alam',{type:'emoji',emoji:q.e},q.q+'?',q.a,q.o); }
    case 'sains':     { const q=rnd(SNP); return mkC('sains',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'bentuk':    { const b=rnd(BTP),w=shuf(BTP.filter(x=>x.n!==b.n)).slice(0,3).map(x=>x.n); return mkC('bentuk',{type:'svg',svg:b.svg},'Bentuk apakah ini?',b.n,[b.n,...w]); }
    case 'cocok':           return mkM('cocok',MC);
    case 'cocok_binatang':  return mkM('cocok_binatang',MB);
    case 'cocok_tumbuhan':  return mkM('cocok_tumbuhan',MT);
    case 'cocok_profesi':   return mkM('cocok_profesi',MPR);
    case 'cocok_musik':     return mkM('cocok_musik',MM);
    case 'mixed_penget_dasar':    return generateQuestion(rnd(['binatang','tumbuhan','tubuh']),{pool:'easy'});
    case 'mixed_penget_menengah': return generateQuestion(rnd(['profesi','transportasi','makanan']),{cat:'all'});
    case 'mixed_penget_tinggi':   return generateQuestion(rnd(['alam','sains','bentuk']),{});
    case 'huruf':  { const h=rnd(HP),w=shuf(HP.filter(x=>x.h!==h.h)).slice(0,3).map(x=>x.h); return mkC('huruf',{type:'emoji',emoji:h.e},`Huruf apa yang dimulai kata "${h.k}"?`,h.h,[h.h,...w]); }
    case 'kata':   { const k=rnd(KP); return mkC('kata',{type:'emoji',emoji:k.e},'Apa nama benda ini?',k.k,[k.k,...k.s]); }
    case 'lawan_kata': { const q=rnd(LKP); return mkC('lawan_kata',{type:'emoji',emoji:'↔️'},`Lawan kata dari "${q.k}" adalah?`,q.l,q.o); }
    case 'sinonim':    { const q=rnd(SIN); return mkC('sinonim',{type:'emoji',emoji:'🔗'},`Kata lain dari "${q.k}" adalah?`,q.a,q.o); }
    case 'mixed_bahasa': return generateQuestion(rnd(['huruf','kata','lawan_kata','sinonim']),{});
    case 'warna':        { const w=rnd(WP);  return mkC('warna',{type:'emoji',emoji:w.e},'Warna apakah ini?',w.n,w.o); }
    case 'warna_campur': { const q=rnd(WCP); return mkC('warna_campur',{type:'emoji',emoji:'🎨'},q.q,q.a,q.o); }
    case 'alat_musik':   { const q=rnd(AMP); return mkC('alat_musik',{type:'emoji',emoji:q.e},'Alat musik apakah ini?',q.n,q.o); }
    case 'seni_budaya':  { const q=rnd(SBP); return mkC('seni_budaya',{type:'emoji',emoji:q.e},q.q,q.a,q.o); }
    case 'ekspresi':     { const q=rnd(EKP); return mkC('ekspresi',{type:'emoji',emoji:q.e},'Ekspresi apakah ini?',q.n,q.o); }
    case 'mixed_seni':   return generateQuestion(rnd(['warna','warna_campur','alat_musik','seni_budaya','ekspresi']),{});
    default: return generateQuestion('tebak',{});
  }
}

export function generateLesson(levelData) {
  const { type, p={} } = levelData;
  return Array.from({length: p.count||6}, () => generateQuestion(type, p));
}
