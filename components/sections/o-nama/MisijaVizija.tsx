import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function MisijaVizija() {
  return (
    <section
      id="misija-vizija"
      aria-labelledby="misija-title"
      className="overflow-hidden"
    >
      {/* Full-bleed two-panel split */}
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Left: Misija - light */}
        <RevealOnScroll>
          <div className="bg-[#faf9f7] px-[clamp(32px,6vw,80px)] py-[clamp(56px,8vw,112px)]">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-secondary mb-6">
              Misija
            </p>
            <h2
              id="misija-title"
              className="text-[clamp(24px,2.8vw,38px)] font-extrabold leading-[1.22] text-dark mb-6"
            >
              Obnova kupaonice kao čin solidarnosti.
            </h2>
            <p className="text-[clamp(14px,1.1vw,17px)] leading-[1.8] text-secondary mb-8">
              Naša misija je osigurati da svaka osoba, bez obzira na materijalne mogućnosti,
              ima pristup sigurnom i funkcionalnom sanitarnom prostoru. Kroz suradnju
              instalaterskih majstora, donatora i poslovnih partnera, obnavljamo kupaonice
              za one koji si to ne mogu priuštiti sami.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                'Besplatna obnova za prijavljene kandidate',
                'Diskretna i brza obrada svake prijave',
                'Volonterski rad certificiranih instalaterskih majstora',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-secondary">
                  <span className="w-[6px] h-[6px] rounded-full bg-dark shrink-0 mt-[6px]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        {/* Right: Vizija - dark */}
        <RevealOnScroll delay={100}>
          <div className="bg-dark px-[clamp(32px,6vw,80px)] py-[clamp(56px,8vw,112px)]">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-yellow mb-6">
              Vizija
            </p>
            <h2 className="text-[clamp(24px,2.8vw,38px)] font-extrabold leading-[1.22] text-white mb-6">
              Mreža solidarnosti koja pokriva cijelu Hrvatsku.
            </h2>
            <p className="text-[clamp(14px,1.1vw,17px)] leading-[1.8] text-white/60 mb-8">
              Vizija Instalater Anđeo je izgraditi trajnu mrežu instalaterskih dobrovoljaca,
              donatora i partnera koji mogu djelovati brzo i učinkovito u svakom kutku
              Hrvatske. Cilj je standardizirati model koji se može replicirati i inspirirati
              slične inicijative izvan granica.
            </p>
            <div className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: '4', label: 'Grada u kojima djelujemo' },
                  { num: '21', label: 'Planirani gradovi do 2026.' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-[clamp(32px,3.5vw,48px)] font-extrabold text-white leading-none mb-1">
                      {s.num}
                    </div>
                    <div className="text-[12px] font-medium text-white/50 leading-[1.4]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
