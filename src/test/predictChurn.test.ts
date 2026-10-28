import { afterEach, describe, expect, it, vi } from "vitest";
import { predictChurn } from "@/lib/predictChurn";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("predictChurn", () => {
  it("sends customer features and returns a valid prediction", async () => {
    const prediction = {
      churn_prediction: 1,
      churn_probability: 0.73,
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => prediction,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(predictChurn({ tenure: 12 })).resolves.toEqual(prediction);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/predict",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ tenure: 12 }),
      }),
    );
  });

  it("reports unsuccessful API responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 503 }),
    );

    await expect(predictChurn({})).rejects.toThrow(
      "Prediction request failed (503).",
    );
  });

  it("rejects malformed prediction responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ churn_prediction: 1 }),
      }),
    );

    await expect(predictChurn({})).rejects.toThrow(
      "The prediction service returned an invalid response.",
    );
  });
});
