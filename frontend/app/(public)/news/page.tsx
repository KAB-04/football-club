import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { NewsHero } from '@/components/news/news-hero'
import { NewsList } from '@/components/news/news-list'
import { getPublishedNews } from '@/lib/data/news'
import type { NewsArticle } from '@/lib/data/types'

export const metadata: Metadata = {
  title: 'News | StandFast FC',
  description: 'Official StandFast Football Club news and updates from Ashaiman, Ghana.',
}

const NEWS_LIMIT = 15

export default async function NewsPage() {
  let articles: NewsArticle[] | null = null

  try {
    articles = await getPublishedNews(NEWS_LIMIT)
  } catch {
    // Sanitized context is logged in the data layer; null preserves the
    // distinction between an unavailable query and a successful empty list.
  }

  return (
    <>
      <NewsHero />
      <div className="bg-surface py-14 sm:py-18">
        <Container>
          <NewsList articles={articles} />
        </Container>
      </div>
    </>
  )
}
