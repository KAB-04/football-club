import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { PlayerForm } from '@/components/admin/player-form'
import { getCurrentAdmin } from '@/lib/auth/admin'
import { getAdminTeams } from '@/lib/data/admin/players'

export const metadata: Metadata = { title: 'Add Player' }

export default async function NewPlayerPage() {
  const admin = await getCurrentAdmin().catch(() => null)
  if (!admin) redirect('/admin/login')
  const teams = await getAdminTeams()
  return <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><div className="mx-auto max-w-4xl"><AdminPageHeader eyebrow="Players" title="Add Player" description="Create a squad record using verified club information." /><PlayerForm id={null} teams={teams} initialValues={{ fullName: '', teamId: '', jerseyNumber: '', position: '', dateOfBirth: '', nationality: '', strongFoot: '', appearances: '0', goals: '0', assists: '0', photoUrl: '', isActive: true }} /></div></main>
}
