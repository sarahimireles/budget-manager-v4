import React, { createContext, ReactNode } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { AuthContextProps } from "../../types/common"

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
