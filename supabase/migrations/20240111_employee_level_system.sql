-- Add level and experience tracking to employees
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS days_employed INTEGER DEFAULT 0;

-- Update existing employees with initial values based on their salary (higher salary = higher starting level)
UPDATE public.employees 
SET 
    level = GREATEST(1, LEAST(10, (salary / 20000)::INTEGER)),
    experience = FLOOR(RANDOM() * 50)::INTEGER,
    days_employed = FLOOR(RANDOM() * 30)::INTEGER
WHERE level IS NULL OR level = 0;
