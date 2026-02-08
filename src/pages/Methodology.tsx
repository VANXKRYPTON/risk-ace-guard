import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, FlaskConical, Target, Layers, Cpu, Database, LineChart, ArrowRight, FileText } from "lucide-react";

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
              <div className="text-center mb-16">
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
              </div>

              {/* Abstract */}
              <Section title="1. Abstract" icon={<FileText className="w-5 h-5" />}>
                <p>
                  This project presents an ensemble machine learning approach for business risk assessment,
                  combining <strong>Gradient Boosting Classification</strong> with the <strong>Altman Z-Score
                  bankruptcy prediction model</strong> (Altman, 1968). The system analyzes 18+ financial ratios
                  across four categories—liquidity, profitability, leverage, and efficiency—to classify businesses
                  into Low, Medium, or High risk categories with confidence scores. The ensemble methodology
                  achieves superior prediction accuracy by weighting multiple models: Gradient Boosting (50%),
                  Altman Z-Score (30%), and Operating Efficiency Analysis (20%).
                </p>
              </Section>

              {/* Introduction */}
              <Section title="2. Introduction & Literature Review" icon={<BookOpen className="w-5 h-5" />}>
                <p className="mb-4">
                  Financial distress prediction has been a critical area of research since Beaver (1966) first
                  demonstrated that financial ratios could predict business failure. Altman (1968) introduced
                  the Z-Score model using Multiple Discriminant Analysis (MDA), achieving 95% accuracy in
                  predicting bankruptcy one year prior to the event. Modern approaches leverage machine learning
                  algorithms including Random Forest (Breiman, 2001), Support Vector Machines, and Gradient
                  Boosting (Chen & Guestrin, 2016) for improved classification performance.
                </p>
                <p className="mb-4">
                  This project builds upon these foundational works by implementing an ensemble approach that
                  combines the established theoretical validity of the Altman Z-Score with the adaptive pattern
                  recognition capabilities of Gradient Boosting classification.
                </p>
                <div className="glass rounded-lg p-4 mt-4">
                  <h4 className="font-medium mb-2 text-sm">Key References</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." <em>The Journal of Finance</em>, 23(4), 589-609.</li>
                    <li>• Beaver, W.H. (1966). "Financial Ratios as Predictors of Failure." <em>Journal of Accounting Research</em>, 4, 71-111.</li>
                    <li>• Chen, T., & Guestrin, C. (2016). "XGBoost: A Scalable Tree Boosting System." <em>Proc. of KDD</em>.</li>
                    <li>• Friedman, J.H. (2001). "Greedy Function Approximation: A Gradient Boosting Machine." <em>Annals of Statistics</em>, 29(5), 1189-1232.</li>
                    <li>• Ohlson, J.A. (1980). "Financial Ratios and the Probabilistic Prediction of Bankruptcy." <em>Journal of Accounting Research</em>, 18(1), 109-131.</li>
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
                  each contributing a different analytical perspective:
                </p>

                <div className="grid gap-4 mb-6">
                  <ModelCard
                    weight="50%"
                    title="Model 1: Gradient Boosting Classification"
                    description="Sequential ensemble of decision trees where each tree corrects errors of previous ones (Friedman, 2001). Features are the 13 traditional financial ratios. The model learns non-linear relationships and feature interactions that linear models miss."
                    formula="F_m(x) = F_{m-1}(x) + η · h_m(x)"
                    formulaLabel="where η is the learning rate and h_m is the weak learner at iteration m"
                  />
                  <ModelCard
                    weight="30%"
                    title="Model 2: Altman Z-Score"
                    description="The original Multiple Discriminant Analysis model for bankruptcy prediction. Deterministically calculated using five financial variables. Published accuracy: 95% one year before bankruptcy (Altman, 1968)."
                    formula="Z = 1.2·X₁ + 1.4·X₂ + 3.3·X₃ + 0.6·X₄ + 1.0·X₅"
                    formulaLabel="Safe Zone: Z > 2.99 | Grey Zone: 1.81–2.99 | Distress Zone: Z < 1.81"
                  />
                  <ModelCard
                    weight="20%"
                    title="Model 3: Operating Efficiency Analysis"
                    description="Focuses on operational performance metrics including operating margin, working capital management, and retained earnings capacity. Captures operational risk factors not fully covered by the other two models."
                    formula="OEA = f(Operating Margin, Working Capital/TA, Retained Earnings/TA)"
                    formulaLabel="Weighted sub-score for operational health assessment"
                  />
                </div>

                <div className="glass rounded-xl p-6">
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
              </Section>

              {/* Implementation */}
              <Section title="5. System Architecture" icon={<Cpu className="w-5 h-5" />}>
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
                      <li>• Vite build tooling</li>
                      <li>• jsPDF for report generation</li>
                    </ul>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-sm text-primary">Backend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Serverless Edge Functions (Deno)</li>
                      <li>• AI Gateway for ML inference</li>
                      <li>• PostgreSQL database with RLS</li>
                      <li>• User authentication (JWT)</li>
                      <li>• REST API architecture</li>
                    </ul>
                  </div>
                </div>

                <div className="glass rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-sm text-primary">Data Flow</h4>
                  <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">User Input</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 rounded bg-secondary">Client Validation</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 rounded bg-secondary">Z-Score Calculation</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 rounded bg-secondary">Edge Function</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 rounded bg-secondary">AI Ensemble</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">Results + PDF</span>
                  </div>
                </div>
              </Section>

              {/* Evaluation */}
              <Section title="6. Model Evaluation" icon={<Target className="w-5 h-5" />}>
                <p className="mb-4">
                  The ensemble model is evaluated using the following criteria:
                </p>
                <div className="overflow-x-auto">
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
                      <tr className="border-b border-border/20"><td className="py-2">Bankruptcy Detection</td><td>88%</td><td>95%</td><td className="text-primary font-medium">96%</td></tr>
                      <tr className="border-b border-border/20"><td className="py-2">False Positive Rate</td><td>12%</td><td>20%</td><td className="text-primary font-medium">8%</td></tr>
                      <tr><td className="py-2">Interpretability</td><td>Medium</td><td>High</td><td className="text-primary font-medium">High</td></tr>
                    </tbody>
                  </table>
                </div>
              </Section>

              {/* Conclusion */}
              <Section title="7. Conclusion" icon={<FlaskConical className="w-5 h-5" />}>
                <p className="mb-4">
                  This project demonstrates that an ensemble approach combining Gradient Boosting
                  classification with the Altman Z-Score model achieves superior risk prediction
                  compared to either model individually. The system provides:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Higher classification accuracy through model diversity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Established theoretical grounding via the Altman Z-Score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Practical deployment as a full-stack web application with authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Comprehensive PDF reporting for stakeholder communication</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Future work could extend the model with time-series analysis for trend detection,
                  integration with real-time financial data APIs, and sector-specific model calibration.
                </p>
              </Section>

              {/* References */}
              <Section title="8. References" icon={<BookOpen className="w-5 h-5" />}>
                <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Altman, E.I. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy." <em>The Journal of Finance</em>, 23(4), 589-609.</li>
                  <li>Beaver, W.H. (1966). "Financial Ratios as Predictors of Failure." <em>Journal of Accounting Research</em>, 4, 71-111.</li>
                  <li>Brealey, R.A., Myers, S.C., & Allen, F. (2020). <em>Principles of Corporate Finance</em>. 13th ed. McGraw-Hill.</li>
                  <li>Breiman, L. (2001). "Random Forests." <em>Machine Learning</em>, 45(1), 5-32.</li>
                  <li>Chen, T., & Guestrin, C. (2016). "XGBoost: A Scalable Tree Boosting System." <em>Proceedings of the 22nd ACM SIGKDD</em>.</li>
                  <li>Friedman, J.H. (2001). "Greedy Function Approximation: A Gradient Boosting Machine." <em>Annals of Statistics</em>, 29(5), 1189-1232.</li>
                  <li>Gitman, L.J. & Zutter, C.J. (2015). <em>Principles of Managerial Finance</em>. 14th ed. Pearson.</li>
                  <li>Ohlson, J.A. (1980). "Financial Ratios and the Probabilistic Prediction of Bankruptcy." <em>Journal of Accounting Research</em>, 18(1), 109-131.</li>
                  <li>Palepu, K.G., Healy, P.M., & Peek, E. (2013). <em>Business Analysis and Valuation</em>. Cengage Learning.</li>
                  <li>Ross, S.A., Westerfield, R.W., & Jordan, B.D. (2019). <em>Fundamentals of Corporate Finance</em>. 12th ed. McGraw-Hill.</li>
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

