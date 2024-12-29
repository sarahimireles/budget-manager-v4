import React, { createContext, ReactNode } from "react"
import { connectDatabaseEmulator, getDatabase } from "firebase/database"
import app from "../../../firebaseConfig"
import { DatabaseContextProps } from "../../types/common"

export const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined
)

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const db = getDatabase(app)

  if (process.env.NODE_ENV === "development") {
    connectDatabaseEmulator(db, "localhost", 9000)
  }

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  )
}
