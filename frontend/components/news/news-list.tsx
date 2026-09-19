import { NewsCard } from '@/components/news/news-card'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { NewsArticle } from '@/lib/data/types'

export function NewsList({ articles }: { articles: NewsArticle[] | null }) {
  if (articles === null) {
    return <ErrorState description="Club news is temporarily unavailable. Please try again later." title="Unable to load news" />
  }

  if (articles.length === 0) {
    return <EmptyState description="Official club updates will appear here when they are published." title="No club news has been published yet" />
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => <NewsCard article={article} key={article.id} />)}
    </div>
  )
}
