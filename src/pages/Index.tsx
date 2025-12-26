import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RatioInputForm, { type FinancialRatios } from "@/components/RatioInputForm";
import RiskResults from "@/components/RiskResults";
import MethodologySection from "@/components/MethodologySection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<FinancialRatios | null>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStartAssessment = () => {
    assessmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (ratios: FinancialRatios) => {
    setIsAnalyzing(true);
    
    // Simulate ML model processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setResults(ratios);
    setIsAnalyzing(false);
    
    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setResults(null);
    handleStartAssessment();
  };

  return (
    <>
      <Helmet>
        <title>Business Risk Assessment | Financial Ratio Analysis & ML Classification</title>
        <meta
          name="description"
          content="Advanced business risk assessment tool using financial ratio analysis and Gradient Boosting classification algorithms. Analyze liquidity, profitability, leverage, and efficiency ratios."
        />
        <meta
          name="keywords"
          content="business risk assessment, financial ratio analysis, gradient boosting, machine learning, risk classification, liquidity ratios, profitability ratios"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection onStartAssessment={handleStartAssessment} />
          
          <div ref={assessmentRef}>
            <RatioInputForm onSubmit={handleSubmit} isLoading={isAnalyzing} />
          </div>

          {results && (
            <div ref={resultsRef}>
              <RiskResults ratios={results} onReset={handleReset} />
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
