import 'server-only'

import { createClient } from '@/lib/supabase/server'

export type DashboardMetric = number | null

export type DashboardStats = {
  activePlayers: DashboardMetric
  upcomingFixtures: DashboardMetric
  publishedArticles: DashboardMetric
  unreadMessages: DashboardMetric
}

async function getCount(
  label: string,
  query: PromiseLike<{ count: number | null; error: unknown }>,
): Promise<DashboardMetric> {
  const { count, error } = await query

  if (error || count === null) {
    console.error(`[admin-dashboard:${label}] count unavailable`)
    return null
  }

  return count
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()
  const now = new Date().toISOString()

  const [activePlayers, upcomingFixtures, publishedArticles, unreadMessages] =
    await Promise.all([
      getCount(
        'active-players',
        supabase.from('players').select('*', { count: 'exact', head: true }).eq('is_active', true),
      ),
      getCount(
        'upcoming-fixtures',
        supabase
          .from('fixtures')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'scheduled')
          .gte('match_date', now),
      ),
      getCount(
        'published-articles',
        supabase
          .from('news_articles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published'),
      ),
      getCount(
        'unread-messages',
        supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new'),
      ),
    ])

  return { activePlayers, upcomingFixtures, publishedArticles, unreadMessages }
}
