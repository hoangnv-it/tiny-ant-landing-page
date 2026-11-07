import Container from '../components/Container'
import Icon from '../components/icons'
import PageHero from '../components/PageHero'
import PaperCard from '../components/PaperCard'
import Seo from '../components/Seo'
import { viDate } from '../lib/date'
import { article, subpageJsonLd } from '../lib/structuredData'
import FaqCtaSheet from '../sections/FaqCtaSheet'
import type { ArticleBlock, ArticleContent, GuideMeta } from '../content/types'
import { guidesPage, guidesPath, pageLinks, subpage } from '../content/vi'

// Khuôn bài hướng dẫn: breadcrumb, h1, ngày đăng + tác giả, thân bài (h2/h3/đoạn/danh sách/bảng/ghi chú),
// cuối bài mới giới thiệu Tiny Ant kèm link sang trang tính năng, rồi khối đăng ký.
export default function ArticlePage({
  meta: m,
  content: c,
}: {
  meta: GuideMeta
  content: ArticleContent
}) {
  const crumbs = [
    { name: subpage.home, href: '/' },
    { name: guidesPage.crumb, href: guidesPath },
    { name: m.crumb, href: m.href },
  ]
  const links = c.outro.links.map((href) => pageLinks.find((p) => p.href === href)!)

  return (
    <>
      <Seo
        title={m.meta.title}
        description={m.meta.description}
        path={m.href}
        type="article"
        jsonLd={subpageJsonLd({
          path: m.href,
          title: m.meta.title,
          description: m.meta.description,
          crumbs,
          extra: [
            article({
              path: m.href,
              title: m.title,
              description: m.meta.description,
              published: m.published,
              modified: m.modified,
            }),
          ],
        })}
      />

      <PageHero
        crumbs={crumbs}
        lesson={guidesPage.lesson}
        title={m.title}
        lead={
          <>
            <p className="text-sm text-text-muted">
              {guidesPage.authorLabel}: {guidesPage.author} · {guidesPage.published}{' '}
              <time dateTime={m.published}>{viDate(m.published)}</time>
            </p>
            <p className="mt-4">{c.lead}</p>
          </>
        }
        noCta
        position="huong-dan"
      />

      <Container className="pb-section">
        <article className="max-w-3xl">
          {c.body.map((b, i) => (
            <Block key={i} block={b} />
          ))}

          <PaperCard className="mt-10 p-5 shadow-card md:p-7">
            <h2 className="text-h3 font-bold lg:text-h3-lg">{c.outro.title}</h2>
            <p className="mt-3 leading-relaxed text-text">{c.outro.text}</p>
            <ul className="mt-3 flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink hover:underline"
                  >
                    {l.label}
                    <Icon name="arrowForward" className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </PaperCard>
        </article>
      </Container>

      <FaqCtaSheet faq={null} />
    </>
  )
}

const text = 'mt-4 leading-relaxed text-text lg:text-lg'

function Block({ block: b }: { block: ArticleBlock }) {
  if ('h2' in b) return <h2 className="mt-10 text-h2 font-bold lg:text-h2-why">{b.h2}</h2>
  if ('h3' in b) return <h3 className="mt-6 text-h3 font-bold lg:text-h3-lg">{b.h3}</h3>
  if ('p' in b) return <p className={text}>{b.p}</p>
  if ('ul' in b)
    return (
      <ul className={`${text} list-disc space-y-2 pl-6 marker:text-ink-500`}>
        {b.ul.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    )
  if ('ol' in b)
    return (
      <ol className={`${text} list-decimal space-y-2 pl-6 marker:font-bold marker:text-ink-500`}>
        {b.ol.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ol>
    )
  if ('table' in b)
    return (
      // Bảng rộng cuộn ngang trên màn hẹp: khung nhận focus để cuộn bằng bàn phím
      <div
        role="region"
        aria-label={b.table.caption}
        tabIndex={0}
        className="mt-5 overflow-x-auto rounded-caption border border-border bg-card shadow-card"
      >
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <caption className="sr-only">{b.table.caption}</caption>
          <thead className="bg-paper-dark font-heading text-ink">
            <tr>
              {b.table.head.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map(([first, ...rest]) => (
              <tr key={first} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-ink">
                  {first}
                </th>
                {rest.map((cell, i) => (
                  <td key={i} className="px-4 py-3 text-text">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  return (
    <p className="mt-5 rounded-caption border-l-4 border-accent-red bg-caption px-4 py-3 leading-relaxed text-text">
      {b.note}
    </p>
  )
}
