import type { ElementType, ReactNode } from 'react'

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
}

// Thẻ kiểu ô chú thích trong sách giáo khoa cũ: nền giấy trắng ngà, bo tròn, viền mực xanh nhạt.
export default function PaperCard({ as: Tag = 'div', className = '', children }: Props) {
  return (
    <Tag className={`rounded-caption border border-print-blue/40 bg-caption ${className}`}>
      {children}
    </Tag>
  )
}
