import Link from 'next/link'

import { PlayerStatusForm } from '@/components/admin/player-status-form'
import { PlayerPhoto } from '@/components/players/player-photo'
import { Badge } from '@/components/ui/badge'
import { LinkButton } from '@/components/ui/button'
import type { PlayerWithTeam } from '@/lib/data/types'
import { calculateAge, formatJerseyNumber } from '@/lib/formatters/player'

export function AdminPlayerList({ players }: { players: PlayerWithTeam[] }) {
  return (
    <div className="mt-6">
      <div className="hidden overflow-x-auto border border-border bg-surface md:block">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead className="bg-surface-muted text-xs uppercase text-muted-foreground"><tr>{['Player', 'Team', 'Number', 'Position', 'Age', 'Status', 'Actions'].map((h) => <th className="px-4 py-3" key={h}>{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">{players.map((player) => <tr key={player.id}>
            <td className="px-4 py-3"><div className="flex items-center gap-3"><PlayerPhoto className="h-14 w-11 shrink-0" player={player} /><span className="font-semibold">{player.full_name}</span></div></td>
            <td className="px-4 py-3">{player.team.name}</td><td className="px-4 py-3">{formatJerseyNumber(player.jersey_number)}</td><td className="px-4 py-3">{player.position}</td><td className="px-4 py-3">{age(player.date_of_birth)}</td>
            <td className="px-4 py-3"><Badge variant={player.is_active ? 'success' : 'neutral'}>{player.is_active ? 'Active' : 'Inactive'}</Badge></td>
            <td className="px-4 py-3"><div className="flex items-center gap-2"><LinkButton href={`/admin/players/${player.id}/edit`} size="sm" variant="outline">Edit</LinkButton><PlayerStatusForm id={player.id} isActive={player.is_active} /></div></td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="grid gap-4 md:hidden">{players.map((player) => <article className="border border-border bg-surface p-4" key={player.id}>
        <div className="flex gap-4"><PlayerPhoto className="h-24 w-20 shrink-0" player={player} /><div className="min-w-0"><h2 className="break-words font-bold">{player.full_name}</h2><p className="mt-1 text-sm text-muted-foreground">{player.team.name} / {player.position}</p><p className="mt-1 text-sm">{formatJerseyNumber(player.jersey_number)} / Age {age(player.date_of_birth)}</p><Badge className="mt-3" variant={player.is_active ? 'success' : 'neutral'}>{player.is_active ? 'Active' : 'Inactive'}</Badge></div></div>
        <div className="mt-4 flex flex-wrap gap-2"><LinkButton href={`/admin/players/${player.id}/edit`} size="sm" variant="outline">Edit</LinkButton>{player.is_active ? <Link className="inline-flex min-h-9 items-center text-sm font-semibold text-success" href={`/players/${player.slug}`}>Public Profile</Link> : null}<PlayerStatusForm id={player.id} isActive={player.is_active} /></div>
      </article>)}</div>
    </div>
  )
}

function age(value: string | null) { if (!value) return '-'; try { return String(calculateAge(value)) } catch { return '-' } }
