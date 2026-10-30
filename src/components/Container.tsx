import type { ElementType, ReactNode } from 'react'

type Props = {
  as?: ElementType
  id?: string
  className?: string
  children: ReactNode
}

// Khung nội dung: tối đa 1280px, lề 16px trên mobile.
export default function Container({ as: Tag = 'div', id, className = '', children }: Props) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-page px-4 md:px-6 ${className}`}>
      {children}
    </Tag>
  )
}
