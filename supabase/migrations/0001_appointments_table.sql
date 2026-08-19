-- One table behind both forms.
--
-- Only the details needed to call someone back are kept: who they are and how
-- to reach them. The doctor, department and reason travel with the submission
-- to the clinic's notification email and are not persisted — the clinic works
-- from its inbox, so storing them here would keep a copy nothing reads.

create table if not exists public.appointments (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text not null,
  created_at timestamptz not null default now()
);


create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

-- No policies, deliberately: nothing reaches this table with the anon key. The
-- route handler writes through the secret key in src/lib/supabase/server.ts,
-- which bypasses RLS, and nothing else reads the rows.
alter table public.appointments enable row level security;
