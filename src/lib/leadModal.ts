// Mở pop-up đăng ký demo từ bất kỳ đâu (ô nhập nhanh trong khối CTA…).
// Link tới #dang-ky được LeadModal tự bắt, không cần gọi hàm này.

export type LeadOpenDetail = {
  /** Vị trí nút đã bấm: hero | header | cta | link */
  position: string
  /** SĐT đã nhập sẵn (ô nhập nhanh trong khối CTA) */
  phone?: string
}

export const LEAD_OPEN_EVENT = 'tinyant:lead-open'

export function openLeadModal(detail: LeadOpenDetail) {
  window.dispatchEvent(new CustomEvent<LeadOpenDetail>(LEAD_OPEN_EVENT, { detail }))
}
