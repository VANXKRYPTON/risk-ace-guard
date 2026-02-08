import { Button } from "./ui/button";
import { Building2, ShoppingBag, Cpu, Factory, Utensils } from "lucide-react";
import type { FinancialRatios } from "./RatioInputForm";

interface IndustryPresetsProps {
  onSelect: (ratios: FinancialRatios) => void;
}

const industryPresets: Record<string, { name: string; icon: React.ReactNode; ratios: FinancialRatios; description: string }> = {
  retail: {
    name: "Retail",
    icon: <ShoppingBag className="w-4 h-4" />,
    description: "Avg. retail industry benchmarks",
    ratios: {
      currentRatio: 1.5, quickRatio: 0.5, cashRatio: 0.2,
      grossProfitMargin: 25, netProfitMargin: 3, operatingMargin: 5,
      returnOnAssets: 5, returnOnEquity: 12,
      debtToEquity: 1.5, debtRatio: 0.6, interestCoverage: 4,
      assetTurnover: 2.5, inventoryTurnover: 8, receivablesTurnover: 15,
      workingCapitalTA: 0.15, retainedEarningsTA: 0.2, ebitTA: 0.08, marketEquityTL: 1.2, salesTA: 2.5,
    },
  },
  technology: {
    name: "Technology",
    icon: <Cpu className="w-4 h-4" />,
    description: "Avg. tech industry benchmarks",
    ratios: {
      currentRatio: 2.8, quickRatio: 2.5, cashRatio: 1.5,
      grossProfitMargin: 65, netProfitMargin: 20, operatingMargin: 25,
      returnOnAssets: 12, returnOnEquity: 25,
      debtToEquity: 0.4, debtRatio: 0.25, interestCoverage: 20,
      assetTurnover: 0.8, inventoryTurnover: 12, receivablesTurnover: 10,
      workingCapitalTA: 0.4, retainedEarningsTA: 0.5, ebitTA: 0.18, marketEquityTL: 4.0, salesTA: 0.8,
    },
  },
  manufacturing: {
    name: "Manufacturing",
    icon: <Factory className="w-4 h-4" />,
    description: "Avg. manufacturing benchmarks",
    ratios: {
      currentRatio: 1.8, quickRatio: 1.0, cashRatio: 0.3,
      grossProfitMargin: 30, netProfitMargin: 6, operatingMargin: 10,
      returnOnAssets: 7, returnOnEquity: 14,
      debtToEquity: 1.0, debtRatio: 0.5, interestCoverage: 6,
      assetTurnover: 1.2, inventoryTurnover: 6, receivablesTurnover: 8,
      workingCapitalTA: 0.2, retainedEarningsTA: 0.3, ebitTA: 0.1, marketEquityTL: 1.5, salesTA: 1.2,
    },
  },
  hospitality: {
    name: "Hospitality",
    icon: <Utensils className="w-4 h-4" />,
    description: "Avg. hospitality benchmarks",
    ratios: {
      currentRatio: 0.9, quickRatio: 0.7, cashRatio: 0.2,
      grossProfitMargin: 60, netProfitMargin: 5, operatingMargin: 8,
      returnOnAssets: 4, returnOnEquity: 10,
      debtToEquity: 2.0, debtRatio: 0.65, interestCoverage: 3,
      assetTurnover: 0.9, inventoryTurnover: 20, receivablesTurnover: 25,
      workingCapitalTA: -0.05, retainedEarningsTA: 0.1, ebitTA: 0.06, marketEquityTL: 0.8, salesTA: 0.9,
    },
  },
  realestate: {
    name: "Real Estate",
    icon: <Building2 className="w-4 h-4" />,
    description: "Avg. real estate benchmarks",
    ratios: {
      currentRatio: 1.2, quickRatio: 1.0, cashRatio: 0.4,
      grossProfitMargin: 40, netProfitMargin: 15, operatingMargin: 20,
      returnOnAssets: 3, returnOnEquity: 8,
      debtToEquity: 1.8, debtRatio: 0.6, interestCoverage: 2.5,
      assetTurnover: 0.2, inventoryTurnover: 2, receivablesTurnover: 6,
      workingCapitalTA: 0.05, retainedEarningsTA: 0.15, ebitTA: 0.04, marketEquityTL: 0.9, salesTA: 0.2,
    },
  },
};

const IndustryPresets = ({ onSelect }: IndustryPresetsProps) => {
  return (
    <div className="mb-8">
      <div className="text-center mb-4">
        <span className="text-sm text-muted-foreground">Load industry benchmarks:</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.entries(industryPresets).map(([key, preset]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            onClick={() => onSelect(preset.ratios)}
            className="gap-2 hover:bg-primary/10 hover:border-primary/50"
            title={preset.description}
          >
            {preset.icon}
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default IndustryPresets;
export { industryPresets };
