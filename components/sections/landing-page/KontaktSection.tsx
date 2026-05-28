import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ContactForm } from '@/components/ui/ContactForm'

const trustItems = [
  'Diskretno i povjerljivo',
  'Prijave pregledava naš tim',
  'Svaka prijava se uzima ozbiljno',
]

export function KontaktSection() {
  return (
    <section
      id="kontakt"
      className="py-[clamp(64px,8vw,120px)] px-[5%] bg-white"
      aria-labelledby="kontakt-title"
    >
      <span id="kontakt-trebam" className="block scroll-mt-[88px]" aria-hidden="true" />
      <span id="kontakt-zelim" className="block scroll-mt-[88px]" aria-hidden="true" />
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[clamp(280px,32%,380px)_1fr] gap-12 md:gap-16 items-start">

        {/* Left: context - sticks while form scrolls */}
        <RevealOnScroll>
          <div className="md:sticky md:top-[88px]">
            <SectionLabel>Kontakt</SectionLabel>
            <h2
              id="kontakt-title"
              className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-4"
            >
              Javi nam se
            </h2>
            <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-secondary mb-8">
              Čekamo tvoju prijavu, prijedlog ili upit. Ako znaš nekoga kome je potrebna pomoć
              ili želiš biti dio projekta, pošalji nam poruku.
            </p>

            <ul className="flex flex-col gap-[14px]">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-dark">
                  <span className="w-[7px] h-[7px] rounded-full bg-yellow shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Image
                src="/uploads/instalater-andjeo.png"
                alt="Instalater Anđeo maskota"
                width={160}
                height={180}
                className="object-contain"
                style={{ height: 'auto' }}
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Right: form */}
        <RevealOnScroll delay={120}>
          <ContactForm />
        </RevealOnScroll>

      </div>
    </section>
  )
}
