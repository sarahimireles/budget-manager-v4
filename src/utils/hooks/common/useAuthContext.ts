import { useContext } from "react"
import { AuthContext } from "../../components/AuthProvider"

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext debe ser usado dentro de un AuthProvider")
  }
  return context
}
