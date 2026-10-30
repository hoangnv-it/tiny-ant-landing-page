// Khoá cuộn trang nền khi mở pop-up. Đếm số pop-up đang mở: pop-up chính sách có thể mở
// chồng lên pop-up đăng ký, chỉ mở khoá khi pop-up cuối cùng đóng.
let count = 0

/** Khoá cuộn; bù bề rộng thanh cuộn (nếu có) để nội dung không giật ngang. */
export function lockScroll() {
  if (count++ > 0) return
  const html = document.documentElement
  const scrollbar = window.innerWidth - html.clientWidth
  if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
  html.classList.add('modal-open')
}

export function unlockScroll() {
  if (count === 0 || --count > 0) return
  const html = document.documentElement
  html.classList.remove('modal-open')
  html.style.paddingRight = ''
}
