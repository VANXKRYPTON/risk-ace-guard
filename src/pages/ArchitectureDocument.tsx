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

    // ============================
    // 1. APPLICATION ARCHITECTURE
    // ============================
    doc.addPage();
    y = 20;

    title("1. Application Architecture");
    spacer();
    body("This section evaluates three major architecture patterns and explains why the Serverless pattern was selected for the Business Risk Assessment System.");
    spacer();

    // 1.1 Microservices
    subtitle("1.1 Microservices Architecture");
    body("Microservices decompose an application into small, independently deployable services, each owning its own data and communicating via APIs or message queues.");
    spacer();
    subsubtitle("Characteristics:");
    bullet("Each service runs in its own process and can be deployed independently.");
    bullet("Services communicate over lightweight protocols (HTTP/REST, gRPC, or messaging).");
    bullet("Independent scaling — each service scales based on its own demand.");
    bullet("Technology-agnostic — different services can use different languages/frameworks.");
    spacer();
    subsubtitle("Why Not Chosen:");
    body("Our system has a single primary backend function (risk prediction). Splitting it into microservices would introduce unnecessary complexity, inter-service communication overhead, and deployment burden without proportional benefits. The system does not have the scale or feature diversity that justifies a microservices approach.");
    spacer();

    // 1.2 Event-Driven
    subtitle("1.2 Event-Driven Architecture");
    body("Event-Driven Architecture (EDA) structures applications around the production, detection, and reaction to events. Components communicate through event brokers or message queues.");
    spacer();
    subsubtitle("Characteristics:");
    bullet("Loose coupling — producers and consumers are independent.");
    bullet("Asynchronous communication via event bus (Kafka, RabbitMQ, etc.).");
    bullet("Event sourcing — state changes captured as immutable events.");
    bullet("Complex event processing for real-time analytics.");
    spacer();
    subsubtitle("Why Not Chosen:");
    body("The risk assessment workflow is synchronous by nature: the user submits ratios and expects immediate results. An event-driven approach would add latency and complexity (message brokers, event stores) without improving user experience. There is no need for asynchronous event processing or decoupled event streams in this system.");
    spacer();

    // 1.3 Serverless (Selected)
    subtitle("1.3 Serverless Architecture (Selected)");
    body("The Business Risk Assessment System follows a Serverless Architecture pattern, leveraging cloud-managed services for scalability, cost efficiency, and high availability. This is the architecture selected for our project.");
    spacer();
    subsubtitle("Key Characteristics:");
    bullet("No server management — all backend logic runs as edge functions invoked on demand.");
    bullet("Auto-scaling — edge functions scale automatically based on incoming requests.");
    bullet("Pay-per-execution — compute costs are proportional to actual usage.");
    bullet("Event-driven invocation — assessment requests trigger serverless function execution.");
    bullet("Stateless — each function execution is independent with no persistent server process.");
    spacer();

    subsubtitle("Why Serverless Was Chosen:");
    bullet("Single backend function (predict-risk) maps perfectly to serverless — one function, on-demand execution.");
    bullet("Zero infrastructure management — no servers to provision, patch, or monitor.");
    bullet("Cost-effective for variable traffic — no idle server costs; pay only when assessments are processed.");
    bullet("Built-in scalability — handles traffic spikes automatically without configuration.");
    bullet("Fast deployment — Lovable Cloud deploys edge functions automatically on code change.");
    spacer();

    subsubtitle("Frontend Layer (Client-Side SPA):");
    bullet("React 18 with TypeScript for type-safe component development.");
    bullet("Vite as the build tool for fast HMR and optimized production builds.");
    bullet("Tailwind CSS with a custom design system using HSL-based semantic tokens.");
    bullet("Framer Motion for smooth UI animations and transitions.");
    bullet("Recharts for data visualization (Radar charts, Bar charts, Gauge visualizations).");
    bullet("React Router v6 for client-side routing across 5 pages: Home, Auth, Dashboard, Methodology, Architecture.");
    bullet("React Query (TanStack) for server state management and caching.");
    bullet("shadcn/ui component library for consistent, accessible UI primitives.");
    spacer();

    subsubtitle("Backend Layer (Serverless Edge Functions):");
    bullet("predict-risk Edge Function: Accepts 14 financial ratios via POST, runs 3-model ensemble (Gradient Boosting + Altman Z-Score + OEA), returns risk classification with confidence scores.");
    bullet("Supabase Auth: JWT-based authentication for user registration, login, and session management.");
    bullet("PostgREST: Auto-generated REST API for database operations with RLS enforcement.");
    spacer();

    // ============================
    // 2. DATABASE ARCHITECTURE
    // ============================
    doc.addPage();
    y = 20;

    title("2. Database Architecture");
    spacer();
    body("The system uses PostgreSQL (managed via Lovable Cloud) as its primary data store with Row-Level Security (RLS) enabled on all tables.");
    spacer();

    subtitle("2.1 ER Diagram");
    spacer();

    subsubtitle("Table: assessment_history");
    body("Primary table storing all risk assessments performed by users.");
    bullet("id (UUID, PK) — Unique assessment identifier.");
    bullet("session_id (TEXT, NOT NULL) — Anonymous session tracking.");
    bullet("user_id (UUID, FK -> auth.users, NULLABLE) — Links to authenticated user.");
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
    bullet("assessment_history.user_id -> auth.users(id) — One-to-Many: A user can have many assessments.");
    bullet("profiles.user_id -> auth.users(id) — One-to-One: Each user has one profile.");
    spacer();

    subtitle("2.2 Schema Design Principles");
    bullet("Denormalized assessment storage — all 14 ratios stored directly for fast retrieval and PDF export.");
    bullet("JSONB factors column — flexible storage for varying numbers of risk factors per assessment.");
    bullet("Session-based tracking — allows anonymous users to view their assessment history within a browser session.");
    bullet("RLS-enforced access — users can only read/write their own assessments.");
    spacer();

    // ============================
    // 3. DATA EXCHANGE CONTRACT
    // ============================
    doc.addPage();
    y = 20;

    title("3. Data Exchange Contract");
    spacer();

    subtitle("3.1 Frequency of Data Exchanges");
    body("Data exchanges occur on-demand, triggered by user interactions:");
    spacer();
    bullet("Assessment Request: User submits financial ratios -> edge function processes -> results returned (single request-response cycle, ~1-3 seconds).");
    bullet("History Retrieval: Dashboard loads assessment history on page mount and on new assessment completion.");
    bullet("Authentication: Token refresh occurs automatically via client SDK (JWT-based, ~1 hour expiry).");
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
    bullet("Protocol: PostgreSQL wire protocol over TLS via PostgREST.");
    bullet("Client uses supabase.from('table').select/insert/update/delete pattern.");
    bullet("RLS policies enforce row-level access control transparently.");
    spacer();

    subsubtitle("No File or Queue Exchanges:");
    body("The system does not use file-based data exchange or message queues. All communication is synchronous API calls. PDF export is generated entirely client-side using jsPDF without server involvement.");

    // ============================
    // 4. SYSTEM DIAGRAMS
    // ============================
    doc.addPage();
    y = 20;

    title("4. System Diagrams");
    spacer();

    // 4.1 Use Case Diagram
    subtitle("4.1 Use Case Diagram");
    body("Actors: Anonymous User, Authenticated User, System (Edge Function)");
    spacer();
    subsubtitle("Anonymous User:");
    bullet("Enter financial ratios and submit for risk assessment");
    bullet("View risk results, Z-Score gauge, sensitivity analysis");
    bullet("Load industry presets (Manufacturing, Technology, Retail, Healthcare)");
    bullet("Export assessment as PDF report");
    bullet("View methodology documentation");
    spacer();
    subsubtitle("Authenticated User (extends Anonymous):");
    bullet("Sign up / Sign in via email and password");
    bullet("View assessment history on Dashboard");
    bullet("Track risk score trends over time");
    bullet("View risk distribution charts");
    spacer();
    subsubtitle("System (Edge Function):");
    bullet("Validate input ratios");
    bullet("Execute Gradient Boosting classification");
    bullet("Calculate Altman Z-Score");
    bullet("Perform Operating Efficiency Analysis");
    bullet("Combine models via weighted ensemble and return results");
    spacer();

    // 4.2 Class Diagram
    subtitle("4.2 Class Diagram (Component Model)");
    body("Key classes/interfaces in the system:");
    spacer();
    subsubtitle("FinancialRatios (Interface):");
    body("Properties: currentRatio, quickRatio, cashRatio, grossProfitMargin, operatingMargin, netProfitMargin, returnOnAssets, returnOnEquity, debtToEquity, debtRatio, interestCoverage, assetTurnover, inventoryTurnover, receivablesTurnover, workingCapitalTA, retainedEarningsTA, ebitTA, marketEquityTL, salesTA");
    spacer();
    subsubtitle("RiskAssessment (Interface):");
    body("Properties: overallRisk (low|medium|high), riskScore (0-100), confidence (0-100), altmanZScore (number), categoryScores ({ liquidity, profitability, leverage, efficiency }), factors (Array<RiskFactor>)");
    spacer();
    subsubtitle("RiskFactor (Interface):");
    body("Properties: name (string), impact (positive|negative|neutral), description (string)");
    spacer();

    doc.addPage();
    y = 20;

    // 4.3 DFD Level 0
    subtitle("4.3 Data Flow Diagram (DFD Level 0)");
    body("External Entity: User (Analyst / Business Owner)");
    body("Process: Business Risk Assessment System");
    body("Data Store: PostgreSQL Database");
    spacer();
    body("Data Flows:");
    bullet("User -> System: Financial ratios (14 inputs) + Company name");
    bullet("System -> predict-risk Function: Ratio data for ML processing");
    bullet("predict-risk Function -> System: Risk classification, scores, factors");
    bullet("System -> User: Risk results, charts, gauge visualization, PDF report");
    bullet("System -> Database: Assessment record (ratios + results + metadata)");
    bullet("Database -> System: Historical assessments for dashboard display");
    spacer();

    // 4.4 Component Diagram
    subtitle("4.4 Component Diagram");
    body("The system consists of three primary layers:");
    spacer();
    subsubtitle("Presentation Layer (React SPA):");
    bullet("Pages: Index (Landing), Auth, Dashboard, Methodology, Architecture Document");
    bullet("Core Components: RatioInputForm, RiskResults, ZScoreGauge, SensitivityAnalysis, IndustryComparison, IndustryPresets, RecommendationsPanel, PDFExport, AssessmentHistory");
    bullet("UI Framework: shadcn/ui (Button, Card, Tabs, Dialog, Form, Toast, etc.)");
    spacer();
    subsubtitle("Application Layer (Serverless):");
    bullet("predict-risk Edge Function — Ensemble ML engine (Deno runtime)");
    bullet("Auth Service — JWT-based authentication (GoTrue)");
    bullet("PostgREST API — Auto-generated REST endpoints for database access");
    spacer();
    subsubtitle("Data Layer:");
    bullet("PostgreSQL Database — assessment_history, profiles tables");
    bullet("Row-Level Security (RLS) policies for access control");
    spacer();

    // 4.5 Sequence Diagram
    subtitle("4.5 Sequence Diagram — Risk Assessment Flow");
    body("Step-by-step interaction flow:");
    spacer();
    body("1. User opens application and enters 14 financial ratios in RatioInputForm.");
    body("2. Client-side validation ensures all ratios are valid numbers.");
    body("3. Client sends POST request to predict-risk edge function with JWT authorization header.");
    body("4. Edge function validates input and runs Gradient Boosting classification (50% weight).");
    body("5. Edge function calculates Altman Z-Score: Z = 1.2*X1 + 1.4*X2 + 3.3*X3 + 0.6*X4 + 1.0*X5 (30% weight).");
    body("6. Edge function performs Operating Efficiency Analysis on margins and working capital (20% weight).");
    body("7. Results from all 3 models are combined via weighted ensemble averaging.");
    body("8. JSON response returned to client: { overallRisk, riskScore, confidence, altmanZScore, categoryScores, factors }.");
    body("9. Client renders RiskResults component with radar charts, Z-Score gauge, sensitivity analysis, and recommendations.");
    body("10. Assessment is persisted to assessment_history table via PostgREST insert.");
    body("11. User can export results as PDF via client-side jsPDF generation.");
    spacer();

    // 4.6 Deployment Diagram
    subtitle("4.6 Deployment Diagram");
    body("Infrastructure layout:");
    spacer();
    subsubtitle("Client Tier:");
    bullet("User's Web Browser — runs the React SPA (HTML/CSS/JS bundle)");
    bullet("Served from Lovable CDN — globally distributed edge network for fast delivery");
    spacer();
    subsubtitle("Application Tier:");
    bullet("Edge Functions — Deno runtime, auto-scaling serverless workers");
    bullet("Auth Service — GoTrue server for JWT token management");
    bullet("PostgREST — REST API gateway to PostgreSQL");
    spacer();
    subsubtitle("Data Tier:");
    bullet("Managed PostgreSQL — Lovable Cloud hosted database");
    bullet("RLS Policies — database-level access control enforcement");
    spacer();
    subsubtitle("Network:");
    bullet("All communication over HTTPS (TLS 1.3)");
    bullet("Published URL: risk-ace-guard.lovable.app");

    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120, 113, 108);
      doc.text(
        `Architecture Document — Business Risk Assessment System — Page ${i} of ${pageCount}`,
        pageWidth / 2,
        287,
        { align: "center" }
      );
      doc.setTextColor(0, 0, 0);
    }

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
        <div ref={contentRef} className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8 md:p-12 space-y-10 shadow-lg">
          {/* Title */}
          <div className="text-center border-b border-border pb-8">
            <h1 className="text-3xl font-bold mb-2">Architecture Document</h1>
            <p className="text-lg text-muted-foreground">Business Risk Assessment System</p>
            <p className="text-sm text-muted-foreground mt-1">ML-Powered Financial Risk Classifier</p>
          </div>

          {/* ======================== */}
          {/* 1. Application Architecture */}
          {/* ======================== */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">1. Application Architecture</h2>
            <p className="text-muted-foreground">This section evaluates three major architecture patterns and explains why the <strong className="text-foreground">Serverless</strong> pattern was selected for this project.</p>

            {/* 1.1 Microservices */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">1.1 Microservices Architecture</h3>
              <p className="text-muted-foreground">Microservices decompose an application into small, independently deployable services, each owning its own data and communicating via APIs or message queues.</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4 text-sm">
                <li>Each service runs in its own process and can be deployed independently</li>
                <li>Services communicate over lightweight protocols (HTTP/REST, gRPC, messaging)</li>
                <li>Independent scaling per service based on demand</li>
                <li>Technology-agnostic — different services can use different languages</li>
              </ul>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-muted-foreground"><strong className="text-foreground">Why Not Chosen:</strong> Our system has a single backend function (risk prediction). Microservices would introduce unnecessary complexity without proportional benefits.</p>
              </div>
            </div>

            {/* 1.2 Event-Driven */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">1.2 Event-Driven Architecture</h3>
              <p className="text-muted-foreground">EDA structures applications around the production, detection, and reaction to events. Components communicate through event brokers or message queues.</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4 text-sm">
                <li>Loose coupling — producers and consumers are independent</li>
                <li>Asynchronous communication via event bus (Kafka, RabbitMQ)</li>
                <li>Event sourcing — state changes captured as immutable events</li>
                <li>Complex event processing for real-time analytics</li>
              </ul>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-muted-foreground"><strong className="text-foreground">Why Not Chosen:</strong> Risk assessment is synchronous — users expect immediate results. An event-driven approach would add latency and complexity without improving UX.</p>
              </div>
            </div>

            {/* 1.3 Serverless (Selected) */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                1.3 Serverless Architecture
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Selected</span>
              </h3>
              <p className="text-muted-foreground">The system follows a <strong className="text-foreground">Serverless Architecture</strong> pattern, leveraging cloud-managed services for scalability, cost efficiency, and high availability.</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4 text-sm">
                <li>No server management — backend logic runs as edge functions on demand</li>
                <li>Auto-scaling — functions scale automatically based on requests</li>
                <li>Pay-per-execution — costs proportional to actual usage</li>
                <li>Event-driven invocation — assessment requests trigger function execution</li>
                <li>Stateless — each execution is independent</li>
              </ul>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground"><strong className="text-foreground">Why Chosen:</strong> Single backend function (predict-risk) maps perfectly to serverless. Zero infra management, cost-effective for variable traffic, built-in scalability, and fast deployment via Lovable Cloud.</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Technology Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <h4 className="font-semibold mb-3 text-primary text-sm">Frontend (SPA)</h4>
                  <div className="space-y-1.5">
                    {["React 18 + TypeScript", "Vite (build tool)", "Tailwind CSS + HSL Design Tokens", "Framer Motion (animations)", "Recharts (visualization)", "React Router v6", "TanStack React Query", "shadcn/ui components"].map((t) => (
                      <div key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <h4 className="font-semibold mb-3 text-primary text-sm">Backend (Serverless)</h4>
                  <div className="space-y-1.5">
                    {["predict-risk Edge Function (Deno)", "3-Model Ensemble ML Engine", "Supabase Auth (JWT)", "PostgREST API", "PostgreSQL + RLS", "Lovable Cloud (hosting)"].map((t) => (
                      <div key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ======================== */}
          {/* 2. Database Architecture */}
          {/* ======================== */}
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
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Relationships:</strong> assessment_history.user_id → auth.users (One-to-Many) | profiles.user_id → auth.users (One-to-One)</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">2.2 Schema Design Principles</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
                <li>Denormalized assessment storage for fast retrieval & PDF export</li>
                <li>JSONB factors column for flexible risk factor storage</li>
                <li>Session-based tracking for anonymous user history</li>
                <li>RLS-enforced row-level access control</li>
              </ul>
            </div>
          </section>

          {/* ======================== */}
          {/* 3. Data Exchange Contract */}
          {/* ======================== */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">3. Data Exchange Contract</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">3.1 Frequency of Data Exchanges</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
                <li>Assessment Request: On-demand (~1-3 seconds per cycle)</li>
                <li>History Retrieval: On dashboard page load</li>
                <li>Auth Token Refresh: Automatic (~1 hour JWT expiry)</li>
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
                <li><strong className="text-foreground">Database (Secondary):</strong> PostgreSQL via PostgREST with RLS enforcement</li>
                <li><strong className="text-foreground">No File/Queue:</strong> All synchronous API calls. PDF generated client-side via jsPDF.</li>
              </ul>
            </div>
          </section>

          {/* ======================== */}
          {/* 4. System Diagrams */}
          {/* ======================== */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2">4. System Diagrams</h2>

            {/* 4.1 Use Case */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">4.1 Use Case Diagram</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-medium text-sm mb-2 text-primary">Anonymous User</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Enter financial ratios</li>
                    <li>• View risk results & Z-Score</li>
                    <li>• Load industry presets</li>
                    <li>• Export PDF report</li>
                    <li>• View methodology</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-medium text-sm mb-2 text-primary">Authenticated User</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• All anonymous features</li>
                    <li>• Sign up / Sign in</li>
                    <li>• View assessment history</li>
                    <li>• Track risk trends</li>
                    <li>• Risk distribution charts</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-medium text-sm mb-2 text-primary">System (Edge Fn)</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Validate input ratios</li>
                    <li>• Gradient Boosting</li>
                    <li>• Altman Z-Score calc</li>
                    <li>• OEA analysis</li>
                    <li>• Weighted ensemble</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4.2 Class Diagram */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">4.2 Class Diagram (Interfaces)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-mono text-sm font-semibold text-primary mb-2">FinancialRatios</h4>
                  <p className="text-xs text-muted-foreground">19 properties: currentRatio, quickRatio, cashRatio, grossProfitMargin, operatingMargin, netProfitMargin, ROA, ROE, debtToEquity, debtRatio, interestCoverage, assetTurnover, inventoryTurnover, receivablesTurnover, + 5 Z-Score inputs</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-mono text-sm font-semibold text-primary mb-2">RiskAssessment</h4>
                  <p className="text-xs text-muted-foreground">overallRisk, riskScore (0-100), confidence (0-100), altmanZScore, categoryScores (4 categories), factors (Array)</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-mono text-sm font-semibold text-primary mb-2">RiskFactor</h4>
                  <p className="text-xs text-muted-foreground">name (string), impact (positive | negative | neutral), description (string)</p>
                </div>
              </div>
            </div>

            {/* 4.3 DFD Level 0 */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">4.3 Data Flow Diagram (DFD Level 0)</h3>
              <div className="p-4 rounded-lg border border-border bg-secondary/20 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">External Entity:</strong> User (Analyst / Business Owner)
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Process:</strong> Business Risk Assessment System
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Data Store:</strong> PostgreSQL Database
                </p>
                <div className="border-t border-border/50 pt-2 mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground">User → System: Financial ratios (14 inputs) + Company name</p>
                  <p className="text-xs text-muted-foreground">System → ML Engine: Ratio data for ensemble processing</p>
                  <p className="text-xs text-muted-foreground">ML Engine → System: Risk classification + scores + factors</p>
                  <p className="text-xs text-muted-foreground">System → User: Results, charts, gauge, PDF report</p>
                  <p className="text-xs text-muted-foreground">System → Database: Assessment record</p>
                  <p className="text-xs text-muted-foreground">Database → System: Historical assessments</p>
                </div>
              </div>
            </div>

            {/* 4.4 Component Diagram */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">4.4 Component Diagram</h3>
              <div className="space-y-2">
                {[
                  { layer: "Presentation Layer", items: "React SPA — Index, Auth, Dashboard, Methodology, Architecture; RatioInputForm, RiskResults, ZScoreGauge, SensitivityAnalysis, IndustryComparison, RecommendationsPanel, PDFExport, AssessmentHistory" },
                  { layer: "Application Layer", items: "predict-risk Edge Function (Ensemble ML), Auth Service (JWT/GoTrue), PostgREST API" },
                  { layer: "Data Layer", items: "PostgreSQL (assessment_history, profiles), Row-Level Security policies" },
                ].map((l) => (
                  <div key={l.layer} className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                    <span className="font-medium text-sm">{l.layer}:</span>
                    <span className="text-sm text-muted-foreground ml-2">{l.items}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4.5 Sequence Diagram */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">4.5 Sequence: Risk Assessment Flow</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1 pl-4 text-sm">
                <li>User enters 14 financial ratios in RatioInputForm</li>
                <li>Client validates inputs → POST to predict-risk edge function</li>
                <li>Edge function runs Gradient Boosting classification (50% weight)</li>
                <li>Calculates Altman Z-Score: Z = 1.2·X₁ + 1.4·X₂ + 3.3·X₃ + 0.6·X₄ + 1.0·X₅ (30% weight)</li>
                <li>Performs Operating Efficiency Analysis (20% weight)</li>
                <li>Combines 3 models via weighted ensemble</li>
                <li>Returns risk level, scores, and factors to client</li>
                <li>Client renders results with charts, gauge, recommendations</li>
                <li>Assessment saved to assessment_history table</li>
                <li>User can export results as PDF</li>
              </ol>
            </div>

            {/* 4.6 Deployment Diagram */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">4.6 Deployment Diagram</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-medium text-sm mb-2 text-primary">Client Tier</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Web Browser (React SPA)</li>
                    <li>• Lovable CDN (global edge)</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-medium text-sm mb-2 text-primary">Application Tier</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Edge Functions (Deno)</li>
                    <li>• Auth Service (GoTrue)</li>
                    <li>• PostgREST API</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-secondary/20">
                  <h4 className="font-medium text-sm mb-2 text-primary">Data Tier</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Managed PostgreSQL</li>
                    <li>• RLS Policies</li>
                    <li>• HTTPS/TLS 1.3</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDocument;
