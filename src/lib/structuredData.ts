// JSON-LD (schema.org) dựng từ nội dung trong src/content — không viết tay dữ liệu riêng.
// Không có aggregateRating / Review: chưa có đánh giá thật.
import { contact, home, pricingPath, pricingTiers, site } from '../content/vi'
import type { FaqItem } from '../content/types'

const ORG_ID = `${site.url}/#organization`
const APP_ID = `${site.url}/#software`
// SĐT dạng quốc tế cho schema.org: 0906490974 -> +84906490974
const telephone = '+84' + contact.phone.slice(1)
const abs = (path: string) => site.url + path

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon-512.png`,
  email: contact.email,
  telephone,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone,
    email: contact.email,
    availableLanguage: 'vi',
    areaServed: 'VN',
  },
}

// Giá: chỉ ghi `offers` khi MỌI gói đã có giá thật (pricingTiers[].price khác null trong vi.ts).
const pricesReady = pricingTiers.every((t) => t.price !== null)
const offers = pricesReady
  ? {
      offers: pricingTiers.map((t) => ({
        '@type': 'Offer',
        name: t.name,
        price: t.price,
        priceCurrency: 'VND',
        url: abs(pricingPath),
      })),
    }
  : {}

export const softwareApplication = {
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  inLanguage: 'vi',
  publisher: { '@id': ORG_ID },
  ...offers,
}

const faqPage = (items: readonly FaqItem[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [organization, softwareApplication, faqPage(home.faq.items)],
}

type Crumb = { name: string; href: string }
type SubpageOptions = {
  path: string
  title: string
  description: string
  /** Breadcrumb đầy đủ, bắt đầu bằng Trang chủ */
  crumbs: Crumb[]
  /** FAQ hiển thị trên trang (giữ đồng bộ với nội dung) */
  faq?: readonly FaqItem[]
  /** Thêm nút vào @graph: SoftwareApplication ở /bang-gia, Article ở bài hướng dẫn */
  extra?: object[]
}

/** Trang con: WebPage + BreadcrumbList (+ FAQPage nếu trang có FAQ) */
export function subpageJsonLd({
  path,
  title,
  description,
  crumbs,
  faq,
  extra = [],
}: SubpageOptions) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebPage',
        '@id': abs(path),
        url: abs(path),
        name: title,
        description,
        inLanguage: 'vi',
        about: { '@id': APP_ID },
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: abs(c.href),
        })),
      },
      ...(faq?.length ? [faqPage(faq)] : []),
      ...extra,
    ],
  }
}

/** Bài hướng dẫn: tác giả và đơn vị xuất bản là Tiny Ant */
export function article(a: {
  path: string
  title: string
  description: string
  published: string
  modified: string
}) {
  return {
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.modified,
    inLanguage: 'vi',
    mainEntityOfPage: { '@id': abs(a.path) },
    image: `${site.url}/og-image.png`,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@id': ORG_ID },
  }
}
