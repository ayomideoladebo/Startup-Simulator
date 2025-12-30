-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
  
create policy "Users can insert own profile" on public.profiles
    for insert with check (auth.uid() = id);


-- COMPANIES TABLE
create table if not exists public.companies (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  name text not null,
  niche text not null, -- 'Fintech', 'E-commerce', etc.
  stage text default 'Pre-Seed',
  cash numeric default 100000, -- Initial Funding
  branding jsonb default '{}'::jsonb, -- Logo, Colors
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.companies enable row level security;

create policy "Users can view own company" on public.companies
  for select using (auth.uid() = owner_id);

create policy "Users can update own company" on public.companies
  for update using (auth.uid() = owner_id);

create policy "Users can insert own company" on public.companies
    for insert with check (auth.uid() = owner_id);


-- GAME STATE TABLE
create table if not exists public.game_state (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) not null,
  current_week int default 1,
  current_month int default 1,
  
  -- Core Stats Snapshot (for easy access without joining everything)
  mrr numeric default 0,
  customers int default 0,
  churn_rate numeric default 0,
  team_morale int default 50,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.game_state enable row level security;

create policy "Users can view own game state" on public.game_state
  for select using (
    exists (
      select 1 from public.companies
      where companies.id = game_state.company_id
      and companies.owner_id = auth.uid()
    )
  );

-- MARKET TRENDS TABLE (Global or Niche specific)
create table if not exists public.market_trends (
  id uuid default uuid_generate_v4() primary key,
  niche text not null,
  week_number int not null,
  hype_score int default 50, -- 0-100
  regulation_intensity int default 10,
  competition_density int default 50,
  market_event_summary text, -- "Tech crunch reports AI boom"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.market_trends enable row level security;
create policy "Authenticated users can view market trends" on public.market_trends
  for select to authenticated using (true);
