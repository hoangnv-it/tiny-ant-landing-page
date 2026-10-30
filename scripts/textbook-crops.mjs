// Cắt tranh từ ảnh scan sách giáo khoa cũ (assets-originals/textbook) -> src/assets/illustrations/*.webp
// Chỉ lấy phần tranh: bỏ chữ bài, số trang, logo, watermark, ảnh tác giả, nhãn vở.
// Dùng: node scripts/textbook-crops.mjs [thư-mục-xem-thử]
import sharp from 'sharp'
sharp.cache(false)

const SRC = 'assets-originals/textbook'
const OUT = 'src/assets/illustrations'
// box: vùng cắt (px ảnh gốc). knockout: làm trong suốt nền giấy trắng nối với mép ảnh.
const CROPS = [
  { name: 'tb-hon-da-to', src: 'hon-da-to.png', box: [150, 640, 860, 680] },
  { name: 'tb-canh-dong', src: 'canh-dong-mua-thu.png', box: [215, 278, 900, 575] },
  // erase: tô trắng vùng ảnh tác giả (toạ độ ảnh gốc) trước khi cắt
  {
    name: 'tb-cay-gao',
    src: 'cay-gao.png',
    box: [118, 140, 370, 510],
    knockout: true,
    erase: [0, 0, 172, 208],
  },
  // Gà mẹ lông trắng: không xoá nền (sẽ ăn cả gà), mép làm mờ bằng CSS
  { name: 'tb-dan-ga', src: 'dan-ga-moi-no.png', box: [462, 448, 335, 445] },
  { name: 'tb-bia-abc', src: 'bia-tieng-viet-1.png', box: [14, 145, 288, 257] },
]

/** Loang từ mép ảnh: điểm sáng gần trắng nối với mép -> alpha 0, viền mềm 2px. */
async function knockout(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width,
    H = info.height,
    N = W * H
  const light = (i) => {
    const o = i * 3
    return (
      Math.min(data[o], data[o + 1], data[o + 2]) > 200 &&
      Math.max(data[o], data[o + 1], data[o + 2]) - Math.min(data[o], data[o + 1], data[o + 2]) < 40
    )
  }
  const bg = new Uint8Array(N),
    q = new Int32Array(N)
  let h = 0,
    t = 0
  const seed = (i) => {
    if (!bg[i] && light(i)) {
      bg[i] = 1
      q[t++] = i
    }
  }
  for (let x = 0; x < W; x++) {
    seed(x)
    seed((H - 1) * W + x)
  }
  for (let y = 0; y < H; y++) {
    seed(y * W)
    seed(y * W + W - 1)
  }
  while (h < t) {
    const i = q[h++],
      x = i % W
    if (x > 0) seed(i - 1)
    if (x < W - 1) seed(i + 1)
    if (i >= W) seed(i - W)
    if (i < N - W) seed(i + W)
  }
  const rgba = Buffer.alloc(N * 4)
  for (let i = 0; i < N; i++) {
    let a = 255
    if (bg[i]) a = 0
    else {
      const x = i % W,
        y = (i / W) | 0
      let near = 0
      for (let dy = -2; dy <= 2 && !near; dy++)
        for (let dx = -2; dx <= 2; dx++) {
          const xx = x + dx,
            yy = y + dy
          if (xx >= 0 && yy >= 0 && xx < W && yy < H && bg[yy * W + xx]) {
            near = 1
            break
          }
        }
      if (near) a = 170
    }
    rgba.set([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], a], i * 4)
  }
  return sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toBuffer()
}

const preview = process.argv[2]
for (const c of CROPS) {
  const [left, top, width, height] = c.box
  let img = sharp(`${SRC}/${c.src}`)
  if (c.erase) {
    const [x, y, w, h] = c.erase
    const white = await sharp({ create: { width: w, height: h, channels: 3, background: '#fff' } })
      .png()
      .toBuffer()
    img = sharp(
      await img
        .composite([{ input: white, left: x, top: y }])
        .png()
        .toBuffer(),
    )
  }
  let buf = await img.extract({ left, top, width, height }).png().toBuffer()
  if (c.knockout) buf = await knockout(buf)
  const out = await sharp(buf).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toBuffer()
  await sharp(out).toFile(`${OUT}/${c.name}.webp`)
  if (preview)
    await sharp(buf).flatten({ background: '#d23' }).png().toFile(`${preview}/${c.name}.png`)
  console.log(`${OUT}/${c.name}.webp`, `${width}x${height}`, `${(out.length / 1024).toFixed(0)} KB`)
}
