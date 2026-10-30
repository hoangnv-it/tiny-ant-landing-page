// Microsoft Clarity (bản đồ nhiệt, ghi lại phiên xem). Mã dự án không phải bí mật.
// Có thể đổi qua biến môi trường VITE_CLARITY_ID; đặt rỗng để tắt.
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID ?? 'z5p0ldxa1j'

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

/**
 * Nạp Clarity sau khi trang tải xong và trình duyệt rảnh, để không làm chậm lần hiển thị đầu.
 * Bỏ qua khi chạy ở máy (localhost, preview, script kiểm tra) để không lẫn vào số liệu thật.
 */
export function loadClarity() {
  if (!CLARITY_ID || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return

  const inject = () => {
    // Đoạn khởi tạo gốc của Clarity: gom lệnh gọi sớm vào hàng đợi rồi tải script bất đồng bộ
    window.clarity ||= Object.assign(
      (...args: unknown[]) => {
        ;(window.clarity!.q ||= []).push(args)
      },
      { q: [] as unknown[] },
    )
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
    document.head.appendChild(s)
  }
  const idle = () =>
    'requestIdleCallback' in window ? requestIdleCallback(inject) : setTimeout(inject, 1)

  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
}
