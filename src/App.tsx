import React from "react"
import "./styles/global.scss"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"

const App = () => {
    return (
        <>
            {/* Added for HTML element and attribute style-normalizations */}
            <CssBaseline />

            <Container maxWidth="lg">
                <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
                    <h2>Pantalon para tiendas</h2>
                </Box>
            </Container>
        </>
    )
}

export default App