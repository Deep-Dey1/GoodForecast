# Deployment Instructions

## To Deploy and Clear Cache on Vercel:

### Method 1: Force Fresh Deployment (Recommended)
```bash
# 1. Commit your changes
git add .
git commit -m "Update: Clear cache and deploy new version"
git push origin main

# 2. Go to Vercel Dashboard
# - Visit: https://vercel.com/dashboard
# - Find your project
# - Go to Settings > General
# - Scroll to "Build & Development Settings"
# - Click "Redeploy" or trigger a new deployment

# 3. Clear Vercel Cache (if needed)
# In the deployment, check "Clear Build Cache"
```

### Method 2: Using Vercel CLI
```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy with cache cleared
vercel --prod --force
```

### Method 3: Environment Variable Change
```bash
# Add or update an environment variable in Vercel Dashboard
# This forces a new build:
# - Go to Settings > Environment Variables
# - Add: FORCE_REBUILD=<current-timestamp>
# - Redeploy
```

## Clear Browser Cache:

### For Users to See New Version:
1. **Hard Refresh:**
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear Site Data:**
   - Chrome: DevTools > Application > Clear Storage > Clear site data
   - Firefox: DevTools > Storage > Clear All

3. **Incognito/Private Mode:**
   - Test in incognito window to see fresh version

## Automatic Cache Busting (Already Implemented):

✅ Vite generates unique hashes for all JS/CSS files
✅ HTML files set to no-cache
✅ Static assets cached with immutable flag
✅ Server sends proper cache headers

## After Deployment:

1. Wait 2-3 minutes for Vercel to propagate changes
2. Visit your site in incognito mode
3. Check the Network tab to see new hashed filenames
4. If still seeing old version, do a hard refresh

## Vercel Cache Purge via Dashboard:

1. Go to https://vercel.com/[your-username]/[your-project]
2. Click on the latest deployment
3. Click "..." menu
4. Select "Redeploy"
5. Check "Use existing Build Cache" = **OFF**
6. Click "Redeploy"
