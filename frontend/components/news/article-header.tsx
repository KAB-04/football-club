import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { NewsImage } from '@/components/news/news-image'
import type { NewsArticle } from '@/lib/data/types'
import { formatPublicationDate } from '@/lib/formatters/news'

export function ArticleHeader({ article }: { article: NewsArticle }) {
  return (
    <header className="border-b border-border bg-surface pt-10 sm:pt-14">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link className="text-sm font-bold text-success hover:text-foreground" href="/news">
            <span aria-hidden="true">←</span> Back to News
          </Link>
          {article.published_at ? (
            <time className="text-meta mt-8 block text-muted-foreground" dateTime={article.published_at}>
              {formatPublicationDate(article.published_at)}
            </time>
          ) : null}
          <h1 className="text-display mt-4 break-words text-foreground">{article.title}</h1>
          {article.excerpt ? <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{article.excerpt}</p> : null}
          <NewsImage article={article} className="mt-9 w-full" eager />
        </div>
      </Container>
    </header>
  )
}
