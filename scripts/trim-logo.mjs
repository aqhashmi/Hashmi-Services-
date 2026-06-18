// Trims transparent margins from the brand logo so it fills its box and
// scales well in the header/footer. Keeps the original as a backup.
// Usage: node scripts/trim-logo.mjs
import zlib from "node:zlib";
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";

const PATH = "public/hashmi_logo_png.png";
const BACKUP = "public/hashmi_logo_original.png";

const b = readFileSync(PATH);
if (b.slice(0, 8).toString("hex") !== "89504e470d0a1a0a") throw new Error("not a PNG");
const W = b.readUInt32BE(16);
const H = b.readUInt32BE(20);
const colorType = b[25];
const interlace = b[28];
if (colorType !== 6 || b[24] !== 8) throw new Error("expected 8-bit RGBA");
if (interlace !== 0) throw new Error("interlaced PNG not supported");

// --- Collect + inflate IDAT ---
let p = 8;
const idat = [];
while (p < b.length) {
  const len = b.readUInt32BE(p);
  const type = b.toString("ascii", p + 4, p + 8);
  if (type === "IDAT") idat.push(b.subarray(p + 8, p + 8 + len));
  if (type === "IEND") break;
  p += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(idat));

// --- Unfilter scanlines into an RGBA buffer ---
const bpp = 4;
const stride = W * bpp;
const px = Buffer.alloc(H * stride);
let pos = 0;
for (let y = 0; y < H; y++) {
  const ft = raw[pos++];
  const o = y * stride;
  for (let x = 0; x < stride; x++) {
    const v = raw[pos++];
    const left = x >= bpp ? px[o + x - bpp] : 0;
    const up = y > 0 ? px[o - stride + x] : 0;
    const ul = x >= bpp && y > 0 ? px[o - stride + x - bpp] : 0;
    let r;
    switch (ft) {
      case 0: r = v; break;
      case 1: r = v + left; break;
      case 2: r = v + up; break;
      case 3: r = v + ((left + up) >> 1); break;
      case 4: {
        const pp = left + up - ul;
        const pa = Math.abs(pp - left), pb = Math.abs(pp - up), pc = Math.abs(pp - ul);
        r = v + (pa <= pb && pa <= pc ? left : pb <= pc ? up : ul);
        break;
      }
      default: r = v;
    }
    px[o + x] = r & 0xff;
  }
}

// --- Background detection (corner alpha) + bounding box ---
const cornerAlpha = [
  px[3], // top-left
  px[(W - 1) * 4 + 3], // top-right
  px[(H - 1) * stride + 3], // bottom-left
  px[(H - 1) * stride + (W - 1) * 4 + 3], // bottom-right
];
const transparentBg = cornerAlpha.every((a) => a < 16);
console.log("corner alphas:", cornerAlpha, "-> transparent background:", transparentBg);

let minX = W, minY = H, maxX = -1, maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * stride + x * 4;
    // "content" = visibly opaque AND not near-white (covers both bg types).
    const a = px[i + 3];
    const nearWhite = px[i] > 245 && px[i + 1] > 245 && px[i + 2] > 245;
    if (a > 16 && !nearWhite) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
// Small uniform padding around the content.
const pad = 6;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(W - 1, maxX + pad);
maxY = Math.min(H - 1, maxY + pad);
const cw = maxX - minX + 1;
const ch = maxY - minY + 1;
console.log(`content bbox: ${cw}x${ch} (from ${W}x${H})`);

// --- Crop ---
const cropStride = cw * 4;
const crop = Buffer.alloc(ch * cropStride);
for (let y = 0; y < ch; y++) {
  px.copy(crop, y * cropStride, (minY + y) * stride + minX * 4, (minY + y) * stride + (maxX + 1) * 4);
}

// --- Encode PNG (RGBA, filter 0) ---
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
ihdr.writeUInt32BE(cw, 0);
ihdr.writeUInt32BE(ch, 4);
ihdr[8] = 8;
ihdr[9] = 6;
const rawOut = Buffer.alloc((cropStride + 1) * ch);
for (let y = 0; y < ch; y++) {
  rawOut[y * (cropStride + 1)] = 0;
  crop.copy(rawOut, y * (cropStride + 1) + 1, y * cropStride, (y + 1) * cropStride);
}
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(rawOut, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

copyFileSync(PATH, BACKUP); // preserve the original upload
writeFileSync(PATH, png);
console.log(`Saved trimmed logo (${cw}x${ch}). Original backed up to ${BACKUP}.`);
