import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Projekti - Instalater Anđeo | Petrokov',
  description: 'Pogledajte odrađene projekte obnove kupaonica. Svaki projekt dokaz je da solidarnost mijenja živote.',
  openGraph: {
    title: 'Projekti - Instalater Anđeo',
    description: 'Odrađene obnove kupaonica diljem Hrvatske.',
  },
}

export const revalidate = 60

export default async function ProjektiPage() {
  const projects = await getProjects()
  const featured = projects.filter((p) => p.is_featured)
  const rest = projects.filter((p) => !p.is_featured)

  return (
    <main>
      {/* Hero */}
      <section className="bg-dark pt-[clamp(100px,12vw,140px)] pb-[clamp(48px,6vw,80px)] px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <RevealOnScroll>
            <SectionLabel>Naši projekti</SectionLabel>
            <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.1] text-white mt-3 max-w-[18ch]">
              Svaka kupaonica - jedna nova šansa za dostojanstven život.
            </h1>
            <p className="text-[clamp(14px,1.1vw,17px)] leading-[1.8] text-white/55 max-w-[56ch] mt-6">
              Ovdje su projekti koje smo zajedno realizirali. Svaka obnova iza sebe krije priču
              o solidarnosti, volontiranju i vjeri da male stvari mijenjaju svijet.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="flex flex-wrap gap-6 mt-12 text-white/80">
              {[
                { num: projects.length.toString(), label: 'Odrađenih projekata' },
                { num: '4', label: 'Grada' },
                { num: '100%', label: 'Besplatno' },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-yellow/40 pl-4">
                  <div className="text-[clamp(22px,2.5vw,32px)] font-extrabold text-white">{s.num}</div>
                  <div className="text-[13px] text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-[clamp(48px,6vw,80px)] px-[5%] bg-[#faf9f7]">
          <div className="max-w-[1100px] mx-auto">
            <RevealOnScroll>
              <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-gold mb-8">
                Istaknuti projekti
              </p>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((p, i) => (
                <RevealOnScroll key={p.id} delay={i * 100} className="h-full">
                  <ProjectCard project={p} featured />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All projects */}
      <section className="py-[clamp(48px,6vw,80px)] px-[5%] bg-white">
        <div className="max-w-[1100px] mx-auto">
          {rest.length > 0 ? (
            <>
              {featured.length > 0 && (
                <RevealOnScroll>
                  <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-gold mb-8">
                    Svi projekti
                  </p>
                </RevealOnScroll>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((p, i) => (
                  <RevealOnScroll key={p.id} delay={(i % 3) * 100} className="h-full">
                    <ProjectCard project={p} />
                  </RevealOnScroll>
                ))}
              </div>
            </>
          ) : projects.length === 0 ? (
            <RevealOnScroll>
              <div className="py-24 text-center">
                <p className="text-[18px] font-bold text-dark mb-2">Projekti dolaze uskoro</p>
                <p className="text-secondary text-[15px]">
                  Ovdje će biti prikazani svi odrađeni projekti obnove kupaonica.
                </p>
              </div>
            </RevealOnScroll>
          ) : null}
        </div>
      </section>
    </main>
  )
}
