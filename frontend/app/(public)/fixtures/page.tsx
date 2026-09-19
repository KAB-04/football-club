import type { Metadata } from 'next'

import { FixturesHero } from '@/components/fixtures/fixtures-hero'
import { MatchList } from '@/components/fixtures/match-list'
import { Container } from '@/components/layout/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getRecentResults, getUpcomingFixtures } from '@/lib/data/fixtures'
import type { FixtureWithTeam } from '@/lib/data/types'

export const metadata: Metadata = {
  title: 'Fixtures & Results | StandFast FC',
  description: 'Upcoming fixtures and recent results for the U10, U13, U15 and U17 teams of StandFast Football Club in Ashaiman, Ghana.',
}

const FIXTURE_LIMIT = 12
const RESULT_LIMIT = 12

export default async function FixturesPage() {
  const [upcoming, results] = await Promise.all([
    loadFixtures(getUpcomingFixtures(FIXTURE_LIMIT)),
    loadFixtures(getRecentResults(RESULT_LIMIT)),
  ])

  return (
    <>
      <FixturesHero />
      <div>
        <section className="bg-background py-14 sm:py-18">
          <Container>
            <SectionHeading description="Scheduled matches are shown nearest first, using kickoff times in Ghana Mean Time." eyebrow="Next matches" title="Upcoming Fixtures" />
            <MatchList fixtures={upcoming} type="upcoming" />
          </Container>
        </section>
        <section className="border-t border-border bg-surface-muted py-14 sm:py-18">
          <Container>
            <SectionHeading description="Completed matches are ordered newest first, with scores mapped to the displayed home and away sides." eyebrow="Full time" title="Recent Results" />
            <MatchList fixtures={results} type="results" />
          </Container>
        </section>
      </div>
    </>
  )
}

async function loadFixtures(request: Promise<FixtureWithTeam[]>): Promise<FixtureWithTeam[] | null> {
  try {
    return await request
  } catch {
    return null
  }
}
