import Link from 'next/link'

import { Container } from '@/components/layout/container'
import type { Team } from '@/lib/data/types'

export function TeamNavigation({
  currentSlug,
  teams,
}: {
  currentSlug: string
  teams: Team[]
}) {
  return (
    <nav aria-label="StandFast divisions" className="border-b border-border bg-surface">
      <Container>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {teams.map((team) => {
            const current = team.slug === currentSlug

            return (
              <li key={team.id}>
                <Link
                  aria-current={current ? 'page' : undefined}
                  className={`flex min-h-14 items-center justify-center border-b-4 px-4 text-sm font-bold ${
                    current
                      ? 'border-brand bg-surface-muted text-foreground'
                      : 'border-transparent text-muted-foreground hover:border-border hover:text-success'
                  }`}
                  href={`/teams/${team.slug}`}
                >
                  {team.name}
                  {current ? <span className="sr-only"> (current team)</span> : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </nav>
  )
}
