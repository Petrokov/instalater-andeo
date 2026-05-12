import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/landing-page/HeroSection'

export const metadata: Metadata = {
  title: 'Instalater Anđeo - Humanitarna obnova kupaonica',
  description:
    'Instalater Anđeo je humanitarni projekt obnove kupaonica za obitelji i pojedince kojima je pomoć najpotrebnija. Prijavi kandidata ili podrži projekt.',
  alternates: {
    canonical: 'https://instalaterandeo.hr',
    languages: { 'hr-HR': 'https://instalaterandeo.hr' },
  },
  openGraph: {
    type: 'website',
    url: 'https://instalaterandeo.hr',
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
}
import { MisijaSection } from '@/components/sections/landing-page/MisijaSection'
import { KakoPomociSection } from '@/components/sections/landing-page/KakoPomociSection'
import { GalerijaSection } from '@/components/sections/landing-page/GalerijaSection'
import { KontaktSection } from '@/components/sections/landing-page/KontaktSection'
import { ImpactSection } from '@/components/sections/shared/ImpactSection'
import { PrijavaSection } from '@/components/sections/shared/PrijavaSection'
import { CitatSection } from '@/components/sections/shared/CitatSection'
import { PartneriSection } from '@/components/sections/shared/PartneriSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MisijaSection />
      <ImpactSection />
      <PrijavaSection />
      <KakoPomociSection />
      <GalerijaSection />
      <CitatSection />
      <PartneriSection />
      <KontaktSection />
    </>
  )
}
