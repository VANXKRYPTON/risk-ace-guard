-- Fix error-level security issues: PUBLIC_DATA_EXPOSURE and MISSING_RLS
-- Drop the vulnerable policies
DROP POLICY IF EXISTS "Anyone can read their session assessments" ON public.assessment_history;
DROP POLICY IF EXISTS "Users can only delete their own session assessments" ON public.assessment_history;
DROP POLICY IF EXISTS "Anyone can insert assessments" ON public.assessment_history;

-- Create secure SELECT policy that checks session_id from headers
CREATE POLICY "Users can read only their session assessments"
ON public.assessment_history
FOR SELECT
USING (
  session_id = coalesce(
    current_setting('request.headers', true)::json->>'x-session-id',
    ''
  )
);

-- Create secure DELETE policy that checks session_id from headers
CREATE POLICY "Users can delete only their session assessments"
ON public.assessment_history
FOR DELETE
USING (
  session_id = coalesce(
    current_setting('request.headers', true)::json->>'x-session-id',
    ''
  )
);

-- Create secure INSERT policy that verifies session_id matches header
CREATE POLICY "Users can insert their session assessments"
ON public.assessment_history
FOR INSERT
WITH CHECK (
  session_id = coalesce(
    current_setting('request.headers', true)::json->>'x-session-id',
    ''
  )
);