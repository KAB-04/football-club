/* Player image hosts are configured through club data and are not fixed at build time. */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { PlayerWithTeam } from '@/lib/data/types'
import { formatJerseyNumber } from '@/lib/formatters/player'

export function PlayersPreview({ players, unavailable }: { players: PlayerWithTeam[]; unavailable: boolean }) {
  return (
    <section aria-labelledby="players-heading" className="bg-background py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-meta text-success">The squad</p>
          <h2 className="text-section-title mt-2" id="players-heading">Meet the Players</h2>
        </div>

        {unavailable ? (
          <ErrorState className="mt-8" description="Player profiles are temporarily unavailable." title="Unable to load players" />
        ) : players.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {players.map((player) => (
              <article className="group border border-border bg-surface" key={player.id}>
                {player.photo_url ? (
                  <div className="aspect-[4/5] overflow-hidden bg-surface-muted">
                    <img
                      alt={`${player.full_name}, StandFast FC ${player.team.name} player`}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      src={player.photo_url}
                    />
                  </div>
                ) : (
                  <div aria-hidden="true" className="flex aspect-[4/5] items-end justify-between bg-surface-muted p-5">
                    <span className="text-5xl font-black text-border">SF</span>
                    <span className="text-3xl font-black text-success">
                      {player.jersey_number === null ? '' : player.jersey_number}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-meta text-success">{player.team.name}</p>
                      <h3 className="text-card-title mt-2">
                        <Link className="hover:text-success" href={`/players/${player.slug}`}>
                          {player.full_name}
                        </Link>
                      </h3>
                    </div>
                    <span className="text-sm font-black text-muted-foreground">
                      {formatJerseyNumber(player.jersey_number)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{player.position}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-8"
            description="Player profiles will appear here when the active squad is published."
            title="Squad profiles coming soon"
          />
        )}
      </Container>
    </section>
  )
}
