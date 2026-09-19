import type { PlayerWithTeam } from '@/lib/data/types'

export function PlayerStats({ player }: { player: PlayerWithTeam }) {
  const stats = [
    { label: 'Appearances', value: player.appearances },
    { label: 'Goals', value: player.goals },
    { label: 'Assists', value: player.assists },
  ]

  return (
    <section aria-labelledby="player-stats-heading">
      <h2 className="text-section-title" id="player-stats-heading">Player statistics</h2>
      <dl className="mt-6 grid grid-cols-3 border-l border-t border-border">
        {stats.map((stat) => (
          <div className="border-b border-r border-border bg-surface px-3 py-6 text-center sm:px-6" key={stat.label}>
            <dd className="text-3xl font-black text-foreground sm:text-4xl">{stat.value}</dd>
            <dt className="mt-2 text-xs font-semibold text-muted-foreground sm:text-sm">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
