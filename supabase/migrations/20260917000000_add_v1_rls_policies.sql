create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role = 'admin'
      and is_active = true
  );
$$;

revoke all on function public.is_active_admin() from public;
grant execute on function public.is_active_admin() to authenticated;

alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.fixtures enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.news_articles enable row level security;
alter table public.gallery_items enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.site_settings enable row level security;

revoke all on table
  public.teams,
  public.players,
  public.fixtures,
  public.admin_profiles,
  public.news_articles,
  public.gallery_items,
  public.contact_submissions,
  public.site_settings
from anon, authenticated;

grant select on table
  public.teams,
  public.players,
  public.fixtures,
  public.news_articles,
  public.gallery_items,
  public.site_settings
to anon;

grant select, insert, update, delete on table
  public.teams,
  public.players,
  public.fixtures,
  public.news_articles,
  public.gallery_items,
  public.site_settings
to authenticated;

grant select on table public.admin_profiles to authenticated;
grant select, delete on table public.contact_submissions to authenticated;
grant update (status) on table public.contact_submissions to authenticated;

create policy "Public can read teams"
on public.teams
for select
to anon, authenticated
using (true);

create policy "Active admins can manage teams"
on public.teams
for all
to authenticated
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "Public can read active players"
on public.players
for select
to anon, authenticated
using (is_active = true);

create policy "Active admins can manage players"
on public.players
for all
to authenticated
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "Public can read fixtures"
on public.fixtures
for select
to anon, authenticated
using (true);

create policy "Active admins can manage fixtures"
on public.fixtures
for all
to authenticated
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "Active admins can read admin profiles"
on public.admin_profiles
for select
to authenticated
using (public.is_active_admin());

create policy "Public can read published news articles"
on public.news_articles
for select
to anon, authenticated
using (status = 'published');

create policy "Active admins can manage news articles"
on public.news_articles
for all
to authenticated
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "Public can read published gallery items"
on public.gallery_items
for select
to anon, authenticated
using (is_published = true);

create policy "Active admins can manage gallery items"
on public.gallery_items
for all
to authenticated
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "Active admins can read contact submissions"
on public.contact_submissions
for select
to authenticated
using (public.is_active_admin());

create policy "Active admins can update contact submissions"
on public.contact_submissions
for update
to authenticated
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "Active admins can delete contact submissions"
on public.contact_submissions
for delete
to authenticated
using (public.is_active_admin());

create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

create policy "Active admins can manage site settings"
on public.site_settings
for all
to authenticated
using (public.is_active_admin())
with check (public.is_active_admin());
