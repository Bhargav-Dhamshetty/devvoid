Deployment Guide

This file explains how to deploy the project:

1) Push to GitHub
- Ensure your repo `https://github.com/Bhargav-Dhamshetty/devvoid` contains the full project.
- Do NOT commit `.env` files (they are listed in `.gitignore`). Use the example files `server/.env.example` and `client/.env.example` to configure environment variables in Render and Vercel.

2) Deploy Backend to Render
- Go to https://dashboard.render.com -> New -> Web Service
- Connect your GitHub repo `Bhargav-Dhamshetty/devvoid`
- Branch: `main`
- Root directory: leave empty (renders root)
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`
- Environment variables (set via Render Dashboard -> Environment):
  - MONGO_URI: (from Atlas)
  - GEMINI_API_KEY: (your Google AI Studio key)
  - GEMINI_MODEL: gemini-1.5-pro
  - NODE_ENV: production
  - FRONTEND_URL: set this later to your Vercel URL
- After deploy, Render will provide a URL like `https://ai-project-backend.onrender.com`.

3) Deploy Frontend to Vercel
- Go to https://vercel.com/new -> Import Project
- Select the same GitHub repo `Bhargav-Dhamshetty/devvoid`
- Framework Preset: Vite
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables (set in Vercel project settings):
  - VITE_API_URL: https://<your-render-backend>/api
- Add `vercel.json` (already present) so SPA routing works.

4) Finalize
- After Vercel deploy, copy your Vercel frontend URL into Render's `FRONTEND_URL` env var to enable CORS.
- Test the app by visiting the Vercel URL and trying AI features.

Troubleshooting
- If AI calls return 500, check Render logs for details. Common causes:
  - Invalid Gemini API key
  - Key does not have access to the requested model
  - Network issues (whitelist IPs if required)

Notes
- Keep secrets in Render and Vercel dashboards, not in the repo.
- Use `render.yaml` for infra-as-code deployments with Render.
