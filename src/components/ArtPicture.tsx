// <picture> chọn ảnh theo breakpoint (art direction): trình duyệt chỉ tải đúng một bản.
// Không có ảnh cho màn nhỏ -> dùng 1 điểm ảnh trong suốt nhúng sẵn, không tải gì.
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

type Props = {
  /** Ảnh từ breakpoint `media` trở lên */
  large: ResponsivePicture
  media: string
  largeSizes: string
  /** Ảnh dưới breakpoint; bỏ trống = không hiện ảnh nào */
  small?: ResponsivePicture
  smallSizes?: string
  className?: string
  pictureClassName?: string
}

export default function ArtPicture({
  large,
  media,
  largeSizes,
  small,
  smallSizes = '100vw',
  className,
  pictureClassName,
}: Props) {
  return (
    <picture className={pictureClassName}>
      {Object.entries(large.sources).map(([format, srcSet]) => (
        <source
          key={`l-${format}`}
          media={media}
          type={`image/${format}`}
          srcSet={srcSet}
          sizes={largeSizes}
        />
      ))}
      {small &&
        Object.entries(small.sources).map(([format, srcSet]) => (
          <source key={`s-${format}`} type={`image/${format}`} srcSet={srcSet} sizes={smallSizes} />
        ))}
      <img
        src={small?.img.src ?? BLANK}
        width={(small ?? large).img.w}
        height={(small ?? large).img.h}
        alt=""
        className={className}
        loading="eager"
        decoding="async"
        // Ảnh hero: ưu tiên tải (React 18 chưa có prop fetchPriority)
        {...{ fetchpriority: 'high' }}
      />
    </picture>
  )
}
