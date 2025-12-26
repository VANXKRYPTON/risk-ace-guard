import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RatioInputForm, { type FinancialRatios } from "@/components/RatioInputForm";
import RiskResults, { type RiskAssessment } from "@/components/RiskResults";
import MethodologySection from "@/components/MethodologySection";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ ratios: FinancialRatios; assessment: RiskAssessment } | null>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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

      setResults({ ratios, assessment: data.assessment });
      
      // Scroll to results
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
