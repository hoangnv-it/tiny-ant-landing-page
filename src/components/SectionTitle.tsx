import type { ReactNode } from 'react'

type Props = {
  id?: string
  /** Nhãn bài học kiểu sách giáo khoa cũ ("Bài 1", "Ôn tập"), hiện phía trên tiêu đề */
  lesson?: string
  className?: string
  children: ReactNode
}

// Tiêu đề section kiểu sách giáo khoa: nhãn "Bài N" đỏ phía trên, tiêu đề Bitter đậm màu ink.
// Nhãn là trang trí (aria-hidden) để tiêu đề đọc lên vẫn gọn.
export default function SectionTitle({ id, lesson, className = '', children }: Props) {
  return (
    <h2 id={id} className={`text-h2 font-bold lg:text-h2-lg ${className}`}>
      {lesson && <LessonTag>{lesson}</LessonTag>}
      <span className="block">{children}</span>
    </h2>
  )
}

/** Nhãn "Bài N": chữ đỏ in, gạch chân đỏ mảnh như đầu bài trong sách cũ */
export function LessonTag({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`mb-1.5 inline-block border-b-2 border-accent-red pb-0.5 font-heading text-sm font-bold tracking-wide text-accent-red uppercase ${className}`}
    >
      {children}
    </span>
  )
}
