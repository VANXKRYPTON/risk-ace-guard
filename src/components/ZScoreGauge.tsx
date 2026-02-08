import { Shield, AlertTriangle, XCircle } from "lucide-react";

interface ZScoreGaugeProps {
  zScore: number;
}

const ZScoreGauge = ({ zScore }: ZScoreGaugeProps) => {
  const getZone = () => {
    if (zScore > 2.99) return { label: "Safe Zone", color: "text-risk-low", bg: "bg-risk-low/10", border: "border-risk-low/50", icon: Shield, description: "Low probability of bankruptcy. Company is financially stable." };
    if (zScore > 1.81) return { label: "Grey Zone", color: "text-risk-medium", bg: "bg-risk-medium/10", border: "border-risk-medium/50", icon: AlertTriangle, description: "Moderate risk. Further investigation recommended." };
    return { label: "Distress Zone", color: "text-risk-high", bg: "bg-risk-high/10", border: "border-risk-high/50", icon: XCircle, description: "High probability of bankruptcy within 2 years." };
  };

  const zone = getZone();
  const ZoneIcon = zone.icon;

  // Gauge position: map Z-Score range (-2 to 6) to 0-100%
  const gaugePosition = Math.min(100, Math.max(0, ((zScore + 2) / 8) * 100));

  return (
    <div className={`glass rounded-xl p-6 ${zone.border} border`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Altman Z-Score</h3>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${zone.bg} ${zone.color} text-sm font-medium`}>
          <ZoneIcon className="w-3.5 h-3.5" />
          {zone.label}
        </div>
      </div>

      {/* Large Z-Score display */}
      <div className="text-center mb-6">
        <div className={`text-5xl font-bold ${zone.color}`}>{zScore.toFixed(2)}</div>
        <p className="text-sm text-muted-foreground mt-2">{zone.description}</p>
      </div>

      {/* Gauge bar */}
      <div className="relative h-3 rounded-full overflow-hidden mb-2">
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-risk-high/30" />
          <div className="flex-1 bg-risk-medium/30" />
          <div className="flex-1 bg-risk-low/30" />
        </div>
        <div
          className={`absolute top-0 w-3 h-3 rounded-full ${zone.color.replace("text-", "bg-")} border-2 border-background shadow-lg transition-all duration-700`}
          style={{ left: `calc(${gaugePosition}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Distress (&lt;1.81)</span>
        <span>Grey (1.81-2.99)</span>
        <span>Safe (&gt;2.99)</span>
      </div>

      {/* Formula reference */}
      <div className="mt-6 p-3 rounded-lg bg-secondary/50 border border-border/30">
        <p className="text-xs text-muted-foreground font-mono">
          Z = 1.2·X₁ + 1.4·X₂ + 3.3·X₃ + 0.6·X₄ + 1.0·X₅
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Edward Altman (1968) — 95% accuracy in predicting bankruptcy
        </p>
      </div>
    </div>
  );
};

export default ZScoreGauge;
