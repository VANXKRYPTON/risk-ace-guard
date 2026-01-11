import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calculator, DollarSign, Percent, TrendingUp, Scale } from "lucide-react";
import RatioTooltip from "./RatioTooltip";
import IndustryPresets from "./IndustryPresets";
interface FinancialRatios {
  // Liquidity Ratios
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  // Profitability Ratios
  grossProfitMargin: number;
  netProfitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  // Leverage Ratios
  debtToEquity: number;
  debtRatio: number;
  interestCoverage: number;
  // Efficiency Ratios
  assetTurnover: number;
  inventoryTurnover: number;
  receivablesTurnover: number;
}

interface RatioInputFormProps {
  onSubmit: (ratios: FinancialRatios) => void;
  isLoading: boolean;
}

const initialRatios: FinancialRatios = {
  currentRatio: 1.5,
  quickRatio: 1.0,
  cashRatio: 0.3,
  grossProfitMargin: 30,
  netProfitMargin: 10,
  returnOnAssets: 8,
  returnOnEquity: 15,
  debtToEquity: 1.2,
  debtRatio: 0.55,
  interestCoverage: 4,
  assetTurnover: 1.2,
  inventoryTurnover: 6,
  receivablesTurnover: 8,
};

const RatioInputForm = ({ onSubmit, isLoading }: RatioInputFormProps) => {
  const [ratios, setRatios] = useState<FinancialRatios>(initialRatios);

  const handleLoadPreset = (presetRatios: FinancialRatios) => {
    setRatios(presetRatios);
  };

  const handleChange = (key: keyof FinancialRatios, value: string) => {
    setRatios((prev) => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ratios);
  };

  const loadSampleData = (riskLevel: "low" | "medium" | "high") => {
    const samples: Record<string, FinancialRatios> = {
      low: {
        currentRatio: 2.5,
        quickRatio: 1.8,
        cashRatio: 0.6,
        grossProfitMargin: 45,
        netProfitMargin: 18,
        returnOnAssets: 15,
        returnOnEquity: 22,
        debtToEquity: 0.5,
        debtRatio: 0.3,
        interestCoverage: 12,
        assetTurnover: 1.5,
        inventoryTurnover: 10,
        receivablesTurnover: 12,
      },
      medium: {
        currentRatio: 1.3,
        quickRatio: 0.9,
        cashRatio: 0.25,
        grossProfitMargin: 28,
        netProfitMargin: 8,
        returnOnAssets: 6,
        returnOnEquity: 12,
        debtToEquity: 1.8,
        debtRatio: 0.6,
        interestCoverage: 3,
        assetTurnover: 0.9,
        inventoryTurnover: 5,
        receivablesTurnover: 6,
      },
      high: {
        currentRatio: 0.7,
        quickRatio: 0.4,
        cashRatio: 0.1,
        grossProfitMargin: 15,
        netProfitMargin: -2,
        returnOnAssets: -3,
        returnOnEquity: -8,
        debtToEquity: 4.5,
        debtRatio: 0.85,
        interestCoverage: 0.8,
        assetTurnover: 0.5,
        inventoryTurnover: 2,
        receivablesTurnover: 3,
      },
    };
    setRatios(samples[riskLevel]);
  };

  return (
    <section id="assessment" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enter Financial Ratios
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Input your company's financial ratios for comprehensive risk analysis
              using our Gradient Boosting classification model.
            </p>
          </div>

          {/* Industry Presets */}
          <IndustryPresets onSelect={handleLoadPreset} />

          {/* Sample Data Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="text-sm text-muted-foreground">Or load risk sample:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadSampleData("low")}
              className="border-risk-low/50 text-risk-low hover:bg-risk-low/10"
            >
              Low Risk
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadSampleData("medium")}
              className="border-risk-medium/50 text-risk-medium hover:bg-risk-medium/10"
            >
              Medium Risk
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadSampleData("high")}
              className="border-risk-high/50 text-risk-high hover:bg-risk-high/10"
            >
              High Risk
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8">
            <Tabs defaultValue="liquidity" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8 bg-secondary/50">
                <TabsTrigger value="liquidity" className="gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="hidden sm:inline">Liquidity</span>
                </TabsTrigger>
                <TabsTrigger value="profitability" className="gap-2">
                  <Percent className="w-4 h-4" />
                  <span className="hidden sm:inline">Profitability</span>
                </TabsTrigger>
                <TabsTrigger value="leverage" className="gap-2">
                  <Scale className="w-4 h-4" />
                  <span className="hidden sm:inline">Leverage</span>
                </TabsTrigger>
                <TabsTrigger value="efficiency" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Efficiency</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="liquidity" className="space-y-6">
                <RatioCategory title="Liquidity Ratios" description="Measures ability to meet short-term obligations">
                  <RatioInput
                    label="Current Ratio"
                    value={ratios.currentRatio}
                    onChange={(v) => handleChange("currentRatio", v)}
                    hint="Current Assets / Current Liabilities"
                    ratioKey="currentRatio"
                  />
                  <RatioInput
                    label="Quick Ratio"
                    value={ratios.quickRatio}
                    onChange={(v) => handleChange("quickRatio", v)}
                    hint="(Current Assets - Inventory) / Current Liabilities"
                    ratioKey="quickRatio"
                  />
                  <RatioInput
                    label="Cash Ratio"
                    value={ratios.cashRatio}
                    onChange={(v) => handleChange("cashRatio", v)}
                    hint="Cash / Current Liabilities"
                    ratioKey="cashRatio"
                  />
                </RatioCategory>
              </TabsContent>

              <TabsContent value="profitability" className="space-y-6">
                <RatioCategory title="Profitability Ratios" description="Measures ability to generate profits">
                  <RatioInput
                    label="Gross Profit Margin (%)"
                    value={ratios.grossProfitMargin}
                    onChange={(v) => handleChange("grossProfitMargin", v)}
                    hint="(Revenue - COGS) / Revenue × 100"
                    ratioKey="grossProfitMargin"
                  />
                  <RatioInput
                    label="Net Profit Margin (%)"
                    value={ratios.netProfitMargin}
                    onChange={(v) => handleChange("netProfitMargin", v)}
                    hint="Net Income / Revenue × 100"
                    ratioKey="netProfitMargin"
                  />
                  <RatioInput
                    label="Return on Assets (%)"
                    value={ratios.returnOnAssets}
                    onChange={(v) => handleChange("returnOnAssets", v)}
                    hint="Net Income / Total Assets × 100"
                    ratioKey="returnOnAssets"
                  />
                  <RatioInput
                    label="Return on Equity (%)"
                    value={ratios.returnOnEquity}
                    onChange={(v) => handleChange("returnOnEquity", v)}
                    hint="Net Income / Shareholders' Equity × 100"
                    ratioKey="returnOnEquity"
                  />
                </RatioCategory>
              </TabsContent>

              <TabsContent value="leverage" className="space-y-6">
                <RatioCategory title="Leverage Ratios" description="Measures financial structure and debt levels">
                  <RatioInput
                    label="Debt to Equity Ratio"
                    value={ratios.debtToEquity}
                    onChange={(v) => handleChange("debtToEquity", v)}
                    hint="Total Debt / Total Equity"
                    ratioKey="debtToEquity"
                  />
                  <RatioInput
                    label="Debt Ratio"
                    value={ratios.debtRatio}
                    onChange={(v) => handleChange("debtRatio", v)}
                    hint="Total Debt / Total Assets"
                    ratioKey="debtRatio"
                  />
                  <RatioInput
                    label="Interest Coverage Ratio"
                    value={ratios.interestCoverage}
                    onChange={(v) => handleChange("interestCoverage", v)}
                    hint="EBIT / Interest Expense"
                    ratioKey="interestCoverage"
                  />
                </RatioCategory>
              </TabsContent>

              <TabsContent value="efficiency" className="space-y-6">
                <RatioCategory title="Efficiency Ratios" description="Measures operational effectiveness">
                  <RatioInput
                    label="Asset Turnover"
                    value={ratios.assetTurnover}
                    onChange={(v) => handleChange("assetTurnover", v)}
                    hint="Revenue / Average Total Assets"
                    ratioKey="assetTurnover"
                  />
                  <RatioInput
                    label="Inventory Turnover"
                    value={ratios.inventoryTurnover}
                    onChange={(v) => handleChange("inventoryTurnover", v)}
                    hint="COGS / Average Inventory"
                    ratioKey="inventoryTurnover"
                  />
                  <RatioInput
                    label="Receivables Turnover"
                    value={ratios.receivablesTurnover}
                    onChange={(v) => handleChange("receivablesTurnover", v)}
                    hint="Net Credit Sales / Average Receivables"
                    ratioKey="receivablesTurnover"
                  />
                </RatioCategory>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                disabled={isLoading}
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    Run Assessment
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

interface RatioCategoryProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const RatioCategory = ({ title, description, children }: RatioCategoryProps) => (
  <div>
    <div className="mb-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

interface RatioInputProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
  hint: string;
  ratioKey?: string;
}

const RatioInput = ({ label, value, onChange, hint, ratioKey }: RatioInputProps) => (
  <div className="space-y-2">
    <Label htmlFor={label} className="text-sm font-medium flex items-center">
      {label}
      {ratioKey && <RatioTooltip ratioKey={ratioKey} />}
    </Label>
    <Input
      id={label}
      type="number"
      step="0.01"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-secondary/50 border-border/50 focus:border-primary"
    />
    <p className="text-xs text-muted-foreground">{hint}</p>
  </div>
);

export default RatioInputForm;
export type { FinancialRatios };
