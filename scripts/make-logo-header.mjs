import sharp from "sharp";

const SRC = "public/logonegro.jpeg";
const OUT = "public/optimized/logo_header.png";
const BG_MAX = 42;
const SOFT_MIN = 10;

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;

const maxChannel = (i) => Math.max(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);

const FRAME = 6;
const MIN_POCKET_AREA = 30;
const isBackground = new Uint8Array(w * h);
const visited = new Uint8Array(w * h);
const queue = new Int32Array(w * h);

const inFrame = (x, y) => x < FRAME || y < FRAME || x >= w - FRAME || y >= h - FRAME;

for (let start = 0; start < w * h; start++) {
  const sx = start % w;
  const sy = (start - sx) / w;
  if (visited[start] || (!inFrame(sx, sy) && maxChannel(start) >= BG_MAX)) continue;

  let head = 0;
  let tail = 0;
  let touchesFrame = false;
  visited[start] = 1;
  queue[tail++] = start;

  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    const y = (i - x) / w;
    if (inFrame(x, y)) touchesFrame = true;
    const neighbors = [
      x > 0 ? i - 1 : -1,
      x < w - 1 ? i + 1 : -1,
      y > 0 ? i - w : -1,
      y < h - 1 ? i + w : -1,
    ];
    for (const n of neighbors) {
      if (n < 0 || visited[n]) continue;
      const nx = n % w;
      const ny = (n - nx) / w;
      if (!inFrame(nx, ny) && maxChannel(n) >= BG_MAX) continue;
      visited[n] = 1;
      queue[tail++] = n;
    }
  }

  if (touchesFrame || tail >= MIN_POCKET_AREA) {
    for (let k = 0; k < tail; k++) isBackground[queue[k]] = 1;
  }
}

const touchesBackground = (x, y) => {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (isBackground[ny * w + nx]) return true;
    }
  }
  return false;
};

const smooth = (v, lo, hi) => {
  const t = Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

const rgba = Buffer.alloc(w * h * 4);
let minX = w;
let minY = h;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = y * w + x;
    const m = maxChannel(i);
    let alpha = 1;
    if (inFrame(x, y)) {
      alpha = 0;
    } else if (isBackground[i]) {
      alpha = smooth(m, SOFT_MIN, BG_MAX + 30) * 0.9;
    } else if (touchesBackground(x, y)) {
      alpha = Math.min(1, 0.35 + smooth(m, BG_MAX, 130) * 0.65);
    }

    let r = data[i * 3];
    let g = data[i * 3 + 1];
    let b = data[i * 3 + 2];
    if (alpha < 1 && alpha > 0.02 && m > 0) {
      const boost = Math.min(3, 1 / Math.max(alpha, 0.34));
      r = Math.min(255, r * boost);
      g = Math.min(255, g * boost);
      b = Math.min(255, b * boost);
    }

    const o = i * 4;
    rgba[o] = r;
    rgba[o + 1] = g;
    rgba[o + 2] = b;
    rgba[o + 3] = Math.round(alpha * 255);

    if (alpha > 0.12) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.03);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const cropW = Math.min(w - left, maxX - minX + pad * 2);
const cropH = Math.min(h - top, maxY - minY + pad * 2);

await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left, top, width: cropW, height: cropH })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(JSON.stringify({ out: OUT, left, top, cropW, cropH, ratio: (cropW / cropH).toFixed(3) }));
