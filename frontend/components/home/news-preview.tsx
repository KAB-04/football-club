/* Remote editorial URLs are administrator-provided, so their hosts are not known at build time. */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { NewsArticle } from '@/lib/data/types'

const publicationDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  timeZone: 'Africa/Accra',
  year: 'numeric',
})

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
              <article className="group border-t-4 border-brand bg-background" key={article.id}>
                {article.cover_image_url ? (
                  <div className="aspect-[16/10] overflow-hidden bg-surface-muted">
                    <img
                      alt={article.cover_image_alt || ''}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      src={article.cover_image_url}
                    />
                  </div>
                ) : (
                  <div aria-hidden="true" className="flex aspect-[16/10] items-end bg-structural p-5">
                    <span className="text-4xl font-black text-brand">SF</span>
                  </div>
                )}
                <div className="p-5">
                  {article.published_at ? (
                    <p className="text-meta text-muted-foreground">
                      {publicationDate.format(new Date(article.published_at))}
                    </p>
                  ) : null}
                  <h3 className="text-card-title mt-3">
                    <Link className="hover:text-success" href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  {article.excerpt ? (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {article.excerpt}
                    </p>
                  ) : null}
                </div>
              </article>
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
