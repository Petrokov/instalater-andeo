import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import type { ProjectParticipant, ProjectPartner } from '@/lib/database.types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.short_description,
    alternates: {
      canonical: `https://instalaterandeo.hr/projekti/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `https://instalaterandeo.hr/projekti/${slug}`,
      title: project.title,
      description: project.short_description,
      images: project.cover_image
        ? [{ url: project.cover_image, width: 1200, height: 630, alt: project.title }]
        : [{ url: '/hero-bg.png', width: 1200, height: 630, alt: project.title }],
      publishedTime: project.project_date ?? undefined,
      authors: ['Petrokov d.o.o.'],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.short_description,
      images: [project.cover_image ?? '/hero-bg.png'],
    },
  }
}

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const date = project.project_date
    ? new Date(project.project_date).toLocaleDateString('hr-HR', { month: 'long', year: 'numeric' })
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: 'https://instalaterandeo.hr' },
      { '@type': 'ListItem', position: 2, name: 'Projekti', item: 'https://instalaterandeo.hr/projekti' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://instalaterandeo.hr/projekti/${slug}` },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://instalaterandeo.hr/projekti/${slug}`,
    headline: project.title,
    description: project.short_description,
    datePublished: project.project_date ?? new Date().toISOString().split('T')[0],
    dateModified: project.project_date ?? new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: 'Petrokov d.o.o.',
      url: 'https://petrokov.hr',
    },
    publisher: { '@id': 'https://instalaterandeo.hr/#organization' },
    image: project.cover_image
      ? { '@type': 'ImageObject', url: project.cover_image }
      : 'https://instalaterandeo.hr/hero-bg.png',
    inLanguage: 'hr-HR',
    isPartOf: { '@id': 'https://instalaterandeo.hr/#website' },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Cover hero */}
      <div className="relative bg-dark pt-[72px]">
        {project.cover_image ? (
          <div className="relative h-[clamp(280px,45vw,560px)] overflow-hidden">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
          </div>
        ) : (
          <div className="h-[200px]" />
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-[5%] pb-[clamp(24px,4vw,48px)]">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-white/50 mb-3">
              <Link href="/" className="hover:text-white transition-colors">Početna</Link>
              <span>/</span>
              <Link href="/projekti" className="hover:text-white transition-colors">Projekti</Link>
              <span>/</span>
              <span className="text-white/80">{project.title}</span>
            </nav>
            <h1 className="text-[clamp(22px,3.5vw,44px)] font-extrabold text-white leading-[1.15] max-w-[22ch]">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-[clamp(40px,6vw,80px)] px-[5%] bg-white">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start">

          {/* Main */}
          <div>
            <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.85] text-secondary mb-10">
              {project.description}
            </p>

            {/* Gallery */}
            {project.gallery_images.length > 0 && (
              <div className="mb-10">
                <h2 className="text-[16px] font-bold text-dark mb-5 tracking-[0.02em]">
                  Galerija projekta
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.gallery_images.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-[12px] overflow-hidden bg-[#f0efe8]">
                      <Image
                        src={url}
                        alt={`${project.title} - slika ${i + 1}`}
                        fill
                        className="object-cover hover:scale-[1.04] transition-transform duration-400"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Participants */}
            {(project.participants ?? []).length > 0 && (
              <div className="mb-10">
                <h2 className="text-[16px] font-bold text-dark mb-5 tracking-[0.02em]">
                  Sudionici projekta
                </h2>
                <div className="flex flex-col gap-4">
                  {(project.participants as ProjectParticipant[]).map((p, i) => (
                    <div key={i} className="flex items-center gap-4 bg-[#faf9f7] rounded-[14px] p-4">
                      {p.logo && (
                        <div className="relative w-14 h-14 shrink-0 rounded-[10px] overflow-hidden bg-white border border-[#ebebeb]">
                          <Image src={p.logo} alt={p.company_name} fill className="object-contain p-1" sizes="56px" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        {p.company_name && (
                          <p className="text-[15px] font-bold text-dark">{p.company_name}</p>
                        )}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          {p.website && (
                            <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-[13px] text-secondary hover:text-dark transition-colors truncate">
                              {p.website.replace(/^https?:\/\//, '')}
                            </a>
                          )}
                          {p.phone && (
                            <a href={`tel:${p.phone}`} className="text-[13px] text-secondary hover:text-dark transition-colors">
                              {p.phone}
                            </a>
                          )}
                          {p.email && (
                            <a href={`mailto:${p.email}`} className="text-[13px] text-secondary hover:text-dark transition-colors">
                              {p.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partners */}
            {(project.partners ?? []).length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-dark mb-5 tracking-[0.02em]">
                  Partneri projekta
                </h2>
                <div className="flex flex-wrap gap-4">
                  {(project.partners as ProjectPartner[]).map((p, i) => p.logo && (
                    <div key={i} className="relative w-[120px] h-[60px] rounded-[10px] overflow-hidden bg-[#faf9f7] border border-[#ebebeb]">
                      <Image src={p.logo} alt={`Partner ${i + 1}`} fill className="object-contain p-2" sizes="120px" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="md:sticky md:top-[88px]">
            <div className="bg-[#faf9f7] rounded-[20px] p-6 flex flex-col gap-5">

              {project.category && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-secondary mb-1">
                    Kategorija
                  </p>
                  <p className="text-[15px] font-semibold text-dark capitalize">{project.category}</p>
                </div>
              )}

              {project.location && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-secondary mb-1">
                    Lokacija
                  </p>
                  <p className="text-[15px] font-semibold text-dark">{project.location}</p>
                </div>
              )}

              {date && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-secondary mb-1">
                    Datum izvedbe
                  </p>
                  <p className="text-[15px] font-semibold text-dark capitalize">{date}</p>
                </div>
              )}

              {project.services.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-secondary mb-3">
                    Izvedeni radovi
                  </p>
                  <ul className="flex flex-col gap-2">
                    {project.services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-[14px] text-dark">
                        <span className="w-[5px] h-[5px] rounded-full bg-yellow shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-[#ebebeb] pt-5">
                <Link
                  href="/projekti"
                  className="text-[13px] font-semibold text-secondary hover:text-dark transition-colors no-underline flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Svi projekti
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  )
}
