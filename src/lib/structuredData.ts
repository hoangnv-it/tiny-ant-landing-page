// JSON-LD (schema.org) dựng từ nội dung trong vi.ts — không viết tay dữ liệu riêng.
import { centerPage, centerPagePath, contact, home, site } from '../content/vi'

const ORG_ID = `${site.url}/#organization`
const APP_ID = `${site.url}/#software`
// SĐT dạng quốc tế cho schema.org: 0906490974 -> +84906490974
const telephone = '+84' + contact.phone.slice(1)

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

// Không ghi giá (offers) và đánh giá (aggregateRating): chưa có số liệu thật.
const softwareApplication = {
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  inLanguage: 'vi',
  publisher: { '@id': ORG_ID },
}

const faqPage = (items: readonly { q: string; a: string }[]) => ({
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

// Trang Phần mềm quản lý trung tâm: trang web nói về phần mềm (about) + đường dẫn + FAQ riêng
const centerUrl = site.url + centerPagePath
export const centerJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    softwareApplication,
    {
      '@type': 'WebPage',
      '@id': centerUrl,
      url: centerUrl,
      name: centerPage.meta.title,
      description: centerPage.meta.description,
      inLanguage: 'vi',
      about: { '@id': APP_ID },
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: centerPage.breadcrumb.home,
          item: site.url + '/',
        },
        { '@type': 'ListItem', position: 2, name: centerPage.breadcrumb.current, item: centerUrl },
      ],
    },
    faqPage(centerPage.faq.items),
  ],
}
