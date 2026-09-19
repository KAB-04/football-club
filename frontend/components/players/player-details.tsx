import type { PlayerWithTeam } from '@/lib/data/types'
import { calculateAge, formatDateOfBirth } from '@/lib/formatters/player'

type Detail = { label: string; value: string }

export function PlayerDetails({ player }: { player: PlayerWithTeam }) {
  const details: Detail[] = [
    { label: 'Team', value: player.team.name },
    ...(player.position ? [{ label: 'Position', value: player.position }] : []),
    ...(player.jersey_number !== null
      ? [{ label: 'Jersey number', value: String(player.jersey_number) }]
      : []),
    ...(player.nationality ? [{ label: 'Nationality', value: player.nationality }] : []),
    ...(player.strong_foot ? [{ label: 'Strong foot', value: player.strong_foot }] : []),
    ...getBirthDetails(player.date_of_birth),
  ]

  return (
    <section aria-labelledby="player-details-heading">
      <h2 className="text-section-title" id="player-details-heading">Player details</h2>
      <dl className="mt-6 grid border-l border-t border-border sm:grid-cols-2">
        {details.map((detail) => (
          <div className="border-b border-r border-border bg-surface p-5" key={detail.label}>
            <dt className="text-meta text-muted-foreground">{detail.label}</dt>
            <dd className="mt-2 text-base font-bold text-foreground">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function getBirthDetails(dateOfBirth: string | null): Detail[] {
  if (!dateOfBirth) return []

  try {
    return [
      { label: 'Date of birth', value: formatDateOfBirth(dateOfBirth) },
      { label: 'Age', value: String(calculateAge(dateOfBirth)) },
    ]
  } catch {
    return []
  }
}
