import Icon from '../components/icons'
import PaperCard from '../components/PaperCard'
import PriceTiers from '../components/PriceTiers'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

const { pricing, schools } = home

// Bảng giá rút gọn (link sang /bang-gia) + khối nhỏ "Nhà trường" (link sang /nha-truong)
export function PricingTeaser() {
  return (
    <section id="bang-gia" aria-labelledby="bang-gia-title" className="min-w-0">
      <SectionTitle id="bang-gia-title" lesson={pricing.lesson} className="xl:text-h2-half">
        {pricing.title}
      </SectionTitle>
      <p className="mt-3 leading-relaxed text-text">{pricing.lead}</p>
      <PriceTiers className="mt-5" />
      <MoreLink href="/bang-gia">{pricing.link}</MoreLink>
    </section>
  )
}

export function SchoolsNote() {
  return (
    <section id="nha-truong" aria-labelledby="nha-truong-title" className="min-w-0">
      <PaperCard className="h-full p-5 shadow-card md:p-6">
        <SectionTitle
          id="nha-truong-title"
          lesson={schools.lesson}
          className="text-h3! lg:text-h3-lg!"
        >
          {schools.title}
        </SectionTitle>
        <p className="mt-3 leading-relaxed text-text">{schools.text}</p>
        <MoreLink href="/nha-truong">{schools.link}</MoreLink>
      </PaperCard>
    </section>
  )
}

function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink hover:underline"
    >
      {children}
      <Icon name="arrowForward" className="size-4" />
    </a>
  )
}
