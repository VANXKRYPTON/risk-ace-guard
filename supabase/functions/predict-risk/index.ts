import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FinancialRatios {
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  debtToEquity: number;
  debtRatio: number;
  interestCoverage: number;
  assetTurnover: number;
  inventoryTurnover: number;
  receivablesTurnover: number;
}

type RiskLevel = "low" | "medium" | "high";

interface RiskAssessment {
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ratios } = await req.json() as { ratios: FinancialRatios };
    
    console.log("Received financial ratios for analysis:", ratios);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Use AI to analyze the financial ratios with Gradient Boosting methodology
    const systemPrompt = `You are a financial risk assessment AI that uses Gradient Boosting classification methodology. 
You analyze financial ratios and provide risk assessments.

IMPORTANT: You must respond with ONLY a valid JSON object, no markdown, no explanation, just the JSON.

The JSON must have this exact structure:
{
  "overallRisk": "low" | "medium" | "high",
  "riskScore": number (0-100, higher = healthier),
  "confidence": number (80-99),
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

Risk Classification Guidelines (Gradient Boosting approach):
- LIQUIDITY: Current Ratio < 1 is concerning, > 2 is strong. Quick Ratio < 0.5 is risky.
- PROFITABILITY: Negative margins = high risk. ROE > 15% is strong.
- LEVERAGE: Debt/Equity > 2 is risky. Interest Coverage < 1.5 is critical.
- EFFICIENCY: Low turnover ratios indicate operational inefficiency.

Score each category 0-100, then weight: Liquidity 25%, Profitability 30%, Leverage 25%, Efficiency 20%.
Overall score >= 65 = Low Risk, 40-64 = Medium Risk, < 40 = High Risk.

Provide 3-4 key risk factors with their impact.`;

    const userPrompt = `Analyze these financial ratios and return the risk assessment JSON:

LIQUIDITY RATIOS:
- Current Ratio: ${ratios.currentRatio}
- Quick Ratio: ${ratios.quickRatio}
- Cash Ratio: ${ratios.cashRatio}

PROFITABILITY RATIOS:
- Gross Profit Margin: ${ratios.grossProfitMargin}%
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

Return ONLY the JSON object with your assessment.`;

    console.log("Calling Lovable AI Gateway for risk prediction...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
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
    console.log("AI Gateway response:", JSON.stringify(data, null, 2));

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

    const assessment: RiskAssessment = JSON.parse(assessmentJson);
    
    console.log("Parsed risk assessment:", assessment);

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
