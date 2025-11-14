import React, { createContext, ReactNode } from "react"
import {
  connectDatabaseEmulator,
  getDatabase,
  ref,
  set,
} from "firebase/database"
import app from "../../firebaseConfig"
import { DatabaseContextProps } from "../../types/common"
import mockData from "../../../mockData.json"

export const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined
)

let isEmulatorConnected = false // Bandera para evitar múltiples conexiones

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const db = getDatabase(app)

  if (process.env.NODE_ENV === "development" && !isEmulatorConnected) {
    connectDatabaseEmulator(db, "localhost", 9000)
    isEmulatorConnected = true // Marca el emulador como conectado

    // Load mock data into the database
    const rootRef = ref(db, "/")
    set(rootRef, mockData)
      .then(() => console.log("Mock data loaded successfully"))
      .catch((error) => console.error("Error loading mock data:", error))
  }

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  )
}
