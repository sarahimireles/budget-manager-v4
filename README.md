# Budget Manager v4

This is a budget management application that lets you manage your finances, create monthly budgets, set savings goals, watch expenses, track incomes, etc.

## Installation

Install everything

```
npm install
```

Install `firebase-tools` globally
```
sudo npm i -g firebase-tools
```

Create a `firebaseConfig.ts` file with your credentials in root like the following:
```
// firebaseConfig.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Change this
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
}

// Init Firebase app
const app = initializeApp(firebaseConfig)

// Export Auth
export const auth = getAuth(app)

export default app
```

Start server and emulator
```
npm run start:dev
```

Enjoy :P