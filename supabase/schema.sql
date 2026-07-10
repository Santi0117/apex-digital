-- Ejecutá esto en Supabase → SQL Editor → New query
--
-- Dos tablas separadas:
--   contact_submissions → formulario "Cotizar / Contacto"
--   appointments        → formulario "Agendar cita" (fecha, hora, modalidad, etc.)

-- ─── Formulario de contacto / cotización ───────────────────────────────────
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  phone text,
  service text,
  interest text not null,
  budget text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- ─── Formulario de agendar cita ────────────────────────────────────────────
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  phone_country_code text not null default '+506',
  phone_number text not null,
  phone text not null,
  scheduled_at timestamptz not null unique,
  modality text not null default 'virtual'
    check (modality in ('virtual', 'in_person')),
  location text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists appointments_scheduled_at_idx
  on public.appointments (scheduled_at asc);

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

alter table public.appointments enable row level security;

-- ─── Migración si las tablas ya existen ─────────────────────────────────────
-- alter table public.contact_submissions add column if not exists service text;
-- alter table public.contact_submissions add column if not exists phone text;
--
-- alter table public.appointments add column if not exists phone text;
-- alter table public.appointments add column if not exists phone_country_code text default '+506';
-- alter table public.appointments add column if not exists phone_number text;
-- alter table public.appointments add column if not exists modality text default 'virtual';
-- alter table public.appointments add column if not exists location text;
-- update public.appointments set phone_number = regexp_replace(phone, '^\+\d+', '') where phone_number is null and phone is not null;
-- update public.appointments set phone_country_code = substring(phone from '^\+\d+') where phone_country_code is null and phone is not null;
