import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const stats = [
  { num: '5+',  label: 'Obnova' },
  { num: '20+', label: 'Partnera i donatora' },
  { num: '4',   label: 'Grada' },
  { num: '1',   label: 'Zajednički cilj' },
]

export function ImpactSection() {
  return (
    <section
      id="impact"
      className="py-[clamp(64px,8vw,100px)] px-[5%] bg-[#f5f0e8]"
      aria-labelledby="impact-title"
    >
      <div className="max-w-[1100px] mx-auto">
        <RevealOnScroll>
          <h2
            id="impact-title"
            className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] text-dark mb-[clamp(40px,6vw,72px)]"
          >
            Svaki broj <span className="text-yellow">ima lice.</span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((s, i) => {
            const rightColMobile  = i % 2 === 1
            const topRowMobile    = i < 2
            const firstDesktop    = i === 0
            const lastDesktop     = i === stats.length - 1

            return (
              <RevealOnScroll key={s.label} delay={i * 100}>
                <div
                  className={[
                    'py-[clamp(20px,4vw,48px)]',
                    // Mobile: left col gets right padding; right col gets left padding + left border
                    rightColMobile
                      ? 'pl-[clamp(16px,3vw,28px)] border-l border-[#d8cfc0]'
                      : 'pr-[clamp(16px,3vw,28px)]',
                    // Mobile: top row gets bottom border, removed at sm
                    topRowMobile ? 'border-b border-[#d8cfc0] sm:border-b-0' : '',
                    // Desktop: symmetric padding, left border on non-first items
                    firstDesktop
                      ? 'sm:pl-0 sm:pr-[clamp(20px,3vw,40px)]'
                      : lastDesktop
                        ? 'sm:pr-0 sm:pl-[clamp(20px,3vw,40px)] sm:border-l sm:border-[#d8cfc0]'
                        : 'sm:px-[clamp(20px,3vw,40px)] sm:border-l sm:border-[#d8cfc0]',
                  ].filter(Boolean).join(' ')}
                >
                  <div
                    className="text-[clamp(52px,7vw,92px)] font-extrabold leading-none text-dark tabular-nums mb-3"
                    aria-label={`${s.num} ${s.label}`}
                  >
                    {s.num}
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7a7060]" aria-hidden="true">
                    {s.label}
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
