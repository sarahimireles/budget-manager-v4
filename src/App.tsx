import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import "./styles/global.scss"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./components/sign-in/SignIn"
import { auth } from "../firebaseConfig"
import AppTheme from "./components/shared-theme/AppTheme"
import ColorModeSelect from "./components/shared-theme/ColorModeSelect"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import { AppRoutes } from "./utils/common/AppRoutes"

const App = (props: { disableCustomTheme?: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setLoading(false)
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
              {AppRoutes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
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
