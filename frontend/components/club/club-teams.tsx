import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { ErrorState } from '@/components/ui/states'
import type { Team } from '@/lib/data/types'

export function ClubTeams({ teams }: { teams: Team[] | null }) {
  return (
    <section aria-labelledby="development-heading" className="bg-background py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-meta text-success">Age-group structure</p>
          <h2 className="text-section-title mt-2" id="development-heading">
            Team Development Structure
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            StandFast FC is currently organized across four age divisions.
            Select a division to explore its team information.
          </p>
        </div>

        {teams === null ? (
          <ErrorState
            className="mt-9"
            description="The team directory is temporarily unavailable. The club's confirmed divisions are U10, U13, U15 and U17."
            title="Unable to load team links"
          />
        ) : (
          <AgeGroupPathway teams={teams} />
        )}

        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
          This sequence describes the club&apos;s current age-group structure;
          it does not represent a guaranteed progression path for individual players.
        </p>
      </Container>
    </section>
  )
}

export function AgeGroupPathway({ teams }: { teams: Team[] }) {
  return (
    <ol className="mt-10 grid gap-4 md:grid-cols-4">
      {teams.map((team, index) => (
        <li className="relative" key={team.id}>
          <Link
            className="group flex min-h-40 flex-col justify-between border border-border bg-surface p-6 hover:border-success"
            href={`/teams/${team.slug}`}
          >
            <span className="text-meta text-muted-foreground">
              Division {index + 1}
            </span>
            <span className="text-4xl font-black text-foreground group-hover:text-success">
              {team.name}
            </span>
            <span className="text-sm font-bold text-success">
              View team <span aria-hidden="true">→</span>
            </span>
          </Link>
          {index < teams.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 bg-background px-1 text-xl font-black text-success md:block"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
