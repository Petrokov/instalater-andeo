import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function ONameHeroSection() {
  return (
    <section
      id="o-nama-hero"
      aria-labelledby="o-nama-h1"
      className="grid grid-cols-1 md:grid-cols-2 md:h-[50vh] md:min-h-[480px] overflow-hidden"
    >
      {/* Left: dark content panel */}
      <div className="bg-dark flex flex-col justify-between px-[clamp(32px,6vw,80px)] py-[clamp(72px,7vw,100px)] order-last md:order-first">

        <div>
          <SectionLabel>O nama</SectionLabel>
          <h1
            id="o-nama-h1"
            className="text-[clamp(26px,3vw,44px)] font-extrabold leading-[1.1] text-white mt-4 max-w-[15ch]"
          >
            Jedno jutro. Jedna ekipa.{' '}
            <span className="text-yellow">Potpuno nova kupaonica.</span>
          </h1>
        </div>

        <div>
          <p className="text-[clamp(13px,0.95vw,15px)] leading-[1.85] text-white/55 max-w-[48ch] mb-6">
            Instalater Anđeo je humanitarni projekt koji od 2024. godine
            obnavlja kupaonice za starije osobe i obitelji kojima je
            dostojanstven dom nedostupan bez tuđe pomoći.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Osnovano 2024.', 'Zagreb, Hrvatska', 'Projekt Petrokov d.o.o.'].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold tracking-[0.10em] uppercase text-yellow/80 bg-white/6 border border-white/10 rounded-full px-4 py-[6px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Right: full-bleed team photograph */}
      <div className="relative min-h-[56vw] md:min-h-0 order-first md:order-last">
        <Image
          src="/uploads/o-nama/o-nama-hero-3.jpg"
          alt="Tim Petrokova - ekipa koja stoji iza projekta Instalater Anđeo"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

    </section>
  )
}
