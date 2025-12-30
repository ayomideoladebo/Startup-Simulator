alter table public.game_state 
add column if not exists turn_count int default 1;
