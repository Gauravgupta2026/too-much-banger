create table if not exists public.reactions (
  post_id text not null,
  reaction text not null,
  count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (post_id, reaction)
);

create table if not exists public.interest_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  note text,
  attendee_status text,
  created_at timestamptz not null default now()
);

create or replace function public.increment_reaction(
  target_post_id text,
  target_reaction text
)
returns table(post_id text, reaction text, count integer)
language plpgsql
as $$
begin
  insert into public.reactions as r (post_id, reaction, count)
  values (target_post_id, target_reaction, 1)
  on conflict (post_id, reaction)
  do update set
    count = r.count + 1,
    updated_at = now();

  return query
    select r.post_id, r.reaction, r.count
    from public.reactions r
    where r.post_id = target_post_id and r.reaction = target_reaction;
end;
$$;

alter table public.reactions enable row level security;
alter table public.interest_submissions enable row level security;

create policy "Public can read reaction counts"
on public.reactions for select
to anon
using (true);

create policy "Service role manages reactions"
on public.reactions for all
to service_role
using (true)
with check (true);

create policy "Service role manages interest submissions"
on public.interest_submissions for all
to service_role
using (true)
with check (true);
