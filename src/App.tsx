import React from "react"
import "./styles/global.scss"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./components/sign-in/SignIn"
import AppTheme from "./components/shared-theme/AppTheme"
import ColorModeSelect from "./components/shared-theme/ColorModeSelect"
import Box from "@mui/material/Box"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { useAuthContext } from "./utils/hooks/common/useAuthContext"
import { AuthProvider } from "./utils/components/AuthProvider"
import { AppRoutes } from "./utils/common/AppRoutes"
import Grid from "@mui/material/Grid2"
import StyledAppBar from "./components/common/StyledAppBar"

const AuthContent = () => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) {
    return <div>Cargando...</div>
  }

  return isAuthenticated ? (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
          <StyledAppBar position="static" sx={{ padding: "1rem" }}>
            <Grid container spacing={2}>
              <Grid size={10}>Budget Manager</Grid>
              <Grid
                size={1}
                sx={{ display: "inline-flex", justifyContent: "end" }}
              >
                {/* <StyledButton
                  size="small"
                  variant="text"
                  onClick={() => {
                    signOut(auth)
                  }}
                  sx={{ color: "#fff" }}
                >
                  Cerrar sesion
                </StyledButton> */}
              </Grid>
              <Grid
                size={1}
                sx={{ display: "inline-flex", justifyContent: "end" }}
              >
                <ColorModeSelect sx={{ height: "2rem" }} />
              </Grid>
            </Grid>
          </StyledAppBar>
        </Box>
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
