# Environment Variables Setup Guide

## Overview

This project uses environment variables to securely manage Firebase configuration. This approach keeps sensitive credentials out of version control while allowing different configurations for local development and production deployments.

## Local Development Setup

### Step 1: Create Local Environment File

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your Firebase project values:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

3. **IMPORTANT**: `.env.local` is already in `.gitignore` and will NOT be committed to git.

### Step 2: Get Firebase Configuration

To find your Firebase configuration values:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (Settings) → Project settings
4. Scroll down to "Your apps" section
5. Click on your web app or create a new one
6. Copy the configuration values from the `firebaseConfig` object

### Step 3: Test Locally

Run the development server:
```bash
npm start
```

The app should connect to Firebase using your `.env.local` configuration.

## GitHub Secrets Setup (Production)

For GitHub Actions to build and deploy your app, you need to add Firebase credentials as GitHub Secrets.

### Step 1: Navigate to Repository Secrets

1. Go to your GitHub repository: https://github.com/sarahimireles/budget-manager-v4
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions** in the left sidebar
4. Click **New repository secret**

### Step 2: Add Each Firebase Secret

Add the following secrets **one at a time**:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API Key | `AIzaSyAauQxyPTmSWAzxyYXFs1q8eMFKG8fBevU` |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `budget-manager-v2.firebaseapp.com` |
| `REACT_APP_FIREBASE_DATABASE_URL` | Firebase Database URL | `https://budget-manager-v2.firebaseio.com` |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Project ID | `budget-manager-v2` |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `budget-manager-v2.appspot.com` |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | `126124707883` |
| `REACT_APP_FIREBASE_APP_ID` | Firebase App ID | `1:126124707883:web:4472065d39fc28ea95da6e` |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Azure deployment token | Get from Azure Portal |

### Step 3: How to Add a Secret

For each secret:

1. Click **New repository secret**
2. **Name**: Enter the exact secret name from the table above
3. **Value**: Paste the corresponding value from your Firebase project
4. Click **Add secret**
5. Repeat for all 7 Firebase secrets + 1 Azure secret (8 total)

### Step 4: Verify Secrets

After adding all secrets, you should see 8 secrets in your repository:

✅ REACT_APP_FIREBASE_API_KEY
✅ REACT_APP_FIREBASE_AUTH_DOMAIN
✅ REACT_APP_FIREBASE_DATABASE_URL
✅ REACT_APP_FIREBASE_PROJECT_ID
✅ REACT_APP_FIREBASE_STORAGE_BUCKET
✅ REACT_APP_FIREBASE_MESSAGING_SENDER_ID
✅ REACT_APP_FIREBASE_APP_ID
✅ AZURE_STATIC_WEB_APPS_API_TOKEN

## How It Works

### Local Development

1. **Webpack loads** `.env.local` file using `dotenv-webpack` plugin
2. **Environment variables** are injected at build time via `process.env`
3. **firebaseConfig.ts** reads from `process.env.REACT_APP_*`
4. **Firebase SDK** initializes with the configuration

### GitHub Actions / CI/CD

1. **GitHub Actions workflow** reads secrets from repository settings
2. **Secrets are injected** as environment variables during the build step
3. **dotenv-webpack** reads from system environment variables (`systemvars: true`)
4. **Build completes** with production Firebase configuration
5. **App deploys** to Azure with correct Firebase credentials

## File Structure

```
budget-manager-v4/
├── .env.example              # Template (committed to git)
├── .env.local               # Your local config (NOT in git)
├── .gitignore               # Excludes .env.* files
├── src/
│   └── firebaseConfig.ts    # Uses process.env variables
├── webpack.config.js        # Configured with dotenv-webpack
└── .github/
    └── workflows/
        └── azure-static-web-apps.yml  # Injects secrets during build
```

## Troubleshooting

### Build Fails with "undefined" Firebase Config

**Problem**: Firebase config values are undefined during build

**Solutions**:
1. **Local**: Make sure `.env.local` exists and has correct values
2. **GitHub**: Verify all secrets are added in repository settings
3. Check secret names match exactly (case-sensitive)

### Local Development Can't Connect to Firebase

**Problem**: App can't authenticate or connect to database

**Solutions**:
1. Verify `.env.local` has correct Firebase values
2. Check Firebase project is active in Firebase Console
3. Verify Firebase security rules allow access
4. Clear browser cache and restart dev server

### GitHub Actions Build Succeeds but App Doesn't Work

**Problem**: Deployment succeeds but app shows Firebase errors

**Solutions**:
1. Check browser console for specific Firebase errors
2. Verify all 7 Firebase secrets are set in GitHub
3. Check secret values don't have extra spaces or quotes
4. Re-run the GitHub Actions workflow

## Security Best Practices

### ✅ DO:
- Keep `.env.local` file only on your local machine
- Use GitHub Secrets for all sensitive values
- Rotate Firebase API keys periodically
- Set up Firebase security rules to restrict access
- Use different Firebase projects for dev/staging/production

### ❌ DON'T:
- Commit `.env.local` to git
- Share `.env.local` file via email or messaging
- Use production Firebase credentials in local development
- Hardcode credentials directly in source code
- Share GitHub repository secrets publicly

## Firebase Security Rules

Make sure your Firebase Realtime Database has proper security rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

This ensures users can only access their own data.

## Additional Resources

- [Firebase Environment Configuration](https://firebase.google.com/docs/web/setup)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [dotenv-webpack Documentation](https://github.com/mrsteele/dotenv-webpack)
- [Webpack Environment Variables](https://webpack.js.org/guides/environment-variables/)

## Support

If you encounter issues:

1. Check this documentation first
2. Verify all steps are completed
3. Check GitHub Actions logs for specific errors
4. Review Firebase Console for authentication/database issues
