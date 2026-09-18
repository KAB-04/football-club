import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { Team } from '@/lib/data/types'

export function TeamsPreview({ teams, unavailable }: { teams: Team[]; unavailable: boolean }) {
  return (
    <section aria-labelledby="teams-heading" className="bg-structural py-16 text-structural-foreground sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-meta text-brand">Four divisions</p>
          <h2 className="text-section-title mt-2 text-white" id="teams-heading">Our Teams</h2>
          <p className="mt-3 leading-7 text-white/65">
            Explore the StandFast FC age divisions competing under one club identity.
          </p>
        </div>

        {unavailable ? (
          <ErrorState className="mt-9 bg-surface" description="Team information is temporarily unavailable." title="Unable to load teams" />
        ) : teams.length ? (
          <div className="mt-9 grid grid-cols-2 gap-px bg-white/15 lg:grid-cols-4">
            {teams.map((team, index) => (
              <Link
                className="group min-h-44 bg-structural p-5 transition-colors hover:bg-white/[0.06] sm:min-h-52 sm:p-7"
                href={`/teams/${team.slug}`}
                key={team.id}
              >
                <span className="text-meta text-white/45">0{index + 1}</span>
                <h3 className="mt-8 text-3xl font-black text-white sm:text-4xl">{team.name}</h3>
                <span className="mt-5 inline-flex text-sm font-bold text-brand">
                  View team <span aria-hidden="true" className="ml-2">→</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-9 bg-surface"
            description="Team information is not available yet."
            title="Teams coming soon"
          />
        )}
      </Container>
    </section>
  )
}
