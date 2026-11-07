import Container from '../components/Container'
import Icon from '../components/icons'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { subpageJsonLd } from '../lib/structuredData'
import { guides, guidesPage as g, guidesPath, subpage } from '../content/vi'
import { viDate } from './ArticlePage'

const crumbs = [
  { name: subpage.home, href: '/' },
  { name: g.crumb, href: guidesPath },
]

// /huong-dan: danh sách bài hướng dẫn (thông tin bài lấy từ vi.ts, không tải thân bài)
export function Component() {
  return (
    <>
      <Seo
        title={g.meta.title}
        description={g.meta.description}
        path={guidesPath}
        jsonLd={subpageJsonLd({
          path: guidesPath,
          title: g.meta.title,
          description: g.meta.description,
          crumbs,
        })}
      />
      <PageHero
        crumbs={crumbs}
        lesson={g.lesson}
        title={g.title}
        lead={<p>{g.lead}</p>}
        position="huong-dan"
      />
      <Container className="pb-section">
        <ul className="grid gap-5 md:grid-cols-3">
          {guides.map((a) => (
            <li key={a.href}>
              <article className="flex h-full flex-col rounded-caption border border-print-blue/40 bg-caption p-5 shadow-card">
                <h2 className="font-heading text-h3 font-bold lg:text-h3-lg">
                  <a href={a.href} className="hover:underline">
                    {a.title}
                  </a>
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                  {g.published} <time dateTime={a.published}>{viDate(a.published)}</time>
                </p>
                <p className="mt-3 flex-1 leading-relaxed text-text">{a.meta.description}</p>
                <a
                  href={a.href}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink hover:underline"
                >
                  {g.readMore}
                  <span className="sr-only">: {a.title}</span>
                  <Icon name="arrowForward" className="size-4" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
