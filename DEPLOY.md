# Render Deployment Guide

## Deploy to Render

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create new Web Service on Render**:
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder (or root if backend is at root)

3. **Configure Web Service**:
   - Name: `rhythmix-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

4. **Add Environment Variables**:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `PORT` = 3000 (optional, Render sets this automatically)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the generated URL (e.g., `https://rhythmix-backend.onrender.com`)

6. **Update Frontend**:
   - In `C:\clg\dancestudio\.env`, set:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

## Notes
- Free tier spins down after inactivity (cold starts may take 30-60 seconds)
- MongoDB Atlas should whitelist Render IPs (or use 0.0.0.0/0 for all IPs)
