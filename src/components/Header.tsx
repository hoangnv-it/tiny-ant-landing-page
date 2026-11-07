import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import Container from './Container'
import Icon from './icons'
import Logo from './Logo'
import { demoAnchor, featurePages, nav } from '../content/vi'

const linkClass = 'font-semibold text-ink hover:underline'

// Header dính trên cùng. Từ lg: "Tính năng" (menu thả xuống 5 trang) + link ngang.
// Dưới lg: logo + nút dùng thử + nút menu; menu mobile liệt kê đủ các trang.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [featOpen, setFeatOpen] = useState(false)
  const { pathname } = useLocation()
  // Ở trang chủ dùng neo thuần (#…): đổi /#… thành #… để không tải lại trang khi URL có ?utm_…
  const here = (href: string) => (pathname === '/' && href.startsWith('/#') ? href.slice(1) : href)
  const toggle = useRef<HTMLButtonElement>(null)
  const featButton = useRef<HTMLButtonElement>(null)
  const featItem = useRef<HTMLLIElement>(null)

  const close = () => setOpen(false)
  // Esc khi focus đang trong header: đóng menu đang mở và trả focus về nút đã mở nó
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (featOpen) {
      setFeatOpen(false)
      featButton.current?.focus()
    } else if (open) {
      close()
      toggle.current?.focus()
    }
  }
  // Focus rời khỏi menu "Tính năng" (Tab ra ngoài): đóng
  const onFeatBlur = (e: FocusEvent) => {
    if (!featItem.current?.contains(e.relatedTarget as Node | null)) setFeatOpen(false)
  }
  // Bấm ra ngoài menu "Tính năng": đóng (không cần phản hồi tức thì nên dùng listener trong effect)
  useEffect(() => {
    if (!featOpen) return
    const onDown = (e: MouseEvent) => {
      if (!featItem.current?.contains(e.target as Node)) setFeatOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [featOpen])

  return (
    <header
      onKeyDown={onKeyDown}
      className="sticky top-0 z-40 bg-paper/95 shadow-header backdrop-blur-sm"
    >
      <Container className="flex h-header items-center gap-4">
        <Logo priority />

        <nav aria-label={nav.label} className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            <li ref={featItem} onBlur={onFeatBlur} className="nav-features relative">
              <button
                ref={featButton}
                type="button"
                aria-expanded={featOpen}
                aria-controls="menu-tinh-nang"
                onClick={() => setFeatOpen((v) => !v)}
                className={`inline-flex min-h-11 items-center gap-0.5 ${linkClass}`}
              >
                {nav.featuresLabel}
                <Icon name="expandMore" className="nav-chevron size-5" />
              </button>
              {/* Luôn có trong HTML prerender; ẩn/hiện bằng data-open (.nav-dropdown trong index.css) */}
              <ul
                id="menu-tinh-nang"
                data-open={featOpen ? '' : undefined}
                className="nav-dropdown absolute top-full left-1/2 z-50 w-80 -translate-x-1/2 rounded-caption border border-border bg-card p-2 shadow-card"
              >
                {featurePages.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="block rounded-panel px-3 py-2.5 hover:bg-paper-dark"
                    >
                      <span className="block font-semibold text-ink">{l.label}</span>
                      <span className="block text-text-muted">{l.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={here(l.href)} className={`inline-flex min-h-11 items-center ${linkClass}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0 lg:gap-6">
          <Button
            href={here(demoAnchor)}
            size="sm"
            data-position="header"
            className="whitespace-nowrap max-[359px]:text-xs max-sm:px-3.5"
          >
            <span className="sm:hidden">{nav.demoCtaShort}</span>
            <span className="max-sm:hidden">{nav.demoCta}</span>
          </Button>
          <button
            ref={toggle}
            type="button"
            className="js-only -mr-2 grid size-11 place-items-center rounded-full text-ink hover:bg-paper-dark lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {/* 3 vạch, CSS (.menu-icon trong index.css) biến thành chữ X khi aria-expanded */}
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>

      {/* Có sẵn trong HTML prerender; ẩn/hiện có hiệu ứng bằng data-open (.mobile-menu trong index.css) */}
      <nav
        id="mobile-menu"
        aria-label={nav.label}
        data-open={open ? '' : undefined}
        className="mobile-menu bg-paper lg:hidden"
      >
        {/* Lớp bọc co về cao 0 khi đóng (cắt cả viền và padding của danh sách) */}
        <div>
          <Container
            as="ul"
            className="flex max-h-[calc(100dvh-var(--spacing-header))] flex-col overflow-y-auto border-t border-border py-2"
          >
            <li>
              <p className="pt-3 pb-1 text-xs font-bold tracking-wide text-text-muted uppercase">
                {nav.featuresLabel}
              </p>
              <ul className="border-l-2 border-border pl-4">
                {featurePages.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={close} className={`block py-2.5 ${linkClass}`}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={here(l.href)} onClick={close} className={`block py-3 ${linkClass}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </Container>
        </div>
      </nav>
    </header>
  )
}
