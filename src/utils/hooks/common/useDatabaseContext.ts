import { useContext } from "react"
import { DatabaseContextProps } from "../../../types/common"
import { DatabaseContext } from "../../components/DatabaseProvider"

export const useDatabaseContext = (): DatabaseContextProps => {
  const context = useContext(DatabaseContext)
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider")
  }
  return context
}
