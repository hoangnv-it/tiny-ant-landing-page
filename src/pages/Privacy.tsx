import Container from '../components/Container'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { subpageJsonLd } from '../lib/structuredData'
import { privacy, privacyPath, subpage } from '../content/vi'

const crumbs = [
  { name: subpage.home, href: '/' },
  { name: privacy.title, href: privacyPath },
]

// /chinh-sach-bao-mat: nội dung giữ nguyên như pop-up trước đây (vi.ts -> privacy), kể cả ngày hiệu lực
export function Component() {
  return (
    <>
      <Seo
        title={privacy.meta.title}
        description={privacy.meta.description}
        path={privacyPath}
        jsonLd={subpageJsonLd({
          path: privacyPath,
          title: privacy.meta.title,
          description: privacy.meta.description,
          crumbs,
        })}
      />
      <PageHero
        crumbs={crumbs}
        lesson={privacy.lesson}
        title={privacy.title}
        lead={
          <>
            <p className="text-base text-text-muted">{privacy.updated}</p>
            <p className="mt-4">{privacy.intro}</p>
          </>
        }
        noCta
        position="chinh-sach"
      />
      <Container className="pb-section">
        <div className="max-w-3xl">
          {privacy.sections.map((s) => (
            <section key={s.heading} className="mt-8 first:mt-0">
              <h2 className="text-h3 font-bold lg:text-h3-lg">{s.heading}</h2>
              {s.list && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-text">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
              {s.paragraphs.map((para) => (
                <p key={para} className="mt-3 leading-relaxed text-text">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
