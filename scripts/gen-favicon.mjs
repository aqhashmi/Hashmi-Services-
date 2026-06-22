// Generates app/icon.png — a favicon featuring the brand chevron mark
// (grey -> purple tiles) on a dark rounded square. Next.js App Router picks
// up app/icon.png automatically and emits the <link rel="icon"> tags.
// Run: node scripts/gen-favicon.mjs
import zlib from "node:zlib";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const S = 512;
const px = new Uint8Array(S * S * 4); // RGBA, transparent

function set(x, y, r, g, b, a = 255) {
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || y < 0 || x >= S || y >= S) return;
  const i = (y * S + x) * 4;
  px[i] = r;
  px[i + 1] = g;
  px[i + 2] = b;
  px[i + 3] = a;
}

// ---- Dark rounded-square background ----
const radius = 112;
const bg = [16, 14, 22]; // #100E16
function insideRounded(x, y) {
  const minX = radius, maxX = S - radius;
  const minY = radius, maxY = S - radius;
  if (x >= minX && x <= maxX) return y >= 0 && y <= S;
  if (y >= minY && y <= maxY) return x >= 0 && x <= S;
  // corners
  const cx = x < minX ? minX : maxX;
  const cy = y < minY ? minY : maxY;
  return (x - cx) ** 2 + (y - cy) ** 2 <= radius * radius;
}
for (let y = 0; y < S; y++)
  for (let x = 0; x < S; x++)
    if (insideRounded(x, y)) set(x, y, bg[0], bg[1], bg[2], 255);

// ---- Chevron mark: 5 skewed ascending tiles, grey -> purple, centered ----
const n = 5;
const tw = 30; // tile width
const th = 140; // tile height
const skew = 0.5;
const step = 44;
const rise = 24;
const bboxW = (n - 1) * step + skew * th + tw;
const bboxH = th + (n - 1) * rise;
const leftX = (S - bboxW) / 2;
const baseTop = (S - bboxH) / 2 + (n - 1) * rise;

for (let i = 0; i < n; i++) {
  const t = i / (n - 1);
  const r = Math.round(160 + (139 - 160) * t);
  const g = Math.round(168 + (92 - 168) * t);
  const b = Math.round(184 + (246 - 184) * t);
  const topY = baseTop - i * rise;
  const leftXi = leftX + i * step;
  for (let row = 0; row < th; row++) {
    const y = topY + row;
    const xStart = leftXi + skew * (th - row);
    for (let c = 0; c < tw; c++) set(xStart + c, y, r, g, b, 255);
  }
}

// ---- Encode PNG (RGBA, filter 0) ----
function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(S, 0);
ihdr.writeUInt32BE(S, 4);
ihdr[8] = 8;
ihdr[9] = 6;
const raw = Buffer.alloc((S * 4 + 1) * S);
for (let y = 0; y < S; y++) {
  raw[y * (S * 4 + 1)] = 0;
  for (let x = 0; x < S * 4; x++) raw[y * (S * 4 + 1) + 1 + x] = px[y * S * 4 + x];
}
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

writeFileSync(join(__dirname, "..", "app", "icon.png"), png);
console.log("Wrote app/icon.png", png.length, "bytes");
