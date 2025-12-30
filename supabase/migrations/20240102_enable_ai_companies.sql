-- Allow companies to be owned by 'AI' (NULL owner_id)
alter table public.companies alter column owner_id drop not null;

-- Add a flag to easily distinguish Player vs AI
alter table public.companies add column is_player boolean default false;

-- Add a 'description' and 'stats' to companies for AI persona data
alter table public.companies add column description text;
alter table public.companies add column ai_persona jsonb default '{}'::jsonb; -- { "aggression": 80, "innovation": 20 }

-- MARKET SEGMENTS / RIVALS
-- We can store rivals directly in 'companies' table now.
