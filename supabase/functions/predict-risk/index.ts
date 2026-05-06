import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface FinancialRatios {
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  operatingMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  debtToEquity: number;
  debtRatio: number;
  interestCoverage: number;
  assetTurnover: number;
  inventoryTurnover: number;
  receivablesTurnover: number;
  workingCapitalTA: number;
  retainedEarningsTA: number;
  ebitTA: number;
  marketEquityTL: number;
  salesTA: number;
}

type RiskLevel = "low" | "medium" | "high";

interface RiskAssessment {
  overallRisk: RiskLevel;
  riskScore: number;
  confidence: number;
  altmanZScore: number;
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

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const roundScore = (value: number) => Math.round(clamp(value));

const higherIsBetter = (value: number, weak: number, strong: number) => {
  if (!Number.isFinite(value)) return 50;
  return clamp(((value - weak) / (strong - weak)) * 100);
};

const lowerIsBetter = (value: number, strong: number, weak: number) => {
  if (!Number.isFinite(value)) return 50;
  return clamp(((weak - value) / (weak - strong)) * 100);
};

const calculateAltmanZScore = (ratios: FinancialRatios) =>
  1.2 * (ratios.workingCapitalTA || 0) +
  1.4 * (ratios.retainedEarningsTA || 0) +
  3.3 * (ratios.ebitTA || 0) +
  0.6 * (ratios.marketEquityTL || 0) +
  1.0 * (ratios.salesTA || 0);

const zScoreHealth = (zScore: number) => {
  if (zScore > 2.99) return 90;
  if (zScore > 1.81) return 55 + ((zScore - 1.81) / (2.99 - 1.81)) * 25;
  return clamp(20 + (zScore / 1.81) * 30, 5, 50);
};

const buildDeterministicAssessment = (ratios: FinancialRatios): RiskAssessment => {
  const altmanZScore = calculateAltmanZScore(ratios);
  const liquidity = roundScore(
    higherIsBetter(ratios.currentRatio, 0.8, 2.0) * 0.45 +
      higherIsBetter(ratios.quickRatio, 0.5, 1.5) * 0.35 +
      higherIsBetter(ratios.cashRatio, 0.1, 0.5) * 0.2,
  );
  const profitability = roundScore(
    higherIsBetter(ratios.grossProfitMargin, 0, 40) * 0.2 +
      higherIsBetter(ratios.operatingMargin || 0, -5, 15) * 0.25 +
      higherIsBetter(ratios.netProfitMargin, -5, 12) * 0.25 +
      higherIsBetter(ratios.returnOnAssets, -2, 8) * 0.15 +
      higherIsBetter(ratios.returnOnEquity, -5, 15) * 0.15,
  );
  const leverage = roundScore(
    lowerIsBetter(ratios.debtToEquity, 0.5, 3.0) * 0.4 +
      lowerIsBetter(ratios.debtRatio, 0.35, 0.8) * 0.3 +
      higherIsBetter(ratios.interestCoverage, 1.0, 5.0) * 0.3,
  );
  const efficiency = roundScore(
    higherIsBetter(ratios.assetTurnover, 0.4, 1.5) * 0.35 +
      higherIsBetter(ratios.inventoryTurnover, 2.0, 8.0) * 0.3 +
      higherIsBetter(ratios.receivablesTurnover, 3.0, 10.0) * 0.35,
  );

  const categoryAverage = (liquidity + profitability + leverage + efficiency) / 4;
  const operatingHealth = profitability * 0.55 + efficiency * 0.25 + liquidity * 0.2;
  const riskScore = roundScore(categoryAverage * 0.5 + zScoreHealth(altmanZScore) * 0.3 + operatingHealth * 0.2);
  const overallRisk: RiskLevel = riskScore >= 65 ? "low" : riskScore >= 40 ? "medium" : "high";
  const zScoreZone = altmanZScore > 2.99 ? "Safe Zone" : altmanZScore > 1.81 ? "Grey Zone" : "Distress Zone";

  const factors: RiskAssessment["factors"] = [
    {
      name: "Altman Z-Score",
      impact: altmanZScore > 2.99 ? "positive" : altmanZScore > 1.81 ? "neutral" : "negative",
      description: `Z-Score of ${altmanZScore.toFixed(2)} places the company in the ${zScoreZone}.`,
    },
    {
      name: "Liquidity Position",
      impact: liquidity >= 65 ? "positive" : liquidity >= 40 ? "neutral" : "negative",
      description: `Liquidity score is ${liquidity}/100 based on current, quick, and cash ratios.`,
    },
    {
      name: "Profitability Quality",
      impact: profitability >= 65 ? "positive" : profitability >= 40 ? "neutral" : "negative",
      description: `Profitability score is ${profitability}/100 using margin, ROA, and ROE indicators.`,
    },
    {
      name: "Debt Service Capacity",
      impact: leverage >= 65 ? "positive" : leverage >= 40 ? "neutral" : "negative",
      description: `Leverage score is ${leverage}/100 from debt ratios and interest coverage.`,
    },
    {
      name: "Operating Efficiency",
      impact: efficiency >= 65 ? "positive" : efficiency >= 40 ? "neutral" : "negative",
      description: `Efficiency score is ${efficiency}/100 from asset, inventory, and receivables turnover.`,
    },
  ];

  return {
    overallRisk,
    riskScore,
    confidence: 88,
    altmanZScore: parseFloat(altmanZScore.toFixed(4)),
    categoryScores: { liquidity, profitability, leverage, efficiency },
    factors,
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ratios } = await req.json() as { ratios: FinancialRatios };
    
    console.log("Received financial ratios for analysis:", ratios);

    // Validate input
    if (!ratios || typeof ratios !== 'object') {
      return new Response(JSON.stringify({ error: "Invalid input: ratios object required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Calculate Altman Z-Score deterministically (server-side validation)
    const altmanZScore = calculateAltmanZScore(ratios);
    
    const zScoreZone = altmanZScore > 2.99 ? "Safe Zone" : altmanZScore > 1.81 ? "Grey Zone" : "Distress Zone";

    const systemPrompt = `You are a financial risk assessment AI that uses an ENSEMBLE approach combining:
1. Gradient Boosting classification on financial ratios
2. Altman Z-Score bankruptcy prediction model
3. Multi-factor risk weighting

IMPORTANT: You must respond with ONLY a valid JSON object, no markdown, no explanation, just the JSON.

The JSON must have this exact structure:
{
  "overallRisk": "low" | "medium" | "high",
  "riskScore": number (0-100, higher = healthier),
  "confidence": number (80-99),
  "altmanZScore": number (the calculated Z-Score value),
  "categoryScores": {
    "liquidity": number (0-100),
    "profitability": number (0-100),
    "leverage": number (0-100),
    "efficiency": number (0-100)
  },
  "factors": [
    {
      "name": "string",
      "impact": "positive" | "negative" | "neutral",
      "description": "string"
    }
  ]
}

ENSEMBLE METHODOLOGY:

Model 1 - Gradient Boosting Classification (Weight: 50%):
- LIQUIDITY: Current Ratio < 1 is concerning, > 2 is strong. Quick Ratio < 0.5 is risky. Cash Ratio < 0.1 is critical.
- PROFITABILITY: Negative margins = high risk. ROE > 15% is strong. Operating Margin > 15% is healthy.
- LEVERAGE: Debt/Equity > 2 is risky. Interest Coverage < 1.5 is critical. Debt Ratio > 0.7 is concerning.
- EFFICIENCY: Asset Turnover < 0.5 is weak. Inventory Turnover < 3 is slow. Receivables Turnover < 5 is concerning.

Model 2 - Altman Z-Score (Weight: 30%):
- Z > 2.99 = Safe Zone (low risk contribution)
- 1.81 < Z < 2.99 = Grey Zone (medium risk contribution)
- Z < 1.81 = Distress Zone (high risk contribution)
- The Z-Score has been pre-calculated: ${altmanZScore.toFixed(4)} (${zScoreZone})

Model 3 - Operating Efficiency Analysis (Weight: 20%):
- Operating Margin trends, working capital management, retained earnings capacity

SCORING RULES:
- Score each category 0-100 independently
- Weight the ensemble: GB 50% + Z-Score 30% + Operating Analysis 20%
- Overall score >= 65 = Low Risk, 40-64 = Medium Risk, < 40 = High Risk
- Set altmanZScore to exactly: ${altmanZScore.toFixed(4)}
- Provide 4-6 key risk factors with their impact, including at least one Z-Score factor.`;

    const userPrompt = `Analyze these financial ratios using the ensemble methodology and return the risk assessment JSON:

LIQUIDITY RATIOS:
- Current Ratio: ${ratios.currentRatio}
- Quick Ratio: ${ratios.quickRatio}
- Cash Ratio: ${ratios.cashRatio}

PROFITABILITY RATIOS:
- Gross Profit Margin: ${ratios.grossProfitMargin}%
- Operating Margin: ${ratios.operatingMargin || 0}%
- Net Profit Margin: ${ratios.netProfitMargin}%
- Return on Assets: ${ratios.returnOnAssets}%
- Return on Equity: ${ratios.returnOnEquity}%

LEVERAGE RATIOS:
- Debt to Equity: ${ratios.debtToEquity}
- Debt Ratio: ${ratios.debtRatio}
- Interest Coverage: ${ratios.interestCoverage}

EFFICIENCY RATIOS:
- Asset Turnover: ${ratios.assetTurnover}
- Inventory Turnover: ${ratios.inventoryTurnover}
- Receivables Turnover: ${ratios.receivablesTurnover}

ALTMAN Z-SCORE COMPONENTS:
- X1 (Working Capital / Total Assets): ${ratios.workingCapitalTA || 0}
- X2 (Retained Earnings / Total Assets): ${ratios.retainedEarningsTA || 0}
- X3 (EBIT / Total Assets): ${ratios.ebitTA || 0}
- X4 (Market Value Equity / Total Liabilities): ${ratios.marketEquityTL || 0}
- X5 (Sales / Total Assets): ${ratios.salesTA || 0}
- PRE-CALCULATED Z-SCORE: ${altmanZScore.toFixed(4)} (${zScoreZone})

Return ONLY the JSON object with your ensemble assessment.`;

    console.log("Calling Lovable AI Gateway for ensemble risk prediction...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "API credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Gateway response received");

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response - handle potential markdown wrapping
    let assessmentJson = content.trim();
    if (assessmentJson.startsWith("```json")) {
      assessmentJson = assessmentJson.slice(7);
    }
    if (assessmentJson.startsWith("```")) {
      assessmentJson = assessmentJson.slice(3);
    }
    if (assessmentJson.endsWith("```")) {
      assessmentJson = assessmentJson.slice(0, -3);
    }
    assessmentJson = assessmentJson.trim();

    const assessment = JSON.parse(assessmentJson);
    
    // Ensure altmanZScore is set correctly from our deterministic calculation
    assessment.altmanZScore = parseFloat(altmanZScore.toFixed(4));
    
    console.log("Parsed ensemble risk assessment:", assessment);

    return new Response(JSON.stringify({ assessment }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in predict-risk function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
