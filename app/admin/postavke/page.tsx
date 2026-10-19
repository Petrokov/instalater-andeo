import { AdminHeader } from '@/components/admin/AdminHeader'
import { ContactFormToggle } from '@/components/admin/ContactFormToggle'
import { requireAdmin } from '@/lib/admin-auth'
import { getContactFormEnabled } from '@/lib/settings'

export const dynamic = 'force-dynamic'

export default async function AdminPostavkePage() {
  await requireAdmin()
  const contactFormEnabled = await getContactFormEnabled()

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
      <AdminHeader current="Postavke" />

      <main className="max-w-[1200px] mx-auto px-3 sm:px-6 py-8">
        <ContactFormToggle initialEnabled={contactFormEnabled} />
      </main>
    </div>
  )
}
