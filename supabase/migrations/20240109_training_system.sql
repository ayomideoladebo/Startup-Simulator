-- Add training tracking columns to employees table
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS is_training BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS training_program_name TEXT,
ADD COLUMN IF NOT EXISTS training_remaining_days INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS training_pending_skill INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS training_pending_morale INT DEFAULT 0;

-- Comment on columns for clarity
COMMENT ON COLUMN public.employees.is_training IS 'Whether the employee is currently in a training program';
COMMENT ON COLUMN public.employees.training_remaining_days IS 'Days remaining until training is complete. Decrements by 7 each week.';
