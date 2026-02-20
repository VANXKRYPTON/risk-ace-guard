import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RatioInputForm, { type FinancialRatios } from "@/components/RatioInputForm";
import RiskResults, { type RiskAssessment } from "@/components/RiskResults";
import MethodologySection from "@/components/MethodologySection";
import Footer from "@/components/Footer";
import AssessmentHistory from "@/components/AssessmentHistory";
import { supabase } from "@/integrations/supabase/client";
import { createSessionSupabase } from "@/hooks/useSessionSupabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useSessionId } from "@/hooks/useSessionId";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2, LogIn, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ ratios: FinancialRatios; assessment: RiskAssessment } | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const assessmentRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const sessionId = useSessionId();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
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

      // Save to history
      const insertData = {
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
        company_name: companyName || null,
      };

      if (user) {
        // Save with user_id for authenticated users
        await supabase
          .from("assessment_history")
          .insert({ ...insertData, user_id: user.id, session_id: sessionId || "authenticated" });
      } else if (sessionId) {
        // Fallback to session-based saving
        const sessionSupabase = createSessionSupabase(sessionId);
        await sessionSupabase
          .from("assessment_history")
          .insert({ ...insertData, session_id: sessionId });
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
      <title>Business Risk Assessment | Financial Ratio Analysis & Ensemble ML Classification</title>
      <meta
        name="description"
        content="Advanced business risk assessment tool using financial ratio analysis, Gradient Boosting classification, and Altman Z-Score ensemble models. Analyze liquidity, profitability, leverage, and efficiency ratios."
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection onStartAssessment={handleStartAssessment} />
          
          <div ref={assessmentRef}>
            {user ? (
              <>
                {/* Company Name Input */}
                <div className="container mx-auto px-4 max-w-4xl mb-6">
                  <div className="glass rounded-xl p-4 flex items-center gap-4">
                    <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Enter company name for this assessment"
                        className="bg-secondary/50 border-border/50 mt-1"
                      />
                    </div>
                  </div>
                </div>

                <RatioInputForm onSubmit={handleSubmit} isLoading={isAnalyzing} />
              </>
            ) : (
              <div className="container mx-auto px-4 max-w-2xl py-16">
                <div className="glass rounded-2xl p-10 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Sign In Required</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Create a free account or sign in to access the financial ratio analysis tool and run risk assessments.
                  </p>
                  <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="gap-2">
                    <LogIn className="w-5 h-5" />
                    Sign In to Continue
                  </Button>
                </div>
              </div>
            )}
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

      {/* Auth Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Authentication Required
            </DialogTitle>
            <DialogDescription>
              You need to sign in or create a free account before you can access the financial ratio analysis tool.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <Button variant="hero" onClick={() => { setShowAuthDialog(false); navigate("/auth"); }} className="gap-2">
              <LogIn className="w-5 h-5" />
              Go to Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
