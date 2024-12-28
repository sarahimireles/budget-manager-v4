import React, { createContext, ReactNode } from "react"
import { getDatabase } from "firebase/database"
import app from "../../../firebaseConfig"
import { DatabaseContextProps } from "../../types/common"

export const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined
)

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const db = getDatabase(app)

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  )
}
