import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  type TooltipProps,
} from "recharts";

const contractData = [
  { name: "Month-to-Month", churn: 45 },
  { name: "One Year", churn: 12 },
  { name: "Two Year", churn: 5 },
];

const pieData = [
  { name: "Churned", value: 26 },
  { name: "Retained", value: 74 },
];

const tenureData = [
  { month: "0-6", churned: 42, retained: 58 },
  { month: "7-12", churned: 35, retained: 65 },
  { month: "13-24", churned: 25, retained: 75 },
  { month: "25-36", churned: 18, retained: 82 },
  { month: "37-48", churned: 12, retained: 88 },
  { month: "49-60", churned: 8, retained: 92 },
  { month: "60+", churned: 5, retained: 95 },
];

const COLORS = ["hsl(0, 72%, 58%)", "hsl(185, 80%, 55%)"];

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-mono">
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChurnCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass rounded-xl p-5"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Churn Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              strokeWidth={0}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {pieData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
              {d.name}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass rounded-xl p-5"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Churn by Contract</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={contractData}>
            <XAxis dataKey="name" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="churn" name="Churn" fill="hsl(185, 80%, 55%)" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="glass rounded-xl p-5"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Tenure vs Churn</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={tenureData}>
            <defs>
              <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 72%, 58%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(0, 72%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="churned" name="Churned" stroke="hsl(0, 72%, 58%)" fill="url(#churnGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ChurnCharts;
