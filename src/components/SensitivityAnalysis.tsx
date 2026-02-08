import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Activity } from "lucide-react";
import type { FinancialRatios } from "./RatioInputForm";
import type { RiskAssessment } from "./RiskResults";

interface SensitivityAnalysisProps {
  ratios: FinancialRatios;
  assessment: RiskAssessment;
}

interface SensitivityItem {
  name: string;
  impact: number;
  direction: "positive" | "negative" | "neutral";
}

const SensitivityAnalysis = ({ ratios, assessment }: SensitivityAnalysisProps) => {
  const sensitivities = calculateSensitivity(ratios, assessment);

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Feature Importance Analysis</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        Estimated contribution of each financial ratio category to the overall risk score (SHAP-inspired attribution)
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sensitivities} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis
              type="number"
              domain={[-50, 50]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              width={130}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value > 0 ? "+" : ""}${value} pts`, "Impact"]}
            />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
              {sensitivities.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.impact >= 0 ? "hsl(var(--risk-low))" : "hsl(var(--risk-high))"}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border/30">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Interpretation:</strong> Positive values indicate the ratio contributes to a healthier (lower risk) score.
          Negative values indicate the ratio is dragging the score down and represents a risk area requiring attention.
        </p>
      </div>
    </div>
  );
};

function calculateSensitivity(ratios: FinancialRatios, assessment: RiskAssessment): SensitivityItem[] {
  const scores = assessment.categoryScores;
  const baselineAvg = (scores.liquidity + scores.profitability + scores.leverage + scores.efficiency) / 4;

  const items: SensitivityItem[] = [
    {
      name: "Current Ratio",
      impact: Math.round((ratios.currentRatio >= 1.5 ? 1 : -1) * Math.abs(scores.liquidity - 50) * 0.35),
      direction: ratios.currentRatio >= 1.5 ? "positive" : "negative",
    },
    {
      name: "Quick Ratio",
      impact: Math.round((ratios.quickRatio >= 1.0 ? 1 : -1) * Math.abs(scores.liquidity - 50) * 0.25),
      direction: ratios.quickRatio >= 1.0 ? "positive" : "negative",
    },
    {
      name: "Net Profit Margin",
      impact: Math.round((ratios.netProfitMargin >= 10 ? 1 : -1) * Math.abs(scores.profitability - 50) * 0.3),
      direction: ratios.netProfitMargin >= 10 ? "positive" : "negative",
    },
    {
      name: "ROE",
      impact: Math.round((ratios.returnOnEquity >= 15 ? 1 : -1) * Math.abs(scores.profitability - 50) * 0.25),
      direction: ratios.returnOnEquity >= 15 ? "positive" : "negative",
    },
    {
      name: "Debt-to-Equity",
      impact: Math.round((ratios.debtToEquity <= 1.0 ? 1 : -1) * Math.abs(scores.leverage - 50) * 0.35),
      direction: ratios.debtToEquity <= 1.0 ? "positive" : "negative",
    },
    {
      name: "Interest Coverage",
      impact: Math.round((ratios.interestCoverage >= 3 ? 1 : -1) * Math.abs(scores.leverage - 50) * 0.3),
      direction: ratios.interestCoverage >= 3 ? "positive" : "negative",
    },
    {
      name: "Asset Turnover",
      impact: Math.round((ratios.assetTurnover >= 1.0 ? 1 : -1) * Math.abs(scores.efficiency - 50) * 0.3),
      direction: ratios.assetTurnover >= 1.0 ? "positive" : "negative",
    },
    {
      name: "Z-Score (X₃: EBIT/TA)",
      impact: Math.round(((ratios.ebitTA || 0) >= 0.1 ? 1 : -1) * Math.abs(baselineAvg - 50) * 0.25),
      direction: (ratios.ebitTA || 0) >= 0.1 ? "positive" : "negative",
    },
  ];

  return items.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
}

export default SensitivityAnalysis;
