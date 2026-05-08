import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://instalaterandeo.hr/sitemap.xml',
    host: 'https://instalaterandeo.hr',
  }
}
