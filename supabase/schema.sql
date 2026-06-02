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

-- Sin políticas públicas: solo el service role (servidor) puede insertar/leer.
