import sharp from "sharp";

const source = "public/logonegro.jpeg";
const output = "public/optimized/logo_header.png";
const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const maxChannel = (index) => Math.max(data[index * 3], data[index * 3 + 1], data[index * 3 + 2]);
const frame = 6;
const minimumPocketArea = 30;
const background = new Uint8Array(width * height);
const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
const inFrame = (x, y) => x < frame || y < frame || x >= width - frame || y >= height - frame;

for (let start = 0; start < width * height; start++) {
  const startX = start % width;
  const startY = (start - startX) / width;
  if (visited[start] || (!inFrame(startX, startY) && maxChannel(start) >= 42)) continue;

  let head = 0;
  let tail = 0;
  let touchesFrame = false;
  visited[start] = 1;
  queue[tail++] = start;

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    const y = (index - x) / width;
    if (inFrame(x, y)) touchesFrame = true;
    const neighbors = [x > 0 ? index - 1 : -1, x < width - 1 ? index + 1 : -1, y > 0 ? index - width : -1, y < height - 1 ? index + width : -1];
    for (const neighbor of neighbors) {
      if (neighbor < 0 || visited[neighbor]) continue;
      const nx = neighbor % width;
      const ny = (neighbor - nx) / width;
      if (!inFrame(nx, ny) && maxChannel(neighbor) >= 42) continue;
      visited[neighbor] = 1;
      queue[tail++] = neighbor;
    }
  }

  if (touchesFrame || tail >= minimumPocketArea) {
    for (let i = 0; i < tail; i++) background[queue[i]] = 1;
  }
}

const smooth = (value, low, high) => {
  const t = Math.min(1, Math.max(0, (value - low) / (high - low)));
  return t * t * (3 - 2 * t);
};
const rgba = Buffer.alloc(width * height * 4);
let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const index = y * width + x;
    const maximum = maxChannel(index);
    let alpha = 1;
    if (inFrame(x, y)) alpha = 0;
    else if (background[index]) alpha = smooth(maximum, 10, 72) * 0.9;
    else {
      let touchesBackground = false;
      for (let dy = -1; dy <= 1 && !touchesBackground; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < width && ny < height && background[ny * width + nx]) {
            touchesBackground = true;
            break;
          }
        }
      }
      if (touchesBackground) alpha = Math.min(1, 0.35 + smooth(maximum, 42, 130) * 0.65);
    }

    const offset = index * 4;
    const boost = alpha > 0.02 && alpha < 1 ? Math.min(3, 1 / Math.max(alpha, 0.34)) : 1;
    rgba[offset] = Math.min(255, data[index * 3] * boost);
    rgba[offset + 1] = Math.min(255, data[index * 3 + 1] * boost);
    rgba[offset + 2] = Math.min(255, data[index * 3 + 2] * boost);
    rgba[offset + 3] = Math.round(alpha * 255);

    if (alpha > 0.12) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

const padding = Math.round(Math.max(maxX - minX, maxY - minY) * 0.03);
const left = Math.max(0, minX - padding);
const top = Math.max(0, minY - padding);
const cropWidth = Math.min(width - left, maxX - minX + padding * 2);
const cropHeight = Math.min(height - top, maxY - minY + padding * 2);
await sharp(rgba, { raw: { width, height, channels: 4 } })
  .extract({ left, top, width: cropWidth, height: cropHeight })
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(`Saved transparent logo to ${output} (${cropWidth}x${cropHeight})`);
