import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import { organizationSchema, websiteSchema } from '@/lib/schema'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://instalaterandeo.hr'),
  title: {
    default: 'Instalater Anđeo - Humanitarna obnova kupaonica',
    template: '%s | Instalater Anđeo',
  },
  description:
    'Instalater Anđeo je humanitarni projekt obnove kupaonica za obitelji i pojedince kojima je pomoć najpotrebnija. Prijavi kandidata ili podrži projekt.',
  keywords: [
    'instalater anđeo',
    'humanitarni projekt',
    'obnova kupaonica',
    'Petrokov',
    'volonteri instalaterski radovi',
    'besplatna obnova kupaonice',
    'donacija',
    'Zagreb',
    'Hrvatska',
  ],
  authors: [{ name: 'Petrokov d.o.o.', url: 'https://petrokov.hr' }],
  creator: 'Petrokov d.o.o.',
  publisher: 'Petrokov d.o.o.',
  alternates: {
    canonical: 'https://instalaterandeo.hr',
    languages: { 'hr-HR': 'https://instalaterandeo.hr' },
  },
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://instalaterandeo.hr',
    siteName: 'Instalater Anđeo',
    title: 'Instalater Anđeo - Humanitarna obnova kupaonica',
    description:
      'Humanitarni projekt obnove kupaonica za obitelji i pojedince kojima je pomoć najpotrebnija. Podrži projekt ili prijavi kandidata.',
    images: [
      {
        url: '/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Instalater Anđeo - Humanitarna obnova kupaonica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instalater Anđeo - Humanitarna obnova kupaonica',
    description:
      'Humanitarni projekt obnove kupaonica za obitelji i pojedince kojima je pomoć najpotrebnija.',
    images: ['/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-yellow focus:text-dark focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
        >
          Preskoči na sadržaj
        </a>
        <ConditionalLayout>
          <main id="main-content">{children}</main>
        </ConditionalLayout>
      </body>
    </html>
  )
}
