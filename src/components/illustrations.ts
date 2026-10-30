// Mọi ảnh minh hoạ trong src/assets/illustrations, đã qua vite-imagetools (AVIF + WebP).
const files = import.meta.glob<ResponsivePicture>('../assets/illustrations/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?responsive',
  import: 'default',
})

/**
 * Slot ảnh theo thiết kế.
 * - `file`: tên file có sẵn mang tên khác slot.
 * - Không có `file`: tự tìm `<slot>.png|jpg|jpeg|webp`; chưa có thì hiện placeholder.
 * - `ratio`: tỉ lệ khung trong thiết kế, dùng cho placeholder.
 */
export const slots = {
  'hero-kids': { ratio: '1 / 1', file: 'Watercolor Schooldays Under Green Leaves.webp' },
  'hero-school': { ratio: '1 / 1', file: 'Watercolor Schoolyard with Vietnamese Flag.webp' },
  'problem-center': { ratio: '16 / 7', file: 'Cozy Evening Paperwork Study.webp' },
  'problem-teacher': { ratio: '16 / 7', file: 'Watercolor Teacher Grading Papers.webp' },
  'problem-student': { ratio: '16 / 7', file: 'Quiet Sunlit Study Corner.webp' },
  'problem-parent': { ratio: '16 / 7', file: 'Worried Conversations at Dusk.webp' },
  'tab-center': { ratio: '10 / 9', file: 'Sunlit Reading Corner Portrait.webp' },
  'tab-school': { ratio: '10 / 9', file: 'Warmth in the School Corridor.webp' },
  'tab-student': { ratio: '10 / 9', file: 'Sunlit Schoolyard Reading Break.webp' },
  'tab-parent': { ratio: '10 / 9', file: 'Cozy Evening Study at Home.webp' },
  // Cắt từ thiết kế 'Bắt đầu trong 3 bước' (assets-originals/design/steps-design.png)
  'step-1': { ratio: '150 / 164', file: 'tb-step-1.webp', scan: true },
  'step-2': { ratio: '150 / 160', file: 'tb-step-2.webp', scan: true },
  // Bước 3: tranh mới từ assets-originals/design/steps-design-v2.png, tràn mép trên của thẻ
  'step-3': { ratio: '638 / 366', file: 'tb-step-3.webp', scan: true },
  // Cắt từ thiết kế 'Điểm mạnh + Tài liệu có sẵn' (assets-originals/design/why-library-design.png),
  // nền giấy đã tách thành trong suốt
  'why-tree': { ratio: '590 / 665', file: 'tb-why-tree.webp', scan: true },
  'library-books': { ratio: '440 / 285', file: 'tb-library-books.webp', scan: true },
  // scan: tranh cắt từ sách giáo khoa cũ (scripts/textbook-crops.mjs) — giữ màu in gốc, không lọc ngả màu
  'faq-boy': { ratio: '3 / 4', file: 'tb-dan-ga.webp', scan: true }, // Đàn gà mới nở
  'road-bikes': { ratio: '8 / 5', file: 'tb-canh-dong.webp', scan: true }, // Cánh đồng mùa thu
  'cta-school-gate': { ratio: '5 / 4', file: 'tb-hon-da-to.webp', scan: true }, // Hòn đá to
  'flowers-corner': { ratio: '3 / 4', file: 'tb-cay-gao.webp', scan: true }, // Cây gạo
  // Ảnh trong pop-up đăng ký: ba bạn ôm chữ a b c trên bìa Tiếng Việt 1
  'form-cover': { ratio: '9 / 8', file: 'tb-bia-abc.webp', scan: true },
} satisfies Record<string, { ratio: string; file?: string; scan?: boolean }>

export type IllustrationName = keyof typeof slots

/** Tranh scan sách cũ: đã có màu in thật, không áp bộ lọc .print-img */
export function isScan(name: IllustrationName): boolean {
  return Boolean((slots[name] as { scan?: boolean }).scan)
}

export function findIllustration(name: IllustrationName): ResponsivePicture | undefined {
  const slot = slots[name] as { ratio: string; file?: string }
  const candidates = slot.file
    ? [slot.file]
    : ['png', 'jpg', 'jpeg', 'webp'].map((ext) => `${name}.${ext}`)
  for (const c of candidates) {
    const pic = files[`../assets/illustrations/${c}`]
    if (pic) return pic
  }
}
