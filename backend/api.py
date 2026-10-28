import os
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:8080,http://127.0.0.1:8080",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

model = joblib.load(Path(__file__).with_name("churn_model.pkl"))


@app.get("/")
def home():
    return {"message": "Telco Churn Prediction API"}


@app.post("/predict")
def predict(data: dict):
    df = pd.DataFrame([data])

    expected_cols = [
        "gender", "SeniorCitizen", "Partner", "Dependents", "tenure",
        "PhoneService", "MultipleLines", "InternetService", "OnlineSecurity",
        "OnlineBackup", "DeviceProtection", "TechSupport", "StreamingTV",
        "StreamingMovies", "Contract", "PaperlessBilling", "PaymentMethod",
        "MonthlyCharges", "TotalCharges",
    ]

    for col in expected_cols:
        if col not in df.columns:
            if col in ["tenure", "MonthlyCharges", "TotalCharges", "SeniorCitizen"]:
                df[col] = 0
            else:
                defaults = {
                    "gender": "Male",
                    "Partner": "No",
                    "Dependents": "No",
                    "PhoneService": "Yes",
                    "MultipleLines": "No",
                    "InternetService": "DSL",
                    "OnlineSecurity": "No",
                    "OnlineBackup": "No",
                    "DeviceProtection": "No",
                    "TechSupport": "No",
                    "StreamingTV": "No",
                    "StreamingMovies": "No",
                    "Contract": "Month-to-month",
                    "PaperlessBilling": "No",
                    "PaymentMethod": "Electronic check"
                }
                df[col] = defaults.get(col, "No")

    df = df[expected_cols]

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]
    return {
        "churn_prediction": int(prediction),
        "churn_probability": float(probability)
    }
