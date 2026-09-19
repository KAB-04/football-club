/* Remote editorial URLs are administrator-provided, so their hosts are not known at build time. */
/* eslint-disable @next/next/no-img-element */
import { classNames } from '@/lib/class-names'
import type { NewsArticle } from '@/lib/data/types'

export function NewsImage({
  article,
  className,
  eager = false,
}: {
  article: NewsArticle
  className?: string
  eager?: boolean
}) {
  if (article.cover_image_url) {
    return (
      <div className={classNames('aspect-[16/10] overflow-hidden bg-surface-muted', className)}>
        <img
          alt={article.cover_image_alt || `Cover image for ${article.title}`}
          className="h-full w-full object-cover"
          loading={eager ? 'eager' : 'lazy'}
          src={article.cover_image_url}
        />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className={classNames('flex aspect-[16/10] items-end overflow-hidden bg-structural p-5', className)}>
      <span className="text-4xl font-black text-brand">SF</span>
    </div>
  )
}
