import Container from '../components/Container'
import Icon from '../components/icons'
import Media from '../components/Media'
import PageHero from '../components/PageHero'
import PaperCard from '../components/PaperCard'
import SectionTitle from '../components/SectionTitle'
import Seo from '../components/Seo'
import { subpageJsonLd } from '../lib/structuredData'
import FaqCtaSheet from '../sections/FaqCtaSheet'
import { NotebookList } from '../sections/Problems'
import type { FeatureContent } from '../content/types'
import { pageLinks, subpage } from '../content/vi'

// Khuôn trang tính năng / đối tượng: mở đầu (nỗi đau) -> 3–5 phần tính năng (h2) -> cách dùng
// -> 2 trang liên quan -> FAQ riêng + khối đăng ký. Nội dung: src/content/features/<trang>.ts
export default function FeaturePage({ content: c }: { content: FeatureContent }) {
  const crumbs = [
    { name: subpage.home, href: '/' },
    { name: c.crumb, href: c.path },
  ]
  const related = c.related.map((href) => pageLinks.find((p) => p.href === href)!)
  const position = c.path.slice(1)

  return (
    <>
      <Seo
        title={c.meta.title}
        description={c.meta.description}
        path={c.path}
        jsonLd={subpageJsonLd({
          path: c.path,
          title: c.meta.title,
          description: c.meta.description,
          crumbs,
          faq: c.faq.items,
        })}
      />

      <PageHero
        crumbs={crumbs}
        lesson={c.hero.lesson}
        title={c.hero.title}
        lead={<p>{c.hero.lead}</p>}
        media={c.hero.media}
        position={`${position}-hero`}
      />

      <Container className="pb-section">
        <section id="van-de" aria-labelledby="van-de-title" className="max-w-3xl">
          <SectionTitle id="van-de-title" lesson={subpage.painsLesson}>
            {c.pains.title}
          </SectionTitle>
          <NotebookList items={c.pains.items} className="mt-6" />
        </section>
      </Container>

      {c.sections.map((s, i) => (
        <Container key={s.id} className="pb-section">
          <section
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={
              s.media ? 'grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14' : 'max-w-3xl'
            }
          >
            <div className="min-w-0">
              <SectionTitle id={`${s.id}-title`}>{s.title}</SectionTitle>
              {s.text.map((t) => (
                <p key={t} className="mt-4 leading-relaxed text-text lg:text-lg">
                  {t}
                </p>
              ))}
              {s.points && (
                <ul className="mt-5 flex flex-col gap-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-text">
                      <Icon name="checkCircle" className="mt-0.5 size-5 shrink-0 text-ink-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {s.media && (
              <Media
                media={s.media}
                className={`${s.media.kind === 'screen' ? '' : 'mx-auto w-full max-w-lg'} ${i % 2 ? 'lg:order-first' : ''}`}
              />
            )}
          </section>
        </Container>
      ))}

      <Container className="pb-section">
        <section id="cach-dung" aria-labelledby="cach-dung-title">
          <SectionTitle id="cach-dung-title" lesson={subpage.howToLesson}>
            {c.howTo.title}
          </SectionTitle>
          <ol
            className={`mt-7 grid gap-4 sm:grid-cols-2 ${c.howTo.steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}
          >
            {c.howTo.steps.map((step, i) => (
              <PaperCard as="li" key={step.title} className="relative p-5 pt-14 shadow-card">
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-5 grid size-9 place-items-center rounded-full bg-ink text-lg font-bold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="font-heading text-h3 font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text">{step.text}</p>
              </PaperCard>
            ))}
          </ol>
        </section>
      </Container>

      <Container className="pb-section">
        <section id="lien-quan" aria-labelledby="lien-quan-title">
          <SectionTitle id="lien-quan-title" lesson={subpage.relatedLesson}>
            {subpage.relatedTitle}
          </SectionTitle>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="group flex h-full items-center gap-4 rounded-caption border border-print-blue/40 bg-caption p-5 shadow-card transition-colors hover:border-ink-500"
                >
                  <span className="flex-1">
                    <span className="block font-heading text-h3 font-bold text-ink group-hover:underline">
                      {r.label}
                    </span>
                    <span className="mt-1 block text-sm text-text">{r.desc}</span>
                  </span>
                  <Icon name="arrowForward" className="size-6 shrink-0 text-ink-500" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <FaqCtaSheet faq={{ lesson: subpage.faqLesson, title: c.faq.title, items: c.faq.items }} />
    </>
  )
}
