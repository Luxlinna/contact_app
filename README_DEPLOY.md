# Deploy Contact App to Render

This repository has a Python FastAPI backend and a React/Vite frontend.
Use `render.yaml` to deploy both services on Render.

## Setup steps

1. Push this project to GitHub if it is not already there.
2. Go to https://dashboard.render.com and connect your GitHub repository.
3. Create a new Render service by importing the repo.
4. Render will detect `render.yaml` and create two services:
   - `contact-app-backend`
   - `contact-app-frontend`

## Backend service

- Working directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Exposes: FastAPI backend

## Frontend service

- Build command: `cd frontend && npm install && npm run build`
- Publish directory: `frontend/dist`
- Environment variable:
  - `VITE_API_BASE_URL=https://<your-backend-service>.onrender.com`

## Important

After Render creates the backend service, replace `https://<your-backend-service>.onrender.com` in `render.yaml` with the actual backend URL.

If you want, I can also add a `netlify.toml` or `vercel.json` version instead.
