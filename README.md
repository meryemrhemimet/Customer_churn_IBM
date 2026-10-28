# Customer Churn Prediction

A React dashboard for exploring customer churn and trying predictions from a scikit-learn model. The project includes a FastAPI service, the model file, the Telco churn dataset, and a notebook with the analysis and model experiments.

## Project layout

```text
backend/       FastAPI app, model, and API dependencies
frontend/      Small JavaScript integration example
notebooks/     Churn analysis notebook and its dependencies
src/           React dashboard
Customer-Churn.csv
               Dataset used by the notebook
```

## Run the dashboard and API

You need Node.js with npm and Python 3.10 or later. Run the frontend and API in separate terminals from the project root.

### 1. Start the frontend

```bash
npm ci
npm run dev
```

The dashboard opens at `http://localhost:8080`. It uses `http://127.0.0.1:8000` as the API by default. To use a different API address, copy `.env.example` to `.env.local`, update `VITE_API_URL`, and restart the frontend.

### 2. Start the API

Create a virtual environment and install the API dependencies:

**Windows PowerShell**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
python -m uvicorn api:app --app-dir backend --reload
```

**macOS or Linux**

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
python -m uvicorn api:app --app-dir backend --reload
```

The API health check is at `http://127.0.0.1:8000/`; interactive endpoint documentation is at `http://127.0.0.1:8000/docs`. By default, the API accepts browser requests from the local Vite development server. Set `CORS_ORIGINS` to a comma-separated list of trusted frontend origins when deploying the API.

## Notebook

The notebook is [notebooks/customer_churn_analysis.ipynb](notebooks/customer_churn_analysis.ipynb). From an activated Python environment, install its dependencies and launch Jupyter:

```bash
python -m pip install -r notebooks/requirements.txt
python -m jupyter notebook
```

The notebook looks for `Customer-Churn.csv` in the project root or its parent-relative location when opened from the `notebooks` folder.

## Checks

Run the frontend checks from the project root:

```bash
npm run build
npm test
npm run lint
```

## Notes

The prediction endpoint accepts customer fields and fills in defaults for fields that are omitted. See `/docs` for the request and response format. The model is loaded from `backend/churn_model.pkl`; joblib model files can execute code when loaded, so only use a model file from a trusted source.
