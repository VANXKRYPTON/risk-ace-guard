import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

interface RatioTooltipProps {
  ratioKey: string;
}

const ratioInfo: Record<string, { benchmark: string; interpretation: string; importance: string }> = {
  currentRatio: {
    benchmark: "Healthy: > 1.5, Concerning: < 1.0",
    interpretation: "Measures ability to pay short-term obligations. Higher is better, but too high may indicate inefficient asset use.",
    importance: "Critical for assessing short-term financial health and liquidity risk.",
  },
  quickRatio: {
    benchmark: "Healthy: > 1.0, Concerning: < 0.5",
    interpretation: "Stricter liquidity test excluding inventory. Shows ability to meet immediate obligations.",
    importance: "Essential for industries with slow-moving inventory.",
  },
  cashRatio: {
    benchmark: "Healthy: > 0.2, Strong: > 0.5",
    interpretation: "Most conservative liquidity measure. Shows cash reserves relative to current liabilities.",
    importance: "Indicates immediate debt-paying ability.",
  },
  grossProfitMargin: {
    benchmark: "Industry varies: Tech 60-80%, Retail 20-40%",
    interpretation: "Revenue remaining after COGS. Higher margins indicate pricing power and efficiency.",
    importance: "Key indicator of core business profitability.",
  },
  netProfitMargin: {
    benchmark: "Healthy: > 10%, Concerning: < 5%",
    interpretation: "Final profit after all expenses. Reflects overall operational efficiency.",
    importance: "Ultimate measure of profitability.",
  },
  returnOnAssets: {
    benchmark: "Good: > 5%, Excellent: > 10%",
    interpretation: "How efficiently assets generate profit. Higher ROA means better asset utilization.",
    importance: "Measures management effectiveness in using assets.",
  },
  returnOnEquity: {
    benchmark: "Good: > 15%, Excellent: > 20%",
    interpretation: "Return generated on shareholder investment. Key metric for investors.",
    importance: "Primary measure of shareholder value creation.",
  },
  debtToEquity: {
    benchmark: "Conservative: < 1.0, High Risk: > 2.0",
    interpretation: "Total debt relative to equity. Higher ratios indicate more leverage and risk.",
    importance: "Critical for assessing financial leverage and risk.",
  },
  debtRatio: {
    benchmark: "Healthy: < 0.5, High Risk: > 0.7",
    interpretation: "Proportion of assets financed by debt. Lower is generally safer.",
    importance: "Shows overall debt burden relative to assets.",
  },
  interestCoverage: {
    benchmark: "Safe: > 3.0, Risky: < 1.5",
    interpretation: "Ability to pay interest on debt. Higher coverage means lower default risk.",
    importance: "Critical for assessing debt service capability.",
  },
  assetTurnover: {
    benchmark: "Industry varies: Retail 2.0+, Real Estate 0.2",
    interpretation: "Revenue generated per dollar of assets. Higher indicates efficient asset use.",
    importance: "Measures operational efficiency.",
  },
  inventoryTurnover: {
    benchmark: "Retail: 8-12, Manufacturing: 4-6",
    interpretation: "How often inventory is sold and replaced. Higher turnover means better management.",
    importance: "Key for inventory-intensive businesses.",
  },
  receivablesTurnover: {
    benchmark: "Good: > 10, Concerning: < 5",
    interpretation: "How quickly receivables are collected. Higher is better for cash flow.",
    importance: "Indicates collection efficiency and credit policy effectiveness.",
  },
};

const RatioTooltip = ({ ratioKey }: RatioTooltipProps) => {
  const info = ratioInfo[ratioKey];
  
  if (!info) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="inline-flex ml-1 text-muted-foreground hover:text-primary transition-colors">
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs p-3 space-y-2">
        <div>
          <span className="text-xs font-semibold text-primary">Benchmark:</span>
          <p className="text-xs text-foreground">{info.benchmark}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-primary">Interpretation:</span>
          <p className="text-xs text-muted-foreground">{info.interpretation}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-primary">Importance:</span>
          <p className="text-xs text-muted-foreground">{info.importance}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default RatioTooltip;
export { ratioInfo };
