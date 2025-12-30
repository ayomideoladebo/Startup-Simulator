-- Create EMPLOYEES table
create table if not exists public.employees (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid references public.companies(id) not null,
    name text not null,
    role text not null, -- 'Developer', 'Designer', 'Marketer', 'PM'
    avatar_url text,
    salary int not null, -- Annual Salary
    morale int default 100, -- 0 to 100
    skill_speed int default 50, -- 0 to 100
    skill_quality int default 50, -- 0 to 100
    traits jsonb default '[]'::jsonb, -- Array of strings e.g. ["Hard Worker"]
    hired_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create JOB CANDIDATES table
create table if not exists public.job_candidates (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid references public.companies(id) not null,
    name text not null,
    role text not null,
    avatar_url text,
    salary_ask int not null,
    skill_speed int default 50,
    skill_quality int default 50,
    traits jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Employees
alter table public.employees enable row level security;

create policy "Users can view own employees" on public.employees
  for select using (
    exists (
      select 1 from public.companies
      where companies.id = employees.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can update own employees" on public.employees
  for update using (
    exists (
      select 1 from public.companies
      where companies.id = employees.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can insert own employees" on public.employees
  for insert with check (
    exists (
      select 1 from public.companies
      where companies.id = employees.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can delete own employees" on public.employees
  for delete using (
    exists (
      select 1 from public.companies
      where companies.id = employees.company_id
      and companies.owner_id = auth.uid()
    )
  );

-- RLS for Job Candidates
alter table public.job_candidates enable row level security;

create policy "Users can view own candidates" on public.job_candidates
  for select using (
    exists (
      select 1 from public.companies
      where companies.id = job_candidates.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can insert own candidates" on public.job_candidates
  for insert with check (
    exists (
      select 1 from public.companies
      where companies.id = job_candidates.company_id
      and companies.owner_id = auth.uid()
    )
  );

create policy "Users can delete own candidates" on public.job_candidates
  for delete using (
    exists (
      select 1 from public.companies
      where companies.id = job_candidates.company_id
      and companies.owner_id = auth.uid()
    )
  );
