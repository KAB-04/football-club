import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { PlayerForm } from '@/components/admin/player-form'
import { getCurrentAdmin } from '@/lib/auth/admin'
import { AdminPlayerDataError, getAdminPlayerById, getAdminTeams } from '@/lib/data/admin/players'

export const metadata: Metadata = { title: 'Edit Player' }

export default async function EditPlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin().catch(() => null)
  if (!admin) redirect('/admin/login')
  const { id } = await params
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound()
  const result = await loadPlayer(id)
  if (result.unavailable) return <main className="px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl border-l-4 border-danger bg-surface p-6"><h1 className="text-page-title">Player unavailable</h1><p className="mt-3 text-muted-foreground">This record could not be loaded. Please try again.</p></div></main>
  if (!result.player) notFound()
  const { player, teams } = result
  return <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><div className="mx-auto max-w-4xl"><AdminPageHeader eyebrow="Players" title={`Edit ${player.full_name}`} description="Update the player record. The existing public URL will be preserved." /><PlayerForm id={player.id} teams={teams} initialValues={{ fullName: player.full_name, teamId: player.team_id, jerseyNumber: player.jersey_number?.toString() ?? '', position: player.position, dateOfBirth: player.date_of_birth ?? '', nationality: player.nationality ?? '', strongFoot: player.strong_foot ?? '', appearances: String(player.appearances), goals: String(player.goals), assists: String(player.assists), photoUrl: player.photo_url ?? '', isActive: player.is_active }} /></div></main>
}

async function loadPlayer(id: string) {
  try {
    const [player, teams] = await Promise.all([getAdminPlayerById(id), getAdminTeams()])
    return { player, teams, unavailable: false as const }
  } catch (error) {
    if (error instanceof AdminPlayerDataError) return { player: null, teams: [], unavailable: true as const }
    throw error
  }
}
