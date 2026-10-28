import { motion } from "framer-motion";
import { Users, TrendingDown, DollarSign, Clock, Activity, Satellite } from "lucide-react";
import Logo from "../components/Logo";
import StatCard from "@/components/StatCard";
import ChurnGauge from "@/components/ChurnGauge";
import ChurnCharts from "@/components/ChurnCharts";
import PredictionForm from "@/components/PredictionForm";
import FeatureImportance from "@/components/FeatureImportance";
import ThemeToggle from "../components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 flex items-center justify-center">
              <Logo />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">Churn Insights</h1>
              <p className="text-sm text-muted-foreground font-medium">Unlocking Customer Retention</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
              <span className="text-xs font-medium text-success">Model Active</span>
            </div>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Total Customers" value="7,043" icon={Users} trend="12% from last month" trendUp={true} delay={0} />
          <StatCard label="Churn Rate" value="26%" icon={TrendingDown} trend="3% from last month" trendUp={false} glowClass="glow-destructive" delay={0.1} />
          <StatCard label="Avg Monthly Charges" value="$64.76" icon={DollarSign} trend="5% increase" trendUp={true} delay={0.2} />
          <StatCard label="Avg Tenure" value="32 mo" icon={Clock} delay={0.3} />
        </div>

        {/* Charts */}
        <ChurnCharts />

        {/* Bottom Row: Prediction + Feature Importance + Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <PredictionForm />
          <FeatureImportance />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass rounded-xl p-6 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold text-foreground">Risk Overview</h3>
            </div>
            <ChurnGauge percentage={26} />
            <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-2xl font-bold font-mono text-destructive">1,831</p>
                <p className="text-xs text-muted-foreground mt-1">At Risk</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-2xl font-bold font-mono text-success">5,212</p>
                <p className="text-xs text-muted-foreground mt-1">Retained</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
