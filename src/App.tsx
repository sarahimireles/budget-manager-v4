import React, { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import "./styles/global.scss"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./components/sign-in/SignIn"
import { auth } from "../firebaseConfig"
import Button from "@mui/material/Button"
import AppTheme from "./components/shared-theme/AppTheme"
import ColorModeSelect from "./components/shared-theme/ColorModeSelect"

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
          <Box>
            <h2>Pantalon para tiendas</h2>
            <p>Usuario autenticado: {user?.email}</p>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                signOut(auth)
              }}
            >
              Cerrar sesion
            </Button>
          </Box>
        ) : (
          <SignIn />
        )}
      </Container>
    </AppTheme>
  )
}

export default App
