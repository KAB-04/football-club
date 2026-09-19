import { PlayerCard } from '@/components/players/player-card'
import { LinkButton } from '@/components/ui/button'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { PlayerWithTeam } from '@/lib/data/types'

export function PlayerResults({
  players,
  filtered,
}: {
  players: PlayerWithTeam[] | null
  filtered: boolean
}) {
  if (players === null) {
    return (
      <ErrorState
        className="mt-8"
        description="The player directory is temporarily unavailable. Please try again later."
        title="Unable to load players"
      />
    )
  }

  const summary = `${players.length} ${players.length === 1 ? 'player' : 'players'}${filtered ? ' found' : ''}`

  return (
    <section aria-labelledby="player-results-heading" className="mt-10">
      <h2 className="text-section-title" id="player-results-heading">Player directory</h2>
      <p aria-live="polite" className="mt-2 text-sm font-semibold text-muted-foreground">{summary}</p>

      {players.length === 0 ? (
        <EmptyState
          action={filtered ? <LinkButton href="/players" variant="outline">Clear Filters</LinkButton> : undefined}
          className="mt-7"
          description={filtered
            ? 'Try changing or clearing the current search filters.'
            : 'Active player profiles will appear here when they are published.'}
          title={filtered ? 'No players match these filters' : 'No player profiles have been published yet'}
        />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {players.map((player) => <PlayerCard key={player.id} player={player} />)}
        </div>
      )}
    </section>
  )
}
