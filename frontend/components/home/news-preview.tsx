import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { NewsCard } from '@/components/news/news-card'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { NewsArticle } from '@/lib/data/types'

export function NewsPreview({ articles, unavailable }: { articles: NewsArticle[]; unavailable: boolean }) {
  return (
    <section aria-labelledby="news-heading" className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-meta text-success">From the club</p>
            <h2 className="text-section-title mt-2" id="news-heading">Latest News</h2>
          </div>
          <Link className="text-sm font-bold text-success hover:text-foreground" href="/news">
            All news <span aria-hidden="true">→</span>
          </Link>
        </div>

        {unavailable ? (
          <ErrorState className="mt-8" description="Club news is temporarily unavailable." title="Unable to load news" />
        ) : articles.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <NewsCard article={article} key={article.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-8"
            description="Club updates will appear here when they are published."
            title="No news published yet"
          />
        )}
      </Container>
    </section>
  )
}
