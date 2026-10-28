import { motion } from "framer-motion";

interface ChurnGaugeProps {
  percentage: number;
}

const ChurnGauge = ({ percentage }: ChurnGaugeProps) => {
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="10"
          />
          <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="hsl(var(--destructive))"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-3xl font-bold font-mono text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {percentage}%
          </motion.span>
          <span className="text-xs text-muted-foreground">Churn Rate</span>
        </div>
      </div>
    </div>
  );
};

export default ChurnGauge;
