-- Ejecutá esto en Supabase → SQL Editor → New query

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  interest text not null,
  budget text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- Citas agendadas desde el calendario del sitio
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  scheduled_at timestamptz not null unique,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists appointments_scheduled_at_idx
  on public.appointments (scheduled_at asc);

alter table public.appointments enable row level security;
