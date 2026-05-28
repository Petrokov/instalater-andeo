import { createServerClient } from '@/lib/supabase-server'
import { PrijaveTable } from './PrijaveTable'
import { AdminHeader } from '@/components/admin/AdminHeader'
import type { PrijavaStatus } from '@/lib/database.types'
import { requireAdmin } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

const statusCounts = (data: { status: PrijavaStatus }[]) => ({
  nova: data.filter((p) => p.status === 'nova').length,
  'u-obradi': data.filter((p) => p.status === 'u-obradi').length,
  zavrsena: data.filter((p) => p.status === 'zavrsena').length,
  odbijena: data.filter((p) => p.status === 'odbijena').length,
})

export default async function AdminPage() {
  await requireAdmin()

  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')

  const { data: prijave, error } = await supabase
    .from('prijave')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Greška pri dohvaćanju podataka: {error.message}
      </div>
    )
  }

  const counts = statusCounts(prijave ?? [])

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
      <AdminHeader current="Prijave" />

      <main className="max-w-[1200px] mx-auto px-3 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Nove prijave', value: counts.nova, color: 'text-blue-600' },
            { label: 'U obradi', value: counts['u-obradi'], color: 'text-yellow-600' },
            { label: 'Završene', value: counts.zavrsena, color: 'text-green-600' },
            { label: 'Odbijene', value: counts.odbijena, color: 'text-red-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className={`text-[28px] font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-[13px] text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
          <PrijaveTable prijave={prijave ?? []} />
        </div>
      </main>
    </div>
  )
}
