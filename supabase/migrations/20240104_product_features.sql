-- Create PRODUCT FEATURES table
create table if not exists public.product_features (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid references public.companies(id) not null,
    name text not null,
    description text,
    
    -- Feature Stats (Initially assessed by AI)
    market_fit_score int default 0, -- 0 to 100
    complexity_score int default 0, -- 0 to 100 (Higher means harder/slower)
    innovation_score int default 0, -- 0 to 100
    
    -- Development Status
    status text default 'planned', -- 'planned', 'in_progress', 'live', 'killed'
    progress int default 0, -- 0 to 100
    current_week_effort int default 0, -- How many weeks spent so far
    
    -- Feature Type
    feature_type text default 'core', -- 'core', 'growth', 'ux', 'infra', 'ai'
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.product_features enable row level security;

create policy "Users can view own features" on public.product_features
  for select using (
    exists (
      select 1 from public.companies
      where companies.id = product_features.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can insert own features" on public.product_features
  for insert with check (
    exists (
      select 1 from public.companies
      where companies.id = product_features.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can update own features" on public.product_features
  for update using (
    exists (
      select 1 from public.companies
      where companies.id = product_features.company_id
      and companies.owner_id = auth.uid()
    )
  );
