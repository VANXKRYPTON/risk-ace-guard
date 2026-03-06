import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const ArchitectureDocument = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let y = 20;

    const addPageIfNeeded = (needed: number) => {
      if (y + needed > 275) {
        doc.addPage();
        y = 20;
      }
    };

    const title = (text: string, size = 16) => {
      addPageIfNeeded(15);
      doc.setFontSize(size);
      doc.setFont("helvetica", "bold");
      doc.text(text, margin, y);
      y += size * 0.6 + 4;
    };

    const subtitle = (text: string) => {
      addPageIfNeeded(12);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(text, margin, y);
      y += 8;
    };

    const subsubtitle = (text: string) => {
      addPageIfNeeded(10);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(text, margin + 4, y);
      y += 7;
    };

    const body = (text: string) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, contentWidth);
      addPageIfNeeded(lines.length * 5);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 3;
    };

    const bullet = (text: string) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, contentWidth - 8);
      addPageIfNeeded(lines.length * 5);
      doc.text("•", margin + 2, y);
      doc.text(lines, margin + 8, y);
      y += lines.length * 5 + 2;
    };

    const spacer = (h = 4) => { y += h; };

    // --- COVER ---
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Architecture Document", pageWidth / 2, 60, { align: "center" });
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Business Risk Assessment System", pageWidth / 2, 75, { align: "center" });
    doc.setFontSize(11);
    doc.text("ML-Powered Financial Risk Classifier", pageWidth / 2, 85, { align: "center" });
    doc.setFontSize(10);
    doc.text("Using Gradient Boosting, Altman Z-Score & Operating Efficiency Analysis", pageWidth / 2, 95, { align: "center" });

    // --- PAGE 2: APPLICATION ARCHITECTURE ---
    doc.addPage();
    y = 20;

    title("1. Application Architecture");
    spacer();

    body("The Business Risk Assessment System follows a Serverless Architecture pattern, leveraging cloud-managed services to eliminate infrastructure management while providing scalability, cost efficiency, and high availability.");
    spacer();

    subtitle("1.1 Architecture Pattern: Serverless");
    body("The system adopts a serverless architecture where the frontend is a single-page application (SPA) built with React + TypeScript + Vite, and all backend logic runs as stateless edge functions on Lovable Cloud (Supabase). This eliminates the need for traditional server provisioning.");
    spacer();

    subsubtitle("Key Characteristics:");
    bullet("No server management — all backend logic runs as edge functions invoked on demand.");
    bullet("Auto-scaling — edge functions scale automatically based on incoming requests.");
    bullet("Pay-per-execution — compute costs are proportional to actual usage.");
    bullet("Event-driven — assessment requests trigger serverless function execution.");
    spacer();

    subtitle("1.2 Frontend Layer (Client-Side SPA)");
    subsubtitle("Technology Stack:");
    bullet("React 18 with TypeScript for type-safe component development.");
    bullet("Vite as the build tool for fast HMR and optimized production builds.");
    bullet("Tailwind CSS with a custom design system using HSL-based semantic tokens.");
    bullet("Framer Motion for smooth UI animations and transitions.");
    bullet("Recharts for data visualization (Radar charts, Bar charts, Gauge visualizations).");
    bullet("React Router v6 for client-side routing across 5 pages: Home, Auth, Dashboard, Methodology, 404.");
    bullet("React Query (TanStack) for server state management and caching.");
    bullet("shadcn/ui component library for consistent, accessible UI primitives.");
    spacer();

    subsubtitle("Pages & Components:");
    bullet("Index (Landing Page) — Hero section, ratio input form, risk results display, industry presets.");
    bullet("Auth — Email/password authentication with sign-up and sign-in forms.");
    bullet("Dashboard — Assessment history, risk distribution charts, score trend analysis.");
    bullet("Methodology — Academic-grade explanation of the ML ensemble approach, formulas, references.");
    spacer();

    subtitle("1.3 Backend Layer (Serverless Edge Functions)");
    body("All server-side logic is implemented as Deno-based edge functions deployed on Lovable Cloud:");
    spacer();

    subsubtitle("predict-risk Edge Function:");
    bullet("Accepts 14 financial ratios as input via POST request.");
    bullet("Runs a 3-model ensemble: Gradient Boosting classifier, Altman Z-Score calculator, and Operating Efficiency Analyzer.");
    bullet("Returns risk classification (Low/Medium/High), confidence score, category scores (Liquidity, Profitability, Leverage, Efficiency), and key risk factors.");
    bullet("Stateless execution — no persistent server process.");
    spacer();

    subtitle("1.4 Authentication & Authorization");
    bullet("Supabase Auth handles user registration, login, and session management via JWT tokens.");
    bullet("Row-Level Security (RLS) policies enforce data access control at the database level.");
    bullet("Assessment history is tied to session IDs (anonymous) or user IDs (authenticated).");
    spacer();

    // --- PAGE: DATABASE ---
    doc.addPage();
    y = 20;

    title("2. Database Architecture");
    spacer();

    subtitle("2.1 Database System");
    body("The system uses PostgreSQL (managed via Lovable Cloud / Supabase) as its primary data store with Row-Level Security enabled on all tables.");
    spacer();

    subtitle("2.2 ER Diagram (Entity Relationships)");
    spacer();

    body("Entities and their relationships:");
    spacer();

    subsubtitle("Table: assessment_history");
    body("Primary table storing all risk assessments performed by users.");
    bullet("id (UUID, PK) — Unique assessment identifier.");
    bullet("session_id (TEXT, NOT NULL) — Anonymous session tracking.");
    bullet("user_id (UUID, FK → auth.users, NULLABLE) — Links to authenticated user.");
    bullet("company_name (TEXT, NULLABLE) — Optional company label.");
    bullet("Financial Ratios (14 NUMERIC columns): current_ratio, quick_ratio, cash_ratio, gross_profit_margin, net_profit_margin, return_on_assets, return_on_equity, debt_to_equity, debt_ratio, interest_coverage, asset_turnover, inventory_turnover, receivables_turnover.");
    bullet("Category Scores (4 NUMERIC columns): liquidity_score, profitability_score, leverage_score, efficiency_score.");
    bullet("Results: risk_score (NUMERIC), overall_risk (TEXT), confidence (NUMERIC), factors (JSONB).");
    bullet("created_at (TIMESTAMPTZ, DEFAULT now()).");
    spacer();

    subsubtitle("Table: profiles");
    body("Stores additional user profile information.");
    bullet("id (UUID, PK) — Profile identifier.");
    bullet("user_id (UUID, NOT NULL) — References authenticated user.");
    bullet("display_name (TEXT, NULLABLE) — User's display name.");
    bullet("created_at, updated_at (TIMESTAMPTZ).");
    spacer();

    subsubtitle("Relationships:");
    bullet("assessment_history.user_id → auth.users(id) — One-to-Many: A user can have many assessments.");
    bullet("profiles.user_id → auth.users(id) — One-to-One: Each user has one profile.");
    spacer();

    subtitle("2.3 Schema Design Principles");
    bullet("Denormalized assessment storage — all 14 ratios stored directly for fast retrieval and PDF export.");
    bullet("JSONB factors column — flexible storage for varying numbers of risk factors per assessment.");
    bullet("Session-based tracking — allows anonymous users to view their assessment history within a browser session.");
    bullet("RLS-enforced access — users can only read/write their own assessments.");

    // --- PAGE: DATA EXCHANGE ---
    doc.addPage();
    y = 20;

    title("3. Data Exchange Contract");
    spacer();

    subtitle("3.1 Frequency of Data Exchanges");
    body("Data exchanges occur on-demand, triggered by user interactions:");
    spacer();
    bullet("Assessment Request: User submits financial ratios → edge function processes → results returned (single request-response cycle, ~1-3 seconds).");
    bullet("History Retrieval: Dashboard loads assessment history on page mount and on new assessment completion.");
    bullet("Authentication: Token refresh occurs automatically via Supabase client SDK (JWT-based, ~1 hour expiry).");
    bullet("No scheduled/batch data exchanges — all interactions are real-time and event-driven.");
    spacer();

    subtitle("3.2 Data Sets");
    spacer();

    subsubtitle("Input Data Set (Assessment Request):");
    body("14 financial ratios submitted as JSON:");
    body('{ "currentRatio": 2.1, "quickRatio": 1.5, "cashRatio": 0.8, "grossProfitMargin": 35.2, "netProfitMargin": 12.5, "returnOnAssets": 8.3, "returnOnEquity": 15.7, "debtToEquity": 1.2, "debtRatio": 0.45, "interestCoverage": 5.5, "assetTurnover": 1.8, "inventoryTurnover": 8.2, "receivablesTurnover": 12.5 }');
    spacer();

    subsubtitle("Output Data Set (Assessment Response):");
    body("Risk classification result returned as JSON:");
    body('{ "overallRisk": "low|medium|high", "riskScore": 0-100, "confidence": 0-100, "altmanZScore": number, "categoryScores": { "liquidity": 0-100, "profitability": 0-100, "leverage": 0-100, "efficiency": 0-100 }, "factors": [{ "name": string, "impact": "positive|negative|neutral", "description": string }] }');
    spacer();

    subtitle("3.3 Mode of Exchanges");
    spacer();

    subsubtitle("API (Primary Mode):");
    bullet("Protocol: HTTPS (TLS 1.3)");
    bullet("Format: RESTful JSON API");
    bullet("Authentication: Bearer JWT token in Authorization header");
    bullet("Edge Function Endpoint: POST /functions/v1/predict-risk");
    bullet("Client SDK: @supabase/supabase-js handles connection pooling, auth headers, and retries.");
    spacer();

    subsubtitle("Database Queries (Secondary Mode):");
    bullet("Protocol: PostgreSQL wire protocol over TLS via Supabase PostgREST.");
    bullet("Client uses supabase.from('table').select/insert/update/delete pattern.");
    bullet("RLS policies enforce row-level access control transparently.");
    spacer();

    subsubtitle("No File or Queue Exchanges:");
    body("The system does not use file-based data exchange or message queues. All communication is synchronous API calls. PDF export is generated entirely client-side using jsPDF without server involvement.");

    // --- PAGE: DIAGRAMS DESCRIPTION ---
    doc.addPage();
    y = 20;

    title("4. System Diagrams");
    spacer();

    subtitle("4.1 Component Diagram");
    body("The system consists of three primary layers:");
    spacer();
    subsubtitle("Presentation Layer:");
    bullet("React SPA (Pages: Index, Auth, Dashboard, Methodology)");
    bullet("UI Components: RatioInputForm, RiskResults, ZScoreGauge, SensitivityAnalysis, IndustryComparison, RecommendationsPanel, PDFExport, AssessmentHistory");
    spacer();
    subsubtitle("Application Layer:");
    bullet("Edge Function: predict-risk (Ensemble ML Engine)");
    bullet("Supabase Auth (JWT-based authentication)");
    bullet("PostgREST API (auto-generated REST endpoints)");
    spacer();
    subsubtitle("Data Layer:");
    bullet("PostgreSQL Database (assessment_history, profiles tables)");
    bullet("Row-Level Security policies");
    spacer();

    subtitle("4.2 Sequence Diagram — Risk Assessment Flow");
    body("1. User enters 14 financial ratios in RatioInputForm.");
    body("2. Client validates inputs and sends POST to predict-risk edge function.");
    body("3. Edge function runs Gradient Boosting classification.");
    body("4. Edge function calculates Altman Z-Score (Z = 1.2·X₁ + 1.4·X₂ + 3.3·X₃ + 0.6·X₄ + 1.0·X₅).");
    body("5. Edge function performs Operating Efficiency Analysis.");
    body("6. Results from all 3 models are combined via weighted ensemble.");
    body("7. Response returned to client with risk level, scores, and factors.");
    body("8. Client renders RiskResults with charts, gauge, recommendations.");
    body("9. Assessment is saved to assessment_history table.");
    body("10. Dashboard updates with new entry on next load.");
    spacer();

    subtitle("4.3 Deployment Diagram");
    bullet("Frontend: Deployed as static SPA on Lovable CDN (global edge network).");
    bullet("Edge Functions: Deployed on Deno runtime (Supabase Edge, auto-scaling).");
    bullet("Database: Managed PostgreSQL instance on Lovable Cloud.");
    bullet("Auth: Managed Supabase Auth service (GoTrue).");
    bullet("DNS: Custom domain via Lovable publishing (risk-ace-guard.lovable.app).");
    spacer();

    subtitle("4.4 Data Flow Diagram (DFD Level 0)");
    body("External Entity: User (Analyst/Business Owner)");
    body("Process: Business Risk Assessment System");
    body("Data Store: PostgreSQL Database");
    spacer();
    body("Flows:");
    bullet("User → System: Financial ratios (14 inputs) + Company name");
    bullet("System → User: Risk classification, scores, charts, PDF report");
    bullet("System → Database: Assessment record (ratios + results)");
    bullet("Database → System: Historical assessments for dashboard");

    doc.save("Architecture_Document_BusinessRiskAssessment.pdf");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Link>
          <Button onClick={generatePDF} className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Document Preview */}
      <div className="container mx-auto px-4 py-8">
        <div ref={contentRef} className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8 md:p-12 space-y-8 shadow-lg">
          {/* Title */}
          <div className="text-center border-b border-border pb-8">
            <h1 className="text-3xl font-bold mb-2">Architecture Document</h1>
            <p className="text-lg text-muted-foreground">Business Risk Assessment System</p>
            <p className="text-sm text-muted-foreground mt-1">ML-Powered Financial Risk Classifier</p>
          </div>

          {/* 1. Application Architecture */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">1. Application Architecture</h2>
            <p className="text-muted-foreground">The Business Risk Assessment System follows a <strong className="text-foreground">Serverless Architecture</strong> pattern, leveraging cloud-managed services for scalability, cost efficiency, and high availability.</p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1.1 Architecture Pattern: Serverless</h3>
              <p className="text-muted-foreground">The system adopts a serverless architecture where the frontend is a single-page application (SPA) built with React + TypeScript + Vite, and all backend logic runs as stateless edge functions on Lovable Cloud. This eliminates traditional server provisioning.</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
                <li>No server management — backend logic runs as edge functions on demand</li>
                <li>Auto-scaling — functions scale automatically based on requests</li>
                <li>Pay-per-execution — costs proportional to actual usage</li>
                <li>Event-driven — assessment requests trigger serverless function execution</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1.2 Frontend Layer (Client-Side SPA)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "React 18 + TypeScript",
                  "Vite (build tool)",
                  "Tailwind CSS + Design Tokens",
                  "Framer Motion (animations)",
                  "Recharts (data visualization)",
                  "React Router v6 (5 pages)",
                  "TanStack React Query",
                  "shadcn/ui components",
                ].map((tech) => (
                  <div key={tech} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1.3 Backend Layer (Edge Functions)</h3>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <h4 className="font-medium mb-2">predict-risk Edge Function</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Accepts 14 financial ratios via POST request</li>
                  <li>Runs 3-model ensemble: Gradient Boosting + Altman Z-Score + OEA</li>
                  <li>Returns risk classification, confidence, category scores, factors</li>
                  <li>Stateless execution — Deno runtime</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Database */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">2. Database Architecture</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">2.1 ER Diagram</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <h4 className="font-semibold mb-3 text-primary">assessment_history</h4>
                  <div className="text-xs font-mono space-y-1 text-muted-foreground">
                    <p><span className="text-foreground">id</span> UUID PK</p>
                    <p><span className="text-foreground">session_id</span> TEXT NOT NULL</p>
                    <p><span className="text-foreground">user_id</span> UUID FK → auth.users</p>
                    <p><span className="text-foreground">company_name</span> TEXT</p>
                    <p className="text-primary/70 pt-1">— 14 Financial Ratio columns —</p>
                    <p className="text-primary/70">— 4 Category Score columns —</p>
                    <p><span className="text-foreground">risk_score</span> NUMERIC</p>
                    <p><span className="text-foreground">overall_risk</span> TEXT</p>
                    <p><span className="text-foreground">confidence</span> NUMERIC</p>
                    <p><span className="text-foreground">factors</span> JSONB</p>
                    <p><span className="text-foreground">created_at</span> TIMESTAMPTZ</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <h4 className="font-semibold mb-3 text-primary">profiles</h4>
                  <div className="text-xs font-mono space-y-1 text-muted-foreground">
                    <p><span className="text-foreground">id</span> UUID PK</p>
                    <p><span className="text-foreground">user_id</span> UUID NOT NULL</p>
                    <p><span className="text-foreground">display_name</span> TEXT</p>
                    <p><span className="text-foreground">created_at</span> TIMESTAMPTZ</p>
                    <p><span className="text-foreground">updated_at</span> TIMESTAMPTZ</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">2.2 Schema Design</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
                <li>Denormalized assessment storage for fast retrieval & PDF export</li>
                <li>JSONB factors column for flexible risk factor storage</li>
                <li>Session-based tracking for anonymous user history</li>
                <li>RLS-enforced row-level access control</li>
              </ul>
            </div>
          </section>

          {/* 3. Data Exchange */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">3. Data Exchange Contract</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">3.1 Frequency of Data Exchanges</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
                <li>Assessment Request: On-demand (~1-3 seconds per request-response cycle)</li>
                <li>History Retrieval: On dashboard page load</li>
                <li>Auth Token Refresh: Automatic via SDK (~1 hour JWT expiry)</li>
                <li>No scheduled/batch exchanges — all real-time, event-driven</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">3.2 Data Sets</h3>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <h4 className="font-medium text-sm mb-2">Input: 14 Financial Ratios (JSON)</h4>
                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">{`{ "currentRatio": 2.1, "quickRatio": 1.5, "cashRatio": 0.8,
  "grossProfitMargin": 35.2, "netProfitMargin": 12.5,
  "returnOnAssets": 8.3, "returnOnEquity": 15.7,
  "debtToEquity": 1.2, "debtRatio": 0.45,
  "interestCoverage": 5.5, "assetTurnover": 1.8,
  "inventoryTurnover": 8.2, "receivablesTurnover": 12.5 }`}</pre>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 mt-3">
                <h4 className="font-medium text-sm mb-2">Output: Risk Assessment (JSON)</h4>
                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">{`{ "overallRisk": "low|medium|high",
  "riskScore": 0-100, "confidence": 0-100,
  "altmanZScore": number,
  "categoryScores": { liquidity, profitability, leverage, efficiency },
  "factors": [{ name, impact, description }] }`}</pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">3.3 Mode of Exchanges</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li><strong className="text-foreground">API (Primary):</strong> HTTPS RESTful JSON — POST /functions/v1/predict-risk with Bearer JWT</li>
                <li><strong className="text-foreground">Database Queries (Secondary):</strong> PostgreSQL via PostgREST with RLS enforcement</li>
                <li><strong className="text-foreground">No File/Queue exchanges:</strong> All synchronous API calls. PDF generated client-side via jsPDF.</li>
              </ul>
            </div>
          </section>

          {/* 4. Diagrams */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">4. System Diagrams</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4.1 Component Diagram</h3>
              <div className="space-y-3">
                {[
                  { layer: "Presentation Layer", items: "React SPA — Index, Auth, Dashboard, Methodology pages; RatioInputForm, RiskResults, ZScoreGauge, SensitivityAnalysis, IndustryComparison, RecommendationsPanel, PDFExport, AssessmentHistory components" },
                  { layer: "Application Layer", items: "predict-risk edge function (Ensemble ML), Supabase Auth (JWT), PostgREST API" },
                  { layer: "Data Layer", items: "PostgreSQL (assessment_history, profiles), Row-Level Security policies" },
                ].map((l) => (
                  <div key={l.layer} className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                    <span className="font-medium text-sm">{l.layer}:</span>
                    <span className="text-sm text-muted-foreground ml-2">{l.items}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4.2 Sequence: Risk Assessment Flow</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1 pl-4 text-sm">
                <li>User enters 14 financial ratios in RatioInputForm</li>
                <li>Client validates inputs → POST to predict-risk edge function</li>
                <li>Edge function runs Gradient Boosting classification</li>
                <li>Calculates Altman Z-Score (Z = 1.2·X₁ + 1.4·X₂ + 3.3·X₃ + 0.6·X₄ + 1.0·X₅)</li>
                <li>Performs Operating Efficiency Analysis</li>
                <li>Combines 3 models via weighted ensemble</li>
                <li>Returns risk level, scores, and factors to client</li>
                <li>Client renders RiskResults with charts, gauge, recommendations</li>
                <li>Assessment saved to assessment_history table</li>
                <li>Dashboard updates on next load</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4.3 Deployment Diagram</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
                <li>Frontend: Static SPA on Lovable CDN (global edge)</li>
                <li>Edge Functions: Deno runtime (auto-scaling)</li>
                <li>Database: Managed PostgreSQL on Lovable Cloud</li>
                <li>Auth: Managed GoTrue authentication service</li>
                <li>DNS: risk-ace-guard.lovable.app</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDocument;
