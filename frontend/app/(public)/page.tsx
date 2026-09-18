import type { Metadata } from 'next'

import { ClosingCta } from '@/components/home/closing-cta'
import { FixtureHighlights } from '@/components/home/fixture-highlights'
import { GalleryPreview } from '@/components/home/gallery-preview'
import { HomeHero } from '@/components/home/home-hero'
import { NewsPreview } from '@/components/home/news-preview'
import { PlayersPreview } from '@/components/home/players-preview'
import { TeamsPreview } from '@/components/home/teams-preview'
import { getRecentResults, getUpcomingFixtures } from '@/lib/data/fixtures'
import { getPublishedGalleryItems } from '@/lib/data/gallery'
import { getPublishedNews } from '@/lib/data/news'
import { getActivePlayers } from '@/lib/data/players'
import { getTeams } from '@/lib/data/teams'

export const metadata: Metadata = {
  title: 'StandFast Football Club',
  description:
    'StandFast Football Club in Ashaiman, Ghana. Home of the U10, U13, U15 and U17 teams. Horse Power.',
}

export default async function Home() {
  const [upcoming, results, news, teamData, playerData, gallery] =
    await Promise.all([
      loadSection(getUpcomingFixtures(1)),
      loadSection(getRecentResults(1)),
      loadSection(getPublishedNews(3)),
      loadSection(getTeams()),
      loadSection(getActivePlayers(4)),
      loadSection(getPublishedGalleryItems(5)),
    ])

  return (
    <>
      <HomeHero />
      <FixtureHighlights
        latestResult={results.data[0] ?? null}
        latestResultUnavailable={results.unavailable}
        nextFixture={upcoming.data[0] ?? null}
        nextFixtureUnavailable={upcoming.unavailable}
      />
      <NewsPreview articles={news.data} unavailable={news.unavailable} />
      <TeamsPreview teams={teamData.data} unavailable={teamData.unavailable} />
      <PlayersPreview players={playerData.data} unavailable={playerData.unavailable} />
      <GalleryPreview items={gallery.data} unavailable={gallery.unavailable} />
      <ClosingCta />
    </>
  )
}

async function loadSection<T>(request: Promise<T[]>): Promise<{
  data: T[]
  unavailable: boolean
}> {
  try {
    return { data: await request, unavailable: false }
  } catch {
    return { data: [], unavailable: true }
  }
}
