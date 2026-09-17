insert into public.teams (name, slug)
values
  ('U10', 'u10'),
  ('U13', 'u13'),
  ('U15', 'u15'),
  ('U17', 'u17')
on conflict (slug) do update
set
  name = excluded.name,
  updated_at = now();

insert into public.site_settings (key, value)
values
  ('club_email', 'standfastfc@gmail.com'),
  ('club_location', 'Ashaiman, Ghana')
on conflict (key) do update
set
  value = excluded.value,
  updated_at = now();
