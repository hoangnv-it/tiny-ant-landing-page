import Button from '../components/Button'
import Container from '../components/Container'
import Icon from '../components/icons'
import PageHero from '../components/PageHero'
import PaperCard from '../components/PaperCard'
import PriceTiers from '../components/PriceTiers'
import SectionTitle from '../components/SectionTitle'
import Seo from '../components/Seo'
import { softwareApplication, subpageJsonLd } from '../lib/structuredData'
import FaqCtaSheet from '../sections/FaqCtaSheet'
import { demoAnchor, pricingPage as p, pricingPath, subpage } from '../content/vi'

const crumbs = [
  { name: subpage.home, href: '/' },
  { name: p.crumb, href: pricingPath },
]

// /bang-gia: 4 gói theo số học sinh (giá chờ điền), tính năng có trong mọi gói, FAQ, đăng ký.
// SoftwareApplication ở đây tự có `offers` khi pricingTiers đã có giá thật (src/lib/structuredData.ts).
export function Component() {
  return (
    <>
      <Seo
        title={p.meta.title}
        description={p.meta.description}
        path={pricingPath}
        jsonLd={subpageJsonLd({
          path: pricingPath,
          title: p.meta.title,
          description: p.meta.description,
          crumbs,
          faq: p.faq.items,
          extra: [softwareApplication],
        })}
      />

      <PageHero
        crumbs={crumbs}
        lesson={p.lesson}
        title={p.title}
        lead={<p>{p.lead}</p>}
        position="bang-gia-hero"
      />

      <Container className="pb-section">
        <section id="cac-goi" aria-labelledby="cac-goi-title">
          <SectionTitle id="cac-goi-title">{p.tiersTitle}</SectionTitle>
          <PriceTiers
            className="mt-6"
            extra={(i) => (
              <>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink">
                  <Icon name="check" className="size-4" />
                  {p.allFeatures}
                </p>
                <Button
                  href={demoAnchor}
                  size="sm"
                  data-position={`bang-gia-goi-${i + 1}`}
                  className="mt-4"
                >
                  {p.tierCta}
                </Button>
              </>
            )}
          />
          <p className="mt-4 font-mono text-sm text-text">{p.tierNote}</p>
        </section>
      </Container>

      <Container className="pb-section">
        <section id="tinh-nang" aria-labelledby="tinh-nang-title">
          <SectionTitle id="tinh-nang-title" lesson={p.includedLesson}>
            {p.includedTitle}
          </SectionTitle>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {p.groups.map((g) => (
              <PaperCard as="li" key={g.title} className="flex flex-col p-5 shadow-card">
                <h3 className="font-heading text-h3 font-bold">{g.title}</h3>
                <ul className="mt-3 flex flex-1 flex-col gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-text">
                      <Icon name="checkCircle" className="mt-0.5 size-4 shrink-0 text-ink-500" />
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={g.href}
                  className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink hover:underline"
                >
                  {p.groupLink}
                  <span className="sr-only">: {g.title}</span>
                  <Icon name="arrowForward" className="size-4" />
                </a>
              </PaperCard>
            ))}
          </ul>
        </section>
      </Container>

      <FaqCtaSheet faq={{ lesson: subpage.faqLesson, title: p.faq.title, items: p.faq.items }} />
    </>
  )
}
