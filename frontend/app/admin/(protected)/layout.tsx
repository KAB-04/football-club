import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { AdminShell } from '@/components/admin/admin-shell'
import { getCurrentAdmin } from '@/lib/auth/admin'

export const metadata: Metadata = {
  title: {
    default: 'StandFast FC Administration',
    template: '%s | StandFast FC Administration',
  },
  robots: { follow: false, index: false },
}

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await getCurrentAdmin().catch(() => null)

  if (!admin) {
    redirect('/admin/login')
  }

  return <AdminShell name={admin.profile.full_name || 'Administrator'}>{children}</AdminShell>
}
