# 🚀 Deployment Guide - Good Forecast

## Overview
Your app is now configured to run on a **single port** with both frontend and backend together!

---

## 📋 Pre-Deployment Checklist

### 1. **Build Frontend Locally (Test)**
```bash
cd frontend
npm install
npm run build
```
This creates a `dist` folder with your production build.

### 2. **Test Full Stack Locally**
```bash
# Terminal 1 - Build frontend
cd frontend
npm run build

# Terminal 2 - Start backend (serves frontend)
cd backend
NODE_ENV=production npm start
```
Visit: `http://localhost:5000` (Both frontend AND backend on same port!)

---

## 🌐 Deploy to Vercel (Recommended)

### **Option A: Using Vercel CLI (Easiest)**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy from Project Root**
```bash
cd c:/Users/deepd/home-dir-6/programming/weatherApp
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **good-forecast** (or your choice)
   - In which directory? **./** (root)
   - Override settings? **N**

5. **Set Environment Variables** (Important!)
```bash
vercel env add OPENWEATHER_API_KEY
# Paste your API key: 8d04d86f428a3052f7c2f814da0fb63b

vercel env add NODE_ENV
# Enter: production
```

6. **Deploy to Production**
```bash
vercel --prod
```

---

### **Option B: Using Vercel Website (Alternative)**

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Import Project** → Select your `GoodForecast` repository
4. **Configure:**
   - Framework Preset: **Other**
   - Root Directory: **./backend**
   - Build Command: `npm run build`
   - Output Directory: Leave empty
   - Install Command: `npm install`

5. **Environment Variables** (Add these):
   ```
   OPENWEATHER_API_KEY = 8d04d86f428a3052f7c2f814da0fb63b
   NODE_ENV = production
   ```

6. **Deploy!**

---

## 🔧 Configuration Files Created

### `vercel.json` (Root)
- Configures Vercel to handle both API and static files
- Routes `/api/*` to backend
- Routes everything else to frontend

### Modified Files:
1. **`backend/src/server.js`** - Now serves frontend in production
2. **`frontend/src/services/api.js`** - Uses relative URLs in production
3. **`backend/package.json`** - Added build script

---

## ✅ Post-Deployment Checks

After deployment, Vercel will give you a URL like: `https://good-forecast.vercel.app`

1. **Test Homepage** - Should load the weather app
2. **Test Search** - Search for a city
3. **Test Map** - Click on the map
4. **Check Console** - No errors in browser console
5. **Test Mobile** - Open on your phone

---

## 🐛 Troubleshooting

### Issue: "API key not found"
**Solution:** Add environment variable in Vercel dashboard:
```
Project Settings → Environment Variables → Add
OPENWEATHER_API_KEY = your_key_here
```

### Issue: "404 on API calls"
**Solution:** Check `vercel.json` routes are correct. Redeploy:
```bash
vercel --prod
```

### Issue: "Build failed"
**Solution:** 
1. Check all dependencies are in package.json
2. Try building locally first: `cd frontend && npm run build`
3. Check Vercel build logs

### Issue: "Frontend loads but API doesn't work"
**Solution:** 
1. Check Network tab in browser
2. Verify API calls go to `/api/*`
3. Check environment variables in Vercel

---

## 🎯 Development vs Production

### Development (Current Setup):
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend: `http://localhost:5000/api`
- Run separately

### Production (After Deploy):
- Everything: `https://your-app.vercel.app`
- Single URL for both frontend and API
- API at: `https://your-app.vercel.app/api`

---

## 📱 Share Your App!

Once deployed, share your live URL:
- 🌐 **Live App:** `https://your-app.vercel.app`
- 📦 **GitHub:** `https://github.com/Deep-Dey1/GoodForecast`
- 💼 **Portfolio:** Add to your resume/portfolio!

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:
1. Make changes locally
2. Commit: `git add . && git commit -m "Update"`
3. Push: `git push origin main`
4. Vercel auto-deploys! ✨

---

## 🚀 Ready to Deploy?

Run this command:
```bash
vercel --prod
```

Your app will be live in ~2 minutes! 🎉
