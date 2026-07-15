const https = require('https');
const fs = require('fs');

https.get('https://www.mp3quran.net/api/v3/reciters?language=ar', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('reciters.json', data);
    console.log('Done');
  });
});
