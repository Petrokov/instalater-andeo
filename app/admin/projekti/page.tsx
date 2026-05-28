import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/projects'
import { DeleteProjectButton } from './DeleteProjectButton'
import { AdminHeader } from '@/components/admin/AdminHeader'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function AdminProjektiPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
      <AdminHeader
        current="Projekti"
        actions={[{ href: '/admin/projekti/new', label: '+ Novi projekt', primary: true }]}
      />

      <main className="max-w-[1100px] mx-auto px-3 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-extrabold text-dark">
            Projekti ({projects.length})
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-[20px] py-20 text-center shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <p className="text-secondary text-[15px] mb-4">Nema projekata. Dodaj prvi!</p>
            <Link
              href="/admin/projekti/new"
              className="bg-dark text-white text-[14px] font-bold px-6 py-3 rounded-[12px] no-underline hover:bg-dark/80 transition-colors"
            >
              Dodaj projekt
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-[16px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex items-center gap-4 min-h-[96px]"
              >
                <div className="relative w-16 h-16 rounded-[10px] overflow-hidden bg-[#f0efe8] shrink-0">
                  {p.cover_image ? (
                    <Image src={p.cover_image} alt={p.title} fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#ccc] text-[10px]">
                      no img
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-[15px] font-bold text-dark truncate">{p.title}</h2>
                    {p.is_featured && (
                      <span className="text-[10px] font-bold bg-yellow text-dark px-2 py-0.5 rounded-full shrink-0">
                        Istaknuto
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-secondary">
                    <span className="capitalize">{p.category}</span>
                    <span>-</span>
                    <span>{p.location}</span>
                    {p.project_date && (
                      <>
                        <span>-</span>
                        <span>{new Date(p.project_date).toLocaleDateString('hr-HR', { month: 'long', year: 'numeric' })}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/projekti/${p.slug}`}
                    target="_blank"
                    className="text-[12px] text-secondary hover:text-dark transition-colors no-underline px-3 py-1.5 rounded-[8px] hover:bg-[#f0efe8]"
                  >
                    Pregled
                  </Link>
                  <Link
                    href={`/admin/projekti/${p.id}/edit`}
                    className="text-[12px] font-semibold text-dark hover:text-dark/70 transition-colors no-underline px-3 py-1.5 rounded-[8px] hover:bg-[#f0efe8]"
                  >
                    Uredi
                  </Link>
                  <DeleteProjectButton id={p.id} slug={p.slug} title={p.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
