import React, { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import "./styles/global.scss"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./sign-in/SignIn"
import { auth } from "../firebaseConfig" // Ruta al archivo de configuración
import Button from "@mui/material/Button"

const App = () => {
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
        <>
            {/* Added for HTML element and attribute style-normalizations */}
            <CssBaseline />

            <Container maxWidth="lg">
                {isAuthenticated ? (
                    <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
                        <h2>Pantalon para tiendas</h2>
                        <p>Usuario autenticado: {user?.email}</p>
                        <Button
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
        </>
    )
}

export default App