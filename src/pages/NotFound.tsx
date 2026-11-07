import Button from '../components/Button'
import Container from '../components/Container'
import Icon from '../components/icons'
import { LessonTag } from '../components/SectionTitle'
import Seo from '../components/Seo'
import {
  guidesPath,
  guidesPage,
  notFound,
  pageLinks,
  pricingPage,
  pricingPath,
} from '../content/vi'

// Trang 404 (dist/404.html, Cloudflare trả về cho đường dẫn không có). noindex, không vào sitemap.
const links = [
  ...pageLinks,
  { href: pricingPath, label: pricingPage.crumb, desc: pricingPage.lead },
  { href: guidesPath, label: guidesPage.crumb, desc: guidesPage.lead },
]

export function Component() {
  return (
    <>
      <Seo
        title={notFound.meta.title}
        description={notFound.meta.description}
        path="/404"
        noindex
      />
      <Container className="pt-10 pb-section">
        <LessonTag>{notFound.lesson}</LessonTag>
        <h1 className="text-h1 font-bold md:text-h1-lg">{notFound.title}</h1>
        <p className="mt-4 max-w-2xl text-lead">{notFound.text}</p>
        <Button href="/" className="mt-6">
          {notFound.homeLink}
        </Button>

        <h2 className="mt-12 text-h2 font-bold">{notFound.listTitle}</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group flex h-full items-center gap-3 rounded-caption border border-print-blue/40 bg-caption p-4 shadow-card hover:border-ink-500"
              >
                <span className="flex-1">
                  <span className="block font-heading font-bold text-ink group-hover:underline">
                    {l.label}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-sm text-text">{l.desc}</span>
                </span>
                <Icon name="arrowForward" className="size-5 shrink-0 text-ink-500" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
