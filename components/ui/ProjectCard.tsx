import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/database.types'

const categoryColors: Record<string, string> = {
  kupaonica: 'bg-blue-50 text-blue-700',
  grijanje: 'bg-orange-50 text-orange-700',
  vodoinstalacije: 'bg-cyan-50 text-cyan-700',
  adaptacija: 'bg-purple-50 text-purple-700',
}

function categoryColor(cat: string) {
  return categoryColors[cat.toLowerCase()] ?? 'bg-[#f0efe8] text-[#4B4B4B]'
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const date = project.project_date
    ? new Date(project.project_date).toLocaleDateString('hr-HR', { month: 'long', year: 'numeric' })
    : null

  return (
    <Link
      href={`/projekti/${project.slug}`}
      className="group flex flex-col h-full bg-white rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 no-underline"
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-[#f0efe8] ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#ccc]">
              <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="18" cy="21" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 34l10-8 8 6 6-5 12 11" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {project.is_featured && (
          <div className="absolute top-3 left-3 bg-yellow text-dark text-[11px] font-bold px-2.5 py-1 rounded-full">
            Istaknuto
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${categoryColor(project.category)}`}>
            {project.category}
          </span>
          {date && (
            <span className="text-[12px] text-secondary">{date}</span>
          )}
        </div>

        <h3 className="text-[17px] font-extrabold text-dark leading-[1.3] mb-2 group-hover:text-dark/80 transition-colors">
          {project.title}
        </h3>

        <p className="text-[13px] text-secondary leading-[1.65] line-clamp-2 mb-4">
          {project.short_description}
        </p>

        <div className="flex items-center gap-1.5 text-[12px] text-secondary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1a4 4 0 014 4c0 3-4 8-4 8S3 8 3 5a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          {project.location}
        </div>
      </div>
    </Link>
  )
}
