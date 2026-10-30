import { useEffect, useRef } from 'react'
import { lockScroll, unlockScroll } from '../lib/scrollLock'
import { privacy, privacyAnchor } from '../content/vi'

// Phải khớp thời gian hiệu ứng đóng dài nhất trong index.css (.lead-dialog)
const CLOSE_MS = 220
const HASH = privacyAnchor

/**
 * Pop-up Chính sách bảo mật (đặt trong Layout). Mọi link #chinh-sach-bao-mat mở pop-up này,
 * kể cả link trong form đăng ký (mở chồng lên form, đóng thì quay lại form).
 * Tắt JS: link nhảy tới #chinh-sach-bao-mat, CSS (:target) hiện nội dung ngay trong trang.
 */
export default function PrivacyModal() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const closeTimer = useRef<number>()

  function open() {
    const dialog = dialogRef.current
    if (!dialog) return
    window.clearTimeout(closeTimer.current)
    if (!dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      dialog.showModal()
      lockScroll()
      void dialog.offsetWidth // áp trạng thái đóng trước để có hiệu ứng mở
      dialog.dataset.open = ''
      dialog.querySelector('.privacy-body')?.scrollTo({ top: 0 })
    }
    closeBtn.current?.focus()
  }

  function close() {
    const dialog = dialogRef.current
    if (!dialog?.open) return
    delete dialog.dataset.open
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => dialog.close(), CLOSE_MS)
  }

  function onClosed() {
    unlockScroll()
    returnFocus.current?.focus?.({ preventScroll: true })
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.(`a[href$="${HASH}"]`) as HTMLAnchorElement | null
      if (!a || a.hash !== HASH || e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      open()
    }
    document.addEventListener('click', onClick)
    // Vào thẳng /#chinh-sach-bao-mat (link cũ /chinh-sach-bao-mat được chuyển hướng về đây)
    let frame = 0
    if (location.hash === HASH) {
      history.replaceState(null, '', location.pathname + location.search)
      frame = requestAnimationFrame(open)
    }
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      id={HASH.slice(1)}
      aria-labelledby="privacy-title"
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClose={onClosed}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="lead-dialog m-auto max-h-[min(90dvh,46rem)] w-[min(94vw,42rem)] max-w-none overflow-visible bg-transparent p-0 text-text max-sm:mb-0 max-sm:max-h-[92dvh] max-sm:w-full"
    >
      <div className="flex max-h-[inherit] flex-col overflow-hidden rounded-panel border border-aged-edge bg-aged shadow-phone max-sm:rounded-b-none">
        <div className="flex items-start justify-between gap-4 border-b border-aged-edge px-6 pt-6 pb-4 sm:px-8">
          <div>
            <h2 id="privacy-title" className="text-h3 font-bold lg:text-h3-lg">
              {privacy.title}
            </h2>
            <p className="mt-1 text-sm text-text">{privacy.updated}</p>
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label={privacy.closeLabel}
            className="js-only -mt-1 -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-ink hover:bg-paper-dark"
          >
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Vùng cuộn được: nhận focus bàn phím để cuộn bằng phím mũi tên */}
        <div tabIndex={0} className="privacy-body overflow-y-auto px-6 pt-5 pb-8 sm:px-8">
          <p className="leading-relaxed">{privacy.intro}</p>
          {privacy.sections.map((s) => (
            <section key={s.heading} className="mt-6">
              <h3 className="font-heading text-lg font-bold text-ink">{s.heading}</h3>
              {s.list && (
                <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-ink-500">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-2 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </dialog>
  )
}
