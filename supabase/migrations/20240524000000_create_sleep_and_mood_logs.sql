-- Create sleep_logs table
CREATE TABLE public.sleep_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    duration_hours NUMERIC(4,2) NOT NULL CHECK (duration_hours >= 0),
    quality_rating INTEGER NOT NULL CHECK (quality_rating >= 1 AND quality_rating <= 5),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow individual user access to their own sleep logs" 
ON public.sleep_logs 
FOR ALL 
USING (auth.uid() = user_id);

-- Create mood_logs table
CREATE TABLE public.mood_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    mood_rating INTEGER NOT NULL CHECK (mood_rating >= 1 AND mood_rating <= 5),
    notes TEXT,
    recorded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow individual user access to their own mood logs" 
ON public.mood_logs 
FOR ALL 
USING (auth.uid() = user_id);

-- Reminder: These migrations need to be applied in your Supabase environment.
-- You can do this using the Supabase CLI:
-- 1. Ensure you are logged in: `supabase login`
-- 2. Link your project: `supabase link --project-ref YOUR_PROJECT_REF`
-- 3. Push the new migration: `supabase db push`
-- Or apply via the Supabase Dashboard SQL Editor.
