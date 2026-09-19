import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { PlayerPhoto } from '@/components/players/player-photo'
import type { PlayerWithTeam } from '@/lib/data/types'

export function PlayerProfileHero({ player }: { player: PlayerWithTeam }) {
  return (
    <section className="bg-structural text-structural-foreground">
      <Container className="py-8 sm:py-10 lg:py-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link className="hover:text-brand" href="/teams">Teams</Link></li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-brand" href={`/teams/${player.team.slug}`}>
                {player.team.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">{player.full_name}</li>
          </ol>
        </nav>

        <div className="grid items-end gap-8 md:grid-cols-[minmax(15rem,24rem)_1fr] lg:gap-14">
          <PlayerPhoto className="w-full max-w-sm border border-white/15" eager player={player} />
          <div className="min-w-0 pb-2 md:pb-6">
            {player.jersey_number !== null ? (
              <p className="text-6xl font-black leading-none text-brand sm:text-7xl" aria-label={`Jersey number ${player.jersey_number}`}>
                {player.jersey_number}
              </p>
            ) : null}
            <h1 className="text-display mt-4 break-words text-white">{player.full_name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-lg font-semibold">
              {player.position ? <span>{player.position}</span> : null}
              <Link className="text-brand hover:text-white" href={`/teams/${player.team.slug}`}>
                {player.team.name}
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div aria-hidden="true" className="h-2 bg-brand" />
    </section>
  )
}
