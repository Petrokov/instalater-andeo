import { createServerClient, isValidSupabaseKey } from '@/lib/supabase-server'
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

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!isValidSupabaseKey(serviceRoleKey)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center space-y-3">
          <p className="text-red-500 font-semibold text-lg">Konfiguracija Supabase nije ispravna</p>
          <p className="text-gray-600 text-sm">
            Varijabla <code className="bg-gray-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> nije
            postavljena ili nije ispravna. Provjerite da koristite{' '}
            <strong>service_role</strong> ključ (ne <em>anon</em> ključ) iz postavki vašeg Supabase
            projekta i da je ispravno postavljen u Railway varijablama okoline.
          </p>
        </div>
      </div>
    )
  }

  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')

  const { data: prijave, error } = await supabase
    .from('prijave')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    const isAuthError =
      error.message.toLowerCase().includes('invalid api key') ||
      error.message.toLowerCase().includes('jwt') ||
      error.message.toLowerCase().includes('unauthorized')

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center space-y-3">
          <p className="text-red-500 font-semibold text-lg">Greška pri dohvaćanju podataka</p>
          {isAuthError ? (
            <p className="text-gray-600 text-sm">
              Supabase je vratio grešku autentikacije ({error.message}). Provjerite da je{' '}
              <code className="bg-gray-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> ispravno
              postavljen u Railway varijablama okoline — koristite <strong>service_role</strong> ključ
              iz Supabase Project Settings → API.
            </p>
          ) : (
            <p className="text-gray-600 text-sm">{error.message}</p>
          )}
        </div>
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
