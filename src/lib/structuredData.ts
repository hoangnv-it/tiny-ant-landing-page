// JSON-LD (schema.org) dựng từ nội dung trong vi.ts — không viết tay dữ liệu riêng.
import { contact, home, site } from '../content/vi'

const ORG_ID = `${site.url}/#organization`
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
  name: site.name,
  url: site.url,
  description: site.description,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  inLanguage: 'vi',
  publisher: { '@id': ORG_ID },
}

const faqPage = {
  '@type': 'FAQPage',
  mainEntity: home.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [organization, softwareApplication, faqPage],
}
