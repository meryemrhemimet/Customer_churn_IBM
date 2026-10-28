import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const features = [
  { name: "Contract Type", importance: 92 },
  { name: "Tenure", importance: 78 },
  { name: "Monthly Charges", importance: 65 },
  { name: "Internet Service", importance: 58 },
  { name: "Payment Method", importance: 45 },
  { name: "Tech Support", importance: 38 },
  { name: "Online Security", importance: 32 },
];

const FeatureImportance = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Feature Importance</h3>
      </div>
      <div className="space-y-3">
        {features.map((feat, i) => (
          <div key={feat.name}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-muted-foreground">{feat.name}</span>
              <span className="text-xs font-mono text-foreground">{feat.importance}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${feat.importance}%` }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureImportance;
