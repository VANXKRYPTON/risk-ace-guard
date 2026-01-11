import { useEffect, useState } from "react";
import { History, Trash2, Eye, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { FinancialRatios } from "./RatioInputForm";
import type { RiskAssessment, RiskLevel } from "./RiskResults";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface HistoryItem {
  id: string;
  created_at: string;
  company_name: string | null;
  overall_risk: RiskLevel;
  risk_score: number;
  confidence: number;
  liquidity_score: number;
  profitability_score: number;
  leverage_score: number;
  efficiency_score: number;
  factors: { name: string; impact: string; description: string }[];
  current_ratio: number;
  quick_ratio: number;
  cash_ratio: number;
  gross_profit_margin: number;
  net_profit_margin: number;
  return_on_assets: number;
  return_on_equity: number;
  debt_to_equity: number;
  debt_ratio: number;
  interest_coverage: number;
  asset_turnover: number;
  inventory_turnover: number;
  receivables_turnover: number;
}

interface AssessmentHistoryProps {
  sessionId: string;
  onLoadAssessment: (ratios: FinancialRatios, assessment: RiskAssessment) => void;
}

const AssessmentHistory = ({ sessionId, onLoadAssessment }: AssessmentHistoryProps) => {
  // sessionId is used for ownership verification on delete operations
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("assessment_history")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      const typedData = (data || []).map((item: any) => ({
        ...item,
        factors: Array.isArray(item.factors) ? item.factors : [],
      })) as HistoryItem[];
      setHistory(typedData);
    } catch (err) {
      console.error("Error fetching history:", err);
      toast.error("Failed to load history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen, sessionId]);

  const handleDelete = async (id: string) => {
    try {
      // Include session_id verification to ensure users can only delete their own assessments
      const { error } = await supabase
        .from("assessment_history")
        .delete()
        .eq("id", id)
        .eq("session_id", sessionId);

      if (error) throw error;
      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast.success("Assessment deleted");
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Failed to delete");
    }
  };

  const handleLoad = (item: HistoryItem) => {
    const ratios: FinancialRatios = {
      currentRatio: item.current_ratio,
      quickRatio: item.quick_ratio,
      cashRatio: item.cash_ratio,
      grossProfitMargin: item.gross_profit_margin,
      netProfitMargin: item.net_profit_margin,
      returnOnAssets: item.return_on_assets,
      returnOnEquity: item.return_on_equity,
      debtToEquity: item.debt_to_equity,
      debtRatio: item.debt_ratio,
      interestCoverage: item.interest_coverage,
      assetTurnover: item.asset_turnover,
      inventoryTurnover: item.inventory_turnover,
      receivablesTurnover: item.receivables_turnover,
    };

    const assessment: RiskAssessment = {
      overallRisk: item.overall_risk,
      riskScore: item.risk_score,
      confidence: item.confidence,
      categoryScores: {
        liquidity: item.liquidity_score,
        profitability: item.profitability_score,
        leverage: item.leverage_score,
        efficiency: item.efficiency_score,
      },
      factors: item.factors.map(f => ({
        name: f.name,
        impact: f.impact as "positive" | "negative" | "neutral",
        description: f.description,
      })),
    };

    onLoadAssessment(ratios, assessment);
    setIsOpen(false);
    toast.success("Assessment loaded");
  };

  const getRiskIcon = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="w-4 h-4 text-risk-low" />;
      case "medium":
        return <AlertCircle className="w-4 h-4 text-risk-medium" />;
      case "high":
        return <AlertTriangle className="w-4 h-4 text-risk-high" />;
    }
  };

  const getRiskBadgeClass = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return "bg-risk-low/10 text-risk-low border-risk-low/30";
      case "medium":
        return "bg-risk-medium/10 text-risk-medium border-risk-medium/30";
      case "high":
        return "bg-risk-high/10 text-risk-high border-risk-high/30";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="w-4 h-4" />
          History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Assessment History
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No assessments yet</p>
            <p className="text-sm">Run an assessment to see it here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getRiskIcon(item.overall_risk)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {item.company_name || "Unnamed Assessment"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getRiskBadgeClass(item.overall_risk)}`}>
                        {item.overall_risk.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Score: {item.risk_score} • {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLoad(item)}
                    title="Load assessment"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="text-destructive hover:text-destructive"
                    title="Delete assessment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentHistory;
