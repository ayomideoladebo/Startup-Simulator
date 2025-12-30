-- Add estimated_days to product_features
alter table public.product_features
add column if not exists estimated_days int default 14;

-- Comment
comment on column public.product_features.estimated_days is 'Exact number of days estimated for completion. Used to calculate daily progress.';
