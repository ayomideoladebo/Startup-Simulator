alter table public.companies 
add column if not exists last_payroll_turn int default 0,
add column if not exists payroll_due boolean default false;
