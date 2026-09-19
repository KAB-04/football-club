import Link from 'next/link'

import { PlayerPhoto } from '@/components/players/player-photo'
import type { PlayerWithTeam } from '@/lib/data/types'
import { calculateAge, formatJerseyNumber } from '@/lib/formatters/player'

export function PlayerCard({ player }: { player: PlayerWithTeam }) {
  const age = getPlayerAge(player.date_of_birth)
  return (
    <article className="group border border-border bg-surface">
      <Link className="block" href={`/players/${player.slug}`}>
        <PlayerPhoto className="transition-transform duration-300 group-hover:scale-[1.02]" player={player} />

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-meta text-success">{player.position}</p>
              <h3 className="text-card-title mt-2 break-words group-hover:text-success">
                {player.full_name}
              </h3>
            </div>
            <span className="shrink-0 text-lg font-black text-muted-foreground">
              {formatJerseyNumber(player.jersey_number)}
            </span>
          </div>
          {age !== null ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {player.team.name} <span aria-hidden="true">/</span> Age {age}
            </p>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">{player.team.name}</p>
          )}
        </div>
      </Link>
    </article>
  )
}

function getPlayerAge(dateOfBirth: string | null): number | null {
  if (!dateOfBirth) return null

  try {
    return calculateAge(dateOfBirth)
  } catch {
    return null
  }
}
