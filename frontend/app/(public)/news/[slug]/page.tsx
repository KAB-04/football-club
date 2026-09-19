import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { Container } from '@/components/layout/container'
import { ArticleBody } from '@/components/news/article-body'
import { ArticleHeader } from '@/components/news/article-header'
import { ErrorState } from '@/components/ui/states'
import { getPublishedArticleBySlug } from '@/lib/data/news'

type ArticlePageProps = { params: Promise<{ slug: string }> }

const getPublicArticle = cache(getPublishedArticleBySlug)

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const article = await getPublicArticle(slug)
    if (!article) return { title: 'Article Not Found | StandFast FC' }

    const cover = getPublicImageUrl(article.cover_image_url)
    return {
      title: `${article.title} | StandFast FC`,
      description: article.excerpt || 'Official news from StandFast Football Club.',
      openGraph: {
        title: article.title,
        description: article.excerpt || 'Official news from StandFast Football Club.',
        type: 'article',
        publishedTime: article.published_at || undefined,
        images: cover ? [{ url: cover, alt: article.cover_image_alt || article.title }] : undefined,
      },
    }
  } catch {
    return { title: 'StandFast FC News', description: 'Official StandFast Football Club news.' }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  let article

  try {
    article = await getPublicArticle(slug)
  } catch {
    return <ArticleUnavailable />
  }

  if (!article) notFound()

  return (
    <article>
      <ArticleHeader article={article} />
      <ArticleBody content={article.content} />
    </article>
  )
}

function ArticleUnavailable() {
  return (
    <section className="flex min-h-[34rem] items-center bg-background py-16">
      <Container>
        <ErrorState
          action={<Link className="font-semibold text-success hover:text-foreground" href="/news">Back to News</Link>}
          description="This article is temporarily unavailable. Please try again later."
          headingLevel="h1"
          title="Unable to load this article"
        />
      </Container>
    </section>
  )
}

function getPublicImageUrl(value: string | null): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}
