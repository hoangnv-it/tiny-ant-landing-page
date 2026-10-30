import { useEffect, useRef, useState, type FormEvent } from 'react'
import Button from './Button'
import Icon from './icons'
import Illustration from './Illustration'
import { isValidPhone, normalizePhone, readSource, sendLead } from '../lib/lead'
import { LEAD_OPEN_EVENT, type LeadOpenDetail } from '../lib/leadModal'
import { lockScroll, unlockScroll } from '../lib/scrollLock'
import { createTurnstile } from '../lib/turnstile'
import { contact, leadForm as t, privacyAnchor } from '../content/vi'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
// Phải khớp thời gian hiệu ứng đóng dài nhất trong index.css (.lead-dialog, mobile 200ms)
const CLOSE_MS = 220

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Kiểu "nhãn vở": mỗi dòng là nhãn + dòng chấm để điền, như nhãn dán bìa vở ngày xưa.
// Focus: không có khung; dòng chấm đổi thành nét liền xanh đậm (ink, ~7:1 trên nền nhãn).
const inputClass =
  'min-h-11 w-full min-w-0 border-0 border-b-2 border-dotted border-print-blue bg-transparent px-1 pt-2 pb-1 text-text placeholder:text-text-muted/70 focus:border-solid focus:border-ink focus-visible:outline-none aria-invalid:border-solid aria-invalid:border-danger'
const rowClass = 'grid items-end gap-x-3 sm:grid-cols-[9.5rem_1fr]'
const labelClass = 'pb-1.5 text-sm font-semibold text-ink'

/**
 * Pop-up đăng ký demo dùng chung cho mọi trang (đặt trong Layout).
 * <dialog> + showModal(): trình duyệt lo giữ focus trong pop-up, phím Esc, làm trơ phần nền.
 * Không có JS: các link #dang-ky vẫn cuộn tới khối CTA (có cách liên hệ trực tiếp).
 */
