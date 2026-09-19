import { Container } from '@/components/layout/container'
import { PlayerCard } from '@/components/players/player-card'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { PlayerWithTeam, Team } from '@/lib/data/types'

export function SquadSection({
  players,
  team,
}: {
  players: PlayerWithTeam[] | null
  team: Team
}) {
  return (
    <section aria-labelledby="squad-heading" className="bg-background py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-meta text-success">{team.name} squad</p>
          <h2 className="text-section-title mt-2" id="squad-heading">Meet the Players</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Active player profiles published for the StandFast FC {team.name} team.
          </p>
        </div>

        {players === null ? (
          <ErrorState
            className="mt-9"
            description="Squad information is temporarily unavailable."
            title="Unable to load the squad"
          />
        ) : players.length === 0 ? (
          <EmptyState
            className="mt-9"
            description="Active player profiles will appear here when they are published."
            title="Squad information has not been published yet"
          />
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
