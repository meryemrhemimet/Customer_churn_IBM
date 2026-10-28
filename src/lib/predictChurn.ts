export interface ChurnPrediction {
  churn_prediction: 0 | 1;
  churn_probability: number;
}

export type CustomerFeatures = Record<string, string | number>;

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

function isChurnPrediction(value: unknown): value is ChurnPrediction {
  return (
    typeof value === "object" &&
    value !== null &&
    "churn_prediction" in value &&
    (value.churn_prediction === 0 || value.churn_prediction === 1) &&
    "churn_probability" in value &&
    typeof value.churn_probability === "number" &&
    Number.isFinite(value.churn_probability) &&
    value.churn_probability >= 0 &&
    value.churn_probability <= 1
  );
}

export async function predictChurn(
  customerData: CustomerFeatures,
): Promise<ChurnPrediction> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error(`Prediction request failed (${response.status}).`);
  }

  const result: unknown = await response.json();
  if (!isChurnPrediction(result)) {
    throw new Error("The prediction service returned an invalid response.");
  }

  return result;
}
