create table if not exists public.investor_inquiries (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) not null,
  investor_name text not null,
  initials text, -- e.g. "NV"
  color text, -- e.g. "purple"
  
  -- VC, Angel, etc.
  investor_type text default 'VC',
  
  -- 'new', 'offer', 'negotiating', 'replied', 'passed'
  status text default 'new',
  
  message text,
  offer_details jsonb default '{}'::jsonb, -- Store valuation, equity, etc.
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.investor_inquiries enable row level security;

create policy "Users can view own company inquiries" on public.investor_inquiries
  for select using (
    exists (
      select 1 from public.companies
      where companies.id = investor_inquiries.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can update own company inquiries" on public.investor_inquiries
  for update using (
    exists (
      select 1 from public.companies
      where companies.id = investor_inquiries.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can insert own company inquiries" on public.investor_inquiries
    for insert with check (
    exists (
      select 1 from public.companies
      where companies.id = investor_inquiries.company_id
      and companies.owner_id = auth.uid()
    )
    );
