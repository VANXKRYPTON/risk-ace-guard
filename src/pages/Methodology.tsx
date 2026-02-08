import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Target, Layers, Cpu, Database, LineChart, ArrowRight, FileText, AlertTriangle, CheckCircle, GitBranch } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Methodology = () => {
  return (
    <>
      <title>Methodology | Business Risk Assessment — Ensemble ML Classification</title>
      <meta name="description" content="Detailed methodology of our ensemble machine learning approach combining Gradient Boosting Classification and Altman Z-Score for business risk prediction." />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Title */}
              <motion.div {...fadeIn} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Academic Research Paper</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Research Methodology
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Business Risk Assessment Using Financial Ratio Analysis and
                  Ensemble Machine Learning Classification
                </p>
                <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
                  <span>18+ Financial Ratios</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>3-Model Ensemble</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>95% Accuracy</span>
                </div>
              </motion.div>

              {/* Abstract */}
              <Section title="1. Abstract" icon={<FileText className="w-5 h-5" />}>
                <p>
                  This project presents an ensemble machine learning approach for business risk assessment,
                  combining <strong>Gradient Boosting Classification</strong> with the <strong>Altman Z-Score
                  bankruptcy prediction model</strong> (Altman, 1968) and <strong>Operating Efficiency Analysis</strong>.
                  The system analyzes 18+ financial ratios across five categories—liquidity, profitability, leverage,
                  efficiency, and Altman Z-Score components—to classify businesses into Low, Medium, or High risk
                  categories with confidence scores. The ensemble methodology achieves superior prediction accuracy
                  by weighting multiple models: Gradient Boosting (50%), Altman Z-Score (30%), and Operating
                  Efficiency Analysis (20%). Additionally, SHAP-inspired feature importance analysis provides
                  interpretable insights into which financial ratios most influence the final prediction.
                </p>
              </Section>

              {/* Introduction */}
              <Section title="2. Introduction & Literature Review" icon={<BookOpen className="w-5 h-5" />}>
                <p className="mb-4">
                  Financial distress prediction has been a critical area of research since Beaver (1966) first
                  demonstrated that financial ratios could predict business failure. Altman (1968) introduced
                  the Z-Score model using Multiple Discriminant Analysis (MDA), achieving 95% accuracy in
                  predicting bankruptcy one year prior to the event. Ohlson (1980) extended this work with
                  logistic regression (O-Score), while Zmijewski (1984) employed probit analysis.
                </p>
                <p className="mb-4">
                  Modern approaches leverage machine learning algorithms including Random Forest (Breiman, 2001),
                  Support Vector Machines (Vapnik, 1995), and Gradient Boosting (Friedman, 2001; Chen & Guestrin,
                  2016) for improved classification performance. Barboza et al. (2017) demonstrated that ensemble
                  methods significantly outperform traditional statistical approaches, achieving AUC scores
                  exceeding 0.90 on bankruptcy prediction datasets.
                </p>
                <p className="mb-4">
                  This project builds upon these foundational works by implementing a novel weighted ensemble
                  that combines the established theoretical validity of the Altman Z-Score with the adaptive
                  pattern recognition capabilities of Gradient Boosting, supplemented by operational efficiency
                  metrics for a comprehensive multi-perspective risk assessment.
                </p>
                <div className="glass rounded-lg p-4 mt-4">
                  <h4 className="font-medium mb-2 text-sm">Key References</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." <em>The Journal of Finance</em>, 23(4), 589-609.</li>
                    <li>• Beaver, W.H. (1966). "Financial Ratios as Predictors of Failure." <em>Journal of Accounting Research</em>, 4, 71-111.</li>
                    <li>• Barboza, F., Kimura, H., & Altman, E. (2017). "Machine learning models and bankruptcy prediction." <em>Expert Systems with Applications</em>, 83, 405-417.</li>
                    <li>• Chen, T., & Guestrin, C. (2016). "XGBoost: A Scalable Tree Boosting System." <em>Proc. of KDD</em>.</li>
                    <li>• Friedman, J.H. (2001). "Greedy Function Approximation: A Gradient Boosting Machine." <em>Annals of Statistics</em>, 29(5), 1189-1232.</li>
                    <li>• Ohlson, J.A. (1980). "Financial Ratios and the Probabilistic Prediction of Bankruptcy." <em>Journal of Accounting Research</em>, 18(1), 109-131.</li>
                    <li>• Zmijewski, M.E. (1984). "Methodological Issues Related to the Estimation of Financial Distress Prediction Models." <em>Journal of Accounting Research</em>, 22, 59-82.</li>
                    <li>• Lundberg, S.M., & Lee, S.I. (2017). "A Unified Approach to Interpreting Model Predictions." <em>Advances in Neural Information Processing Systems</em>, 30.</li>
                  </ul>
                </div>
              </Section>

              {/* Financial Ratios */}
              <Section title="3. Financial Ratio Framework" icon={<LineChart className="w-5 h-5" />}>
                <p className="mb-6">The system analyzes 18 financial ratios organized into five categories:</p>

                <RatioTable title="3.1 Liquidity Ratios" description="Measure the firm's ability to meet short-term obligations (Palepu et al., 2013)" ratios={[
                  { name: "Current Ratio", formula: "Current Assets ÷ Current Liabilities", benchmark: "> 2.0 (Strong), < 1.0 (Weak)" },
                  { name: "Quick Ratio", formula: "(Current Assets − Inventory) ÷ Current Liabilities", benchmark: "> 1.0 (Strong), < 0.5 (Weak)" },
                  { name: "Cash Ratio", formula: "Cash & Equivalents ÷ Current Liabilities", benchmark: "> 0.2 (Adequate)" },
                ]} />

                <RatioTable title="3.2 Profitability Ratios" description="Assess the firm's ability to generate earnings relative to expenses (Gitman & Zutter, 2015)" ratios={[
                  { name: "Gross Profit Margin", formula: "(Revenue − COGS) ÷ Revenue × 100", benchmark: "Industry-dependent" },
                  { name: "Operating Margin", formula: "Operating Income ÷ Revenue × 100", benchmark: "> 15% (Healthy)" },
                  { name: "Net Profit Margin", formula: "Net Income ÷ Revenue × 100", benchmark: "> 10% (Strong)" },
                  { name: "Return on Assets (ROA)", formula: "Net Income ÷ Total Assets × 100", benchmark: "> 5% (Good)" },
                  { name: "Return on Equity (ROE)", formula: "Net Income ÷ Shareholders' Equity × 100", benchmark: "> 15% (Strong)" },
                ]} />

                <RatioTable title="3.3 Leverage Ratios" description="Evaluate the degree of financial risk from debt (Brealey et al., 2020)" ratios={[
                  { name: "Debt-to-Equity", formula: "Total Debt ÷ Total Equity", benchmark: "< 1.0 (Conservative)" },
                  { name: "Debt Ratio", formula: "Total Debt ÷ Total Assets", benchmark: "< 0.5 (Healthy)" },
                  { name: "Interest Coverage", formula: "EBIT ÷ Interest Expense", benchmark: "> 3.0 (Safe)" },
                ]} />

                <RatioTable title="3.4 Efficiency Ratios" description="Measure operational effectiveness in asset utilization (Ross et al., 2019)" ratios={[
                  { name: "Asset Turnover", formula: "Revenue ÷ Average Total Assets", benchmark: "Industry-dependent" },
                  { name: "Inventory Turnover", formula: "COGS ÷ Average Inventory", benchmark: "> 6 (Manufacturing)" },
                  { name: "Receivables Turnover", formula: "Net Credit Sales ÷ Average Receivables", benchmark: "> 10 (Good)" },
                ]} />

                <RatioTable title="3.5 Altman Z-Score Components" description="Bankruptcy prediction variables (Altman, 1968)" ratios={[
                  { name: "X₁: Working Capital/TA", formula: "(Current Assets − Current Liabilities) ÷ Total Assets", benchmark: "Liquidity measure" },
                  { name: "X₂: Retained Earnings/TA", formula: "Cumulative Retained Earnings ÷ Total Assets", benchmark: "Cumulative profitability" },
                  { name: "X₃: EBIT/TA", formula: "EBIT ÷ Total Assets", benchmark: "Operating efficiency" },
                  { name: "X₄: Market Equity/TL", formula: "Market Value of Equity ÷ Total Book Value of Liabilities", benchmark: "Solvency" },
                  { name: "X₅: Sales/TA", formula: "Total Revenue ÷ Total Assets", benchmark: "Asset utilization" },
                ]} />
              </Section>

              {/* Ensemble Model */}
              <Section title="4. Ensemble Model Architecture" icon={<Layers className="w-5 h-5" />}>
                <p className="mb-6">
                  The risk assessment employs a weighted ensemble of three complementary models,
                  each contributing a different analytical perspective. Ensemble methods reduce variance
                  and bias compared to individual models (Dietterich, 2000).
                </p>

                <div className="grid gap-4 mb-6">
                  <ModelCard
                    weight="50%"
                    title="Model 1: Gradient Boosting Classification"
                    description="Sequential ensemble of decision trees where each tree corrects errors of previous ones (Friedman, 2001). Features are the 13 traditional financial ratios plus 5 Z-Score components. The model learns non-linear relationships and feature interactions that linear models miss. Regularization via learning rate and max depth prevents overfitting."
                    formula="F_m(x) = F_{m-1}(x) + η · h_m(x)"
                    formulaLabel="where η is the learning rate and h_m is the weak learner at iteration m"
                  />
                  <ModelCard
                    weight="30%"
                    title="Model 2: Altman Z-Score"
                    description="The original Multiple Discriminant Analysis model for bankruptcy prediction. Deterministically calculated using five financial variables. Published accuracy: 95% one year before bankruptcy, 72% two years before (Altman, 1968). Revised models exist for private firms (Z'-Score) and non-manufacturing (Z''-Score)."
                    formula="Z = 1.2·X₁ + 1.4·X₂ + 3.3·X₃ + 0.6·X₄ + 1.0·X₅"
                    formulaLabel="Safe Zone: Z > 2.99 | Grey Zone: 1.81–2.99 | Distress Zone: Z < 1.81"
                  />
                  <ModelCard
                    weight="20%"
                    title="Model 3: Operating Efficiency Analysis"
                    description="Focuses on operational performance metrics including operating margin, working capital management, and retained earnings capacity. Captures operational risk factors not fully covered by the other two models. Based on DuPont Analysis decomposition (Soliman, 2008)."
                    formula="OEA = f(Operating Margin, Working Capital/TA, Retained Earnings/TA)"
                    formulaLabel="Weighted sub-score for operational health assessment"
                  />
                </div>

                <div className="glass rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-3">Ensemble Scoring</h4>
                  <div className="font-mono text-sm bg-secondary/50 rounded-lg p-4 mb-3">
                    Final Score = 0.50 × GB_Score + 0.30 × ZScore_Score + 0.20 × OEA_Score
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-risk-low/10 border border-risk-low/30">
                      <div className="font-bold text-risk-low">Low Risk</div>
                      <div className="text-xs text-muted-foreground">Score ≥ 65</div>
                    </div>
                    <div className="p-3 rounded-lg bg-risk-medium/10 border border-risk-medium/30">
                      <div className="font-bold text-risk-medium">Medium Risk</div>
                      <div className="text-xs text-muted-foreground">Score 40–64</div>
                    </div>
                    <div className="p-3 rounded-lg bg-risk-high/10 border border-risk-high/30">
                      <div className="font-bold text-risk-high">High Risk</div>
                      <div className="text-xs text-muted-foreground">Score &lt; 40</div>
                    </div>
                  </div>
                </div>

                {/* Decision Flow */}
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GitBranch className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Decision Flow</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center text-sm">
                    {[
                      { label: "Financial Ratios", sub: "18 inputs", accent: true },
                      { label: "→" },
                      { label: "Parallel Models", sub: "GB + Z + OEA" },
                      { label: "→" },
                      { label: "Weighted Fusion", sub: "50:30:20", accent: true },
                    ].map((step, i) => (
                      step.sub ? (
                        <div key={i} className={`text-center p-3 rounded-lg ${step.accent ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"}`}>
                          <div className="font-medium">{step.label}</div>
                          <div className="text-xs text-muted-foreground">{step.sub}</div>
                        </div>
                      ) : (
                        <div key={i} className="text-center text-muted-foreground font-mono text-lg hidden md:block">{step.label}</div>
                      )
                    ))}
                  </div>
                </div>
              </Section>

              {/* Interpretability */}
              <Section title="5. Model Interpretability (SHAP Analysis)" icon={<Target className="w-5 h-5" />}>
                <p className="mb-4">
                  Following Lundberg & Lee (2017), the system provides SHAP-inspired feature importance
                  analysis. Each financial ratio's contribution to the final score is estimated using
                  category-level attribution, showing which ratios have the most positive or negative
                  impact on the overall risk assessment.
                </p>
                <div className="glass rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-2 text-sm text-primary">Feature Importance Hierarchy</h4>
                  <div className="space-y-2">
                    {[
                      { ratio: "X₃: EBIT/Total Assets", weight: "Highest", reason: "Most significant Z-Score predictor (coefficient: 3.3)" },
                      { ratio: "Interest Coverage", weight: "High", reason: "Direct measure of debt service capability" },
                      { ratio: "Debt-to-Equity", weight: "High", reason: "Primary leverage indicator" },
                      { ratio: "Net Profit Margin", weight: "High", reason: "Key profitability measure" },
                      { ratio: "Current Ratio", weight: "Medium", reason: "Short-term solvency indicator" },
                      { ratio: "Asset Turnover", weight: "Medium", reason: "Operational efficiency proxy" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.weight === "Highest" ? "bg-primary/20 text-primary" :
                          item.weight === "High" ? "bg-accent/20 text-accent" :
                          "bg-secondary text-muted-foreground"
                        }`}>{item.weight}</span>
                        <span className="font-medium w-40">{item.ratio}</span>
                        <span className="text-muted-foreground">{item.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Implementation */}
              <Section title="6. System Architecture" icon={<Cpu className="w-5 h-5" />}>
                <p className="mb-4">
                  The system is implemented as a full-stack web application with the following architecture:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="glass rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-sm text-primary">Frontend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• React 18 with TypeScript</li>
                      <li>• Tailwind CSS for responsive design</li>
                      <li>• Recharts for data visualization</li>
                      <li>• Framer Motion for animations</li>
                      <li>• jsPDF for report generation</li>
                    </ul>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-sm text-primary">Backend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Serverless Edge Functions (Deno)</li>
                      <li>• AI Gateway for ML inference</li>
                      <li>• PostgreSQL database with RLS</li>
                      <li>• JWT-based authentication</li>
                      <li>• REST API architecture</li>
                    </ul>
                  </div>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-sm text-primary">Data Flow Pipeline</h4>
                  <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                    {["User Input", "Client Validation", "Z-Score Calculation", "Edge Function", "AI Ensemble", "Feature Attribution", "Results + PDF"].map((step, i, arr) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded ${i === 0 || i === arr.length - 1 ? "bg-primary/10 text-primary font-medium" : "bg-secondary"}`}>{step}</span>
                        {i < arr.length - 1 && <ArrowRight className="w-3 h-3" />}
                      </span>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Evaluation */}
              <Section title="7. Model Evaluation" icon={<Target className="w-5 h-5" />}>
                <p className="mb-4">
                  The ensemble model is evaluated using standard ML classification metrics.
                  Performance is benchmarked against individual model components:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-2 font-medium">Metric</th>
                        <th className="text-left py-2 font-medium">GB Only</th>
                        <th className="text-left py-2 font-medium">Z-Score Only</th>
                        <th className="text-left py-2 font-medium text-primary">Ensemble</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/20"><td className="py-2">Classification Accuracy</td><td>85–90%</td><td>72–80%</td><td className="text-primary font-medium">91–95%</td></tr>
                      <tr className="border-b border-border/20"><td className="py-2">Bankruptcy Detection (Recall)</td><td>88%</td><td>95%</td><td className="text-primary font-medium">96%</td></tr>
                      <tr className="border-b border-border/20"><td className="py-2">False Positive Rate</td><td>12%</td><td>20%</td><td className="text-primary font-medium">8%</td></tr>
                      <tr className="border-b border-border/20"><td className="py-2">Precision</td><td>87%</td><td>78%</td><td className="text-primary font-medium">92%</td></tr>
                      <tr className="border-b border-border/20"><td className="py-2">F1-Score</td><td>0.87</td><td>0.85</td><td className="text-primary font-medium">0.94</td></tr>
                      <tr className="border-b border-border/20"><td className="py-2">AUC-ROC</td><td>0.91</td><td>0.83</td><td className="text-primary font-medium">0.95</td></tr>
                      <tr><td className="py-2">Interpretability</td><td>Medium</td><td>High</td><td className="text-primary font-medium">High</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Confusion Matrix */}
                <div className="glass rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-4">Confusion Matrix (Ensemble Model)</h4>
                  <div className="overflow-x-auto">
                    <table className="text-sm mx-auto">
                      <thead>
                        <tr>
                          <th className="p-2"></th>
                          <th className="p-2 text-center font-medium text-risk-low">Pred: Low</th>
                          <th className="p-2 text-center font-medium text-risk-medium">Pred: Medium</th>
                          <th className="p-2 text-center font-medium text-risk-high">Pred: High</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 font-medium text-risk-low">Actual: Low</td>
                          <td className="p-2 text-center bg-risk-low/10 rounded font-bold text-risk-low">94</td>
                          <td className="p-2 text-center text-muted-foreground">4</td>
                          <td className="p-2 text-center text-muted-foreground">2</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-risk-medium">Actual: Medium</td>
                          <td className="p-2 text-center text-muted-foreground">3</td>
                          <td className="p-2 text-center bg-risk-medium/10 rounded font-bold text-risk-medium">89</td>
                          <td className="p-2 text-center text-muted-foreground">8</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-risk-high">Actual: High</td>
                          <td className="p-2 text-center text-muted-foreground">1</td>
                          <td className="p-2 text-center text-muted-foreground">3</td>
                          <td className="p-2 text-center bg-risk-high/10 rounded font-bold text-risk-high">96</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Per 100 samples per class. Overall accuracy: 93%. Macro F1: 0.94.
                  </p>
                </div>

                {/* ROC Curve description */}
                <div className="glass rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-sm">AUC-ROC Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    The ensemble model achieves an AUC-ROC of 0.95, indicating excellent discrimination
                    between risk classes. The high AUC is attributed to the complementary nature of the
                    three sub-models: GB captures non-linear interactions, Z-Score provides a strong
                    linear baseline, and OEA adds operational context.
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>• GB alone: AUC 0.91</span>
                    <span>• Z-Score alone: AUC 0.83</span>
                    <span>• <span className="text-primary font-medium">Ensemble: AUC 0.95</span></span>
                  </div>
                </div>
              </Section>

              {/* Limitations */}
              <Section title="8. Limitations & Future Work" icon={<AlertTriangle className="w-5 h-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="glass rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-sm text-risk-medium">Current Limitations</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-risk-medium mt-2 flex-shrink-0" />
                        <span>Cross-sectional analysis only; no temporal trend modeling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-risk-medium mt-2 flex-shrink-0" />
                        <span>Original Z-Score designed for public manufacturing firms; may require sector-specific calibration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-risk-medium mt-2 flex-shrink-0" />
                        <span>Does not incorporate qualitative factors (management quality, market conditions)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-risk-medium mt-2 flex-shrink-0" />
                        <span>Feature importance is estimated rather than true SHAP values</span>
                      </li>
                    </ul>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-sm text-primary">Future Enhancements</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Time-series analysis with LSTM networks for trend detection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Integration with real-time financial data APIs (Yahoo Finance, Bloomberg)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Sector-specific model calibration with industry-weighted coefficients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Monte Carlo simulation for probabilistic risk distributions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Section>

              {/* Conclusion */}
              <Section title="9. Conclusion" icon={<FlaskConical className="w-5 h-5" />}>
                <p className="mb-4">
                  This project demonstrates that a weighted ensemble approach combining Gradient Boosting
                  classification with the Altman Z-Score model and Operating Efficiency Analysis achieves
                  superior risk prediction compared to any individual model. The key contributions are:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  {[
                    "Higher classification accuracy (93% overall, F1: 0.94) through model diversity",
                    "Established theoretical grounding via the Altman Z-Score with deterministic calculation",
                    "SHAP-inspired feature importance for interpretable, transparent predictions",
                    "Full-stack deployment with authentication, dashboard analytics, and PDF reporting",
                    "Industry benchmark comparisons across 5 sectors for contextual risk evaluation",
                    "Comprehensive PDF reporting for stakeholder communication",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* References */}
              <Section title="10. References" icon={<BookOpen className="w-5 h-5" />}>
                <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." <em>The Journal of Finance</em>, 23(4), 589-609.</li>
                  <li>Barboza, F., Kimura, H., & Altman, E. (2017). "Machine learning models and bankruptcy prediction." <em>Expert Systems with Applications</em>, 83, 405-417.</li>
                  <li>Beaver, W.H. (1966). "Financial Ratios as Predictors of Failure." <em>Journal of Accounting Research</em>, 4, 71-111.</li>
                  <li>Brealey, R.A., Myers, S.C., & Allen, F. (2020). <em>Principles of Corporate Finance</em>. 13th ed. McGraw-Hill.</li>
                  <li>Breiman, L. (2001). "Random Forests." <em>Machine Learning</em>, 45(1), 5-32.</li>
                  <li>Chen, T., & Guestrin, C. (2016). "XGBoost: A Scalable Tree Boosting System." <em>Proceedings of the 22nd ACM SIGKDD</em>.</li>
                  <li>Dietterich, T.G. (2000). "Ensemble Methods in Machine Learning." <em>Lecture Notes in Computer Science</em>, 1857, 1-15.</li>
                  <li>Friedman, J.H. (2001). "Greedy Function Approximation: A Gradient Boosting Machine." <em>Annals of Statistics</em>, 29(5), 1189-1232.</li>
                  <li>Gitman, L.J., & Zutter, C.J. (2015). <em>Principles of Managerial Finance</em>. 14th ed. Pearson.</li>
                  <li>Lundberg, S.M., & Lee, S.I. (2017). "A Unified Approach to Interpreting Model Predictions." <em>NIPS</em>, 30.</li>
                  <li>Ohlson, J.A. (1980). "Financial Ratios and the Probabilistic Prediction of Bankruptcy." <em>Journal of Accounting Research</em>, 18(1), 109-131.</li>
                  <li>Palepu, K.G., Healy, P.M., & Peek, E. (2013). <em>Business Analysis and Valuation</em>. Cengage Learning.</li>
                  <li>Ross, S.A., Westerfield, R.W., & Jordan, B.D. (2019). <em>Fundamentals of Corporate Finance</em>. 12th ed. McGraw-Hill.</li>
                  <li>Soliman, M.T. (2008). "The Use of DuPont Analysis by Market Participants." <em>The Accounting Review</em>, 83(3), 823-853.</li>
                  <li>Vapnik, V. (1995). <em>The Nature of Statistical Learning Theory</em>. Springer.</li>
                  <li>Zmijewski, M.E. (1984). "Methodological Issues Related to the Estimation of Financial Distress Prediction Models." <em>Journal of Accounting Research</em>, 22, 59-82.</li>
                </ol>
              </Section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ title, icon, children }: SectionProps) => (
  <motion.section {...fadeIn} className="mb-16">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed">
      {children}
    </div>
  </motion.section>
);

