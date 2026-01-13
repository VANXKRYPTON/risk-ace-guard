import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RatioInputForm, { type FinancialRatios } from "@/components/RatioInputForm";
import RiskResults, { type RiskAssessment } from "@/components/RiskResults";
import MethodologySection from "@/components/MethodologySection";
import Footer from "@/components/Footer";
import AssessmentHistory from "@/components/AssessmentHistory";
import { supabase } from "@/integrations/supabase/client";
import { createSessionSupabase } from "@/hooks/useSessionSupabase";
import { toast } from "sonner";
import { useSessionId } from "@/hooks/useSessionId";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ ratios: FinancialRatios; assessment: RiskAssessment } | null>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const sessionId = useSessionId();

  const handleStartAssessment = () => {
    assessmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (ratios: FinancialRatios) => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('predict-risk', {
        body: { ratios }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error('Failed to analyze risk. Please try again.');
        return;
      }

      if (data.error) {
        console.error('API error:', data.error);
        toast.error(data.error);
        return;
      }

      const assessment = data.assessment as RiskAssessment;
      setResults({ ratios, assessment });

      // Save to history - use session Supabase client with x-session-id header for RLS verification
      if (sessionId) {
        const sessionSupabase = createSessionSupabase(sessionId);
        await sessionSupabase
          .from("assessment_history")
          .insert({
            session_id: sessionId,
            current_ratio: ratios.currentRatio,
            quick_ratio: ratios.quickRatio,
            cash_ratio: ratios.cashRatio,
            gross_profit_margin: ratios.grossProfitMargin,
            net_profit_margin: ratios.netProfitMargin,
            return_on_assets: ratios.returnOnAssets,
            return_on_equity: ratios.returnOnEquity,
            debt_to_equity: ratios.debtToEquity,
            debt_ratio: ratios.debtRatio,
            interest_coverage: ratios.interestCoverage,
            asset_turnover: ratios.assetTurnover,
            inventory_turnover: ratios.inventoryTurnover,
            receivables_turnover: ratios.receivablesTurnover,
            overall_risk: assessment.overallRisk,
            risk_score: assessment.riskScore,
            confidence: assessment.confidence,
            liquidity_score: assessment.categoryScores.liquidity,
            profitability_score: assessment.categoryScores.profitability,
            leverage_score: assessment.categoryScores.leverage,
            efficiency_score: assessment.categoryScores.efficiency,
            factors: assessment.factors,
          });
      }
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error('Request error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    handleStartAssessment();
  };

  const handleLoadAssessment = (ratios: FinancialRatios, assessment: RiskAssessment) => {
    setResults({ ratios, assessment });
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <title>Business Risk Assessment | Financial Ratio Analysis & ML Classification</title>
      <meta
        name="description"
        content="Advanced business risk assessment tool using financial ratio analysis and Gradient Boosting classification algorithms. Analyze liquidity, profitability, leverage, and efficiency ratios."
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection onStartAssessment={handleStartAssessment} />
          
          {/* History Button */}
          {sessionId && (
            <div className="container mx-auto px-4 flex justify-center -mt-8 mb-8">
              <AssessmentHistory sessionId={sessionId} onLoadAssessment={handleLoadAssessment} />
            </div>
          )}
          
          <div ref={assessmentRef}>
            <RatioInputForm onSubmit={handleSubmit} isLoading={isAnalyzing} />
          </div>

          {results && (
            <div ref={resultsRef}>
              <RiskResults 
                ratios={results.ratios} 
                assessment={results.assessment}
                onReset={handleReset} 
              />
            </div>
          )}

          <div id="methodology">
            <MethodologySection />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;