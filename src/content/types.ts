import type { MediaSpec } from '../components/Media'

export type FaqItem = { q: string; a: string }

/** Trang tính năng / đối tượng (src/content/features/*.ts), dựng bằng src/pages/FeaturePage.tsx */
export type FeatureContent = {
  /** Đường dẫn trang, ví dụ "/quan-ly-hoc-phi" (trùng tên file nội dung) */
  path: string
  meta: { title: string; description: string }
  /** Tên trang trong breadcrumb */
  crumb: string
  hero: { lesson: string; title: string; lead: string; media: MediaSpec }
  /** Mở đầu: nỗi vất vả quen thuộc */
  pains: { title: string; items: string[] }
  /** 3–5 phần tính năng (h2), chỉ lấy từ danh sách tính năng đã xác minh */
  sections: {
    id: string
    title: string
    text: string[]
    points?: string[]
    media?: MediaSpec
  }[]
  howTo: { title: string; steps: { title: string; text: string }[] }
  faq: { title: string; items: FaqItem[] }
  /** 2 trang liên quan (đường dẫn trong `pageLinks`) */
  related: [string, string]
}

/** Khối nội dung của bài hướng dẫn */
export type ArticleBlock =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { caption: string; head: string[]; rows: string[][] } }
  | { note: string }

/** Thông tin bài hướng dẫn: nằm trong vi.ts (guides) để trang danh sách không phải tải cả bài */
export type GuideMeta = (typeof import('./vi').guides)[number]

/** Thân bài hướng dẫn (src/content/guides/<ten-bai>.ts), dựng bằng src/pages/ArticlePage.tsx */
export type ArticleContent = {
  lead: string
  body: ArticleBlock[]
  /** Đoạn cuối bài: giới thiệu Tiny Ant + link sang trang tính năng */
  outro: { title: string; text: string; links: string[] }
}
