import Link from 'next/link'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { BrandLogoMark } from '@/components/ui/BrandLogoMark'

export default async function NewProjectPage() {

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
      <header className="bg-white border-b border-[#ebebeb] px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/admin" className="flex items-center gap-3 no-underline">
          <BrandLogoMark className="h-9 w-auto" />
        </Link>
        <span className="text-[#ccc]">/</span>
        <Link href="/admin/projekti" className="text-[14px] text-secondary hover:text-dark transition-colors no-underline">Projekti</Link>
        <span className="text-[#ccc]">/</span>
        <span className="text-[14px] font-semibold text-dark">Novi projekt</span>
      </header>

      <main className="max-w-[800px] mx-auto px-6 py-8">
        <h1 className="text-[22px] font-extrabold text-dark mb-8">Novi projekt</h1>
        <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <ProjectForm />
        </div>
      </main>
    </div>
  )
}
