import React from "react"
import "./styles/global.scss"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./components/sign-in/SignIn"
import AppTheme from "./components/shared-theme/AppTheme"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { useAuthContext } from "./utils/hooks/common/useAuthContext"
import { AuthProvider, DatabaseProvider } from "./utils/components"
import { AppRoutes } from "./utils/common/AppRoutes"
import Navbar from "./components/common/Navbar"

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
      <DatabaseProvider>
        <AppTheme {...props}>
          <CssBaseline />

          <AuthContent />
        </AppTheme>
      </DatabaseProvider>
    </AuthProvider>
  )
}

export default App
