import type { Metadata } from 'next'
import { ONameHeroSection } from '@/components/sections/o-nama/ONameHeroSection'
import { MisijaVizija } from '@/components/sections/o-nama/MisijaVizija'
import { KakoDjelujeSection } from '@/components/sections/o-nama/KakoDjelujeSection'
import { ImpactSection } from '@/components/sections/shared/ImpactSection'
import { CitatSection } from '@/components/sections/shared/CitatSection'
import { PrijavaSection } from '@/components/sections/shared/PrijavaSection'
import { PartneriSection } from '@/components/sections/shared/PartneriSection'

// --- SEO / AEO / GEO metadata -----------------------------------------------

export const metadata: Metadata = {
  title: 'O nama - Instalater Anđeo | Petrokov',
  description:
    'Saznaj tko stoji iza projekta Instalater Anđeo. Petrokov d.o.o. od 2024. godine organizira volontersku obnovu kupaonica za starije osobe i obitelji u teškim situacijama diljem Hrvatske.',
  keywords: [
    'o nama instalater anđeo',
    'petrokov humanitarni projekt',
    'tko smo mi',
    'obnova kupaonica volonteri',
    'humanitarna organizacija hrvatska',
    'solidarnost zajednica',
    'instalaterski volonteri',
    'zagreb osijek split đakovo',
  ],
  alternates: {
    canonical: 'https://instalaterandeo.hr/o-nama',
    languages: { 'hr-HR': 'https://instalaterandeo.hr/o-nama' },
  },
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://instalaterandeo.hr/o-nama',
    siteName: 'Instalater Anđeo',
    title: 'O nama - Instalater Anđeo | Petrokov',
    description:
      'Petrokov d.o.o. od 2024. organizira volontersku obnovu kupaonica za one kojima je to najpotrebnije. Upoznaj tim, misiju i viziju projekta.',
    images: [
      {
        url: '/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Instalater Anđeo - tim volontera na poslu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O nama - Instalater Anđeo | Petrokov',
    description:
      'Humanitarni projekt obnove kupaonica u Hrvatskoj. Upoznaj misiju, viziju i ljude koji stoje iza Instalater Anđeo.',
    images: ['/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

// --- JSON-LD schemas ---------------------------------------------------------

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Početna',
      item: 'https://instalaterandeo.hr',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'O nama',
      item: 'https://instalaterandeo.hr/o-nama',
    },
  ],
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://instalaterandeo.hr/o-nama',
  url: 'https://instalaterandeo.hr/o-nama',
  name: 'O nama - Instalater Anđeo',
  description:
    'Stranica o projektu Instalater Anđeo: misija, vizija, kako djelujemo i tko stoji iza projekta.',
  inLanguage: 'hr-HR',
  isPartOf: { '@id': 'https://instalaterandeo.hr/#website' },
  about: { '@id': 'https://instalaterandeo.hr/#organization' },
  breadcrumb: breadcrumbSchema,
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Kako prijaviti kandidata za obnovu kupaonice',
  description:
    'Korak-po-korak proces od prijave do realizacije obnove kupaonice kroz projekt Instalater Anđeo.',
  inLanguage: 'hr-HR',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Prijava',
      text: 'Netko iz zajednice prijavljuje osobu ili obitelj putem kontakt forme. Prijava je diskretna i povjerljiva.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Procjena',
      text: 'Naš tim pregleda svaku prijavu individualno i kontaktira kandidata kako bi razumio situaciju i opseg radova.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Organizacija ekipe',
      text: 'Koordiniramo volontere, osiguravamo materijal od partnera i planiramo termin - najčešće vikend.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Obnova',
      text: 'Ekipa za jedan vikend pretvori zapuštenu kupaonicu u sigurno i dostojanstveno mjesto, bez naknade.',
    },
  ],
}

// --- Page --------------------------------------------------------------------

export default function ONamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <ONameHeroSection />
      <MisijaVizija />
      <KakoDjelujeSection />
      <ImpactSection />
      <PrijavaSection contactHref="/#kontakt-trebam" />
      <CitatSection />
      <PartneriSection />
    </>
  )
}
