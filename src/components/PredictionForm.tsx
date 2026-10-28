import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Zap, AlertTriangle, ShieldCheck } from "lucide-react";
import { predictChurn } from "@/lib/predictChurn";

const PredictionForm = () => {
  const [tenure, setTenure] = useState(24);
  const [monthlyCharges, setMonthlyCharges] = useState(65);
  const [contract, setContract] = useState("Month-to-month");
  const [internet, setInternet] = useState("Fiber optic");
  const [payment, setPayment] = useState("Electronic check");
  const [result, setResult] = useState<null | { risk: number; label: string }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePredict = async () => {
    setIsLoading(true);
    setResult(null);
    setErrorMessage(null);

    try {
      const formData = {
        tenure,
        MonthlyCharges: monthlyCharges,
        Contract: contract,
        InternetService: internet,
        PaymentMethod: payment
      };

      const data = await predictChurn(formData);
      const risk = Math.round(data.churn_probability * 100);
      const label = risk > 60 ? "High Risk" : risk > 35 ? "Medium Risk" : "Low Risk";

      setResult({ risk, label });
    } catch (error) {
      console.error("Prediction error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "The prediction request failed.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Predict Churn</h3>
      </div>

      <div className="space-y-5">
        {/* Tenure Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-muted-foreground">Tenure</label>
            <span className="text-sm font-mono text-primary">{tenure} months</span>
          </div>
          <input
            type="range"
            min={0}
            max={72}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(185_80%_55%/0.5)]"
          />
        </div>

        {/* Monthly Charges */}
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Monthly Charges</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <input
              type="number"
              value={monthlyCharges}
              onChange={(e) => setMonthlyCharges(Number(e.target.value))}
              className="w-full bg-secondary border border-border rounded-lg pl-7 pr-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>
        </div>

        {/* Selects */}
        {[
          { label: "Contract", value: contract, setter: setContract, options: ["Month-to-month", "One year", "Two year"] },
          { label: "Internet Service", value: internet, setter: setInternet, options: ["DSL", "Fiber optic", "None"] },
          { label: "Payment Method", value: payment, setter: setPayment, options: ["Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"] },
        ].map(({ label, value, setter, options }) => (
          <div key={label}>
            <label className="text-sm text-muted-foreground block mb-2">{label}</label>
            <select
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition appearance-none cursor-pointer"
            >
              {options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Predict Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePredict}
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:brightness-110 transition disabled:opacity-50 relative overflow-hidden"
        >
          {isLoading ? (
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Analyzing...
            </motion.div>
          ) : (
            "Predict Churn"
          )}
        </motion.button>

        {errorMessage && (
          <p role="alert" className="text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`rounded-lg p-4 flex items-center gap-3 ${result.risk > 60
                ? "bg-destructive/10 glow-destructive"
                : result.risk > 35
                  ? "bg-warning/10"
                  : "bg-success/10 glow-success"
                }`}
            >
              {result.risk > 60 ? (
                <AlertTriangle className="w-5 h-5 text-destructive" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-success" />
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">{result.label}</p>
                <p className="text-xs text-muted-foreground">
                  {result.risk}% probability of churning
                </p>
              </div>
              <div className="ml-auto">
                <span className={`text-2xl font-bold font-mono ${result.risk > 60 ? "text-destructive" : result.risk > 35 ? "text-warning" : "text-success"
                  }`}>
                  {result.risk}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PredictionForm;