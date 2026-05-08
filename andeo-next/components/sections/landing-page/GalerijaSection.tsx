import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { getLatestProjects } from '@/lib/projects'
import type { Project } from '@/lib/database.types'

const featured = {
  tag: 'Humanitarna inicijativa',
  title: 'Petrokov Anđeo',
  text: 'Detaljna priča o projektu koji okuplja instalatere, partnere i donatore oko jedne jednostavne ideje: vratiti dostojanstvo tamo gdje je dom predugo čekao pomoć.',
  href: '/projekti/petrokov-andeo',
}

function projectTag(project: Project) {
  const year = project.project_date ? new Date(project.project_date).getFullYear() : null
  return [project.location, year].filter(Boolean).join(' ')
}

export async function GalerijaSection() {
  const cases = await getLatestProjects(2, 'petrokov-andeo')

  return (
    <section id="galerija" className="py-[clamp(64px,8vw,120px)] px-[5%] bg-section-bg" aria-labelledby="galerija-title">
      <RevealOnScroll>
        <div className="text-center max-w-[600px] mx-auto mb-14">
          <SectionLabel>Priče i obnove</SectionLabel>
          <h2 id="galerija-title" className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-3">
            Kako izgleda kada zajednica odluči pomoći
          </h2>
          <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-secondary">
            Pogledaj priče i obnove koje su već promijenile svakodnevicu obiteljima diljem
            Hrvatske.
          </p>
        </div>
      </RevealOnScroll>

      <div className="max-w-[1100px] mx-auto flex flex-col gap-5">
        <RevealOnScroll>
          <article className="rounded-[20px] bg-dark px-[clamp(32px,5vw,56px)] py-[clamp(36px,5vw,60px)]">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-yellow mb-4">
              {featured.tag}
            </p>
            <h3 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.18] text-white mb-4 max-w-[600px]">
              {featured.title}
            </h3>
            <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-white/65 max-w-[520px] mb-8">
              {featured.text}
            </p>
            <Button variant="outline" href={featured.href}>
              Pogledaj priču
            </Button>
          </article>
        </RevealOnScroll>

        {cases.length > 0 && (
          <RevealOnScroll delay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-white rounded-[20px] overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#e8e8e8]">
              {cases.map((project) => (
                <article key={project.id} className="p-[clamp(24px,3.5vw,44px)] flex flex-col">
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-gold mb-3">
                    {projectTag(project)}
                  </p>
                  <h3 className="text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[clamp(14px,1.1vw,16px)] leading-[1.72] text-secondary flex-1 mb-6">
                    {project.short_description}
                  </p>
                  <div>
                    <Button variant="ghost" href={`/projekti/${project.slug}`}>
                      Pogledaj priču
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  )
}
