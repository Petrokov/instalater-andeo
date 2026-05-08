import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const roles = [
  {
    label: 'Kao instalater',
    text: 'Pokloni jedan vikend ili slobodan termin. Tvoje znanje izravno mijenja nečiji dom i svakodnevicu.',
  },
  {
    label: 'Kao donator',
    text: 'Svaka donacija, bez obzira na iznos, ide direktno u obnovu - materijale, alate i prijevoz ekipe.',
  },
  {
    label: 'Kao partner',
    text: 'Tvrtke koje vjeruju u zajednicu mogu postati partneri - donacijom materijala, opreme ili ekspertize.',
  },
  {
    label: 'Dijeljenjem priče',
    text: 'Podijeli projekt na društvenim mrežama. Svaki doseg može dovesti novog anđela u ekipu.',
  },
]

export function KakoPomociSection() {
  return (
    <section id="kako-pomoci" className="py-[clamp(64px,8vw,120px)] px-[5%] bg-white" aria-labelledby="kako-title">
      <div className="max-w-[1100px] mx-auto">
        <RevealOnScroll>
          <div className="max-w-[560px] mb-[clamp(40px,5vw,64px)]">
            <SectionLabel>Kako se uključiti</SectionLabel>
            <h2 id="kako-title" className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-3">
              Dobro se gradi zajedno.
            </h2>
            <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-secondary">
              U projekt se možeš uključiti znanjem, materijalom, donacijom ili dijeljenjem priče.
            </p>
          </div>
        </RevealOnScroll>

        <div>
          {roles.map((role, i) => (
            <RevealOnScroll key={role.label} delay={i * 80}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 py-[clamp(20px,2.5vw,32px)] border-t border-[#ebebeb]">
                <h3 className="md:w-[clamp(200px,28%,280px)] text-[clamp(18px,1.8vw,24px)] font-extrabold leading-[1.25] shrink-0">
                  {role.label}
                </h3>
                <p className="text-[clamp(14px,1.1vw,17px)] leading-[1.75] text-secondary flex-1">
                  {role.text}
                </p>
              </div>
            </RevealOnScroll>
          ))}
          <div className="border-t border-[#ebebeb]" aria-hidden="true" />
        </div>

        <RevealOnScroll>
          <div className="mt-[clamp(32px,4vw,48px)]">
            <Button variant="section" href="#kontakt-zelim" aria-label="Želim pomoći - idi na kontakt formu">
              Želim pomoći
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
