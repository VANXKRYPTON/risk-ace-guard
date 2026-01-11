import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import type { RiskAssessment } from "./RiskResults";
import { industryPresets } from "./IndustryPresets";

interface IndustryComparisonProps {
  assessment: RiskAssessment;
  selectedIndustry?: string;
}

const IndustryComparison = ({ assessment, selectedIndustry = "technology" }: IndustryComparisonProps) => {
  const industry = industryPresets[selectedIndustry] || industryPresets.technology;
  
  // Calculate industry benchmark scores (simplified estimation)
  const calculateIndustryScore = (ratios: typeof industry.ratios) => {
    const liquidityScore = Math.min(100, ((ratios.currentRatio / 2) * 50 + (ratios.quickRatio / 1.5) * 30 + (ratios.cashRatio / 0.5) * 20));
    const profitabilityScore = Math.min(100, ((ratios.grossProfitMargin / 50) * 25 + (ratios.netProfitMargin / 15) * 25 + (ratios.returnOnAssets / 10) * 25 + (ratios.returnOnEquity / 20) * 25));
    const leverageScore = Math.min(100, 100 - ((ratios.debtToEquity / 3) * 40 + (ratios.debtRatio / 1) * 30 + Math.max(0, (5 - ratios.interestCoverage) / 5) * 30));
    const efficiencyScore = Math.min(100, ((ratios.assetTurnover / 2) * 40 + (ratios.inventoryTurnover / 10) * 30 + (ratios.receivablesTurnover / 12) * 30));
    
    return {
      liquidity: Math.round(Math.max(0, liquidityScore)),
      profitability: Math.round(Math.max(0, profitabilityScore)),
      leverage: Math.round(Math.max(0, leverageScore)),
      efficiency: Math.round(Math.max(0, efficiencyScore)),
    };
  };

  const industryScores = calculateIndustryScore(industry.ratios);

  const comparisonData = [
    {
      category: "Liquidity",
      yours: assessment.categoryScores.liquidity,
      industry: industryScores.liquidity,
    },
    {
      category: "Profitability",
      yours: assessment.categoryScores.profitability,
      industry: industryScores.profitability,
    },
    {
      category: "Leverage",
      yours: assessment.categoryScores.leverage,
      industry: industryScores.leverage,
    },
    {
      category: "Efficiency",
      yours: assessment.categoryScores.efficiency,
      industry: industryScores.efficiency,
    },
  ];

  const yourAvg = Math.round(
    (assessment.categoryScores.liquidity +
      assessment.categoryScores.profitability +
      assessment.categoryScores.leverage +
      assessment.categoryScores.efficiency) / 4
  );

  const industryAvg = Math.round(
    (industryScores.liquidity +
      industryScores.profitability +
      industryScores.leverage +
      industryScores.efficiency) / 4
  );

  const difference = yourAvg - industryAvg;

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Industry Comparison</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">vs</span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-foreground">
            {industry.icon}
            {industry.name}
          </span>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} layout="vertical" barGap={4}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="yours" name="Your Score" radius={[0, 4, 4, 0]}>
              {comparisonData.map((entry, index) => (
                <Cell key={`yours-${index}`} fill="hsl(var(--primary))" />
              ))}
            </Bar>
            <Bar dataKey="industry" name={`${industry.name} Avg`} radius={[0, 4, 4, 0]}>
              {comparisonData.map((entry, index) => (
                <Cell key={`industry-${index}`} fill="hsl(var(--muted-foreground))" fillOpacity={0.5} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-8 pt-4 border-t border-border/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{yourAvg}</div>
          <div className="text-xs text-muted-foreground">Your Average</div>
        </div>
        <div className={`text-center px-4 py-2 rounded-lg ${
          difference >= 0 ? "bg-risk-low/10" : "bg-risk-high/10"
        }`}>
          <div className={`text-lg font-bold ${
            difference >= 0 ? "text-risk-low" : "text-risk-high"
          }`}>
            {difference >= 0 ? "+" : ""}{difference}
          </div>
          <div className="text-xs text-muted-foreground">Difference</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-muted-foreground">{industryAvg}</div>
          <div className="text-xs text-muted-foreground">{industry.name} Avg</div>
        </div>
      </div>
    </div>
  );
};

export default IndustryComparison;
