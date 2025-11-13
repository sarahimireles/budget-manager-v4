# Azure Migration Architecture - Budget Manager

## Document Information

- **Version:** 1.0
- **Date:** 2025-11-08
- **Migration Strategy:** Modernize during migration
- **Frontend Base:** React (budget-manager-v4) with MUI design system
- **Authentication:** Auth0
- **Target Platform:** Microsoft Azure

---

## Executive Summary

This document outlines the architecture for migrating Budget Manager from Firebase to Azure while modernizing the technology stack. The migration will:

1. **Preserve** the existing React + Material-UI design system from budget-manager-v4
2. **Keep** the current Webpack build tooling
3. **Modernize** state management (Context API → TanStack Query)
4. **Replace** Firebase services with REST API calls to Azure backend
5. **Adopt** Auth0 for authentication (replacing Firebase Auth)
6. **Maintain** Spanish-language codebase and user experience

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Proposed Azure Architecture](#2-proposed-azure-architecture)
3. [Service Mapping: Firebase → Azure (Frontend Perspective)](#3-service-mapping-firebase--azure-frontend-perspective)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Migration Phases](#6-migration-phases)
7. [Risk Assessment & Mitigation](#7-risk-assessment--mitigation)
8. [Key Recommendations](#8-key-recommendations)
9. [Success Metrics](#9-success-metrics)
10. [Next Steps](#10-next-steps)

---

## 1. Current Architecture

### 1.1 Current Stack (budget-manager-v4)

**Frontend:**
- React 19.0.0
- TypeScript 5.7.2
- Webpack 5.97.1
- Material-UI (MUI) 6.3.1
- React Router DOM 7.1.1
- Day.js (date handling)
- React Colorful (color picker)
- FontAwesome icons
- Context API (state management via AuthProvider/DatabaseProvider)

**Backend:**
- Firebase Realtime Database
- Firebase Authentication
- Firebase Hosting

**Development:**
- Firebase Emulator Suite (Auth + Database)
- Mock data loading for development
- ESLint + Prettier
- Husky for pre-commit hooks

### 1.2 Current Data Structure

Firebase Realtime Database structure:
```
users/
  {userId}/
    accounts/
      {accountKey}/
        - name
        - image
        - color
        - sumsToMonthlyBudget
        - currentBalance
        - accountType
    (other collections...)
```

**Key Services:**
- `accountsService.ts` - Account CRUD operations using Firebase Database SDK
- `serviceBase.ts` - Base class for all services with Firebase operations

### 1.3 Current Authentication Flow

1. User logs in via Firebase Authentication (email/password)
2. `AuthProvider` manages auth state using `onAuthStateChanged`
3. `DatabaseProvider` connects to Firebase Realtime Database (or emulator in dev)
4. Services use user ID for data scoping: `{userId}/{collection}`

---

## 2. Proposed Azure Architecture

### 2.1 Frontend Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React App (Webpack + TypeScript + MUI)                  │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   │
│  │  Components Layer:                                       │   │
│  │    • AccountsWidget, Dashboard, Transactions            │   │
│  │    • Material-UI Components (MUI 6)                     │   │
│  │    • Shared Theme & Color Mode                          │   │
│  │                                                          │   │
│  │  State Management Layer:                                │   │
│  │    • TanStack Query (server state, caching)             │   │
│  │    • React Context (UI state, theme)                    │   │
│  │                                                          │   │
│  │  API Client Layer:                                      │   │
│  │    • Axios (HTTP client)                                │   │
│  │    • Auth0 interceptor (JWT tokens)                     │   │
│  │    • API endpoint wrappers                              │   │
│  │                                                          │   │
│  │  Authentication:                                        │   │
│  │    • Auth0 React SDK                                    │   │
│  │    • Protected routes                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────┬───────────────────────────────────────────────────┘
              │
              │ HTTPS (serves on http://localhost:3000 in dev)
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Azure Static Web Apps                        │
│  - Hosts React SPA (production)                                 │
│  - CDN distribution                                             │
│  - Free SSL certificate                                         │
│  - Custom domain support                                        │
│  - Preview environments (PR branches)                           │
│  - Automatic CI/CD from GitHub                                  │
└─────────────┬───────────────────────────────────────────────────┘
              │
              │ HTTPS + Bearer Token (JWT from Auth0)
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REST API (Backend)                         │
│  - Endpoints: /api/accounts, /api/transactions, etc.            │
│  - Auth0 JWT validation                                         │
│  - JSON request/response                                        │
│                                                                 │
│  (Backend implementation details out of scope for this doc)     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     Auth0 (External Service)                    │
│  - User authentication (email/password)                         │
│  - Social login providers (optional)                            │
│  - JWT token issuance & validation                              │
│  - User management & profile storage                            │
│  - Free tier: 7,000 MAU                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│            Frontend Monitoring (Optional - Future)              │
│  - Azure Monitor / Application Insights                         │
│  - Frontend error tracking                                      │
│  - Performance monitoring (Core Web Vitals)                     │
│  - User analytics                                               │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Frontend Services Stack

| Layer | Service | Tier Recommendation | Purpose |
|-------|---------|---------------------|---------|
| **Frontend Hosting** | Azure Static Web Apps | Free tier | Host React SPA, automatic CI/CD from GitHub, CDN, SSL |
| **Authentication** | Auth0 | Free tier (7,000 MAU) | User authentication, JWT tokens, social logins |
| **API Client** | Axios | npm package | HTTP client for REST API calls |
| **State Management** | TanStack Query | npm package | Server state caching, background sync, optimistic updates |
| **UI Framework** | Material-UI (MUI) 6 | npm package | Component library, theming, responsive design |
| **Build Tool** | Webpack 5 | npm package | Bundle React app, dev server (localhost:3000) |
| **Optional: Monitoring** | Azure Monitor | Free tier (5GB/mo) | Frontend error tracking, performance monitoring |

**Note:** Backend services (API, database) are out of scope for this frontend-focused document.

---

## 3. Service Mapping: Firebase → Azure (Frontend Perspective)

### 3.1 Frontend Service Comparison

| Firebase Service | Azure/New Approach | Migration Complexity | Frontend Changes Required |
|-----------------|-------------------|---------------------|---------------------------|
| **Firebase Authentication** | **Auth0** | Medium | Replace Firebase Auth SDK with Auth0 React SDK, update AuthProvider |
| **Firebase SDK (Realtime DB)** | **Axios + REST API** | Medium | Replace Firebase service classes with API client + TanStack Query hooks |
| **Firebase Hosting** | **Azure Static Web Apps** | Low | Update deployment config, CI/CD setup (GitHub Actions) |
| **Firebase Emulator** | **Local API + Auth0 Dev** | Medium | Point API client to localhost REST API, use Auth0 dev tenant |
| **Context API (State)** | **TanStack Query + Context** | Medium | Migrate to TanStack Query for server state, keep Context for UI state |

### 3.2 Key Frontend Migration Points

**Authentication:**
- Replace `onAuthStateChanged` listener with Auth0 `useAuth0()` hook
- Update token management: Auth0 handles JWT tokens automatically
- Migrate user properties from Firebase User to Auth0 User object

**Data Fetching:**
- Replace Firebase `get()`, `set()`, `update()`, `remove()` with Axios REST calls
- Implement TanStack Query hooks for caching and background sync
- Replace real-time listeners with polling or WebSocket (if needed)

**Local Development:**
- Replace Firebase Emulator with local REST API server (backend team provides)
- Use Auth0 development tenant (free)
- Update environment variables from `FIREBASE_*` to `REACT_APP_*`

---

## 4. Frontend Architecture

### 4.1 Technology Stack Changes

**Current (budget-manager-v4):**
```
React 19 + Webpack + MUI + Context API + Firebase SDK
```

**Proposed:**
```
React 19 + Webpack + MUI + TanStack Query + Auth0 SDK + Axios
```

### 4.2 Key Changes

| Aspect | Current | Proposed | Reason |
|--------|---------|----------|--------|
| **Build Tool** | Webpack | Webpack (NO CHANGE) | Keep existing, working setup |
| **State Management** | Context API | TanStack Query + Context | Server state (TanStack) vs UI state (Context) |
| **API Client** | Firebase SDK | Axios | RESTful API calls to Azure backend |
| **Auth** | Firebase Auth | Auth0 React SDK | Auth0 provider requirement |
| **Design System** | MUI 6 | MUI 6 (keep!) | No change, preserve existing components |
| **Date Library** | Day.js | Day.js (keep!) | No change |
| **Icons** | FontAwesome | FontAwesome (keep!) | No change |
| **Color Picker** | React Colorful | React Colorful (keep!) | No change |

**IMPORTANT:**
- All existing UI components, styles, and design system from budget-manager-v4 will be preserved!
- **Webpack will NOT be migrated** - we keep the current build tooling to reduce migration complexity

### 4.3 Project Structure (Updated)

```
budget-manager-v4/
├── src/
│   ├── api/                              # NEW: API client layer
│   │   ├── client.ts                     # Axios instance with Auth0 interceptor
│   │   ├── endpoints/
│   │   │   ├── accounts.ts               # Account API calls
│   │   │   ├── transactions.ts           # Transaction API calls
│   │   │   └── categories.ts             # Category API calls
│   │   └── types/
│   │       ├── account.types.ts          # API request/response types
│   │       └── transaction.types.ts
│   │
│   ├── components/                       # KEEP: Existing components
│   │   ├── accounts-widget/
│   │   ├── common/
│   │   ├── modals/
│   │   └── shared-theme/
│   │
│   ├── features/                         # NEW: Feature-based hooks
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts            # Auth0 wrapper hook
│   │   │   └── components/
│   │   │       └── ProtectedRoute.tsx
│   │   └── accounts/
│   │       ├── hooks/
│   │       │   ├── useAccounts.ts        # TanStack Query hook
│   │       │   ├── useCreateAccount.ts   # Mutation hook
│   │       │   └── useUpdateAccount.ts
│   │       └── (reuse existing components)
│   │
│   ├── pages/                            # KEEP: Existing pages
│   │   ├── Dashboard.tsx
│   │   ├── Accounts.tsx
│   │   ├── Transactions.tsx
│   │   ├── Reports.tsx
│   │   ├── SpendingPlan.tsx
│   │   └── PaymentsAndBills.tsx
│   │
│   ├── services/                         # REMOVE: Replace with api/endpoints
│   │   ├── accountsService.ts            # → api/endpoints/accounts.ts
│   │   └── serviceBase.ts                # → api/client.ts
│   │
│   ├── utils/
│   │   ├── hooks/
│   │   │   └── common/
│   │   │       └── useAuthContext.ts     # UPDATE: Use Auth0 instead
│   │   └── components/
│   │       ├── AuthProvider.tsx          # UPDATE: Auth0Provider wrapper
│   │       └── DatabaseProvider.tsx      # REMOVE: No longer needed
│   │
│   ├── types/                            # KEEP: Existing types
│   ├── styles/                           # KEEP: Existing styles
│   └── App.tsx                           # UPDATE: Auth0Provider + QueryClientProvider
│
├── webpack.config.js                     # KEEP: No changes to Webpack config
├── package.json                          # UPDATE: Dependencies (add TanStack Query, Axios, Auth0)
└── .env.example                          # UPDATE: Auth0 + Azure API env vars
```

### 4.4 State Management Strategy

**TanStack Query for Server State:**
```typescript
// src/features/accounts/hooks/useAccounts.ts
import { useQuery } from '@tanstack/react-query';
import { accountsApi } from '@/api/endpoints/accounts';

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountsApi.getAccounts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
  });
};
```

**React Context for UI State:**
```typescript
// Keep existing pattern for theme, UI preferences
// Example: ColorModeContext, DrawerContext
```

### 4.5 Migration Path for Existing Components

**Example: AccountsWidget Component**

**Before (Firebase):**
```typescript
// src/services/accountsService.ts
export class AccountsService extends ServiceBase<Account> {
  constructor(db: Database, userId: string | undefined) {
    super(db, userId);
    this.serviceUrl = "accounts";
  }

  async getAll(): Promise<Account[] | null> {
    const snapshot = await get(this.getAllRef());
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([key, value]) =>
        this.mapWithKey(key, value as Account)
      );
    }
    return null;
  }
}
```

**After (Azure + TanStack Query):**
```typescript
// src/api/endpoints/accounts.ts
import apiClient from '@/api/client';
import { Account } from '@/types/accounts-widget';

export const accountsApi = {
  getAccounts: async (): Promise<Account[]> => {
    const { data } = await apiClient.get('/api/accounts');
    return data;
  },

  createAccount: async (account: Omit<Account, 'key'>): Promise<Account> => {
    const { data } = await apiClient.post('/api/accounts', account);
    return data;
  },
};

// src/features/accounts/hooks/useAccounts.ts
import { useQuery } from '@tanstack/react-query';
import { accountsApi } from '@/api/endpoints/accounts';

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountsApi.getAccounts,
  });
};

// Usage in component (minimal changes)
const AccountsWidget = () => {
  const { data: accounts, isLoading, error } = useAccounts();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar cuentas</div>;

  // Same rendering logic as before!
  return <div>{/* existing JSX */}</div>;
};
```

### 4.6 Auth0 Integration

**src/index.tsx:**
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);
```

**src/api/client.ts (Axios with Auth0 token):**
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// This will be called from a React component with access to useAuth0
let getAccessTokenSilently: (() => Promise<string>) | null = null;

export const setTokenGetter = (tokenGetter: () => Promise<string>) => {
  getAccessTokenSilently = tokenGetter;
};

apiClient.interceptors.request.use(
  async (config) => {
    if (getAccessTokenSilently) {
      try {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to get token', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
```

---

## 5. Authentication & Authorization

### 5.1 Auth0 Setup

**Auth0 Application Configuration:**
1. Create Auth0 tenant (free tier: 7,000 MAU)
2. Create Single Page Application in Auth0 dashboard
3. Configure Allowed Callback URLs: `http://localhost:3000, https://yourdomain.com`
4. Configure Allowed Logout URLs: `http://localhost:3000, https://yourdomain.com`
5. Configure Allowed Web Origins: `http://localhost:3000, https://yourdomain.com`
6. Enable Refresh Token Rotation
7. Create API in Auth0 (Identifier: `https://api.budgetmanager.com`)

**Auth0 Rules/Actions:**
```javascript
// Auth0 Action: Add user ID to token
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://budgetmanager.com';
  api.idToken.setCustomClaim(`${namespace}/userId`, event.user.user_id);
  api.accessToken.setCustomClaim(`${namespace}/userId`, event.user.user_id);
};
```

### 5.2 User Migration from Firebase to Auth0

**Option 1: Bulk User Import**
```bash
# Export Firebase users
firebase auth:export firebase-users.json --project your-project-id

# Transform to Auth0 format
# (Custom script needed)

# Import to Auth0
auth0 users import -c auth0_connection_id --users auth0-users.json
```

**Option 2: Progressive Migration**
- Keep Firebase Auth initially
- Lazy migration: Create Auth0 account on first login after migration
- User enters credentials → Check Auth0 → If not exists, verify with Firebase → Create in Auth0
- Deprecate Firebase Auth after 90 days

**Recommendation:** Progressive migration to minimize user disruption

---

## 6. Migration Phases

### 6.1 Phase 1: Development Environment Setup (Week 1-2)

**Goals:**
- Set up Azure resources
- Configure Auth0
- Set up TanStack Query
- Update dependencies (keep Webpack)

**Tasks:**
- [ ] Create Azure subscription and resource group
- [ ] Provision Azure Cosmos DB (serverless) or Azure SQL Database
- [ ] Set up Auth0 tenant and application
- [ ] Update package.json: Remove Firebase SDK, add Auth0 SDK, TanStack Query, Axios
- [ ] Keep Webpack configuration as-is (no migration needed)
- [ ] Update environment variables to use `REACT_APP_` prefix for Webpack
- [ ] Test local build with `npm start`

**Deliverables:**
- Working local environment with Webpack (no changes to build tool)
- Auth0 login/logout functional
- REST API available (backend implementation out of scope for this document)

### 6.2 Phase 2: Frontend Migration (Week 2-4)

**Goals:**
- Replace Firebase SDK with Axios API calls
- Implement TanStack Query hooks
- Update Auth0 authentication flow
- Preserve existing MUI components

**Tasks:**
- [ ] Create `api/client.ts` with Axios and Auth0 interceptor
- [ ] Create API endpoint files (`api/endpoints/accounts.ts`, etc.)
- [ ] Create TanStack Query hooks (`features/accounts/hooks/useAccounts.ts`)
- [ ] Update `AuthProvider` to use Auth0
- [ ] Remove `DatabaseProvider`
- [ ] Update all components to use TanStack Query hooks instead of Firebase
- [ ] Test all pages: Dashboard, Accounts, Transactions, Reports, Spending Plan
- [ ] Update forms to use API mutations
- [ ] Test error handling and loading states

**Component Migration Priority:**
1. Authentication (AuthProvider, SignIn)
2. Accounts (AccountsWidget, AddAccount modal)
3. Dashboard (AccountsWidget integration)
4. Transactions
5. Categories
6. Reports
7. Spending Plan

**Deliverables:**
- All components working with Azure API
- No Firebase dependencies in package.json
- Working authentication flow

### 6.3 Phase 3: Testing & Deployment (Week 4-5)

**Goals:**
- End-to-end testing
- Deploy to production
- Monitor performance

**Tasks:**
- [ ] Integration testing (API + frontend)
- [ ] User acceptance testing (UAT)
- [ ] Performance testing (load tests)
- [ ] Deploy frontend to Azure Static Web Apps
- [ ] Configure custom domain and SSL
- [ ] Set up Azure Monitor and Application Insights
- [ ] Create monitoring dashboards
- [ ] Test rollback procedure

**Deliverables:**
- Production deployment
- Monitoring dashboards
- Rollback plan

### 6.4 Phase 4: Post-Migration (Week 5-6)

**Goals:**
- Monitor production
- Optimize performance
- Deprecate Firebase

**Tasks:**
- [ ] Monitor error rates and performance
- [ ] Optimize slow queries
- [ ] Adjust Azure service tiers based on usage
- [ ] Collect user feedback
- [ ] Decommission Firebase (after 30 days of stability)
- [ ] Update documentation

---

## 7. Risk Assessment & Mitigation

### 7.1 Identified Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Data loss during migration** | Low | Critical | - Export Firebase data with verification<br>- Keep Firebase read-only as backup for 30 days<br>- Validate data counts post-migration |
| **Auth0 integration issues** | Medium | High | - Test Auth0 in dev environment first<br>- Progressive user migration (lazy migration)<br>- Keep Firebase Auth as fallback initially |
| **Increased Azure costs** | Medium | Medium | - Start with serverless Cosmos DB<br>- Monitor costs daily with Azure Cost Management<br>- Set up budget alerts at $20, $30, $50 |
| **API performance issues** | Low | Medium | - Load test API before production<br>- Use Azure Application Insights for monitoring<br>- Implement caching (TanStack Query + API level) |
| **TanStack Query integration issues** | Low | Low | - Test incrementally component by component<br>- Use same React version (19)<br>- Leverage extensive documentation and community support |
| **User disruption (auth changes)** | Medium | High | - Progressive migration (lazy user creation)<br>- Clear communication to users<br>- Provide migration guide for password reset if needed |
| **Breaking existing UI components** | Medium | Medium | - Keep MUI 6 (no breaking changes)<br>- Incremental testing per component<br>- Maintain existing design system |

### 7.2 Rollback Plan

**If migration fails:**

1. **Frontend rollback:**
   - Revert to Firebase build (keep Firebase branch in Git)
   - Redeploy previous version from Firebase Hosting

2. **Backend rollback:**
   - Keep Firebase Realtime Database active for 30 days post-migration
   - If critical issues, point frontend back to Firebase

3. **Data rollback:**
   - Restore Firebase data from exported backup
   - Sync any new data created in Azure back to Firebase (manual process)

**Rollback Triggers:**
- Data integrity issues (missing records, incorrect balances)
- Critical auth failures (users unable to log in)
- Performance degradation (>5s page loads)
- Unresolvable bugs affecting core functionality

---

## 8. Key Recommendations

### 8.1 Technical Recommendations

1. **Build Tool:** **KEEP Webpack**
   - Current setup is working well
   - Reduces migration complexity and risk
   - Focus migration effort on Azure services instead

2. **State Management:** Use **TanStack Query** for server state
   - Automatic caching and background refetching
   - Better developer experience than manual Context API
   - Reduces boilerplate code
   - Excellent TypeScript support

3. **Authentication:** Use **Auth0** with progressive migration
   - Free tier covers up to 7,000 users
   - Easier migration path than Azure AD B2C
   - Better social login support
   - Well-documented React SDK

4. **Hosting:** Use **Azure Static Web Apps Free tier**
   - Zero cost for hosting
   - Automatic CI/CD from GitHub
   - Built-in SSL and custom domains
   - Preview environments for PR branches

### 8.2 Migration Recommendations

1. **Preserve Design System:**
   - Keep all MUI components as-is
   - Reuse existing styles, colors, themes
   - Minimal visual changes for users

2. **Incremental Migration:**
   - Migrate one component at a time
   - Test thoroughly before moving to next
   - Keep Firebase as backup during migration

3. **User Communication:**
   - Announce migration 2 weeks in advance
   - Provide migration timeline
   - Set up support channel for issues

4. **Testing Strategy:**
   - Write integration tests for critical flows (create expense, view dashboard)
   - User acceptance testing with real users
   - Test with various network conditions and devices

---

## 9. Success Metrics

### 9.1 Technical Metrics

- **Migration Completion:** 100% of features migrated and working
- **Data Integrity:** 100% of Firebase data successfully migrated
- **Performance:** Page load time <2 seconds (same as Firebase)
- **Uptime:** 99.9% availability post-migration
- **Error Rate:** <0.5% of API requests fail

### 9.2 User Metrics

- **User Retention:** 95%+ of users successfully log in post-migration
- **Support Tickets:** <10 migration-related issues
- **User Satisfaction:** Maintain or improve user feedback scores

---

## 10. Next Steps

1. **Review this architecture document** with team
2. **Answer clarifying questions:**
   - Confirm REST API availability and endpoint specifications
   - Confirm Auth0 user migration strategy (progressive vs bulk)
   - Confirm migration timeline (5-6 weeks feasible for frontend?)

3. **Set up development environment** (Week 1)
4. **Begin Phase 1** (Frontend development environment setup)
5. **Create detailed migration plan** (see frontend-migration-plan.md)

---

## Appendix A: Technology Comparison

### A.1 State Management: Context API vs TanStack Query

**Current (Context API):**
```typescript
// Requires manual data fetching, caching, error handling
const [accounts, setAccounts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await accountsService.getAll();
      setAccounts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  fetchAccounts();
}, []);
```

**Proposed (TanStack Query):**
```typescript
// Automatic caching, loading states, error handling
const { data: accounts, isLoading, error } = useAccounts();

// That's it! Background refetching, caching, deduplication all handled
```

**Benefits:**
- Less boilerplate code
- Automatic background refetching
- Request deduplication
- Optimistic updates
- Automatic retry on failure
- Better TypeScript support

### A.2 Build Tool: Webpack Configuration

**Build Tool:** Webpack 5

**Key Points:**
1. **Current setup works well** - Webpack 5 is modern and well-maintained
2. **Focus on Azure migration** - Keep build tooling stable during migration
3. **Lower risk** - Avoid introducing potential breaking changes in build process
4. **Simpler testing** - Fewer moving parts to test during migration

**Configuration:**
- Keep existing `webpack.config.js` as-is
- Continue using `npm start` for development (serves on http://localhost:3000)
- Environment variables use `REACT_APP_` prefix (Webpack convention)
- No changes to build scripts in `package.json`

---

## Appendix B: Environment Variables

**Note:** Using Webpack with Create React App convention (`REACT_APP_` prefix)

**.env.example:**
```env
# Auth0 Configuration
REACT_APP_AUTH0_DOMAIN=your-tenant.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-spa-client-id
REACT_APP_AUTH0_AUDIENCE=https://api.budgetmanager.com

# API Configuration
REACT_APP_API_BASE_URL=https://your-api.azurewebsites.net

# App Configuration
REACT_APP_NAME=Budget Manager
REACT_APP_VERSION=2.0.0

# Feature Flags (optional)
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG=true
```

**.env.development:**
```env
REACT_APP_AUTH0_DOMAIN=dev-tenant.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=dev-client-id
REACT_APP_AUTH0_AUDIENCE=https://api.budgetmanager.com
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_ENABLE_DEBUG=true
```

**.env.production:**
```env
REACT_APP_AUTH0_DOMAIN=prod-tenant.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=prod-client-id
REACT_APP_AUTH0_AUDIENCE=https://api.budgetmanager.com
REACT_APP_API_BASE_URL=https://api.budgetmanager.com
REACT_APP_ENABLE_DEBUG=false
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-08 | Claude (AI Assistant) | Initial architecture document |
| 2.0 | 2025-11-08 | Claude (AI Assistant) | **Refactored to frontend-only architecture.** Removed all backend implementation details (Sections 5, 6, 9). Removed all Vite references. Updated to focus on frontend migration from Firebase to Azure REST API. |

---

**End of Document**