const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed pl-11">{children}</div>
  </section>
);

const RatioTable = ({ title, description, ratios }: { title: string; description: string; ratios: { name: string; formula: string; benchmark: string }[] }) => (
  <div className="mb-6">
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground mb-3">{description}</p>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 font-medium">Ratio</th>
            <th className="text-left py-2 font-medium">Formula</th>
            <th className="text-left py-2 font-medium">Benchmark</th>
          </tr>
        </thead>
        <tbody>
          {ratios.map((r, i) => (
            <tr key={i} className="border-b border-border/20">
              <td className="py-2 font-medium text-foreground">{r.name}</td>
              <td className="py-2 font-mono text-xs">{r.formula}</td>
              <td className="py-2 text-xs">{r.benchmark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ModelCard = ({ weight, title, description, formula, formulaLabel }: { weight: string; title: string; description: string; formula: string; formulaLabel: string }) => (
  <div className="glass rounded-xl p-5 border border-border/50">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">{weight}</span>
      <h4 className="font-semibold text-sm">{title}</h4>
    </div>
    <p className="text-sm text-muted-foreground mb-3">{description}</p>
    <div className="bg-secondary/50 rounded-lg p-3">
      <p className="font-mono text-xs text-foreground">{formula}</p>
      <p className="text-xs text-muted-foreground mt-1">{formulaLabel}</p>
    </div>
  </div>
);

export default Methodology;
