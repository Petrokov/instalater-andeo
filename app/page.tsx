import { HeroSection } from '@/components/sections/landing-page/HeroSection'
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
