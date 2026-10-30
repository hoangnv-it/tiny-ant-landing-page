import Img from './Img'
import { findIllustration, isScan, slots, type IllustrationName } from './illustrations'

type Props = {
  name: IllustrationName
  /** Ảnh minh hoạ là trang trí: mặc định alt="" */
  alt?: string
  sizes?: string
  className?: string
  pictureClassName?: string
  priority?: boolean
}

export default function Illustration({
  name,
  alt = '',
  sizes,
  className = '',
  pictureClassName,
  priority,
}: Props) {
  const pic = findIllustration(name)
  if (pic) {
    return (
      <Img
        src={pic}
        alt={alt}
        sizes={sizes}
        // Tranh màu nước chỉnh màu như in offset trên sách cũ; tranh scan sách thật giữ nguyên
        className={`${isScan(name) ? '' : 'print-img'}${className}`}
        pictureClassName={pictureClassName}
        priority={priority}
      />
    )
  }
  // Placeholder tạm: khung be đúng tỉ lệ, ghi tên slot. Tự biến mất khi có file ảnh.
  return (
    <div
      aria-hidden="true"
      data-placeholder={name}
      style={{ aspectRatio: slots[name].ratio }}
      className={`grid place-items-center rounded-card border-2 border-dashed border-border bg-paper-dark font-mono text-xs text-text ${className}`}
    >
      {name}
    </div>
  )
}
