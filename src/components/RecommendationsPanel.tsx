import { Lightbulb, TrendingUp, Shield, AlertCircle } from "lucide-react";
import type { RiskAssessment } from "./RiskResults";

interface RecommendationsPanelProps {
  assessment: RiskAssessment;
}

const RecommendationsPanel = ({ assessment }: RecommendationsPanelProps) => {
  const recommendations = generateRecommendations(assessment);

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-semibold">AI Recommendations</h3>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              rec.priority === "critical" ? "bg-risk-high/20 text-risk-high" :
              rec.priority === "important" ? "bg-risk-medium/20 text-risk-medium" :
              "bg-risk-low/20 text-risk-low"
            }`}>
              {rec.priority === "critical" ? <AlertCircle className="w-4 h-4" /> :
               rec.priority === "important" ? <Shield className="w-4 h-4" /> :
               <TrendingUp className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">{rec.title}</h4>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  rec.priority === "critical" ? "bg-risk-high/10 text-risk-high" :
                  rec.priority === "important" ? "bg-risk-medium/10 text-risk-medium" :
                  "bg-risk-low/10 text-risk-low"
                }`}>{rec.priority}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface Recommendation {
  title: string;
  description: string;
  priority: "critical" | "important" | "opportunity";
}

function generateRecommendations(assessment: RiskAssessment): Recommendation[] {
  const recs: Recommendation[] = [];
  const scores = assessment.categoryScores;

  if (scores.liquidity < 40) {
    recs.push({ title: "Improve Liquidity Position", description: "Current liquidity ratios indicate difficulty meeting short-term obligations. Consider renegotiating payment terms, reducing inventory, or securing a revolving credit line.", priority: "critical" });
  }
  if (scores.profitability < 40) {
    recs.push({ title: "Address Profitability Decline", description: "Low profitability scores suggest margin compression. Analyze cost structure, review pricing strategy, and identify underperforming business segments.", priority: "critical" });
  }
  if (scores.leverage < 40) {
    recs.push({ title: "Reduce Debt Exposure", description: "High leverage ratios increase financial risk. Prioritize debt reduction through retained earnings, consider equity financing, or restructure existing debt.", priority: "critical" });
  }
  if (scores.efficiency < 40) {
    recs.push({ title: "Optimize Operational Efficiency", description: "Low efficiency scores indicate poor asset utilization. Review inventory management, accelerate receivables collection, and optimize asset allocation.", priority: "important" });
  }

  if (assessment.altmanZScore !== undefined && assessment.altmanZScore < 1.81) {
    recs.push({ title: "Bankruptcy Risk Detected (Z-Score)", description: `Altman Z-Score of ${assessment.altmanZScore.toFixed(2)} falls in the distress zone. Immediate financial restructuring and professional advisory consultation recommended.`, priority: "critical" });
  }

  if (scores.liquidity >= 65 && scores.profitability >= 65) {
    recs.push({ title: "Leverage Strong Position for Growth", description: "Strong liquidity and profitability provide a foundation for strategic investments, market expansion, or value-creating acquisitions.", priority: "opportunity" });
  }
  if (scores.efficiency >= 65) {
    recs.push({ title: "Maintain Operational Excellence", description: "Strong efficiency metrics are a competitive advantage. Continue investing in process optimization and technology infrastructure.", priority: "opportunity" });
  }

  // Ensure at least 3 recommendations
  if (recs.length < 3) {
    if (!recs.find(r => r.title.includes("Diversify"))) {
      recs.push({ title: "Diversify Revenue Streams", description: "Reduce dependency on primary revenue sources. Explore adjacent markets, subscription models, or strategic partnerships for stability.", priority: "important" });
    }
  }

  return recs.slice(0, 5);
}

export default RecommendationsPanel;
