import { Head } from 'vite-react-ssg'
import { site } from '../content/vi'

type Props = {
  title: string
  description: string
  /** Đường dẫn route, ví dụ "/" */
  path: string
  /** Dữ liệu có cấu trúc (schema.org), render thành <script type="application/ld+json"> */
  jsonLd?: object
}

const OG_IMAGE = `${site.url}/og-image.png`

// Thẻ SEO theo route. Thẻ dùng chung (og:site_name, og:locale, theme-color, icon) nằm trong index.html.
export default function Seo({ title, description, path, jsonLd }: Props) {
  const url = site.url + path
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={site.ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={site.ogImageAlt} />

      {jsonLd && (
        <script type="application/ld+json">
          {/* Chặn chuỗi "</script>" trong dữ liệu đóng thẻ sớm */}
          {JSON.stringify(jsonLd).replace(/</g, '\\u003c')}
        </script>
      )}
    </Head>
  )
}
