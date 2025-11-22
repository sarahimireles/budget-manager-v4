import React, { useState } from "react"
import "./styles/global.scss"
import SignIn from "./components/sign-in/SignIn"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { useAuthContext } from "./utils/hooks/common/useAuthContext"
import { AuthProvider, DatabaseProvider } from "./utils/components"
import { AppRoutes } from "./utils/common/AppRoutes"
import Navbar from "./components/common/Navbar"
import AppDrawer from "./components/common/AppDrawer"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Auth0Provider } from "@auth0/auth0-react"
import { auth0Config } from "./auth0Config"

const AuthContent = () => {
  const { isAuthenticated, loading } = useAuthContext()
  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  const toggleDrawer = () => {
    console.log("entro")
    setShowDrawer(!showDrawer)
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return isAuthenticated ? (
    <BrowserRouter>
      <Navbar toggleDrawerDispatch={toggleDrawer} />
      <AppDrawer showDrawer={showDrawer} toggleDrawerDispatch={toggleDrawer} />
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

const App = () => {
  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      cacheLocation={auth0Config.cacheLocation}
      useRefreshTokens={auth0Config.useRefreshTokens}
    >
      <AuthProvider>
        <DatabaseProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider>
              <AuthContent />
            </ThemeProvider>
          </LocalizationProvider>
        </DatabaseProvider>
      </AuthProvider>
    </Auth0Provider>
  )
}

export default App
