import { useRef, useState, type KeyboardEvent } from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import Container from './Container'
import Logo from './Logo'
import { demoAnchor, nav } from '../content/vi'

const linkClass = 'font-semibold text-ink hover:underline'

// Header dính trên cùng. Từ lg: link ngang. Dưới lg: logo + nút demo + nút menu.
export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  // Ở trang chủ dùng neo thuần (#…): đổi /#… thành #… để không tải lại trang khi URL có ?utm_…
  const here = (href: string) => (pathname === '/' && href.startsWith('/#') ? href.slice(1) : href)
  const toggle = useRef<HTMLButtonElement>(null)

  const close = () => setOpen(false)
  // Esc khi focus đang trong header (nút menu hoặc link trong menu): đóng và trả focus về nút
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      close()
      toggle.current?.focus()
    }
  }

  return (
    <header
      onKeyDown={onKeyDown}
      className="sticky top-0 z-40 bg-paper/95 shadow-header backdrop-blur-sm"
    >
      <Container className="flex h-header items-center gap-4">
        <Logo priority />

        <nav aria-label={nav.label} className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-9 text-sm">
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
          <Container as="ul" className="flex flex-col border-t border-border py-2">
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
