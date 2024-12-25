import React from "react"
import "./styles/global.scss"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./components/sign-in/SignIn"
import AppTheme from "./components/shared-theme/AppTheme"
import ColorModeSelect from "./components/shared-theme/ColorModeSelect"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import { useAuthContext } from "./utils/hooks/common/useAuthContext"
import { AuthProvider } from "./utils/components/AuthProvider"
import { AppRoutes } from "./utils/common/AppRoutes"

const AuthContent = () => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) {
    return <div>Cargando...</div>
  }

  return isAuthenticated ? (
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
  )
}

const App = (props: { disableCustomTheme?: boolean }) => {
  return (
    <AuthProvider>
      <AppTheme {...props}>
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <CssBaseline />

        <Container maxWidth="lg">
          <AuthContent />
        </Container>
      </AppTheme>
    </AuthProvider>
  )
}

export default App
