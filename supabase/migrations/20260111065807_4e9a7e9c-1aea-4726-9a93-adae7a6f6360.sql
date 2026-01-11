-- Create assessment history table
CREATE TABLE public.assessment_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Company/session identifier (no auth required)
  session_id TEXT NOT NULL,
  company_name TEXT,
  
  -- Financial Ratios
  current_ratio NUMERIC NOT NULL,
  quick_ratio NUMERIC NOT NULL,
  cash_ratio NUMERIC NOT NULL,
  gross_profit_margin NUMERIC NOT NULL,
  net_profit_margin NUMERIC NOT NULL,
  return_on_assets NUMERIC NOT NULL,
  return_on_equity NUMERIC NOT NULL,
  debt_to_equity NUMERIC NOT NULL,
  debt_ratio NUMERIC NOT NULL,
  interest_coverage NUMERIC NOT NULL,
  asset_turnover NUMERIC NOT NULL,
  inventory_turnover NUMERIC NOT NULL,
  receivables_turnover NUMERIC NOT NULL,
  
  -- Assessment Results
  overall_risk TEXT NOT NULL CHECK (overall_risk IN ('low', 'medium', 'high')),
  risk_score INTEGER NOT NULL,
  confidence INTEGER NOT NULL,
  liquidity_score INTEGER NOT NULL,
  profitability_score INTEGER NOT NULL,
  leverage_score INTEGER NOT NULL,
  efficiency_score INTEGER NOT NULL,
  factors JSONB NOT NULL DEFAULT '[]'
);

-- Enable RLS
ALTER TABLE public.assessment_history ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public tool)
CREATE POLICY "Anyone can insert assessments" 
ON public.assessment_history 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read assessments by session_id
CREATE POLICY "Anyone can read their session assessments" 
ON public.assessment_history 
FOR SELECT 
USING (true);

-- Create index for faster session lookups
CREATE INDEX idx_assessment_history_session ON public.assessment_history(session_id);
CREATE INDEX idx_assessment_history_created ON public.assessment_history(created_at DESC);