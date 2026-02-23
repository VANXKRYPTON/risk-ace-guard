import { useState } from "react";
import { Download, FileText, Loader2, CheckCircle, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import pptxgen from "pptxgenjs";

const BRAND = {
  primary: "003366",
  accent: "0066CC",
  light: "E8F0FE",
  dark: "1A1A2E",
  white: "FFFFFF",
  gray: "6B7280",
  green: "16A34A",
  yellow: "CA8A04",
  red: "DC2626",
};

const generatePresentation = () => {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Risk Analyzer";
  pptx.subject = "Business Risk Assessment Using Financial Ratio Analysis";

  const addHeader = (slide: pptxgen.Slide, title: string) => {
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.9, fill: { color: BRAND.primary } });
    slide.addText("SRM INSTITUTE OF SCIENCE AND TECHNOLOGY", {
      x: 0.5, y: 0.15, w: 8, h: 0.3, fontSize: 10, color: BRAND.white, fontFace: "Arial",
    });
    slide.addText("DEPARTMENT OF COMPUTING TECHNOLOGIES", {
      x: 0.5, y: 0.45, w: 8, h: 0.25, fontSize: 8, color: BRAND.light, fontFace: "Arial",
    });
    if (title) {
      slide.addText(title, {
        x: 0.5, y: 1.1, w: 12, h: 0.6, fontSize: 28, bold: true, color: BRAND.dark, fontFace: "Arial",
      });
    }
    slide.addText("Business Risk Assessment | Major Project", {
      x: 0.5, y: 7.0, w: 10, h: 0.3, fontSize: 8, color: BRAND.gray, fontFace: "Arial",
    });
  };

  // ── Slide 1: Title ──
  const s1 = pptx.addSlide();
  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: BRAND.primary } });
  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 5.5, w: "100%", h: 2, fill: { color: BRAND.dark } });
  s1.addText("SRM INSTITUTE OF SCIENCE AND TECHNOLOGY\nSCHOOL OF COMPUTING\nDEPARTMENT OF COMPUTING TECHNOLOGIES", {
    x: 0.5, y: 0.5, w: 12, h: 1.2, fontSize: 12, color: BRAND.light, fontFace: "Arial", lineSpacingMultiple: 1.5,
  });
  s1.addText("21CSP401L – MAJOR PROJECT", {
    x: 0.5, y: 1.8, w: 12, h: 0.4, fontSize: 10, color: BRAND.light, fontFace: "Arial",
  });
  s1.addText("Business Risk Assessment\nUsing Financial Ratio Analysis", {
    x: 1, y: 2.8, w: 11, h: 2, fontSize: 36, bold: true, color: BRAND.white, fontFace: "Arial", lineSpacingMultiple: 1.3,
  });
  s1.addText("A Machine Learning Approach with Gradient Boosting, Altman Z-Score & Ensemble Methods", {
    x: 1, y: 4.8, w: 10, h: 0.5, fontSize: 14, color: BRAND.light, fontFace: "Arial", italic: true,
  });
  s1.addText("RA2211003012062 — Aditya Kumar\nRA2111003010111 — V.SN. Koushik\n\nGuide: Dr Shakeela Satish\nProfessor, Department of Computing Technologies", {
    x: 1, y: 5.7, w: 10, h: 1.5, fontSize: 11, color: BRAND.light, fontFace: "Arial", lineSpacingMultiple: 1.4,
  });

  // ── Slide 2: Abstract ──
  const s2 = pptx.addSlide();
  addHeader(s2, "Abstract");
  s2.addText([
    { text: "In the modern business environment, timely and accurate assessment of financial risk is critical for business owners, investors, and financial institutions. This project presents a ", options: { fontSize: 13, color: BRAND.dark } },
    { text: "machine learning-based approach", options: { fontSize: 13, color: BRAND.accent, bold: true } },
    { text: " to automate and enhance the evaluation of business risk using financial ratio analysis.\n\n", options: { fontSize: 13, color: BRAND.dark } },
    { text: "The system analyzes ", options: { fontSize: 13, color: BRAND.dark } },
    { text: "14+ financial ratios", options: { fontSize: 13, color: BRAND.accent, bold: true } },
    { text: " across liquidity, profitability, leverage, and efficiency categories. Using a ", options: { fontSize: 13, color: BRAND.dark } },
    { text: "3-model ensemble", options: { fontSize: 13, color: BRAND.accent, bold: true } },
    { text: " (Gradient Boosting + Altman Z-Score + Operating Efficiency Analysis), the system classifies businesses into Low, Medium, or High risk with confidence scores.\n\n", options: { fontSize: 13, color: BRAND.dark } },
    { text: "Implemented as a modern React web application with cloud backend, the system provides interactive visualizations including radar charts, sensitivity analysis, and SHAP-inspired feature importance — delivering actionable insights for better financial decision-making.", options: { fontSize: 13, color: BRAND.dark } },
  ], { x: 0.7, y: 1.9, w: 11.5, h: 4.5, valign: "top", fontFace: "Arial", lineSpacingMultiple: 1.5 });

  // ── Slide 3: Introduction ──
  const s3 = pptx.addSlide();
  addHeader(s3, "Introduction");
  const introPoints = [
    "In today's dynamic business environment, assessing the financial health and risk of a business is crucial for sustainable growth.",
    "Traditional risk assessment methods often rely on manual analysis of financial statements, which can be time-consuming and prone to errors.",
    "This project leverages machine learning to automate and improve the accuracy of business risk evaluation by analyzing key financial ratios.",
    "The system uses a 3-model ensemble architecture combining Gradient Boosting, Altman Z-Score, and Operating Efficiency Analysis for comprehensive risk classification.",
    "Built as a modern React web application with cloud-based backend, it provides real-time interactive visualizations and actionable insights.",
  ];
  introPoints.forEach((point, i) => {
    s3.addText(`${i + 1}.  ${point}`, {
      x: 0.7, y: 1.9 + i * 0.9, w: 11.5, h: 0.8, fontSize: 12, color: BRAND.dark, fontFace: "Arial", lineSpacingMultiple: 1.3,
    });
  });

  // ── Slide 4: Project Overview ──
  const s4 = pptx.addSlide();
  addHeader(s4, "Project Overview");
  const overviewItems = [
    ["Objective", "Predict business risk level using financial ratio analysis and ML classification, providing confidence scores and interpretable factors."],
    ["Input Features", "14+ financial ratios: Current Ratio, Quick Ratio, Cash Ratio, Gross Margin, Net Margin, ROA, ROE, Debt-to-Equity, Debt Ratio, Interest Coverage, Asset Turnover, Inventory Turnover, Receivables Turnover."],
    ["ML Models", "3-model ensemble: Gradient Boosting (XGBoost/LightGBM), Altman Z-Score (1968), Operating Efficiency Analysis. Weighted combination for robust classification."],
    ["Output", "Risk Level (Low/Medium/High), Risk Score (0-100), Confidence %, Category Scores, Key Risk Factors, Sensitivity Analysis, SHAP Feature Importance."],
    ["Platform", "React + TypeScript + Tailwind CSS frontend, Cloud backend with Edge Functions, interactive Recharts visualizations."],
  ];
  overviewItems.forEach(([title, desc], i) => {
    s4.addShape(pptx.ShapeType.rect, { x: 0.7, y: 1.9 + i * 0.95, w: 11.5, h: 0.85, fill: { color: i % 2 === 0 ? BRAND.light : BRAND.white }, rectRadius: 0.05 });
    s4.addText(title, { x: 0.9, y: 1.95 + i * 0.95, w: 2, h: 0.35, fontSize: 11, bold: true, color: BRAND.primary, fontFace: "Arial" });
    s4.addText(desc, { x: 0.9, y: 2.3 + i * 0.95, w: 11, h: 0.4, fontSize: 10, color: BRAND.dark, fontFace: "Arial" });
  });

  // ── Slide 5: Existing System ──
  const s5 = pptx.addSlide();
  addHeader(s5, "Existing System & Limitations");
  const existingItems = [
    "Traditional business risk assessment is mostly manual and relies on analyzing financial statements, invoices, and reports.",
    "Time-consuming and error-prone: Manual calculations of ratios and financial health indicators can lead to mistakes.",
    "Limited automation: Existing systems often lack predictive capabilities and only provide historical insights.",
    "No standardized risk categorization: Businesses may interpret financial data differently, leading to inconsistent risk evaluation.",
    "Inaccessibility: Small and medium enterprises often do not have access to sophisticated risk assessment tools.",
    "No explainability: Traditional tools don't show which factors contribute most to the risk assessment.",
  ];
  existingItems.forEach((item, i) => {
    s5.addShape(pptx.ShapeType.rect, { x: 0.7, y: 1.9 + i * 0.8, w: 0.25, h: 0.25, fill: { color: BRAND.red }, rectRadius: 0.12 });
    s5.addText(item, { x: 1.2, y: 1.85 + i * 0.8, w: 11, h: 0.7, fontSize: 11, color: BRAND.dark, fontFace: "Arial", lineSpacingMultiple: 1.2 });
  });

  // ── Slide 6: Objectives ──
  const s6 = pptx.addSlide();
  addHeader(s6, "Objectives");
  const objectives = [
    "Predict Business Risk: Develop a 3-model ensemble to accurately classify business risk using financial ratio analysis.",
    "Automate Assessment: Reduce manual calculations and errors by providing an automated, data-driven solution with real-time results.",
    "Multi-dimensional Analysis: Evaluate businesses across 4 categories — Liquidity, Profitability, Leverage, and Efficiency.",
    "Provide Explainability: Implement SHAP-inspired feature importance and sensitivity analysis for interpretable results.",
    "User-Friendly Interface: Build a modern React web application with interactive visualizations and PDF export capabilities.",
    "Standardize Evaluation: Create a consistent, research-backed methodology combining Altman Z-Score with gradient boosting.",
  ];
  objectives.forEach((obj, i) => {
    s6.addShape(pptx.ShapeType.rect, { x: 0.7, y: 1.9 + i * 0.8, w: 0.25, h: 0.25, fill: { color: BRAND.green }, rectRadius: 0.12 });
    s6.addText(obj, { x: 1.2, y: 1.85 + i * 0.8, w: 11, h: 0.7, fontSize: 11, color: BRAND.dark, fontFace: "Arial", lineSpacingMultiple: 1.2 });
  });

  // ── Slide 7: Scope ──
  const s7 = pptx.addSlide();
  addHeader(s7, "Scope of the Project");
  const scopeItems = [
    "Automated Risk Assessment: Fully automated system evaluating financial health, reducing dependency on manual analysis.",
    "3-Model Ensemble Classification: Gradient Boosting + Altman Z-Score + Operating Efficiency for robust risk prediction.",
    "Interactive Visualizations: Radar charts, bar charts, sensitivity analysis, Z-Score gauge, and industry comparison.",
    "Assessment History: Cloud-based storage of all assessments with trend tracking and historical comparison.",
    "PDF Export: Professional report generation with complete assessment details and visualizations.",
    "Authentication & Security: Secure user authentication with session management and row-level security.",
    "Future Expansion: Integration with accounting APIs, predictive trends, real-time alerts, and multi-currency support.",
  ];
  scopeItems.forEach((item, i) => {
    s7.addText(`${i + 1}.`, { x: 0.7, y: 1.9 + i * 0.7, w: 0.4, h: 0.3, fontSize: 12, bold: true, color: BRAND.accent, fontFace: "Arial" });
    s7.addText(item, { x: 1.1, y: 1.9 + i * 0.7, w: 11.2, h: 0.65, fontSize: 11, color: BRAND.dark, fontFace: "Arial", lineSpacingMultiple: 1.2 });
  });

  // ── Slide 8: Literature Survey ──
  const s8 = pptx.addSlide();
  addHeader(s8, "Literature Survey");
  const litHeaders = ["Author / Year", "Title", "Methodology", "Relevance"];
  const litData = [
    ["Altman (1968)", "Financial Ratios & Bankruptcy Prediction", "Discriminant Analysis", "Foundation for Z-Score model"],
    ["Beaver (1966)", "Financial Ratios as Predictors of Failure", "Statistical Analysis", "Validates ratio-based assessment"],
    ["Agarwal & Taffler (2008)", "Logistic Regression vs Neural Networks", "ML vs Statistical", "Justifies ML approach"],
    ["Khashman (2010)", "Neural Networks for Credit Risk", "Feed-forward NN", "Supports ML risk classification"],
    ["Lessmann et al. (2015)", "Benchmarking Credit Scoring Algorithms", "ML Algorithm Comparison", "Guides model selection (XGBoost)"],
    ["Lundberg & Lee (2017)", "SHAP Values for Model Interpretation", "Game Theory + ML", "Foundation for explainability"],
    ["Chen & Guestrin (2016)", "XGBoost: Scalable Tree Boosting", "Gradient Boosting", "Core algorithm reference"],
  ];
  // Table header
  const colWidths = [2.5, 3.2, 2.8, 3.2];
  let tx = 0.7;
  litHeaders.forEach((h, i) => {
    s8.addShape(pptx.ShapeType.rect, { x: tx, y: 1.9, w: colWidths[i], h: 0.4, fill: { color: BRAND.primary } });
    s8.addText(h, { x: tx, y: 1.9, w: colWidths[i], h: 0.4, fontSize: 9, bold: true, color: BRAND.white, fontFace: "Arial", align: "center", valign: "middle" });
    tx += colWidths[i];
  });
  litData.forEach((row, ri) => {
    let rx = 0.7;
    row.forEach((cell, ci) => {
      s8.addShape(pptx.ShapeType.rect, { x: rx, y: 2.3 + ri * 0.55, w: colWidths[ci], h: 0.5, fill: { color: ri % 2 === 0 ? BRAND.light : BRAND.white } });
      s8.addText(cell, { x: rx + 0.1, y: 2.3 + ri * 0.55, w: colWidths[ci] - 0.2, h: 0.5, fontSize: 8.5, color: BRAND.dark, fontFace: "Arial", valign: "middle" });
      rx += colWidths[ci];
    });
  });

  // ── Slide 9: System Architecture ──
  const s9 = pptx.addSlide();
  addHeader(s9, "System Architecture");
  // Architecture boxes
  const archBoxes = [
    { x: 4.5, y: 1.9, w: 4, h: 0.7, label: "User Interface\nReact + TypeScript + Tailwind", color: BRAND.accent },
    { x: 1, y: 3.2, w: 3, h: 0.7, label: "Authentication\nCloud Auth + RLS", color: BRAND.primary },
    { x: 4.5, y: 3.2, w: 4, h: 0.7, label: "Processing Layer\nEdge Functions (Deno)", color: BRAND.primary },
    { x: 9, y: 3.2, w: 3, h: 0.7, label: "Database\nCloud PostgreSQL", color: BRAND.primary },
    { x: 1, y: 4.6, w: 3.3, h: 0.7, label: "Gradient Boosting\nXGBoost / LightGBM", color: BRAND.green },
    { x: 4.7, y: 4.6, w: 3.3, h: 0.7, label: "Altman Z-Score\nBankruptcy Prediction", color: BRAND.yellow },
    { x: 8.4, y: 4.6, w: 3.3, h: 0.7, label: "Operating Efficiency\nAnalysis Module", color: BRAND.red },
    { x: 4.5, y: 5.9, w: 4, h: 0.7, label: "Ensemble Combiner\nWeighted Risk Classification", color: BRAND.dark },
  ];
  archBoxes.forEach((b) => {
    s9.addShape(pptx.ShapeType.rect, { x: b.x, y: b.y, w: b.w, h: b.h, fill: { color: b.color }, rectRadius: 0.08, shadow: { type: "outer", blur: 4, offset: 2, color: "888888", opacity: 0.3 } });
    s9.addText(b.label, { x: b.x, y: b.y, w: b.w, h: b.h, fontSize: 9, color: BRAND.white, fontFace: "Arial", align: "center", valign: "middle", lineSpacingMultiple: 1.2 });
  });
  // Arrows (simple lines)
  s9.addShape(pptx.ShapeType.line, { x: 6.5, y: 2.6, w: 0, h: 0.6, line: { color: BRAND.gray, width: 1.5, dashType: "solid" } });
  s9.addShape(pptx.ShapeType.line, { x: 6.5, y: 3.9, w: 0, h: 0.7, line: { color: BRAND.gray, width: 1.5 } });
  s9.addShape(pptx.ShapeType.line, { x: 6.5, y: 5.3, w: 0, h: 0.6, line: { color: BRAND.gray, width: 1.5 } });
  // Output section
  s9.addShape(pptx.ShapeType.rect, { x: 1, y: 6.2, w: 11.7, h: 0.6, fill: { color: BRAND.light }, rectRadius: 0.05 });
  s9.addText("Output: Risk Level (Low/Medium/High) • Risk Score (0-100) • Confidence % • Category Scores • SHAP Feature Importance • Sensitivity Analysis", {
    x: 1.2, y: 6.2, w: 11.3, h: 0.6, fontSize: 9, color: BRAND.primary, fontFace: "Arial", valign: "middle",
  });

  // ── Slide 10: Research Gaps ──
  const s10 = pptx.addSlide();
  addHeader(s10, "Research Gaps Addressed");
  const gaps = [
    ["Limited ML for SMEs", "Most studies focus on large corporations; our system targets businesses of all sizes with accessible web-based tools."],
    ["Manual Methods", "Traditional ratio analysis is spreadsheet-based and error-prone; our system fully automates the pipeline."],
    ["Single-Model Limitations", "Most tools use a single model; our 3-model ensemble (GB + Z-Score + OEA) provides more robust classification."],
    ["No Real-Time Assessment", "Existing tools rarely provide instant evaluation; our system delivers real-time results with interactive visualizations."],
    ["Lack of Explainability", "Black-box models are common; we implement SHAP-inspired feature importance and sensitivity analysis."],
    ["No Standardized Framework", "Inconsistent risk thresholds across tools; we combine academically validated methods (Altman 1968)."],
  ];
  gaps.forEach(([title, desc], i) => {
    s10.addShape(pptx.ShapeType.rect, { x: 0.7, y: 1.9 + i * 0.82, w: 11.5, h: 0.72, fill: { color: i % 2 === 0 ? BRAND.light : BRAND.white }, rectRadius: 0.05 });
    s10.addText(title, { x: 0.9, y: 1.92 + i * 0.82, w: 3, h: 0.3, fontSize: 10, bold: true, color: BRAND.primary, fontFace: "Arial" });
    s10.addText(desc, { x: 0.9, y: 2.22 + i * 0.82, w: 11, h: 0.35, fontSize: 9.5, color: BRAND.dark, fontFace: "Arial" });
  });

  // ── Slide 11: References ──
  const s11 = pptx.addSlide();
  addHeader(s11, "References");
  const refs = [
    'Altman, E. I. (1968). Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy. The Journal of Finance, 23(4), 589–609.',
    'Beaver, W. H. (1966). Financial Ratios as Predictors of Failure. Journal of Accounting Research, 4, 71–111.',
    'Agarwal, V., & Taffler, R. (2008). Comparing Logistic Regression and Neural Networks in Bankruptcy Prediction. Journal of Banking & Finance, 32(12), 2356–2365.',
    'Khashman, A. (2010). Neural Networks for Credit Risk Evaluation. Expert Systems with Applications, 37(9), 6233–6239.',
    'Lessmann, S., Baesens, B., Seow, H.-V., & Thomas, L. C. (2015). Benchmarking classification algorithms for credit scoring. European Journal of Operational Research, 247(1), 124–136.',
    'Lundberg, S. M., & Lee, S.-I. (2017). A Unified Approach to Interpreting Model Predictions. NeurIPS, 30.',
    'Chen, T., & Guestrin, C. (2016). XGBoost: A Scalable Tree Boosting System. KDD, 785–794.',
  ];
  refs.forEach((ref, i) => {
    s11.addText(`[${i + 1}]  ${ref}`, {
      x: 0.7, y: 1.9 + i * 0.65, w: 11.5, h: 0.6, fontSize: 9, color: BRAND.dark, fontFace: "Arial", lineSpacingMultiple: 1.2,
    });
  });

  // ── Slide 12: Thank You ──
  const s12 = pptx.addSlide();
  s12.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: BRAND.primary } });
  s12.addText("Thank You", {
    x: 0, y: 2.5, w: "100%", h: 1.5, fontSize: 54, bold: true, color: BRAND.white, fontFace: "Arial", align: "center",
  });
  s12.addText("Business Risk Assessment Using Financial Ratio Analysis\nMajor Project — SRM Institute of Science and Technology", {
    x: 2, y: 4.2, w: 9, h: 1, fontSize: 14, color: BRAND.light, fontFace: "Arial", align: "center", lineSpacingMultiple: 1.5,
  });
  s12.addText("Aditya Kumar  •  V.SN. Koushik  •  Guide: Dr Shakeela Satish", {
    x: 2, y: 5.5, w: 9, h: 0.5, fontSize: 12, color: BRAND.light, fontFace: "Arial", align: "center",
  });

  return pptx;
};

