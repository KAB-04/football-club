create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete restrict,
  full_name text not null,
  slug text not null unique,
  photo_url text,
  jersey_number integer,
  position text not null,
  date_of_birth date,
  nationality text,
  strong_foot text,
  appearances integer not null default 0,
  goals integer not null default 0,
  assists integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint players_jersey_number_positive check (
    jersey_number is null or jersey_number > 0
  ),
  constraint players_appearances_non_negative check (appearances >= 0),
  constraint players_goals_non_negative check (goals >= 0),
  constraint players_assists_non_negative check (assists >= 0),
  constraint players_strong_foot_valid check (
    strong_foot is null or strong_foot in ('Left', 'Right', 'Both')
  )
);

create table public.fixtures (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete restrict,
  opponent_name text not null,
  competition text,
  match_date timestamptz not null,
  venue text,
  home_or_away text not null,
  standfast_score integer,
  opponent_score integer,
  status text not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint fixtures_home_or_away_valid check (
    home_or_away in ('home', 'away')
  ),
  constraint fixtures_status_valid check (
    status in ('scheduled', 'completed', 'postponed', 'cancelled')
  ),
  constraint fixtures_standfast_score_non_negative check (
    standfast_score is null or standfast_score >= 0
  ),
  constraint fixtures_opponent_score_non_negative check (
    opponent_score is null or opponent_score >= 0
  ),
  constraint fixtures_completed_scores_required check (
    (
      status = 'completed'
      and standfast_score is not null
      and opponent_score is not null
    )
    or (
      status <> 'completed'
      and standfast_score is null
      and opponent_score is null
    )
  )
);

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_profiles_role_admin_only check (role = 'admin')
);

create table public.news_articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.admin_profiles(id) on delete restrict,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  cover_image_alt text,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint news_articles_status_valid check (
    status in ('draft', 'published')
  ),
  constraint news_articles_published_at_required check (
    status <> 'published' or published_at is not null
  )
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null,
  media_url text not null,
  thumbnail_url text,
  alt_text text,
  event_date date,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint gallery_items_media_type_valid check (
    media_type in ('photo', 'video')
  )
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  constraint contact_submissions_status_valid check (
    status in ('new', 'read', 'resolved')
  )
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index players_team_id_idx on public.players(team_id);
create index players_is_active_idx on public.players(is_active);
create index players_position_idx on public.players(position);

create index fixtures_team_id_idx on public.fixtures(team_id);
create index fixtures_match_date_idx on public.fixtures(match_date);
create index fixtures_status_idx on public.fixtures(status);

create index news_articles_status_idx on public.news_articles(status);
create index news_articles_published_at_idx on public.news_articles(published_at);

create index gallery_items_is_published_idx on public.gallery_items(is_published);
create index gallery_items_media_type_idx on public.gallery_items(media_type);

create index contact_submissions_status_idx on public.contact_submissions(status);
create index contact_submissions_created_at_idx on public.contact_submissions(created_at);

create trigger set_teams_updated_at
before update on public.teams
for each row
execute function public.set_updated_at();

create trigger set_players_updated_at
before update on public.players
for each row
execute function public.set_updated_at();

create trigger set_fixtures_updated_at
before update on public.fixtures
for each row
execute function public.set_updated_at();

create trigger set_admin_profiles_updated_at
before update on public.admin_profiles
for each row
execute function public.set_updated_at();

create trigger set_news_articles_updated_at
before update on public.news_articles
for each row
execute function public.set_updated_at();

create trigger set_gallery_items_updated_at
before update on public.gallery_items
for each row
execute function public.set_updated_at();

create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();
