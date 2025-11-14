# Azure Static Web Apps Deployment Guide

## Overview
This guide explains how to deploy the Budget Manager V4 React application to Azure Static Web Apps using GitHub Actions.

## Prerequisites
- Azure account with an active subscription
- GitHub account with access to the repository
- Node.js 18+ installed locally

## Step-by-Step Deployment Instructions

### Step 1: Create Azure Static Web App

1. **Navigate to Azure Portal**
   - Go to https://portal.azure.com
   - Sign in with your Azure account

2. **Create New Resource**
   - Click "+ Create a resource" in the top left
   - Search for "Static Web Apps"
   - Click "Create"

3. **Configure Basic Settings**
   ```
   Subscription: [Your subscription]
   Resource Group: [Create new or select existing]
   Name: budget-manager-v4
   Region: [Select closest region, e.g., East US, West Europe]
   SKU: Free (for testing) or Standard (for production)
   ```

4. **Configure GitHub Deployment**
   ```
   Source: GitHub
   Organization: sarahimireles
   Repository: budget-manager-v4
   Branch: main
   ```

5. **Configure Build Settings**
   ```
   Build Presets: React
   App location: /
   API location: [leave empty]
   Output location: dist
   ```

6. **Review and Create**
   - Click "Review + create"
   - Verify all settings
   - Click "Create"

**Note**: Azure will automatically create a GitHub Actions workflow in your repository.

### Step 2: Configure GitHub Secrets

1. **Get Azure Deployment Token**
   - In Azure Portal, navigate to your Static Web App resource
   - Click "Manage deployment token" in the Overview section
   - Copy the deployment token

2. **Add Secret to GitHub**
   - Go to https://github.com/sarahimireles/budget-manager-v4
   - Click "Settings" tab
   - Navigate to "Secrets and variables" > "Actions"
   - Click "New repository secret"
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: [Paste the deployment token]
   - Click "Add secret"

### Step 3: Verify GitHub Actions Workflow

The workflow file has been created at `.github/workflows/azure-static-web-apps.yml`.

**Key Features**:
- Triggers **only** on push/merge to `main` branch
- Builds the app using `npm run build`
- Deploys to Azure Static Web Apps production environment
- Does NOT create staging environments for PRs (deploy only on merge to main)

### Step 4: Deploy Your Application

1. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Configure Azure Static Web Apps deployment"
   git push origin main
   ```

2. **Monitor Deployment**
   - Go to the "Actions" tab in your GitHub repository
   - Click on the latest workflow run
   - Watch the build and deployment progress

3. **Access Your Deployed App**
   - Once deployment completes, go to your Azure Static Web App in the portal
   - The URL will be shown in the "Overview" section
   - Format: `https://<app-name>.azurestaticapps.net`

## Project Structure

```
budget-manager-v4/
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml    # CI/CD workflow
├── public/
│   ├── index.html
│   └── staticwebapp.config.json         # Azure routing config
├── src/
│   └── [application code]
├── dist/                                # Build output (created by webpack)
├── webpack.config.js                    # Webpack configuration
└── package.json
```

## Configuration Files

### staticwebapp.config.json
Located at `public/staticwebapp.config.json`, this file configures:
- Client-side routing fallback to `index.html`
- MIME types for static assets
- Route permissions

### webpack.config.js
Key configuration:
- Entry: `src/index.tsx`
- Output: `dist/` directory
- Public path: `/` (required for Azure)
- Copies `staticwebapp.config.json` to build output

## Environment Variables

### Current Setup
Firebase configuration is currently embedded in `firebaseConfig.ts`. This works for public Firebase projects but is not recommended for sensitive data.

### Recommended: Use Environment Variables (Optional)

1. **Create `.env.production` file**:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_DATABASE_URL=your_database_url
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

2. **Add to GitHub Secrets**:
   - Add each environment variable as a separate secret
   - Update the workflow to inject them during build

3. **Update firebaseConfig.ts**:
   ```typescript
   const firebaseConfig = {
     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
     // ... etc
   };
   ```

## Troubleshooting

### Build Fails
- Check the GitHub Actions logs for errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Routing Issues (404 on refresh)
- Ensure `staticwebapp.config.json` is being copied to `dist/`
- Check that `publicPath: '/'` is set in webpack config

### Firebase Connection Issues
- Verify Firebase configuration in `firebaseConfig.ts`
- Check Firebase security rules allow public access
- Ensure Firebase project is active

### Deployment Token Issues
- Regenerate token in Azure Portal
- Update GitHub secret
- Re-run the workflow

## Custom Domain (Optional)

1. In Azure Portal, go to your Static Web App
2. Click "Custom domains" in the left menu
3. Click "+ Add"
4. Enter your custom domain
5. Add the provided DNS records to your domain registrar
6. Wait for DNS propagation (can take up to 48 hours)

## Cost Optimization

**Free Tier Includes**:
- 100 GB bandwidth per month
- 0.5 GB storage
- Custom domains and SSL certificates

**Standard Tier** ($9/month):
- Unlimited bandwidth
- Unlimited storage
- SLA guarantee
- Staging environments

## Next Steps

1. Set up custom domain (optional)
2. Configure environment variables for Firebase (recommended)
3. Set up monitoring and alerts in Azure
4. Configure Firebase security rules
5. Enable Application Insights for monitoring

## Support

- Azure Static Web Apps docs: https://docs.microsoft.com/azure/static-web-apps/
- GitHub Actions docs: https://docs.github.com/actions
- Firebase docs: https://firebase.google.com/docs

## Notes

- The build generates warnings about bundle size (1.06 MiB). Consider implementing code splitting for better performance.
- Deployments only occur when code is pushed or merged to the `main` branch
- Pull requests do NOT trigger deployments or create staging environments
- This ensures only reviewed and approved code gets deployed to production
