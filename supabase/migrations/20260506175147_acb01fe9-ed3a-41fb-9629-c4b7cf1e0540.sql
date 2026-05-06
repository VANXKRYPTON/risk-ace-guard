DROP POLICY IF EXISTS "Users can read only their session assessments" ON public.assessment_history;
DROP POLICY IF EXISTS "Users can insert their session assessments" ON public.assessment_history;
DROP POLICY IF EXISTS "Users can delete only their session assessments" ON public.assessment_history;