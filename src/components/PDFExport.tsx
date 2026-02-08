import { FileDown } from "lucide-react";
import { Button } from "./ui/button";
import type { FinancialRatios } from "./RatioInputForm";
import type { RiskAssessment } from "./RiskResults";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PDFExportProps {
  ratios: FinancialRatios;
  assessment: RiskAssessment;
  companyName?: string;
}

const PDFExport = ({ ratios, assessment, companyName }: PDFExportProps) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(41, 37, 36);
    doc.text("Business Risk Assessment Report", pageWidth / 2, 25, { align: "center" });
    
    if (companyName) {
      doc.setFontSize(14);
      doc.setTextColor(120, 113, 108);
      doc.text(companyName, pageWidth / 2, 35, { align: "center" });
    }
    
    doc.setFontSize(10);
    doc.setTextColor(120, 113, 108);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { 
      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
    })}`, pageWidth / 2, companyName ? 42 : 35, { align: "center" });
    
    doc.setFontSize(8);
    doc.text("Ensemble Model: Gradient Boosting + Altman Z-Score", pageWidth / 2, companyName ? 48 : 41, { align: "center" });
    
    // Risk Score Box
    const yStart = companyName ? 55 : 48;
    const riskColor = assessment.overallRisk === "low" 
      ? [22, 163, 74] 
      : assessment.overallRisk === "medium" 
        ? [234, 179, 8] 
        : [220, 38, 38];
    
    doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
    doc.roundedRect(20, yStart, pageWidth - 40, 30, 3, 3, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text(`Risk Level: ${assessment.overallRisk.toUpperCase()}`, pageWidth / 2, yStart + 12, { align: "center" });
    doc.setFontSize(14);
    const zScoreText = assessment.altmanZScore !== undefined ? ` | Z-Score: ${assessment.altmanZScore.toFixed(2)}` : "";
    doc.text(`Score: ${assessment.riskScore}/100 | Confidence: ${assessment.confidence}%${zScoreText}`, pageWidth / 2, yStart + 22, { align: "center" });
    
    // Altman Z-Score Section
    if (assessment.altmanZScore !== undefined) {
      doc.setTextColor(41, 37, 36);
      doc.setFontSize(14);
      doc.text("Altman Z-Score Analysis", 20, yStart + 42);
      
      const zZone = assessment.altmanZScore > 2.99 ? "Safe Zone" : assessment.altmanZScore > 1.81 ? "Grey Zone" : "Distress Zone";
      const zDescription = assessment.altmanZScore > 2.99 
        ? "Low probability of bankruptcy" 
        : assessment.altmanZScore > 1.81 
          ? "Moderate risk - further investigation needed" 
          : "High probability of bankruptcy within 2 years";
      
      autoTable(doc, {
        startY: yStart + 47,
        head: [["Metric", "Value", "Interpretation"]],
        body: [
          ["Z-Score", assessment.altmanZScore.toFixed(4), `${zZone} - ${zDescription}`],
          ["X₁: Working Capital/TA", ratios.workingCapitalTA?.toFixed(3) || "N/A", "Liquidity measure"],
          ["X₂: Retained Earnings/TA", ratios.retainedEarningsTA?.toFixed(3) || "N/A", "Cumulative profitability"],
          ["X₃: EBIT/TA", ratios.ebitTA?.toFixed(3) || "N/A", "Operating efficiency"],
          ["X₄: Market Equity/TL", ratios.marketEquityTL?.toFixed(3) || "N/A", "Solvency measure"],
          ["X₅: Sales/TA", ratios.salesTA?.toFixed(3) || "N/A", "Asset utilization"],
        ],
        theme: "striped",
        headStyles: { fillColor: [79, 70, 229] },
        styles: { fontSize: 9 },
      });
    }
    
    // Category Scores
    const finalYZ = (doc as any).lastAutoTable?.finalY || yStart + 40;
    doc.setTextColor(41, 37, 36);
    doc.setFontSize(14);
    doc.text("Category Scores", 20, finalYZ + 15);
    
    autoTable(doc, {
      startY: finalYZ + 20,
      head: [["Category", "Score", "Status", "Weight"]],
      body: [
        ["Liquidity", `${assessment.categoryScores.liquidity}/100`, getScoreStatus(assessment.categoryScores.liquidity), "25%"],
        ["Profitability", `${assessment.categoryScores.profitability}/100`, getScoreStatus(assessment.categoryScores.profitability), "30%"],
        ["Leverage", `${assessment.categoryScores.leverage}/100`, getScoreStatus(assessment.categoryScores.leverage), "25%"],
        ["Efficiency", `${assessment.categoryScores.efficiency}/100`, getScoreStatus(assessment.categoryScores.efficiency), "20%"],
      ],
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 10 },
    });
    
    // Financial Ratios
    const finalY1 = (doc as any).lastAutoTable.finalY || finalYZ + 80;
    
    if (finalY1 > 220) doc.addPage();
    const ratioY = finalY1 > 220 ? 20 : finalY1 + 15;
    
    doc.setFontSize(14);
    doc.text("Financial Ratios Analyzed", 20, ratioY);
    
    autoTable(doc, {
      startY: ratioY + 5,
      head: [["Category", "Ratio", "Value"]],
      body: [
        ["Liquidity", "Current Ratio", ratios.currentRatio.toFixed(2)],
        ["Liquidity", "Quick Ratio", ratios.quickRatio.toFixed(2)],
        ["Liquidity", "Cash Ratio", ratios.cashRatio.toFixed(2)],
        ["Profitability", "Gross Profit Margin", `${ratios.grossProfitMargin.toFixed(2)}%`],
        ["Profitability", "Operating Margin", `${(ratios.operatingMargin || 0).toFixed(2)}%`],
        ["Profitability", "Net Profit Margin", `${ratios.netProfitMargin.toFixed(2)}%`],
        ["Profitability", "Return on Assets", `${ratios.returnOnAssets.toFixed(2)}%`],
        ["Profitability", "Return on Equity", `${ratios.returnOnEquity.toFixed(2)}%`],
        ["Leverage", "Debt to Equity", ratios.debtToEquity.toFixed(2)],
        ["Leverage", "Debt Ratio", ratios.debtRatio.toFixed(2)],
        ["Leverage", "Interest Coverage", ratios.interestCoverage.toFixed(2)],
        ["Efficiency", "Asset Turnover", ratios.assetTurnover.toFixed(2)],
        ["Efficiency", "Inventory Turnover", ratios.inventoryTurnover.toFixed(2)],
        ["Efficiency", "Receivables Turnover", ratios.receivablesTurnover.toFixed(2)],
      ],
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 9 },
    });
    
    // Key Risk Factors
    const finalY2 = (doc as any).lastAutoTable.finalY || ratioY + 100;
    
    if (finalY2 > 220) doc.addPage();
    const factorY = finalY2 > 220 ? 20 : finalY2 + 15;
    
    doc.setFontSize(14);
    doc.text("Key Risk Factors", 20, factorY);
    
    autoTable(doc, {
      startY: factorY + 5,
      head: [["Factor", "Impact", "Description"]],
      body: assessment.factors.map(factor => [
        factor.name,
        factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1),
        factor.description,
      ]),
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 9 },
      columnStyles: { 2: { cellWidth: 80 } },
    });
    
    // Recommendations section
    const finalY3 = (doc as any).lastAutoTable.finalY;
    if (finalY3 > 220) doc.addPage();
    const recY = finalY3 > 220 ? 20 : finalY3 + 15;
    
    doc.setFontSize(14);
    doc.text("Methodology", 20, recY);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const methodText = [
      "This assessment uses an ensemble approach combining three models:",
      "1. Gradient Boosting Classification (50% weight) — ML-based multi-factor risk scoring",
      "2. Altman Z-Score Model (30% weight) — Established bankruptcy prediction (95% accuracy)",
      "3. Operating Efficiency Analysis (20% weight) — Working capital and margin analysis",
      "",
      "Altman Z-Score Zones: Safe (>2.99) | Grey (1.81-2.99) | Distress (<1.81)",
      "Risk Levels: Low (Score ≥65) | Medium (40-64) | High (<40)",
    ];
    methodText.forEach((line, i) => {
      doc.text(line, 20, recY + 8 + (i * 5));
    });
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120, 113, 108);
      doc.text(
        "Generated by Business Risk Assessment Tool | Ensemble: Gradient Boosting + Altman Z-Score",
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }
    
    const fileName = companyName 
      ? `risk-assessment-${companyName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`
      : `risk-assessment-${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
  };
  
  return (
    <Button onClick={generatePDF} variant="outline" className="gap-2">
      <FileDown className="w-4 h-4" />
      Export PDF Report
    </Button>
  );
};

const getScoreStatus = (score: number): string => {
  if (score >= 65) return "Strong";
  if (score >= 40) return "Moderate";
  return "Weak";
};

export default PDFExport;