const slidePreviewData = [
  { num: 1, title: "Title Slide", desc: "SRM Institute, project title, team members & guide" },
  { num: 2, title: "Abstract", desc: "ML-based approach, 14+ ratios, 3-model ensemble" },
  { num: 3, title: "Introduction", desc: "Problem context, motivation, approach overview" },
  { num: 4, title: "Project Overview", desc: "Objective, inputs, ML models, outputs, platform" },
  { num: 5, title: "Existing System", desc: "Limitations of traditional risk assessment methods" },
  { num: 6, title: "Objectives", desc: "6 key project objectives with ML & UX focus" },
  { num: 7, title: "Scope", desc: "7 scope items including future expansion" },
  { num: 8, title: "Literature Survey", desc: "7 key references in tabular format" },
  { num: 9, title: "System Architecture", desc: "Full architecture diagram with 3-model ensemble" },
  { num: 10, title: "Research Gaps", desc: "6 gaps addressed by this project" },
  { num: 11, title: "References", desc: "7 academic references with full citations" },
  { num: 12, title: "Thank You", desc: "Closing slide with team credits" },
];

const PresentationPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    setIsDone(false);
    try {
      const pptx = generatePresentation();
      await pptx.writeFile({ fileName: "Business_Risk_Assessment_Presentation.pptx" });
      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000);
    } catch (err) {
      console.error("Failed to generate PPTX:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Presentation className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">PowerPoint Generator</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Download Project Presentation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Generate a professional 12-slide PowerPoint presentation covering your Business Risk Assessment project — ready for academic submission.
            </p>
            <Button
              size="lg"
              onClick={handleDownload}
              disabled={isGenerating}
              className="gap-2 text-base px-8"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : isDone ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download PPTX
                </>
              )}
            </Button>
          </div>

          {/* Slide Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {slidePreviewData.map((slide) => (
              <div
                key={slide.num}
                className="glass rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                    {slide.num}
                  </div>
                  <h3 className="font-semibold text-sm">{slide.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{slide.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PresentationPage;
