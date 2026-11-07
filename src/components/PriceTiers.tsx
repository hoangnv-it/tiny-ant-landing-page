import type { ReactNode } from 'react'
import PaperCard from './PaperCard'
import { pricePending, priceUnit, pricingTiers } from '../content/vi'

/** Giá hiển thị: số thật nếu đã có, chưa có thì hiện chỗ chờ điền */
function formatPrice(price: number | null) {
  return price === null ? pricePending : `${price.toLocaleString('vi-VN')} ${priceUnit}`
}

type Props = {
  /** Thẻ tiêu đề mỗi gói (h3 ở trang có h2 bao ngoài) */
  heading?: 'h3' | 'p'
  /** Nội dung thêm dưới giá của mỗi gói (bảng giá đầy đủ: tính năng, nút đăng ký) */
  extra?: (index: number) => ReactNode
  className?: string
}

// 4 gói theo số học sinh, dùng ở trang chủ (rút gọn) và /bang-gia (đầy đủ)
export default function PriceTiers({ heading: H = 'h3', extra, className = '' }: Props) {
  return (
    <ul className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`}>
      {pricingTiers.map((t, i) => (
        <PaperCard as="li" key={t.name} className="flex flex-col p-4 text-center shadow-card">
          <H className="font-heading text-h3 font-bold text-ink">{t.name}</H>
          <p className="mt-1 text-sm text-text-muted">{formatPrice(t.price)}</p>
          {extra?.(i)}
        </PaperCard>
      ))}
    </ul>
  )
}