export default function LeadModal() {
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const tsRef = useRef<HTMLDivElement>(null)
  const turnstile = useRef(SITE_KEY ? createTurnstile(SITE_KEY) : null)
  const position = useRef('link')
  const returnFocus = useRef<HTMLElement | null>(null)
  const closeTimer = useRef<number>()

  const valid = isValidPhone(phone)
  const error = !touched || valid ? '' : phone.trim() ? t.phoneInvalid : t.phoneRequired

  function open({ position: pos, phone: presetPhone }: LeadOpenDetail) {
    const dialog = dialogRef.current
    if (!dialog) return
    position.current = pos
    window.clearTimeout(closeTimer.current)
    if (presetPhone !== undefined) {
      setPhone(presetPhone)
      setTouched(presetPhone.trim() !== '')
    }
    if (!dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      dialog.showModal()
      lockScroll()
      // Đọc layout để trình duyệt áp trạng thái đóng trước, rồi mới bật [data-open] cho có hiệu ứng
      void dialog.offsetWidth
      dialog.dataset.open = ''
      if (tsRef.current) turnstile.current?.mount(tsRef.current).catch(() => {})
    }
    // SĐT điền sẵn đã hợp lệ thì đưa con trỏ tới ô tiếp theo
    const target = presetPhone && isValidPhone(presetPhone) ? nameRef.current : phoneRef.current
    target?.focus()
  }

  function close() {
    const dialog = dialogRef.current
    if (!dialog?.open) return
    delete dialog.dataset.open
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => dialog.close(), CLOSE_MS)
  }

  // Sau khi đóng thật: mở lại cuộn trang, trả focus về nút đã bấm
  function onClosed() {
    unlockScroll()
    returnFocus.current?.focus?.({ preventScroll: true })
  }

  // Mọi link tới #dang-ky (header, hero, menu, trang khác) -> mở pop-up thay vì cuộn
  useEffect(() => {
    readSource() // lưu UTM ngay khi vào trang
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href*="#dang-ky"]') as HTMLAnchorElement | null
      if (!a || a.hash !== '#dang-ky' || e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return // mở tab mới: để trình duyệt xử lý
      e.preventDefault()
      open({ position: a.dataset.position ?? 'link' })
    }
    const onOpenEvent = (e: Event) => open((e as CustomEvent<LeadOpenDetail>).detail)
    document.addEventListener('click', onClick)
    window.addEventListener(LEAD_OPEN_EVENT, onOpenEvent)
    // Vào thẳng /#dang-ky (link chia sẻ, từ trang khác): mở pop-up ở frame sau (trang đã hydrate xong),
    // bỏ hash để tải lại trang không tự mở nữa
    let frame = 0
    if (location.hash === '#dang-ky') {
      history.replaceState(null, '', location.pathname + location.search)
      frame = requestAnimationFrame(() => open({ position: 'link' }))
    }
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onClick)
      window.removeEventListener(LEAD_OPEN_EVENT, onOpenEvent)
    }
  }, [])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) {
      phoneRef.current?.focus()
      return
    }
    const data = new FormData(e.currentTarget)
    const field = (k: string) => String(data.get(k) ?? '').trim()

    // Bot điền trường bẫy: giả như thành công, không gửi gì
    if (field('website')) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      let turnstileToken = ''
      if (turnstile.current && tsRef.current) {
        turnstileToken = (await turnstile.current.getToken(tsRef.current)) ?? ''
        if (!turnstileToken) throw new Error('Không lấy được mã Turnstile')
      }
      await sendLead({
        phone: normalizePhone(phone),
        name: field('name').slice(0, 120),
        center: field('center').slice(0, 160),
        website: '',
        turnstileToken,
        source: readSource(),
        position: position.current,
        page: location.pathname,
        createdAt: new Date().toISOString(),
      })
      setStatus('success')
    } catch (err) {
      console.error('[lead]', err)
      setStatus('error')
      turnstile.current?.reset()
    }
  }

  const submitting = status === 'submitting'

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="lead-title"
      aria-describedby="lead-lead"
      onCancel={(e) => {
        e.preventDefault() // Esc: đóng có hiệu ứng thay vì biến mất ngay
        close()
      }}
      onClose={onClosed}
      // Bấm ra vùng nền mờ (chính phần tử dialog, ngoài khung nội dung) để đóng
      onClick={(e) => e.target === e.currentTarget && close()}
      className="lead-dialog m-auto max-h-[min(92dvh,44rem)] w-[min(94vw,54rem)] max-w-none overflow-visible bg-transparent p-0 text-text max-sm:mb-0 max-sm:max-h-[94dvh] max-sm:w-full"
    >
      <div className="relative grid max-h-[inherit] overflow-hidden rounded-panel bg-card shadow-phone max-sm:rounded-b-none md:grid-cols-[17rem_1fr]">
        {/* Ảnh minh hoạ: dải trên cùng ở mobile, cột trái từ md. Chỉ tải khi pop-up mở lần đầu */}
        <div className="relative h-36 overflow-hidden bg-caption md:h-auto">
          <Illustration
            name="form-cover"
            sizes="(min-width: 768px) 272px, 100vw"
            pictureClassName="block h-full p-4 md:px-6 md:py-24"
            className="print-frame mx-auto h-full w-auto max-w-full -rotate-2 bg-caption object-contain shadow-card"
          />
          {/* Viền mép ảnh hoà vào trang vở */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-8 md:bg-gradient-to-l"
          />
        </div>

        <div className="notebook relative overflow-y-auto px-5 pt-6 pb-6 pl-11 sm:px-8 sm:pl-14">
          {/* Băng dính giấy dán góc, như bài được dán vào vở */}
          <span
            aria-hidden="true"
            className="absolute -top-1 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-paper-dark/80 shadow-card max-md:hidden"
          />

          <button
            type="button"
            onClick={close}
            aria-label={t.closeLabel}
            className="absolute top-2 right-2 grid size-11 place-items-center rounded-full text-ink hover:bg-paper-dark"
          >
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <h2 id="lead-title" className="pr-10 text-h3 font-bold lg:text-h3-lg">
            {t.title}
          </h2>
          <p id="lead-lead" className="mt-2 text-sm text-text-muted">
            {t.lead}
          </p>

          {status === 'success' ? (
            <div className="mt-6">
              <div className="flex items-center gap-4 rounded-caption border-[3px] border-double border-print-blue bg-label p-4">
                {/* Điểm 10 bút đỏ khoanh tròn của thầy cô (trang trí) */}
                <span
                  aria-hidden="true"
                  className="grid size-16 shrink-0 -rotate-12 place-items-center rounded-full border-2 border-accent-red font-heading text-3xl font-bold text-accent-red italic"
                >
                  {t.gradeMark}
                </span>
                <p role="status" className="flex gap-2 font-semibold text-ink">
                  <Icon name="checkCircle" className="size-6 shrink-0 text-success" />
                  {t.success}
                </p>
              </div>
              <Button onClick={close} className="mt-5 w-full">
                {t.done}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              aria-busy={submitting}
              // Clarity không ghi lại nội dung ô nhập (SĐT, tên)
              data-clarity-mask="true"
              className="mt-5 flex flex-col gap-5"
            >
              {/* Nhãn vở: viền kép, nền vàng nhạt, các dòng chấm */}
              <div className="flex flex-col gap-3 rounded-caption border-[3px] border-double border-print-blue bg-label px-4 pt-2 pb-4 shadow-card">
                <div className={rowClass}>
                  <label htmlFor="lead-phone" className={labelClass}>
                    {t.phoneLabel}
                    <span aria-hidden="true" className="text-danger">
                      *
                    </span>
                    :
                  </label>
                  <input
                    ref={phoneRef}
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder={t.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    onBlur={() => phone && setTouched(true)}
                    aria-invalid={error ? true : undefined}
                    aria-describedby="lead-phone-error"
                    className={inputClass}
                  />
                  <p
                    id="lead-phone-error"
                    aria-live="polite"
                    className="mt-1.5 text-sm font-semibold text-danger empty:hidden sm:col-start-2"
                  >
                    {error}
                  </p>
                </div>

                <div className={rowClass}>
                  <label htmlFor="lead-name" className={labelClass}>
                    {t.nameLabel}:
                  </label>
                  <input
                    ref={nameRef}
                    id="lead-name"
                    name="name"
                    autoComplete="name"
                    maxLength={120}
                    placeholder={`${t.namePlaceholder} ${t.optional}`}
                    className={inputClass}
                  />
                </div>
                <div className={rowClass}>
                  <label htmlFor="lead-center" className={labelClass}>
                    {t.centerLabel}:
                  </label>
                  <input
                    id="lead-center"
                    name="center"
                    autoComplete="organization"
                    maxLength={160}
                    placeholder={`${t.centerPlaceholder} ${t.optional}`}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Honeypot: ẩn khỏi người dùng và trình đọc màn hình */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="lead-website">{t.honeypotLabel}</label>
                <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Turnstile chế độ tự ẩn: trống trừ khi Cloudflare cần người dùng bấm */}
              <div ref={tsRef} className="empty:hidden" />

              {status === 'error' && (
                <p
                  role="alert"
                  className="rounded-card border border-danger/40 bg-white p-3 text-sm text-text"
                >
                  {t.errorLead}{' '}
                  <a href={`tel:${contact.phone}`} className="font-semibold text-ink underline">
                    {contact.phoneDisplay}
                  </a>{' '}
                  {t.errorTail}
                </p>
              )}

              <Button type="submit" disabled={submitting} className="w-full disabled:opacity-70">
                {submitting ? t.submitting : t.submit}
              </Button>

              <p className="text-xs leading-relaxed text-text-muted">
                {t.consentLead}{' '}
                {/* Mở pop-up chính sách chồng lên form (PrivacyModal), đóng thì quay lại form */}
                <a href={privacyAnchor} className="font-semibold text-ink underline">
                  {t.consentLink}
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </dialog>
  )
}
