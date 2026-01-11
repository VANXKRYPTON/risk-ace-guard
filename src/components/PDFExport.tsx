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
    
    // Company name
    if (companyName) {
      doc.setFontSize(14);
      doc.setTextColor(120, 113, 108);
      doc.text(companyName, pageWidth / 2, 35, { align: "center" });
    }
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(120, 113, 108);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })}`, pageWidth / 2, companyName ? 42 : 35, { align: "center" });
    
    // Risk Score Box
    const yStart = companyName ? 55 : 50;
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
    doc.text(`Score: ${assessment.riskScore}/100 | Confidence: ${assessment.confidence}%`, pageWidth / 2, yStart + 22, { align: "center" });
    
    // Category Scores
    doc.setTextColor(41, 37, 36);
    doc.setFontSize(14);
    doc.text("Category Scores", 20, yStart + 45);
    
    autoTable(doc, {
      startY: yStart + 50,
      head: [["Category", "Score", "Status"]],
      body: [
        ["Liquidity", `${assessment.categoryScores.liquidity}/100`, getScoreStatus(assessment.categoryScores.liquidity)],
        ["Profitability", `${assessment.categoryScores.profitability}/100`, getScoreStatus(assessment.categoryScores.profitability)],
        ["Leverage", `${assessment.categoryScores.leverage}/100`, getScoreStatus(assessment.categoryScores.leverage)],
        ["Efficiency", `${assessment.categoryScores.efficiency}/100`, getScoreStatus(assessment.categoryScores.efficiency)],
      ],
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 10 },
    });
    
    // Financial Ratios
    const finalY1 = (doc as any).lastAutoTable.finalY || yStart + 100;
    doc.setFontSize(14);
    doc.text("Financial Ratios Analyzed", 20, finalY1 + 15);
    
    autoTable(doc, {
      startY: finalY1 + 20,
      head: [["Ratio", "Value"]],
      body: [
        ["Current Ratio", ratios.currentRatio.toFixed(2)],
        ["Quick Ratio", ratios.quickRatio.toFixed(2)],
        ["Cash Ratio", ratios.cashRatio.toFixed(2)],
        ["Gross Profit Margin", `${ratios.grossProfitMargin.toFixed(2)}%`],
        ["Net Profit Margin", `${ratios.netProfitMargin.toFixed(2)}%`],
        ["Return on Assets", `${ratios.returnOnAssets.toFixed(2)}%`],
        ["Return on Equity", `${ratios.returnOnEquity.toFixed(2)}%`],
        ["Debt to Equity", ratios.debtToEquity.toFixed(2)],
        ["Debt Ratio", ratios.debtRatio.toFixed(2)],
        ["Interest Coverage", ratios.interestCoverage.toFixed(2)],
        ["Asset Turnover", ratios.assetTurnover.toFixed(2)],
        ["Inventory Turnover", ratios.inventoryTurnover.toFixed(2)],
        ["Receivables Turnover", ratios.receivablesTurnover.toFixed(2)],
      ],
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 9 },
    });
    
    // Key Risk Factors
    const finalY2 = (doc as any).lastAutoTable.finalY || finalY1 + 100;
    
    // Check if we need a new page
    if (finalY2 > 230) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Key Risk Factors", 20, 25);
      
      autoTable(doc, {
        startY: 30,
        head: [["Factor", "Impact", "Description"]],
        body: assessment.factors.map(factor => [
          factor.name,
          factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1),
          factor.description,
        ]),
        theme: "striped",
        headStyles: { fillColor: [79, 70, 229] },
        styles: { fontSize: 9 },
        columnStyles: {
          2: { cellWidth: 80 },
        },
      });
    } else {
      doc.setFontSize(14);
      doc.text("Key Risk Factors", 20, finalY2 + 15);
      
      autoTable(doc, {
        startY: finalY2 + 20,
        head: [["Factor", "Impact", "Description"]],
        body: assessment.factors.map(factor => [
          factor.name,
          factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1),
          factor.description,
        ]),
        theme: "striped",
        headStyles: { fillColor: [79, 70, 229] },
        styles: { fontSize: 9 },
        columnStyles: {
          2: { cellWidth: 80 },
        },
      });
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120, 113, 108);
      doc.text(
        "Generated by Business Risk Assessment Tool | Gradient Boosting Classification",
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }
    
    // Save
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
