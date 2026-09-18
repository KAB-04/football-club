import 'server-only'

import { createClient } from '@/lib/supabase/server'

import { throwPublicDataError } from './errors'
import type { NewsArticle } from './types'

const NEWS_COLUMNS = `
  id, author_id, title, slug, excerpt, content, cover_image_url,
  cover_image_alt, status, published_at, created_at, updated_at
`

export async function getPublishedNews(limit?: number): Promise<NewsArticle[]> {
  const supabase = await createClient()
  let query = supabase
    .from('news_articles')
    .select(NEWS_COLUMNS)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (limit !== undefined) {
    query = query.limit(Math.max(1, Math.floor(limit)))
  }

  const { data, error } = await query
  if (error) throwPublicDataError('news', error)
  return data
}

export async function getPublishedArticleBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news_articles')
    .select(NEWS_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) throwPublicDataError('news article', error)
  return data
}
