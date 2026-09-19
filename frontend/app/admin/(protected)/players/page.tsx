import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminPlayerList } from '@/components/admin/admin-player-list'
import { Button, LinkButton } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/form'
import { getCurrentAdmin } from '@/lib/auth/admin'
import { getAdminPlayers, getAdminTeams } from '@/lib/data/admin/players'
import type { PlayerWithTeam, Team } from '@/lib/data/types'

export const metadata: Metadata = { title: 'Players' }

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function AdminPlayersPage({ searchParams }: { searchParams: SearchParams }) {
  const admin = await getCurrentAdmin().catch(() => null)
  if (!admin) redirect('/admin/login')
  const params = await searchParams
  const name = text(params.name, 100)
  const team = text(params.team, 40)
  const rawStatus = text(params.status, 10)
  const status = rawStatus === 'active' || rawStatus === 'inactive' ? rawStatus : ''
  let unavailable = false
  let players: PlayerWithTeam[] = []
  let teams: Team[] = []
  try {
    ;[players, teams] = await Promise.all([getAdminPlayers({ name: name || undefined, team: team || undefined, status: status || undefined }), getAdminTeams()])
  } catch { unavailable = true }
  const filtered = Boolean(name || team || status)
  const notice = message(text(params.success, 20), text(params.error, 20))

  return <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-end justify-between gap-5"><AdminPageHeader eyebrow="Team Management" title="Players" description="Manage active and inactive squad records." /><LinkButton href="/admin/players/new">Add Player</LinkButton></div>
    {notice ? <p className={`mt-6 border-l-4 bg-surface p-4 text-sm font-semibold ${notice.error ? 'border-danger text-danger' : 'border-success text-success'}`} role="status">{notice.text}</p> : null}
    <form action="/admin/players" className="mt-8 grid gap-5 border border-border bg-surface p-5 sm:grid-cols-3" method="get">
      <div><Label htmlFor="name">Player Name</Label><Input defaultValue={name} id="name" maxLength={100} name="name" type="search" /></div>
      <div><Label htmlFor="team">Team</Label><Select defaultValue={team} id="team" name="team"><option value="">All teams</option>{teams.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</Select></div>
      <div><Label htmlFor="status">Status</Label><Select defaultValue={status} id="status" name="status"><option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></Select></div>
      <div className="flex flex-wrap gap-3 sm:col-span-3"><Button type="submit">Apply Filters</Button><LinkButton href="/admin/players" variant="outline">Clear Filters</LinkButton></div>
    </form>
    {unavailable ? <section className="mt-6 border-l-4 border-danger bg-surface p-6"><h2 className="text-card-title">Players unavailable</h2><p className="mt-2 text-muted-foreground">Player records could not be loaded. Please try again.</p></section>
      : players.length ? <AdminPlayerList players={players} />
      : <section className="mt-6 border border-border bg-surface p-8 text-center"><h2 className="text-card-title">{filtered ? 'No matching players' : 'No players yet'}</h2><p className="mt-2 text-muted-foreground">{filtered ? 'Try changing or clearing the filters.' : 'Add the first player to begin managing the squad.'}</p><div className="mt-5">{filtered ? <LinkButton href="/admin/players" variant="outline">Clear Filters</LinkButton> : <LinkButton href="/admin/players/new">Add Player</LinkButton>}</div></section>}
  </div></main>
}

function text(value: string | string[] | undefined, max: number) { return (typeof value === 'string' ? value : '').trim().slice(0, max) }
function message(success: string, error: string) {
  if (error) return { error: true, text: 'Player status could not be changed.' }
  const messages: Record<string, string> = { created: 'Player created successfully.', updated: 'Player updated successfully.', deactivated: 'Player deactivated.', reactivated: 'Player reactivated.' }
  return messages[success] ? { error: false, text: messages[success] } : null
}
