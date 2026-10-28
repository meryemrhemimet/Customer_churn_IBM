import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  glowClass?: string;
  delay?: number;
}

const StatCard = ({ label, value, icon: Icon, trend, trendUp, glowClass = "glow-primary", delay = 0 }: StatCardProps) => {
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDisplayed(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass rounded-xl p-5 ${glowClass} hover:scale-[1.02] transition-transform cursor-default`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">{label}</span>
        <div className="p-2 rounded-lg bg-secondary">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className={`text-3xl font-bold font-mono tracking-tight text-foreground ${displayed ? 'animate-count-up' : 'opacity-0'}`}>
        {value}
      </p>
      {trend && (
        <p className={`text-xs mt-2 font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </p>
      )}
    </motion.div>
  );
};

export default StatCard;
