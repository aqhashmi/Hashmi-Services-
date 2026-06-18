// Generates a branded PLACEHOLDER logo at /public/hashmi_logo_png.png so the
// project runs out of the box. Replace public/hashmi_logo_png.png with the
// real brand asset when available. Run with: node scripts/gen-logo.mjs
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 520;
const H = 150;
const px = new Uint8Array(W * H * 4); // RGBA, transparent by default

function set(x, y, r, g, b, a = 255) {
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  px[i] = r;
  px[i + 1] = g;
  px[i + 2] = b;
  px[i + 3] = a;
}

// ---- Chevron mark: 5 skewed parallelogram tiles, grey -> purple, ascending ----
const n = 5;
const th = 70; // tile height
const tw = 14; // tile width
const skew = 0.5; // horizontal skew (top shifted right)
const step = 19; // horizontal spacing between tiles
const rise = 11; // vertical rise per tile (forms an arrow)
const baseX = 26;
const baseTop = 60;
for (let i = 0; i < n; i++) {
  const t = i / (n - 1);
  const r = Math.round(156 + (124 - 156) * t);
  const g = Math.round(163 + (58 - 163) * t);
  const b = Math.round(175 + (237 - 175) * t);
  const topY = baseTop - i * rise;
  const leftX = baseX + i * step;
  for (let row = 0; row < th; row++) {
    const y = topY + row;
    const xStart = leftX + skew * (th - row);
    for (let c = 0; c < tw; c++) set(xStart + c, y, r, g, b);
  }
}

// ---- Wordmark "HASHMI" in a 5x7 bitmap font ----
const FONT = {
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
};
const GREY = [156, 163, 175];
const PURPLE = [167, 139, 250];
const scale = 9;
let cx = 184;
const cyTop = 42;
"HASHMI".split("").forEach((ch, idx) => {
  const glyph = FONT[ch];
  const [r, g, b] = idx < 3 ? GREY : PURPLE; // HAS grey, HMI purple
  for (let ry = 0; ry < 7; ry++) {
    for (let rx = 0; rx < 5; rx++) {
      if (glyph[ry][rx] === "1") {
        for (let dy = 0; dy < scale; dy++)
          for (let dx = 0; dx < scale; dx++)
            set(cx + rx * scale + dx, cyTop + ry * scale + dy, r, g, b);
      }
    }
  }
  cx += 5 * scale + scale; // glyph width + spacing
});

// ---- Encode as PNG (RGBA, 8-bit) ----
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
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // color type RGBA
// rest (compression, filter, interlace) default 0

// Raw scanlines with filter byte 0 prefix.
const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) {
  raw[y * (W * 4 + 1)] = 0;
  px.subarray(y * W * 4, (y + 1) * W * 4).forEach((v, i) => {
    raw[y * (W * 4 + 1) + 1 + i] = v;
  });
}
const idat = zlib.deflateSync(raw, { level: 9 });

const png = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

const outDir = join(__dirname, "..", "public");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "hashmi_logo_png.png"), png);
console.log("Wrote public/hashmi_logo_png.png (placeholder)", png.length, "bytes");
