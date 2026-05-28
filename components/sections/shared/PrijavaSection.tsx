import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ImageCarousel } from '@/components/ui/ImageCarousel'

type PrijavaSectionProps = {
  contactHref?: string
}

export function PrijavaSection({ contactHref = '#kontakt-trebam' }: PrijavaSectionProps) {
  return (
    <section id="prijava" className="py-[clamp(64px,8vw,120px)] px-[5%] bg-section-bg" aria-labelledby="prijava-title">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
        <RevealOnScroll>
          <div>
            <SectionLabel>Prijavi kandidata</SectionLabel>
            <h2 id="prijava-title" className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-4">
              Znaš nekoga kome bi nova kupaonica promijenila život?
            </h2>
            <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-secondary mb-5">
              Ako poznaješ stariju osobu, obitelj u teškoj situaciji ili susjeda koji živi bez
              osnovnih uvjeta, prijavi ih diskretno i s povjerenjem.
            </p>
            <p className="text-[clamp(16px,1.4vw,20px)] font-bold leading-[1.5] text-dark mb-8">
              Tvoja prijava može biti prvi korak prema sigurnijem i dostojanstvenijem domu.
            </p>
            <Button variant="section" href={contactHref} aria-label="Prijavi kandidata - idi na kontakt formu">
              Prijavi kandidata
            </Button>

          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <div className="order-first md:order-last">
            <ImageCarousel />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
