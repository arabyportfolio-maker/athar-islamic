const https = require('https');

const reciters = [
  { id: 'alafasy', name: 'مشاري العفاسي', surahUrl: 'https://server8.mp3quran.net/afs', ayahIdentifier: 'ar.alafasy' },
  { id: 'abdulbasit', name: 'عبد الباسط (مرتل)', surahUrl: 'https://server7.mp3quran.net/basit', ayahIdentifier: 'ar.abdulbasitmurattal' },
  { id: 'abdulbasit_mjwd', name: 'عبد الباسط (تجويد)', surahUrl: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad', ayahIdentifier: 'Abdul_Basit_Mujawwad_128kbps', singleAyahProvider: 'everyayah' },
  { id: 'maher', name: 'ماهر المعيقلي', surahUrl: 'https://server12.mp3quran.net/maher', ayahIdentifier: 'ar.mahermuaiqly' },
  { id: 'dosari', name: 'ياسر الدوسري', surahUrl: 'https://server11.mp3quran.net/yasser', ayahIdentifier: 'Yasser_Ad-Dussary_128kbps', singleAyahProvider: 'everyayah' },
  { id: 'husary', name: 'محمود خليل الحصري', surahUrl: 'https://server13.mp3quran.net/husr', ayahIdentifier: 'ar.husary' },
  { id: 'tablawi', name: 'محمد الطبلاوي (تجويد)', surahUrl: 'https://server12.mp3quran.net/tblawi/Al-Mojawwad', ayahIdentifier: 'Mohammad_al_Tablaway_128kbps', singleAyahProvider: 'everyayah' },
  { id: 'minshawi_mjwd', name: 'محمد صديق المنشاوي (تجويد)', surahUrl: 'https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad', ayahIdentifier: 'Minshawy_Mujawwad_192kbps', singleAyahProvider: 'everyayah' },
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'error: ' + e.message });
    });
  });
}

async function run() {
  for (const r of reciters) {
    const surah = `${r.surahUrl}/001.mp3`;
    const sRes = await checkUrl(surah);
    console.log(`[SURAH] ${r.id}: ${sRes.status} - ${sRes.url}`);

    let ayah = '';
    if (r.singleAyahProvider === 'everyayah') {
      ayah = `https://everyayah.com/data/${r.ayahIdentifier}/001001.mp3`;
    } else {
      ayah = `https://cdn.islamic.network/quran/audio/128/${r.ayahIdentifier}/1.mp3`;
    }
    const aRes = await checkUrl(ayah);
    console.log(`[AYAH ] ${r.id}: ${aRes.status} - ${aRes.url}`);
  }
}

run();
