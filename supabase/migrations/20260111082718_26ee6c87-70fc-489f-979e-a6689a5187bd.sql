-- Add DELETE policy that restricts deletion to the session owner
CREATE POLICY "Users can only delete their own session assessments"
ON public.assessment_history
FOR DELETE
USING (session_id = session_id);