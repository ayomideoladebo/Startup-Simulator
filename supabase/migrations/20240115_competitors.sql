-- COMPETITORS TABLE (Strictly Scoped to Simulation/Company)
create table if not exists public.competitors (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) not null, -- The Simulation Scope
  name text not null,
  niche text not null,
  market_share numeric default 0,
  valuation numeric default 1000000, -- New: for Global 10 ranking
  is_direct_competitor boolean default false, -- New: is it in your niche?
  is_active boolean default true, -- New: for bankrupt/acquired status
  attributes jsonb default '{}'::jsonb, -- AI Personality
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- COMPETITOR ACTIONS TABLE (History of moves)
create table if not exists public.competitor_actions (
  id uuid default uuid_generate_v4() primary key,
  competitor_id uuid references public.competitors(id) not null,
  week_number int not null,
  action_type text not null, -- 'marketing_blitz', 'price_cut', 'feature_launch'
  description text,
  impact_score numeric default 0, -- Effect on user?
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: SEALED UNIVERSE
alter table public.competitors enable row level security;
alter table public.competitor_actions enable row level security;

-- Competitors Policy
drop policy if exists "Users can view own simulation competitors" on public.competitors;
create policy "Users can view own simulation competitors" on public.competitors
  for select using (
    exists (
      select 1 from public.companies
      where companies.id = competitors.company_id
      and companies.owner_id = auth.uid()
    )
  );

drop policy if exists "Users can update own simulation competitors" on public.competitors;
create policy "Users can update own simulation competitors" on public.competitors
  for update using (
    exists (
      select 1 from public.companies
      where companies.id = competitors.company_id
      and companies.owner_id = auth.uid()
    )
  );

drop policy if exists "Users can insert own simulation competitors" on public.competitors;
create policy "Users can insert own simulation competitors" on public.competitors
    for insert with check (
    exists (
      select 1 from public.companies
      where companies.id = competitors.company_id
      and companies.owner_id = auth.uid()
    )
    );

-- Actions Policy
drop policy if exists "Users can view own simulation competitor actions" on public.competitor_actions;
create policy "Users can view own simulation competitor actions" on public.competitor_actions
  for select using (
    exists (
      select 1 from public.competitors
      join public.companies on companies.id = competitors.company_id
      where competitors.id = competitor_actions.competitor_id
      and companies.owner_id = auth.uid()
    )
  );
