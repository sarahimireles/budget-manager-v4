# Quick Start: Deploy to Azure Static Web Apps

## What You Need to Do

### 1. Add Firebase Secrets to GitHub (Required Before Deployment)

Go to: https://github.com/sarahimireles/budget-manager-v4/settings/secrets/actions

Add these **8 secrets** (one at a time):

| Secret Name | Your Value |
|------------|------------|
| `REACT_APP_FIREBASE_API_KEY` | `AIzaSyAauQxyPTmSWAzxyYXFs1q8eMFKG8fBevU` |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | `budget-manager-v2.firebaseapp.com` |
| `REACT_APP_FIREBASE_DATABASE_URL` | `https://budget-manager-v2.firebaseio.com` |
| `REACT_APP_FIREBASE_PROJECT_ID` | `budget-manager-v2` |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | `budget-manager-v2.appspot.com` |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | `126124707883` |
| `REACT_APP_FIREBASE_APP_ID` | `1:126124707883:web:4472065d39fc28ea95da6e` |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Get from Azure Portal (see step 2) |

### 2. Create Azure Static Web App

1. **Go to Azure Portal**: https://portal.azure.com
2. **Create a resource** → Search "Static Web Apps" → **Create**
3. **Fill in the form**:
   - **Subscription**: Your subscription
   - **Resource Group**: Create new or select existing
   - **Name**: `budget-manager-v4`
   - **Region**: East US (or closest to you)
   - **SKU**: Free

4. **GitHub Deployment**:
   - **Source**: Other (not GitHub)
   - This will give you a deployment token

5. **Copy the deployment token** and add it as `AZURE_STATIC_WEB_APPS_API_TOKEN` secret in GitHub

### 3. Push Your Code

```bash
git add .
git commit -m "Configure environment variables for Azure deployment"
git push origin main
```

### 4. Watch It Deploy

- Go to: https://github.com/sarahimireles/budget-manager-v4/actions
- Click on the latest workflow run
- Wait for it to complete (3-5 minutes)

### 5. Access Your App

- Go to Azure Portal → Your Static Web App
- Find the URL (format: `https://<name>.azurestaticapps.net`)
- Click it to see your deployed app!

## Files Changed

✅ `.env.example` - Template for environment variables
✅ `.env.local` - Your local Firebase config (NOT in git)
✅ `src/firebaseConfig.ts` - Now uses environment variables
✅ `webpack.config.js` - Loads environment variables
✅ `.github/workflows/azure-static-web-apps.yml` - Deploys to Azure
✅ `.gitignore` - Excludes `.env.local` from git

## Troubleshooting

**Build fails in GitHub Actions?**
- Verify all 8 secrets are added in GitHub settings
- Check secret names match exactly (case-sensitive)

**App deployed but Firebase doesn't work?**
- Check browser console for errors
- Verify all Firebase secrets have correct values
- Make sure no extra spaces in secret values

## Need More Details?

See complete guides in `docs/`:
- `AZURE_DEPLOYMENT_GUIDE.md` - Full deployment guide
- `ENVIRONMENT_VARIABLES_SETUP.md` - Environment variables explained
