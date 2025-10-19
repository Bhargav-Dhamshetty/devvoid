Quick deploy checklist

1. Push code to GitHub (already done)
2. Backend - Render
   - In Render, click New -> Web Service
   - Choose GitHub repo Bhargav-Dhamshetty/devvoid
   - Branch: main
   - Root directory: (leave empty)
   - Start Command: cd server && npm start
   - Build Command: cd server && npm install
   - Add environment variables (from `server/.env.example`)
   - Deploy
3. Frontend - Vercel
   - Vercel -> Import Project -> GitHub repo
   - Root Directory: client
   - Build Command: npm run build
   - Output Directory: dist
   - Add VITE_API_URL env var to point to Render backend
   - Deploy
4. After both are live, copy Vercel URL into Render's FRONTEND_URL env var and redeploy or restart the Render service.

That's it — you should have a working deployment.