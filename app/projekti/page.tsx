import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ImageCarousel } from '@/components/ui/ImageCarousel'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://instalaterandeo.hr/projekti',
    languages: { 'hr-HR': 'https://instalaterandeo.hr/projekti' },
  },
  title: 'Projekti',
  description: 'Pogledajte odrađene projekte obnove kupaonica. Svaki projekt dokaz je da solidarnost mijenja živote.',
  openGraph: {
    url: 'https://instalaterandeo.hr/projekti',
    title: 'Projekti - Instalater Anđeo',
    description: 'Odrađene obnove kupaonica diljem Hrvatske.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projekti - Instalater Anđeo',
    description: 'Odrađene obnove kupaonica diljem Hrvatske.',
    images: ['/hero-bg.png'],
  },
}

export const revalidate = 60

export default async function ProjektiPage() {
  const projects = await getProjects()
  const featured = projects.filter((p) => p.is_featured)
  const rest = projects.filter((p) => !p.is_featured)

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#faf8f4] pt-[clamp(100px,12vw,148px)] pb-[clamp(56px,7vw,96px)] px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_clamp(280px,42%,460px)] gap-[clamp(40px,6vw,80px)] items-center">
          <RevealOnScroll>
            <SectionLabel>Naši projekti</SectionLabel>
            <div className="w-10 h-px bg-[#e8e2d8] mt-4 mb-5" />
            <h1 className="text-[clamp(32px,4.5vw,58px)] font-extrabold leading-[1.1] text-[#1a1610] max-w-[20ch]">
              Svaka kupaonica ima svoju priču.
            </h1>
            <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.8] text-secondary max-w-[52ch] mt-5">
              Iza svake obnove stoji obitelj koja je dugo čekala. Volonteri koji su donirali
              vikend. Donatori koji su vjerovali da vrijedi. Ovdje su sve te priče.
            </p>
            <p className="mt-8 text-[clamp(13px,1vw,15px)] italic text-[#1a1610]/35 font-medium">
              Više od {projects.length} obnova. Jedan vikend po svakom domu.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <ImageCarousel />
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-[clamp(48px,6vw,80px)] px-[5%] bg-white">
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
      <section className="py-[clamp(48px,6vw,80px)] px-[5%] bg-[#f5f1ea]">
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
    </div>
  )
}
