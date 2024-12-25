import React, { createContext, useState, useEffect, ReactNode } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import { AuthContextProps } from "../../types/common"

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Manejar autenticación de usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsAuthenticated(!!user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
