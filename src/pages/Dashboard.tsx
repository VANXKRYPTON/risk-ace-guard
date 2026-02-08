import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { BarChart3, Trash2, AlertTriangle, CheckCircle, AlertCircle, TrendingUp, Shield, Plus, Activity, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface AssessmentRecord {
  id: string;
  created_at: string;
  company_name: string | null;
  overall_risk: string;
  risk_score: number;
  confidence: number;
  liquidity_score: number;
  profitability_score: number;
  leverage_score: number;
  efficiency_score: number;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [assessRes, profileRes] = await Promise.all([
        supabase.from("assessment_history").select("id, created_at, company_name, overall_risk, risk_score, confidence, liquidity_score, profitability_score, leverage_score, efficiency_score").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(50),
        supabase.from("profiles").select("display_name").eq("user_id", user!.id).single()
      ]);
      if (assessRes.data) setAssessments(assessRes.data as AssessmentRecord[]);
      if (profileRes.data) setProfileName(profileRes.data.display_name || "");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("assessment_history").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
      return;
    }
    setAssessments(prev => prev.filter(a => a.id !== id));
    toast.success("Assessment deleted");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || !user) return null;

  const riskCounts = {
    low: assessments.filter(a => a.overall_risk === "low").length,
    medium: assessments.filter(a => a.overall_risk === "medium").length,
    high: assessments.filter(a => a.overall_risk === "high").length,
  };

  const avgScore = assessments.length > 0 ? Math.round(assessments.reduce((sum, a) => sum + a.risk_score, 0) / assessments.length) : 0;

  const pieData = [
    { name: "Low Risk", value: riskCounts.low, color: "hsl(160, 84%, 39%)" },
    { name: "Medium Risk", value: riskCounts.medium, color: "hsl(45, 93%, 47%)" },
    { name: "High Risk", value: riskCounts.high, color: "hsl(0, 72%, 51%)" },
  ].filter(d => d.value > 0);

  const trendData = assessments.slice(0, 10).reverse().map((a, i) => ({
    name: a.company_name || `#${i + 1}`,
    score: a.risk_score,
    date: new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

  return (
    <>
      <title>Dashboard | Business Risk Assessment</title>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Welcome */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
              >
                <div>
                  <h1 className="text-3xl font-bold">Welcome, {profileName || user.email}</h1>
                  <p className="text-muted-foreground">Your risk assessment dashboard</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="hero" onClick={() => navigate("/")} className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Assessment
                  </Button>
                  <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: <BarChart3 className="w-5 h-5 text-primary" />, label: "Total Assessments", value: assessments.length.toString(), delay: 0 },
                  { icon: <TrendingUp className="w-5 h-5 text-primary" />, label: "Avg. Risk Score", value: avgScore.toString(), delay: 0.05 },
                  { icon: <CheckCircle className="w-5 h-5 text-risk-low" />, label: "Low Risk", value: riskCounts.low.toString(), delay: 0.1 },
                  { icon: <AlertTriangle className="w-5 h-5 text-risk-high" />, label: "High Risk", value: riskCounts.high.toString(), delay: 0.15 },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: card.delay }}
                  >
                    <StatCard {...card} />
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              {assessments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  {/* Risk Distribution Pie Chart */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <PieChartIcon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Risk Distribution</h3>
                    </div>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                      {pieData.map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          {d.name} ({d.value})
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trend Line Chart */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Score Trend</h3>
                    </div>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                          <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">Last {trendData.length} assessments (higher = healthier)</p>
                  </div>
                </motion.div>
              )}

              {/* Assessments Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Assessment History</h2>
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : assessments.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No assessments yet</p>
                    <Button variant="hero" size="sm" className="mt-4" onClick={() => navigate("/")}>Run Your First Assessment</Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Company</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Risk</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Score</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">Liquidity</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">Profitability</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">Leverage</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden lg:table-cell">Efficiency</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assessments.map((a) => (
                          <tr key={a.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                            <td className="py-3 px-2 font-medium text-sm">{a.company_name || "Unnamed"}</td>
                            <td className="py-3 px-2">
                              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                                a.overall_risk === "low" ? "bg-risk-low/10 text-risk-low border-risk-low/30" :
                                a.overall_risk === "medium" ? "bg-risk-medium/10 text-risk-medium border-risk-medium/30" :
                                "bg-risk-high/10 text-risk-high border-risk-high/30"
                              }`}>
                                {a.overall_risk === "low" ? <CheckCircle className="w-3 h-3" /> :
                                 a.overall_risk === "medium" ? <AlertCircle className="w-3 h-3" /> :
                                 <AlertTriangle className="w-3 h-3" />}
                                {a.overall_risk.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-sm font-medium">{a.risk_score}</td>
                            <td className="py-3 px-2 text-sm text-muted-foreground hidden md:table-cell">{a.liquidity_score}</td>
                            <td className="py-3 px-2 text-sm text-muted-foreground hidden md:table-cell">{a.profitability_score}</td>
                            <td className="py-3 px-2 text-sm text-muted-foreground hidden md:table-cell">{a.leverage_score}</td>
                            <td className="py-3 px-2 text-sm text-muted-foreground hidden lg:table-cell">{a.efficiency_score}</td>
                            <td className="py-3 px-2 text-sm text-muted-foreground">{new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                            <td className="py-3 px-2 text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)} className="text-destructive hover:text-destructive h-8 w-8">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string; delay?: number }) => (
  <div className="glass rounded-xl p-4 hover:border-primary/30 transition-colors">
    <div className="flex items-center gap-2 mb-2">{icon}<span className="text-xs text-muted-foreground">{label}</span></div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default Dashboard;
