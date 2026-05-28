import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/projects'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { AdminHeader } from '@/components/admin/AdminHeader'

type Props = { params: Promise<{ id: string }> }

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
      <AdminHeader current={project.title} />

      <main className="max-w-[800px] mx-auto px-3 sm:px-6 py-8">
        <h1 className="text-[22px] font-extrabold text-dark mb-8">Uredi projekt</h1>
        <div className="bg-white rounded-[20px] p-4 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <ProjectForm project={project} />
        </div>
      </main>
    </div>
  )
}
