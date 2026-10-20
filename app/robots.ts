import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://petrokov-andjeo.hr/sitemap.xml',
    host: 'https://petrokov-andjeo.hr',
  }
}
