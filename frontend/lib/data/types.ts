import type { Tables } from '@/types/database'

export type Team = Tables<'teams'>
export type Player = Tables<'players'>
export type Fixture = Tables<'fixtures'>
export type NewsArticle = Tables<'news_articles'>
export type GalleryItem = Tables<'gallery_items'>
export type SiteSetting = Tables<'site_settings'>

export type TeamSummary = Pick<Team, 'id' | 'name' | 'slug'>
export type PlayerWithTeam = Player & { team: TeamSummary }
export type FixtureWithTeam = Fixture & { team: TeamSummary }
