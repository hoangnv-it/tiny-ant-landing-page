// Tạo favicon, apple-touch-icon và icon cho manifest từ hình con kiến.
// Dùng: npm run icons   (chạy lại khi đổi logo)
//
// Nguồn: src/assets/favicon.png (hình con kiến, nền trong suốt). Không dùng src/assets/logo.svg:
// file đó là logo ngang có chữ và chứa cả nền ô caro giả trong suốt bị "dò" vào vector.
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'src/assets/favicon.png'
const OUT = 'public'
const PAPER = '#f2e4cc' // = --color-paper trong tokens.css

/** Con kiến căn giữa trong ô vuông `size`, chừa `pad` (tỉ lệ) mỗi cạnh. */
async function square(size, { pad = 0.04, background } = {}) {
  const inner = Math.round(size * (1 - pad * 2))
  const mark = await sharp(SRC)
    .trim()
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()
}

/** ICO chứa ảnh PNG (hỗ trợ từ Windows Vista, mọi trình duyệt hiện đại). */
function ico(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // loại: icon
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + 16 * pngs.length
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0)
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt16LE(1, 4) // planes
    e.writeUInt16LE(32, 6) // bit/px
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

const files = {
  'favicon.ico': ico([
    { size: 16, data: await square(16, { pad: 0 }) },
    { size: 32, data: await square(32, { pad: 0 }) },
  ]),
  'favicon-32.png': await square(32, { pad: 0 }),
  // iOS không hỗ trợ trong suốt: nền giấy, chừa lề
  'apple-touch-icon.png': await square(180, { pad: 0.12, background: PAPER }),
  'icon-192.png': await square(192),
  'icon-512.png': await square(512),
  // Maskable: hình nằm trong vùng an toàn 80% ở giữa
  'icon-maskable-512.png': await square(512, { pad: 0.2, background: PAPER }),
}

for (const [name, data] of Object.entries(files)) {
  await writeFile(`${OUT}/${name}`, data)
  console.log(`${OUT}/${name}`, `${(data.length / 1024).toFixed(1)} KB`)
}
