# Frontend Migration Plan - Budget Manager v4

## Document Information

- **Version:** 1.0
- **Date:** 2025-11-08
- **Scope:** Frontend migration from Firebase to Azure REST API
- **Technology:** React 19, Webpack 5, Material-UI 6, TypeScript 5.7

---

## Table of Contents

1. [Overview](#1-overview)
2. [Current State Analysis](#2-current-state-analysis)
3. [Migration Strategy](#3-migration-strategy)
4. [General TODO List](#4-general-todo-list)
5. [Detailed Migration Steps](#5-detailed-migration-steps)
6. [Code Examples](#6-code-examples)
7. [Testing Checklist](#7-testing-checklist)

---

## 1. Overview

### 1.1 What We're Migrating

This plan guides the migration of the **Budget Manager v4** frontend application from Firebase to Azure. The migration focuses exclusively on the frontend codebase, replacing Firebase services with Auth0 (authentication) and Axios + REST API (data operations).

### 1.2 Why We're Migrating

- **Backend Independence:** Decouple frontend from Firebase, use REST API that can be implemented on any backend
- **Modern Auth:** Leverage Auth0 for better authentication management, social logins, and security
- **Better State Management:** Use TanStack Query for server state with automatic caching and background sync
- **Azure Hosting:** Deploy frontend to Azure Static Web Apps with free SSL, CDN, and CI/CD

### 1.3 What We're NOT Changing

- React 19 and TypeScript 5.7 (keep current versions)
- Webpack 5 build configuration (no migration to Vite)
- Material-UI 6 components and design system
- Spanish-language codebase and UI text
- Existing component structure and page layouts
- Day.js for date handling
- FontAwesome icons

### 1.4 Timeline Estimate

- **Total Duration:** 4-5 weeks
- **Phase 1 (Setup):** 3-5 days
- **Phase 2 (Auth Migration):** 3-4 days
- **Phase 3 (API Client Layer):** 2-3 days
- **Phase 4 (Component Migration):** 2-3 weeks
- **Phase 5 (Testing & Deployment):** 3-5 days

---

## 2. Current State Analysis

### 2.1 Existing Features in budget-manager-v4

Based on the actual source code, the current application includes:

**Pages:**
1. **Dashboard** (`/src/pages/Dashboard.tsx`)
   - User profile display
   - AccountsWidget integration
   - Demo buttons and layout testing

2. **Accounts** (`/src/pages/Accounts.tsx`)
   - Account management page (placeholder)

3. **Transactions** (`/src/pages/Transactions.tsx`)
   - Transaction management page (placeholder)

4. **Reports** (`/src/pages/Reports.tsx`)
   - Financial reports page (placeholder)

5. **SpendingPlan** (`/src/pages/SpendingPlan.tsx`)
   - Spending plan/budget page (placeholder)

6. **PaymentsAndBills** (`/src/pages/PaymentsAndBills.tsx`)
   - Bills and payments page (placeholder)

**Components:**

1. **AccountsWidget** (`/src/components/accounts-widget/AccountsWidget.tsx`)
   - Displays accounts grouped by type (Cash, Banks, etc.)
   - Shows account balances with currency formatting
   - "Add Account" button opens AddAccount modal
   - Uses Firebase AccountsService for data fetching
   - **Status:** ✅ Fully implemented

2. **AddAccount Modal** (`/src/components/modals/AddAccount.tsx`)
   - Modal dialog for creating new accounts
   - Form fields: name, icon, color, account type, initial balance
   - Icon picker and color picker integration
   - **Status:** ✅ Fully implemented

3. **Common Components:**
   - Navbar (top navigation bar)
   - AppDrawer (side navigation drawer)
   - StyledButton, StyledIcon, StyledAccordion, etc.
   - IconPicker, ColorPicker
   - CustomSnackbar (notifications)

4. **Shared Theme** (`/src/components/shared-theme/`)
   - AppTheme provider with light/dark mode
   - Color mode selection dropdown
   - Custom MUI theme with blue/gray palette

**Services:**

1. **ServiceBase** (`/src/services/serviceBase.ts`)
   - Abstract base class for Firebase operations
   - Methods: `getAll()`, `getById()`, `create()`, `update()`, `delete()`
   - Uses Firebase Realtime Database refs: `{userId}/{serviceUrl}/{objectId}`

2. **AccountsService** (`/src/services/accountsService.ts`)
   - Extends ServiceBase
   - Additional method: `getAccountsGroupedByType()`
   - Returns Account[] or AccountGroup[]

**Authentication:**

- **AuthProvider** (`/src/utils/components/AuthProvider.tsx`)
  - Uses Firebase `onAuthStateChanged` listener
  - Provides: `user`, `isAuthenticated`, `loading`
  - Context consumed by `useAuthContext()` hook

- **DatabaseProvider** (`/src/utils/components/DatabaseProvider.tsx`)
  - Provides Firebase Database instance
  - Connects to emulator in dev, production in prod
  - Context consumed by `useDatabaseContext()` hook

**Data Models:**

- **Account** (`/src/types/accounts-widget/types.ts`)
  ```typescript
  interface Account {
    key?: string
    name: string
    image: string
    color: string
    sumsToMonthlyBudget: boolean
    currentBalance: number
    accountType: AccountType
  }
  ```

- **AccountType**
  ```typescript
  interface AccountType {
    key?: string
    name: string
    image: string
  }
  ```

- **AccountGroup**
  ```typescript
  interface AccountGroup {
    name: string
    items: Account[]
    totalBalance: number
  }
  ```

### 2.2 Current Firebase Integration Points

**Authentication:**
- Firebase Auth SDK: `onAuthStateChanged()`, `signInWithEmailAndPassword()`, `signOut()`
- User object: `uid`, `email`, `displayName`

**Database:**
- Firebase Realtime Database SDK: `ref()`, `get()`, `set()`, `update()`, `remove()`, `push()`
- Data path structure: `/users/{userId}/accounts/{accountKey}`

**Emulator:**
- Firebase emulator suite runs on localhost:9000 (Auth) and localhost:9001 (Database)
- Mock data loaded from emulator data directory

### 2.3 Current Authentication Flow

1. User opens app → `AuthProvider` subscribes to `onAuthStateChanged`
2. If authenticated → Show dashboard, navbar, drawer
3. If not authenticated → Show SignIn page
4. On sign in → Firebase Auth creates session, `AuthProvider` updates state
5. On sign out → Firebase Auth clears session, redirect to SignIn

### 2.4 Current Data Flow (AccountsWidget Example)

1. Component mounts → `useEffect` runs
2. Get `db` from `useDatabaseContext()`, `userId` from `useAuthContext()`
3. Create `AccountsService` instance with db and userId
4. Call `accountsService.getAccountsGroupedByType()`
5. Service builds Firebase ref: `/users/{userId}/accounts`
6. Firebase SDK fetches data → returns snapshot
7. Service transforms snapshot to `Account[]`, groups by type
8. Component receives `AccountGroup[]` → renders accordions with accounts

---

## 3. Migration Strategy

### 3.1 Phased Approach

We'll migrate incrementally to reduce risk:

**Phase 1: Setup** (3-5 days)
- Install new dependencies (Auth0, Axios, TanStack Query)
- Remove Firebase dependencies
- Set up Auth0 application
- Create API client foundation
- Update environment variables

**Phase 2: Authentication** (3-4 days)
- Replace AuthProvider with Auth0Provider
- Update useAuthContext hook
- Migrate SignIn component
- Test login/logout flow

**Phase 3: API Client Layer** (2-3 days)
- Create Axios client with Auth0 interceptor
- Create API endpoint wrappers (accounts API)
- Create TanStack Query hooks (useAccounts, useCreateAccount)
- Test API calls with mock/real backend

**Phase 4: Component Migration** (2-3 weeks)
- **Priority 1:** AccountsWidget (main working component)
- **Priority 2:** AddAccount modal
- **Priority 3:** Dashboard page
- **Priority 4:** Other pages (Accounts, Transactions, etc.)
- Remove DatabaseProvider and all Firebase service classes

**Phase 5: Testing & Deployment** (3-5 days)
- End-to-end testing
- Fix bugs and polish
- Deploy to Azure Static Web Apps
- Set up CI/CD with GitHub Actions

### 3.2 Rollback Strategy

- Keep Firebase branch in git: `git checkout -b firebase-backup`
- Don't delete Firebase config until migration is stable
- Test each phase thoroughly before proceeding
- If critical issues arise, revert to Firebase branch

### 3.3 Data Migration (Out of Scope)

- Backend team handles data migration from Firebase to Azure database
- Frontend assumes REST API is available with migrated data
- Coordinate with backend team for API availability and endpoint specs

---

## 4. General TODO List

### 4.1 Phase 1: Setup

- [ ] **Install Dependencies**
  - [ ] `npm install @auth0/auth0-react @tanstack/react-query axios`
  - [ ] `npm install @tanstack/react-query-devtools --save-dev` (optional, for debugging)

- [ ] **Remove Firebase Dependencies**
  - [ ] `npm uninstall firebase`
  - [ ] Delete `firebaseConfig.ts`
  - [ ] Delete `.firebaserc` and `firebase.json`

- [ ] **Auth0 Setup**
  - [ ] Create Auth0 account (free tier)
  - [ ] Create Auth0 Application (Single Page Application)
  - [ ] Configure Allowed Callback URLs: `http://localhost:3000`, `https://yourdomain.com`
  - [ ] Configure Allowed Logout URLs: `http://localhost:3000`, `https://yourdomain.com`
  - [ ] Configure Allowed Web Origins: `http://localhost:3000`, `https://yourdomain.com`
  - [ ] Create Auth0 API (Audience): `https://api.budgetmanager.com`
  - [ ] Copy Domain, Client ID, Audience to `.env` file

- [ ] **Environment Variables**
  - [ ] Create/update `.env` file with Auth0 and API config
  - [ ] Update `.env.example` for team reference

### 4.2 Phase 2: Authentication Migration

- [ ] **Update AuthProvider**
  - [ ] Replace Firebase Auth with Auth0Provider in `src/index.tsx`
  - [ ] Update `useAuthContext` hook to use `useAuth0()`
  - [ ] Test authentication state management

- [ ] **Update SignIn Component**
  - [ ] Replace Firebase sign-in with Auth0 `loginWithRedirect()`
  - [ ] Update UI for Auth0 login flow
  - [ ] Add loading and error states

- [ ] **Test Authentication**
  - [ ] Test login flow
  - [ ] Test logout flow
  - [ ] Test protected routes
  - [ ] Test token expiration and refresh

### 4.3 Phase 3: API Client Layer

- [ ] **Create API Client**
  - [ ] Create `src/api/client.ts` with Axios instance
  - [ ] Add Auth0 token interceptor
  - [ ] Configure base URL from environment variable

- [ ] **Create API Endpoints**
  - [ ] Create `src/api/endpoints/accounts.ts`
  - [ ] Implement: `getAccounts()`, `getAccountById()`, `createAccount()`, `updateAccount()`, `deleteAccount()`
  - [ ] Define TypeScript types for API requests/responses

- [ ] **Create TanStack Query Hooks**
  - [ ] Create `src/hooks/accounts/useAccounts.ts` (query)
  - [ ] Create `src/hooks/accounts/useCreateAccount.ts` (mutation)
  - [ ] Create `src/hooks/accounts/useUpdateAccount.ts` (mutation)
  - [ ] Create `src/hooks/accounts/useDeleteAccount.ts` (mutation)

- [ ] **Set Up QueryClient**
  - [ ] Wrap app with `QueryClientProvider` in `src/index.tsx`
  - [ ] Configure default query options (staleTime, cacheTime, retry)

### 4.4 Phase 4: Component Migration

- [ ] **AccountsWidget Migration**
  - [ ] Replace Firebase service calls with `useAccounts()` hook
  - [ ] Remove `useEffect` and manual state management
  - [ ] Test data fetching and display
  - [ ] Test loading and error states

- [ ] **AddAccount Modal Migration**
  - [ ] Replace Firebase create with `useCreateAccount()` mutation
  - [ ] Update form submission handler
  - [ ] Add optimistic updates
  - [ ] Test account creation flow

- [ ] **Dashboard Page**
  - [ ] Update to use migrated AccountsWidget
  - [ ] Test page renders correctly

- [ ] **Remove Old Code**
  - [ ] Delete `src/services/` directory
  - [ ] Delete `src/utils/components/DatabaseProvider.tsx`
  - [ ] Remove Firebase imports from all files
  - [ ] Update `package.json` to remove Firebase scripts

### 4.5 Phase 5: Testing & Deployment

- [ ] **Testing**
  - [ ] Test all pages load correctly
  - [ ] Test authentication flow
  - [ ] Test account CRUD operations
  - [ ] Test error handling (network errors, API errors)
  - [ ] Test loading states
  - [ ] Test responsive design (mobile, tablet, desktop)

- [ ] **Deployment**
  - [ ] Create Azure Static Web Apps resource
  - [ ] Configure deployment from GitHub repository
  - [ ] Set up environment variables in Azure portal
  - [ ] Test production build locally (`npm run build`)
  - [ ] Deploy to staging environment
  - [ ] Test staging environment
  - [ ] Deploy to production

---

## 5. Detailed Migration Steps

### Step 1: Setup (Phase 1)

#### 1.1 Install Dependencies

```bash
# Install new dependencies
npm install @auth0/auth0-react @tanstack/react-query axios

# Optional: TanStack Query DevTools for debugging
npm install @tanstack/react-query-devtools --save-dev

# Remove Firebase
npm uninstall firebase
```

#### 1.2 Update package.json Scripts

Remove Firebase-specific scripts:

```json
{
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
    "lint": "eslint \"**/*.{ts,tsx,js,jsx}\"",
    "lint:fix": "eslint \"**/*.{ts,tsx,js,jsx}\" --fix"
  }
}
```

Remove `firebase:emulator` and `start:dev` scripts (no longer needed).

#### 1.3 Set Up Auth0

1. Go to https://auth0.com and create a free account
2. Create a new Application:
   - Type: Single Page Application
   - Name: Budget Manager
3. Configure Application Settings:
   - Allowed Callback URLs: `http://localhost:3000, https://yourdomain.com`
   - Allowed Logout URLs: `http://localhost:3000, https://yourdomain.com`
   - Allowed Web Origins: `http://localhost:3000, https://yourdomain.com`
4. Create API:
   - Name: Budget Manager API
   - Identifier: `https://api.budgetmanager.com`
5. Copy credentials for `.env` file:
   - Domain (e.g., `dev-abc123.us.auth0.com`)
   - Client ID (e.g., `abc123xyz...`)
   - Audience (e.g., `https://api.budgetmanager.com`)

#### 1.4 Configure Environment Variables

Create/update `.env` file:

```env
# Auth0 Configuration
REACT_APP_AUTH0_DOMAIN=dev-abc123.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=abc123xyz789
REACT_APP_AUTH0_AUDIENCE=https://api.budgetmanager.com

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000

# App Configuration
REACT_APP_NAME=Budget Manager
REACT_APP_VERSION=2.0.0
```

Create `.env.example` for team:

```env
# Auth0 Configuration
REACT_APP_AUTH0_DOMAIN=your-tenant.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=https://api.budgetmanager.com

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000
```

#### 1.5 Delete Firebase Files

```bash
# Delete Firebase configuration
rm src/firebaseConfig.ts
rm .firebaserc
rm firebase.json

# Delete Firebase emulator data (optional, for backup)
rm -rf .firebase/
```

---

### Step 2: Create API Client (Phase 3)

#### 2.1 Create Axios Client with Auth0 Interceptor

Create `src/api/client.ts`:

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token getter function (will be set by App component)
let getAccessTokenSilently: (() => Promise<string>) | null = null;

export const setTokenGetter = (tokenGetter: () => Promise<string>) => {
  getAccessTokenSilently = tokenGetter;
};

// Request interceptor to add Auth0 token
apiClient.interceptors.request.use(
  async (config) => {
    if (getAccessTokenSilently) {
      try {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to get access token', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Other error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

#### 2.2 Create Account API Endpoints

Create `src/api/endpoints/accounts.ts`:

```typescript
import apiClient from '../client';
import { Account, AccountGroup } from '../../types/accounts-widget';

export const accountsApi = {
  // Get all accounts
  getAccounts: async (): Promise<Account[]> => {
    const { data } = await apiClient.get<Account[]>('/api/accounts');
    return data;
  },

  // Get accounts grouped by type
  getAccountsGroupedByType: async (): Promise<AccountGroup[]> => {
    const { data } = await apiClient.get<AccountGroup[]>('/api/accounts/grouped');
    return data;
  },

  // Get single account by ID
  getAccountById: async (id: string): Promise<Account> => {
    const { data } = await apiClient.get<Account>(`/api/accounts/${id}`);
    return data;
  },

  // Create new account
  createAccount: async (account: Omit<Account, 'key'>): Promise<Account> => {
    const { data } = await apiClient.post<Account>('/api/accounts', account);
    return data;
  },

  // Update account
  updateAccount: async (id: string, account: Partial<Account>): Promise<Account> => {
    const { data } = await apiClient.put<Account>(`/api/accounts/${id}`, account);
    return data;
  },

  // Delete account
  deleteAccount: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/accounts/${id}`);
  },
};
```

#### 2.3 Create TanStack Query Hooks

Create `src/hooks/accounts/useAccounts.ts`:

```typescript
import { useQuery } from '@tanstack/react-query';
import { accountsApi } from '../../api/endpoints/accounts';
import { AccountGroup } from '../../types/accounts-widget';

export const useAccountsGrouped = () => {
  return useQuery<AccountGroup[], Error>({
    queryKey: ['accounts', 'grouped'],
    queryFn: accountsApi.getAccountsGroupedByType,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};
```

Create `src/hooks/accounts/useCreateAccount.ts`:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountsApi } from '../../api/endpoints/accounts';
import { Account } from '../../types/accounts-widget';

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (account: Omit<Account, 'key'>) => accountsApi.createAccount(account),
    onSuccess: () => {
      // Invalidate and refetch accounts
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error) => {
      console.error('Failed to create account:', error);
    },
  });
};
```

---

### Step 3: Migrate Authentication (Phase 2)

#### 3.1 Update index.tsx with Auth0Provider

Update `src/index.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);
```

#### 3.2 Update App.tsx

Update `src/App.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import './styles/global.scss';
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from './components/sign-in/SignIn';
import AppTheme from './components/shared-theme/AppTheme';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { setTokenGetter } from './api/client';
import { AppRoutes } from './utils/common/AppRoutes';
import Navbar from './components/common/Navbar';
import AppDrawer from './components/common/AppDrawer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AuthContent = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  // Set token getter for API client
  useEffect(() => {
    setTokenGetter(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? (
    <BrowserRouter>
      <Navbar toggleDrawerDispatch={toggleDrawer} />
      <AppDrawer showDrawer={showDrawer} toggleDrawerDispatch={toggleDrawer} />
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  ) : (
    <SignIn />
  );
};

const App = (props: { disableCustomTheme?: boolean }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppTheme {...props}>
        <CssBaseline />
        <AuthContent />
      </AppTheme>
    </LocalizationProvider>
  );
};

export default App;
```

#### 3.3 Update SignIn Component

Update `src/components/sign-in/SignIn.tsx`:

```typescript
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const SignIn = () => {
  const { loginWithRedirect, isLoading, error } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Card sx={{ maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Budget Manager
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Inicia sesión para acceder a tu cuenta
          </Typography>
          {error && (
            <Typography color="error" paragraph>
              Error al iniciar sesión: {error.message}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
```

#### 3.4 Delete Old AuthProvider and DatabaseProvider

```bash
# Delete Firebase auth and database providers
rm src/utils/components/AuthProvider.tsx
rm src/utils/components/DatabaseProvider.tsx

# Delete hooks
rm src/utils/hooks/common/useAuthContext.ts
rm src/utils/hooks/common/useDatabaseContext.ts
```

---

### Step 4: Migrate AccountsWidget (Phase 4)

#### 4.1 Update AccountsWidget Component

Update `src/components/accounts-widget/AccountsWidget.tsx`:

```typescript
import {
  AccordionDetails,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';
import { formatCurrency } from '../../utils/functions';
import Grid from '@mui/material/Grid2';
import {
  StyledAccordion,
  StyledAccordionSummary,
} from '../common/StyledAccordion';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ACCOUNTS_WIDGET_CONSTANTS } from '../../types/accounts-widget';
import StyledButton from '../common/StyledButton';
import { AddAccount } from '../modals/AddAccount';
import { AddAccountProps } from '../../types/modals';
import { useAccountsGrouped } from '../../hooks/accounts/useAccounts';

export const AccountsWidget = () => {
  const { data: accounts, isLoading, error } = useAccountsGrouped();
  const [addAccountsOpen, setAddAccountsOpen] = useState<boolean>(false);

  const addAccountProps: AddAccountProps = {
    open: addAccountsOpen,
    handleClose: () => {
      setAddAccountsOpen(false);
    },
  };

  const openAddAccountDialog = () => {
    setAddAccountsOpen(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader title={ACCOUNTS_WIDGET_CONSTANTS.TITLE} />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader title={ACCOUNTS_WIDGET_CONSTANTS.TITLE} />
        <CardContent>
          <Alert severity="error">
            Error al cargar cuentas: {error.message}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <AddAccount {...addAccountProps} />
      <Card>
        <CardHeader
          sx={{ paddingBottom: '1.5rem' }}
          title={ACCOUNTS_WIDGET_CONSTANTS.TITLE}
          action={
            <StyledButton
              variant="text"
              size="small"
              color="primary"
              onClick={openAddAccountDialog}
              startIcon={<FontAwesomeIcon icon={faPlus} />}
            >
              {ACCOUNTS_WIDGET_CONSTANTS.ADD_ACCOUNT_TEXT}
            </StyledButton>
          }
        />
        <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
          {accounts && accounts.length > 0 ? (
            accounts.map((group) => (
              <StyledAccordion key={group.name}>
                <StyledAccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Grid container spacing={3} sx={{ width: '100%' }}>
                    <Grid size={9}>
                      <Typography>{group.name}</Typography>
                    </Grid>
                    <Grid size={3} sx={{ textAlign: 'right' }}>
                      <Typography>
                        {formatCurrency(group.totalBalance)}
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledAccordionSummary>
                <AccordionDetails>
                  <List>
                    {group.items?.map((account) => (
                      <ListItem key={account.key}>
                        <ListItemText primary={account.name} />
                        <Typography sx={{ textAlign: 'right' }}>
                          {formatCurrency(account.currentBalance)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </StyledAccordion>
            ))
          ) : (
            <Typography sx={{ pl: 2, pr: 2, pb: 2 }}>
              No hay cuentas registradas
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};
```

**Key Changes:**
- Removed Firebase service instantiation and manual state management
- Replaced `useEffect` with `useAccountsGrouped()` hook from TanStack Query
- Added loading state with `CircularProgress`
- Added error state with `Alert`
- Data automatically refetches in background, no need for manual `refreshAccounts()`

#### 4.2 Update AddAccount Modal

Update `src/components/modals/AddAccount.tsx`:

```typescript
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { AddAccountProps } from '../../types/modals';
import { Account } from '../../types/accounts-widget';
import { useCreateAccount } from '../../hooks/accounts/useCreateAccount';

export const AddAccount = ({ open, handleClose }: AddAccountProps) => {
  const { mutate: createAccount, isPending, error } = useCreateAccount();
  const [formData, setFormData] = useState<Omit<Account, 'key'>>({
    name: '',
    image: 'wallet',
    color: '#1976d2',
    sumsToMonthlyBudget: true,
    currentBalance: 0,
    accountType: {
      name: 'Efectivo',
      image: 'money-bill',
    },
  });

  const handleSubmit = () => {
    createAccount(formData, {
      onSuccess: () => {
        // Close modal and reset form
        handleClose();
        setFormData({
          name: '',
          image: 'wallet',
          color: '#1976d2',
          sumsToMonthlyBudget: true,
          currentBalance: 0,
          accountType: {
            name: 'Efectivo',
            image: 'money-bill',
          },
        });
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Cuenta</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error al crear cuenta: {error.message}
          </Alert>
        )}
        <TextField
          label="Nombre de la cuenta"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Saldo inicial"
          type="number"
          value={formData.currentBalance}
          onChange={(e) =>
            setFormData({
              ...formData,
              currentBalance: parseFloat(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        {/* Add other fields as needed: icon picker, color picker, account type */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending || !formData.name}
        >
          {isPending ? 'Creando...' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
```

**Key Changes:**
- Replaced Firebase service call with `useCreateAccount()` mutation hook
- Added `isPending` state from mutation (automatic loading state)
- Added error handling from mutation
- Automatic cache invalidation after successful creation (TanStack Query refetches accounts)

#### 4.3 Delete Old Service Files

```bash
# Delete Firebase service classes
rm -rf src/services/
```

---

### Step 5: Update Dashboard and Other Pages (Phase 4 continued)

#### 5.1 Update Dashboard

Update `src/pages/Dashboard.tsx`:

```typescript
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { AccountsWidget } from '../components/accounts-widget/AccountsWidget';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';

const Dashboard = () => {
  const { user } = useAuth0();

  return (
    <Container maxWidth="lg">
      <Box>
        <Paper elevation={0} sx={{ padding: '1rem', marginTop: '1rem' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" paragraph>
            Usuario autenticado: {user?.email || ''}
          </Typography>
          <AccountsWidget />
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
```

**Key Changes:**
- Replaced `useAuthContext()` with `useAuth0()` from Auth0
- User object now comes from Auth0 (properties may differ slightly)

---

## 6. Code Examples

### 6.1 Complete API Client Example

`src/api/client.ts` - Full implementation with error handling:

```typescript
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let getAccessTokenSilently: (() => Promise<string>) | null = null;

export const setTokenGetter = (tokenGetter: () => Promise<string>) => {
  getAccessTokenSilently = tokenGetter;
};

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    if (getAccessTokenSilently) {
      try {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to get access token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server error (4xx, 5xx)
      const status = error.response.status;
      const data = error.response.data as any;

      console.error(`API Error ${status}:`, data);

      if (status === 401) {
        // Unauthorized - token expired or invalid
        console.error('Unauthorized - please log in again');
      } else if (status === 403) {
        // Forbidden - insufficient permissions
        console.error('Forbidden - insufficient permissions');
      } else if (status === 404) {
        // Not found
        console.error('Resource not found');
      } else if (status >= 500) {
        // Server error
        console.error('Server error - please try again later');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
    } else {
      // Other error
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### 6.2 Complete TanStack Query Hook Example

`src/hooks/accounts/useAccounts.ts` - Query hook with error handling:

```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { accountsApi } from '../../api/endpoints/accounts';
import { AccountGroup } from '../../types/accounts-widget';
import { AxiosError } from 'axios';

export const useAccountsGrouped = (
  options?: Omit<
    UseQueryOptions<AccountGroup[], AxiosError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<AccountGroup[], AxiosError>({
    queryKey: ['accounts', 'grouped'],
    queryFn: accountsApi.getAccountsGroupedByType,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 1, // Retry once on failure
    ...options, // Allow custom options
  });
};
```

`src/hooks/accounts/useCreateAccount.ts` - Mutation hook with optimistic updates:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountsApi } from '../../api/endpoints/accounts';
import { Account } from '../../types/accounts-widget';
import { AxiosError } from 'axios';

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<Account, AxiosError, Omit<Account, 'key'>>({
    mutationFn: accountsApi.createAccount,

    // Optimistic update (optional - shows immediate UI feedback)
    onMutate: async (newAccount) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['accounts'] });

      // Snapshot previous value
      const previousAccounts = queryClient.getQueryData(['accounts', 'grouped']);

      // Optimistically update cache (you can implement this if desired)
      // queryClient.setQueryData(['accounts', 'grouped'], (old) => [...old, newAccount]);

      return { previousAccounts };
    },

    // On success, invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },

    // On error, rollback optimistic update
    onError: (error, variables, context) => {
      console.error('Failed to create account:', error);
      if (context?.previousAccounts) {
        queryClient.setQueryData(['accounts', 'grouped'], context.previousAccounts);
      }
    },

    // Always refetch after mutation completes
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};
```

### 6.3 Protected Route Example

`src/components/common/ProtectedRoute.tsx` - Protect routes with Auth0:

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

---

## 7. Testing Checklist

### 7.1 Authentication Testing

- [ ] **Login Flow**
  - [ ] User can click "Iniciar sesión" button
  - [ ] Auth0 login page appears
  - [ ] User can enter credentials
  - [ ] User is redirected back to app after login
  - [ ] Dashboard loads correctly after login

- [ ] **Logout Flow**
  - [ ] User can click logout button (add to Navbar)
  - [ ] User is logged out successfully
  - [ ] User is redirected to SignIn page
  - [ ] Attempting to access protected routes redirects to SignIn

- [ ] **Token Management**
  - [ ] Access token is automatically added to API requests
  - [ ] Token refresh works automatically (test by waiting 1+ hour)
  - [ ] Expired token triggers re-authentication

### 7.2 AccountsWidget Testing

- [ ] **Data Fetching**
  - [ ] Accounts load on component mount
  - [ ] Loading spinner shows while fetching
  - [ ] Accounts are grouped by type correctly
  - [ ] Account balances are formatted as currency
  - [ ] Total balance per group is calculated correctly

- [ ] **Error Handling**
  - [ ] Network error shows error alert
  - [ ] API error shows error message
  - [ ] User can retry after error (manual refresh)

- [ ] **Empty State**
  - [ ] "No hay cuentas registradas" message shows when no accounts

### 7.3 AddAccount Modal Testing

- [ ] **Form Validation**
  - [ ] Submit button is disabled when name is empty
  - [ ] Form fields accept input correctly
  - [ ] Number fields only accept numbers

- [ ] **Account Creation**
  - [ ] User can open modal by clicking "Agregar cuenta" button
  - [ ] User can fill in account details
  - [ ] User can submit form
  - [ ] Loading state shows during submission
  - [ ] Modal closes after successful creation
  - [ ] New account appears in AccountsWidget immediately
  - [ ] Error message shows if creation fails

- [ ] **Cancel Flow**
  - [ ] User can close modal without saving
  - [ ] Form resets when modal is reopened

### 7.4 Performance Testing

- [ ] **Caching**
  - [ ] Accounts are cached after first load
  - [ ] Navigating away and back does not refetch (within staleTime)
  - [ ] Background refetch happens after staleTime expires

- [ ] **Network Efficiency**
  - [ ] No duplicate API calls on mount
  - [ ] Only changed data is sent in update requests

### 7.5 Responsive Design Testing

- [ ] **Desktop (1920x1080)**
  - [ ] All components render correctly
  - [ ] No horizontal scrolling
  - [ ] Proper spacing and alignment

- [ ] **Tablet (768x1024)**
  - [ ] Drawer collapses to hamburger menu
  - [ ] Cards stack properly
  - [ ] Text remains readable

- [ ] **Mobile (375x667)**
  - [ ] Navigation drawer works
  - [ ] Forms are usable
  - [ ] No overflow issues

### 7.6 Cross-Browser Testing

- [ ] **Chrome**
  - [ ] App loads and functions correctly
  - [ ] No console errors

- [ ] **Firefox**
  - [ ] App loads and functions correctly
  - [ ] No console errors

- [ ] **Safari**
  - [ ] App loads and functions correctly
  - [ ] No console errors

- [ ] **Edge**
  - [ ] App loads and functions correctly
  - [ ] No console errors

### 7.7 Production Build Testing

- [ ] **Build Process**
  - [ ] `npm run build` completes without errors
  - [ ] Build output size is reasonable (< 2MB)
  - [ ] Source maps are generated

- [ ] **Production Mode**
  - [ ] Serve production build locally (use `serve -s build`)
  - [ ] All features work in production mode
  - [ ] Performance is acceptable (< 2s page load)

---

## Appendix A: Environment Variables Reference

### Development (.env)

```env
# Auth0
REACT_APP_AUTH0_DOMAIN=dev-abc123.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=xyz789abc123
REACT_APP_AUTH0_AUDIENCE=https://api.budgetmanager.com

# API
REACT_APP_API_BASE_URL=http://localhost:5000

# App
REACT_APP_NAME=Budget Manager
REACT_APP_VERSION=2.0.0
REACT_APP_ENV=development
```

### Production (.env.production)

```env
# Auth0
REACT_APP_AUTH0_DOMAIN=prod-xyz789.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=abc123xyz789
REACT_APP_AUTH0_AUDIENCE=https://api.budgetmanager.com

# API
REACT_APP_API_BASE_URL=https://api.budgetmanager.com

# App
REACT_APP_NAME=Budget Manager
REACT_APP_VERSION=2.0.0
REACT_APP_ENV=production
```

---

## Appendix B: Troubleshooting

### Common Issues

**Issue:** Auth0 login fails with "Callback URL mismatch"
- **Solution:** Ensure `http://localhost:3000` is added to Allowed Callback URLs in Auth0 dashboard

**Issue:** API requests return 401 Unauthorized
- **Solution:** Check that Auth0 audience is correctly configured and matches backend API

**Issue:** TanStack Query doesn't refetch data
- **Solution:** Check `staleTime` and `gcTime` settings, ensure query keys are unique

**Issue:** Component crashes with "Cannot read property 'map' of undefined"
- **Solution:** Add null checks or optional chaining: `accounts?.map(...)`

**Issue:** Webpack dev server won't start on port 3000
- **Solution:** Port may be in use, kill process: `npx kill-port 3000` or change port in webpack config

**Issue:** Environment variables not loading
- **Solution:** Ensure variables start with `REACT_APP_` prefix, restart dev server after changing `.env`

---

## Appendix C: Useful Commands

```bash
# Development
npm start                          # Start dev server (http://localhost:3000)
npm run build                      # Build for production
npm run lint                       # Run ESLint
npm run lint:fix                   # Fix ESLint errors automatically

# Dependency Management
npm install                        # Install dependencies
npm update                         # Update dependencies
npm outdated                       # Check for outdated packages

# Testing
npx serve -s build                 # Serve production build locally
npx kill-port 3000                 # Kill process on port 3000

# Git
git status                         # Check git status
git add .                          # Stage all changes
git commit -m "message"            # Commit changes
git push                           # Push to remote

# Clean Install (if issues occur)
rm -rf node_modules package-lock.json
npm install
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-08 | Claude (AI Assistant) | Initial frontend migration plan |

---

**End of Document**
