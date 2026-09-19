import Link from 'next/link'

import { AgeGroupPathway } from '@/components/club/club-teams'
import { Container } from '@/components/layout/container'
import { Card } from '@/components/ui/card'
import { LinkButton } from '@/components/ui/button'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { Team } from '@/lib/data/types'

export function TeamsOverview({ teams }: { teams: Team[] | null }) {
  return (
    <>
      <section aria-labelledby="divisions-heading" className="bg-background py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-meta text-success">The divisions</p>
            <h2 className="text-section-title mt-2" id="divisions-heading">
              Four teams. One StandFast identity.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Select an age division to view its team page when the full
              squad pages are published.
            </p>
          </div>

          {teams === null ? (
            <ErrorState
              className="mt-9"
              description="The team directory is temporarily unavailable. Please try again later."
              title="Unable to load teams"
            />
          ) : teams.length === 0 ? (
            <EmptyState
              className="mt-9"
              description="No team records are currently available."
              title="Teams have not been published yet"
            />
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {teams.map((team, index) => (
                <Card className="group relative min-h-72 overflow-hidden p-7 sm:p-9" key={team.id}>
                  <span aria-hidden="true" className="absolute -bottom-8 right-2 text-[10rem] font-black leading-none text-muted/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative flex h-full flex-col items-start">
                    <p className="text-meta text-success">StandFast FC division</p>
                    <h3 className="mt-5 text-5xl font-black text-foreground sm:text-6xl">
                      {team.name}
                    </h3>
                    {team.description ? (
                      <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                        {team.description}
                      </p>
                    ) : null}
                    <Link
                      className="mt-auto inline-flex min-h-11 items-center border-b-2 border-success pt-7 text-sm font-bold text-success group-hover:border-foreground group-hover:text-foreground"
                      href={`/teams/${team.slug}`}
                    >
                      View {team.name} Team <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {teams && teams.length ? (
        <section aria-labelledby="pathway-heading" className="border-y border-border bg-surface py-16 sm:py-20">
          <Container>
            <p className="text-meta text-success">Age-group structure</p>
            <h2 className="text-section-title mt-2" id="pathway-heading">
              U10 through U17
            </h2>
            <AgeGroupPathway teams={teams} />
            <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
              This ordered view describes the club&apos;s current age divisions.
              It does not represent guaranteed progression for individual players.
            </p>
          </Container>
        </section>
      ) : null}

      <section className="bg-brand py-14 text-brand-foreground sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <p className="text-meta">StandFast FC</p>
            <h2 className="text-section-title mt-2">Follow the teams beyond the squad pages.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/players" variant="secondary">View All Players</LinkButton>
            <LinkButton href="/fixtures" variant="secondary">Fixtures &amp; Results</LinkButton>
            <LinkButton href="/contact" variant="outline">Contact the Club</LinkButton>
          </div>
        </Container>
      </section>
    </>
  )
}
