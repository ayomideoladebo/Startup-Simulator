-- Add burnout and vacation tracking to employees
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS burnout int DEFAULT 0 CHECK (burnout >= 0 AND burnout <= 100),
ADD COLUMN IF NOT EXISTS vacation_remaining_days int DEFAULT 0;

-- Add current_day to game_state for daily tracking
ALTER TABLE public.game_state
ADD COLUMN IF NOT EXISTS current_day int DEFAULT 1;