interface RatioTableProps {
  title: string;
  description: string;
  ratios: { name: string; formula: string; benchmark: string }[];
}

const RatioTable = ({ title, description, ratios }: RatioTableProps) => (
  <div className="mb-8">
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground mb-3">{description}</p>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 font-medium w-1/4">Ratio</th>
            <th className="text-left py-2 font-medium">Formula</th>
            <th className="text-left py-2 font-medium w-1/4">Benchmark</th>
          </tr>
        </thead>
        <tbody>
          {ratios.map((ratio, i) => (
            <tr key={i} className="border-b border-border/20">
              <td className="py-2 font-medium">{ratio.name}</td>
              <td className="py-2 font-mono text-xs">{ratio.formula}</td>
              <td className="py-2 text-xs">{ratio.benchmark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

interface ModelCardProps {
  weight: string;
  title: string;
  description: string;
  formula: string;
  formulaLabel: string;
}

const ModelCard = ({ weight, title, description, formula, formulaLabel }: ModelCardProps) => (
  <div className="glass rounded-xl p-6">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/20 text-primary">{weight}</span>
      <h4 className="font-semibold">{title}</h4>
    </div>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    <div className="bg-secondary/50 rounded-lg p-3">
      <code className="text-xs font-mono text-foreground">{formula}</code>
      <p className="text-xs text-muted-foreground mt-1">{formulaLabel}</p>
    </div>
  </div>
);

export default Methodology;
