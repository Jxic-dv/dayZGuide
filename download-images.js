// Descarga las imágenes a public/img para no depender de sitios externos.
// Uso: npm run images   (requiere Node 18+ y conexión a internet)
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'img');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data.json'), 'utf8'));
const WK = 'https://dayz.wiki.gg/images/thumb/';
const BB = 'https://www.bamboogaming.net/images/dayz/';
fs.mkdirSync(OUT, { recursive: true });

async function get(url, dest) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'dayz-guia/1.0' } });
    if (!r.ok || !(r.headers.get('content-type') || '').startsWith('image')) return false;
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    return true;
  } catch { return false; }
}

(async () => {
  const jobs = [];
  for (const w of data.weapons) for (const n of [].concat(w.f)) jobs.push({ n, list: [
    [`${WK}${n}.png/300px-${n}.png`, `${n}.png`], [`${BB}${n}.webp`, `${n}.webp`]] });
  for (const it of [...data.items, ...data.craft.map(c => ({ i: c.i }))].flatMap(x => [].concat(x.i || []))) jobs.push({ n: it, list: [[BB + it, it]] });
  let ok = 0, fail = [];
  for (const j of jobs) {
    let done = false;
    for (const [url, name] of j.list) { if (await get(url, path.join(OUT, name))) { done = true; break; } }
    done ? ok++ : fail.push(j.n);
  }
  console.log(`Descargadas: ${ok}/${jobs.length}`);
  if (fail.length) console.log('Sin imagen (se usará el ícono de respaldo):', [...new Set(fail)].join(', '));
})();
