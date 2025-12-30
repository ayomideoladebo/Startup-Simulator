alter table public.product_features 
add column if not exists maintenance_cost int default 0,
add column if not exists impact_analysis jsonb default '{}'::jsonb;
