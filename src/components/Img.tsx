type Props = {
  src: ResponsivePicture
  /** alt="" cho ảnh trang trí */
  alt: string
  sizes?: string
  className?: string
  /** class cho thẻ <picture> bao ngoài */
  pictureClassName?: string
  /** Ảnh hero / trên màn hình đầu: tải ngay, không lazy */
  priority?: boolean
}

// Ảnh chung cho cả trang: <picture> AVIF + WebP từ vite-imagetools (?responsive).
export default function Img({
  src,
  alt,
  sizes = '100vw',
  className,
  pictureClassName,
  priority = false,
}: Props) {
  return (
    <picture className={pictureClassName}>
      {Object.entries(src.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={src.img.src}
        width={src.img.w}
        height={src.img.h}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // React 18 chưa hỗ trợ prop fetchPriority, phải truyền thuộc tính HTML chữ thường
        {...(priority ? { fetchpriority: 'high' } : {})}
      />
    </picture>
  )
}
