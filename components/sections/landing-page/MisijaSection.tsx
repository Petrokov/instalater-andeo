import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { PhotoFlipCard } from '@/components/ui/PhotoFlipCard'

const values = [
  {
    n: '01',
    title: 'Sigurniji dom',
    text: 'Svaka obnovljena kupaonica znači manje rizika, dostupniji prostor i bolji svakodnevni život za one kojima je to najpotrebnije.',
  },
  {
    n: '02',
    title: 'Dostojanstven život',
    text: 'Dostojanstvo nije luksuz. Svaka obnovljena kupaonica vraća osjećaj normalnosti i samopoštovanja osobama u teškim situacijama.',
  },
  {
    n: '03',
    title: 'Podrška zajednice',
    text: 'Projekt dokazuje da zajednica može biti snažnija od bilo koje institucije kada se pravi ljudi udruže oko prave stvari.',
  },
]

export function MisijaSection() {
  return (
    <section id="o-projektu" className="py-[clamp(64px,8vw,120px)] px-[5%] bg-white" aria-labelledby="misija-title">
      <div className="max-w-[1100px] mx-auto">

        {/* Split header */}
        <RevealOnScroll>
          <div className="mb-[clamp(28px,3.5vw,44px)]"><SectionLabel>O projektu</SectionLabel></div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_clamp(280px,38%,440px)] gap-[clamp(32px,5vw,72px)] items-center mb-[clamp(48px,6vw,80px)]">
            {/* Text */}
            <div>
              <h2
                id="misija-title"
                className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-[clamp(16px,2vw,24px)]"
              >
                Obnavljamo kupaonice, ali vraćamo puno više od toga.
              </h2>
              <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-secondary max-w-[62ch]">
                Instalater Anđeo je zajednica dobrih ljudi koji svojim znanjem, vremenom i trudom
                mijenjaju živote onih koji su se našli u najtežim trenucima. Svaki završeni projekt
                nije samo nova pločica ili slavina, to je poruka da netko nije zaboravljen.
              </p>
            </div>

            <PhotoFlipCard
              front={{ src: '/images/kupaonica/20251202_095721.webp', alt: 'Obnovljena kupaonica' }}
              back={{ src: '/images/kupaonica/IMG_20251027_090853.webp', alt: 'Instalater Anđeo - radovi na obnovi kupaonice' }}
              className="relative w-full aspect-[3/2] md:aspect-[4/5] bg-white"
              sizes="(max-width: 768px) 100vw, 44vw"
            />
          </div>
        </RevealOnScroll>

        {/* Values */}
        {values.map((v, i) => (
          <RevealOnScroll key={v.n} delay={i * 100}>
            <div
              className={`flex items-start gap-6 md:gap-10 py-[clamp(28px,3.5vw,44px)]${i > 0 ? ' border-t border-[#ebebeb]' : ''}`}
            >
              <span
                className="text-[clamp(40px,4.5vw,64px)] font-extrabold leading-[1] text-yellow tabular-nums shrink-0 w-[52px] md:w-[76px]"
                aria-hidden="true"
              >
                {v.n}
              </span>
              <div className="flex-1 md:grid md:grid-cols-[clamp(160px,22%,240px)_1fr] md:gap-14 md:items-baseline">
                <h3 className="text-[clamp(18px,1.8vw,24px)] font-extrabold leading-[1.25] mb-3 md:mb-0">
                  {v.title}
                </h3>
                <p className="text-[clamp(14px,1.1vw,17px)] leading-[1.8] text-secondary">
                  {v.text}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}

      </div>
    </section>
  )
}
