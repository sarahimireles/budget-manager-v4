import React, { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import "./styles/global.scss"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./components/sign-in/SignIn"
import { auth } from "../firebaseConfig"
import AppTheme from "./components/shared-theme/AppTheme"
import ColorModeSelect from "./components/shared-theme/ColorModeSelect"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Accounts from "./pages/Accounts"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/common/Navbar"

const App = (props: { disableCustomTheme?: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setLoading(false)
      setUser(user)
    })

    // Limpiar suscripción cuando el componente se desmonta
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <AppTheme {...props}>
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <CssBaseline />

      <Container maxWidth="lg">
        {isAuthenticated ? (
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/accounts" element={<Accounts />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <SignIn />
        )}
      </Container>
    </AppTheme>
  )
}

export default App
