import React from "react"
import "./styles/global.scss"
import Container from "@mui/material/Container"
// import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./sign-in/SignIn"

const App = () => {
    return (
        <>
            {/* Added for HTML element and attribute style-normalizations */}
            <CssBaseline />

            <Container maxWidth="lg">
                <SignIn />
            </Container>
        </>
    )
}

export default App