import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, AlertCircle, ArrowUp, ArrowDown, Minus, ChevronRight } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";
import type { FinancialRatios } from "./RatioInputForm";
import PDFExport from "./PDFExport";
import IndustryComparison from "./IndustryComparison";

export interface RiskResultsProps {
  ratios: FinancialRatios;
  assessment: RiskAssessment;
  onReset: () => void;
}

export type RiskLevel = "low" | "medium" | "high";

export interface RiskAssessment {
  overallRisk: RiskLevel;
  riskScore: number;
  confidence: number;
  categoryScores: {
    liquidity: number;
    profitability: number;
    leverage: number;
    efficiency: number;
  };
  factors: {
    name: string;
    impact: "positive" | "negative" | "neutral";
    description: string;
  }[];
}

const RiskResults = ({ ratios, assessment, onReset }: RiskResultsProps) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 500);
    return () => clearTimeout(timer);
  }, [assessment]);

  if (!assessment) return null;

  const riskConfig = {
    low: {
      color: "text-risk-low",
      bg: "bg-risk-low",
      bgLight: "bg-risk-low/10",
      border: "border-risk-low/50",
      icon: CheckCircle,
      label: "Low Risk",
      description: "The company demonstrates strong financial health with minimal risk indicators.",
    },
    medium: {
      color: "text-risk-medium",
      bg: "bg-risk-medium",
      bgLight: "bg-risk-medium/10",
      border: "border-risk-medium/50",
      icon: AlertCircle,
      label: "Medium Risk",
      description: "Some financial concerns detected. Close monitoring recommended.",
    },
    high: {
      color: "text-risk-high",
      bg: "bg-risk-high",
      bgLight: "bg-risk-high/10",
      border: "border-risk-high/50",
      icon: AlertTriangle,
      label: "High Risk",
      description: "Significant financial distress indicators. Immediate action may be required.",
    },
  };

  const config = riskConfig[assessment.overallRisk];
  const RiskIcon = config.icon;

  const radarData = [
    { category: "Liquidity", score: assessment.categoryScores.liquidity, fullMark: 100 },
    { category: "Profitability", score: assessment.categoryScores.profitability, fullMark: 100 },
    { category: "Leverage", score: assessment.categoryScores.leverage, fullMark: 100 },
    { category: "Efficiency", score: assessment.categoryScores.efficiency, fullMark: 100 },
  ];

  const barData = Object.entries(assessment.categoryScores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
  }));

  const getBarColor = (score: number) => {
    if (score >= 65) return "hsl(160, 84%, 39%)";
    if (score >= 40) return "hsl(45, 93%, 47%)";
    return "hsl(0, 72%, 51%)";
  };

  return (
    <section id="results" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Result Card */}
          <div className={`glass rounded-2xl p-8 md:p-12 border ${config.border} animate-scale-in`}>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Risk Score Circle */}
              <div className="relative">
                <div className={`w-48 h-48 rounded-full ${config.bgLight} flex items-center justify-center relative`}>
                  <div className={`absolute inset-4 rounded-full border-4 ${config.border} animate-pulse-slow`} />
                  <div className="text-center z-10">
                    <RiskIcon className={`w-12 h-12 ${config.color} mx-auto mb-2`} />
                    <div className={`text-5xl font-bold ${config.color}`}>{assessment.riskScore}</div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                  </div>
                </div>
              </div>

              {/* Risk Details */}
              <div className="flex-1 text-center lg:text-left">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${config.bgLight} ${config.color} text-sm font-medium mb-4`}>
                  <RiskIcon className="w-4 h-4" />
                  {config.label}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Risk Assessment Complete
                </h2>
                <p className="text-muted-foreground mb-4 max-w-lg">
                  {config.description}
                </p>
                <div className="flex items-center gap-4 justify-center lg:justify-start text-sm">
                  <span className="text-muted-foreground">
                    Model Confidence: <span className="text-foreground font-medium">{assessment.confidence}%</span>
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    Algorithm: <span className="text-foreground font-medium">Gradient Boosting</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          {showDetails && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 animate-slide-up">
              {/* Category Breakdown */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">Category Analysis</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="category" 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">Score Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        width={90}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Factors */}
              <div className="glass rounded-xl p-6 lg:col-span-2">
                <h3 className="text-xl font-semibold mb-6">Key Risk Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessment.factors.map((factor, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg ${
                        factor.impact === "positive"
                          ? "bg-risk-low/5 border border-risk-low/20"
                          : factor.impact === "negative"
                          ? "bg-risk-high/5 border border-risk-high/20"
                          : "bg-secondary/50 border border-border/50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          factor.impact === "positive"
                            ? "bg-risk-low/20 text-risk-low"
                            : factor.impact === "negative"
                            ? "bg-risk-high/20 text-risk-high"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {factor.impact === "positive" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : factor.impact === "negative" ? (
                          <ArrowDown className="w-4 h-4" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{factor.name}</h4>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Comparison */}
              <div className="lg:col-span-2">
                <IndustryComparison assessment={assessment} />
              </div>

              {/* Actions */}
              <div className="lg:col-span-2 flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <PDFExport ratios={ratios} assessment={assessment} />
                <button
                  onClick={onReset}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  Run Another Assessment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RiskResults;
