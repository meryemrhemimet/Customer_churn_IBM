# Prediction API

The API serves churn predictions using the model stored next to `api.py`.

## Run locally

From the project root, create and activate a virtual environment, then install the pinned API dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
```

On macOS or Linux, activate it with `source .venv/bin/activate` and use `backend/requirements.txt`.

Start the API from the project root:

```bash
python -m uvicorn api:app --app-dir backend --reload
```

The API is available at `http://127.0.0.1:8000`; interactive documentation is at `http://127.0.0.1:8000/docs`. Its default CORS origins are the local Vite URLs on port 8080. For deployment, set `CORS_ORIGINS` to a comma-separated list of trusted frontend origins.

## Endpoints

### `GET /`

Returns an API health message.

### `POST /predict`

Accepts customer attributes as JSON and returns a churn class and probability. Omitted fields are filled with defaults by the API.

Example request:

```json
{
  "tenure": 12,
  "MonthlyCharges": 80,
  "Contract": "Month-to-month"
}
```

Example response:

```json
{
  "churn_prediction": 1,
  "churn_probability": 0.73
}
```
