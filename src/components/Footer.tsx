import { useLocation } from 'react-router-dom'
import Button from './Button'
import Container from './Container'
import Icon, { type IconName } from './icons'
import Logo from './Logo'
import ZaloButton from './ZaloButton'
import { contact, demoAnchor, footer, nav } from '../content/vi'

const headingClass = 'font-heading text-sm font-bold tracking-wide text-ink uppercase'
const linkClass =
  'inline-flex min-h-11 items-center text-text-muted transition-colors hover:text-ink hover:underline'

// Footer kiểu trang cuối sách cũ: kẻ đôi phía trên, 4 cột (giới thiệu | Dành cho | Tìm hiểu | Liên hệ),
// dải bản quyền dưới cùng. Mobile: giới thiệu, 2 cột link cạnh nhau, liên hệ.
export default function Footer() {
  const { pathname } = useLocation()
  // Ở trang chủ dùng neo thuần (#…) để không tải lại trang khi URL có ?utm_…
  const here = (href: string) => (pathname === '/' && href.startsWith('/#') ? href.slice(1) : href)

  const contacts: { icon: IconName; label: string; href: string; text: string }[] = [
    {
      icon: 'call',
      label: footer.phoneLabel,
      href: `tel:${contact.phone}`,
      text: contact.phoneDisplay,
    },
    {
      icon: 'mail',
      label: footer.emailLabel,
      href: `mailto:${contact.email}`,
      text: contact.email,
    },
  ]

  return (
    <footer className="mt-section border-t-4 border-double border-border bg-paper-dark/60 lg:mt-section-lg">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.35fr_2fr_1.25fr] lg:gap-12 lg:py-14">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-text-muted">{footer.about}</p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <Button href={here(demoAnchor)} size="sm" data-position="footer">
              {nav.demoCta}
            </Button>
            <ZaloButton size="sm" position="footer" />
          </div>
        </div>

        <nav aria-label={footer.label} className="grid grid-cols-2 gap-6">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h2 className={headingClass}>{col.title}</h2>
              <ul className="mt-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={here(l.href)} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="md:col-span-2 lg:col-span-1">
          <h2 className={headingClass}>{footer.contactTitle}</h2>
          <ul className="mt-3 text-sm">
            {contacts.map((c) => (
              <li key={c.icon}>
                <a href={c.href} className="group inline-flex min-h-11 items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-500 text-white transition-colors group-hover:bg-ink-700">
                    <Icon name={c.icon} className="size-4" />
                  </span>
                  <span>
                    <span className="sr-only">{c.label}: </span>
                    <span className="font-semibold text-ink group-hover:underline">{c.text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex gap-2 text-sm text-text-muted">
            <Icon name="schedule" className="mt-0.5 size-4 shrink-0" />
            {contact.responseTime}
          </p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col-reverse gap-1 py-3 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="py-2 sm:py-0">{footer.copyright}</p>
          <a href="#" className={`${linkClass} gap-1.5`}>
            <Icon name="arrowUpward" className="size-4" />
            {footer.backToTop}
          </a>
        </Container>
      </div>
    </footer>
  )
}
