import Link from 'next/link'

import { NewsImage } from '@/components/news/news-image'
import type { NewsArticle } from '@/lib/data/types'
import { formatPublicationDate } from '@/lib/formatters/news'

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group border-t-4 border-brand bg-background">
      <Link aria-label={`Read ${article.title}`} className="block overflow-hidden" href={`/news/${article.slug}`}>
        <NewsImage article={article} className="transition-transform duration-300 group-hover:scale-[1.02]" />
      </Link>
      <div className="p-5">
        {article.published_at ? (
          <time className="text-meta text-muted-foreground" dateTime={article.published_at}>
            {formatPublicationDate(article.published_at)}
          </time>
        ) : null}
        <h3 className="text-card-title mt-3 break-words">
          <Link className="hover:text-success" href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.excerpt ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
        ) : null}
      </div>
    </article>
  )
}
