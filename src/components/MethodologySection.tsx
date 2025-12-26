import { BookOpen, Database, Cpu, LineChart, Target, Layers } from "lucide-react";

const MethodologySection = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "Gather financial statements and calculate key ratios across liquidity, profitability, leverage, and efficiency categories.",
    },
    {
      icon: Layers,
      title: "Feature Engineering",
      description: "Transform raw financial ratios into normalized features suitable for machine learning models.",
    },
    {
      icon: Cpu,
      title: "Gradient Boosting",
      description: "Apply XGBoost/LightGBM algorithms to classify businesses into risk categories based on learned patterns.",
    },
    {
      icon: Target,
      title: "Classification",
      description: "Output risk classification (Low/Medium/High) with confidence scores and contributing factors.",
    },
  ];

  const ratioCategories = [
    {
      title: "Liquidity Ratios",
      ratios: ["Current Ratio", "Quick Ratio", "Cash Ratio"],
      description: "Measure short-term solvency",
    },
    {
      title: "Profitability Ratios",
      ratios: ["Gross Margin", "Net Margin", "ROA", "ROE"],
      description: "Assess earnings potential",
    },
    {
      title: "Leverage Ratios",
      ratios: ["Debt-to-Equity", "Debt Ratio", "Interest Coverage"],
      description: "Evaluate financial structure",
    },
    {
      title: "Efficiency Ratios",
      ratios: ["Asset Turnover", "Inventory Turnover", "Receivables Turnover"],
      description: "Measure operational efficiency",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Research Methodology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our approach combines traditional financial ratio analysis with modern
              machine learning classification for comprehensive risk assessment.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="glass rounded-xl p-6 h-full hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* Financial Ratios Grid */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <LineChart className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Financial Ratios Used</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ratioCategories.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div>
                    <h4 className="font-medium">{category.title}</h4>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {category.ratios.map((ratio, rIndex) => (
                      <li key={rIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {ratio}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6">
              <h4 className="font-semibold mb-2">Gradient Boosting</h4>
              <p className="text-sm text-muted-foreground">
                Ensemble learning method that builds sequential decision trees,
                each correcting errors of previous ones.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h4 className="font-semibold mb-2">Feature Importance</h4>
              <p className="text-sm text-muted-foreground">
                Model automatically learns which financial ratios are most
                predictive of business risk levels.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h4 className="font-semibold mb-2">Classification Output</h4>
              <p className="text-sm text-muted-foreground">
                Probabilistic classification into Low, Medium, or High risk
                with confidence scores and interpretable factors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
