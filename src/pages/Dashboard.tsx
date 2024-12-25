import { Box, Button } from "@mui/material"
import { signOut } from "firebase/auth"
import React from "react"
import { auth } from "../../firebaseConfig"

const Dashboard = () => {
  return (
    <Box>
      <h2>Pantalon para tiendas</h2>
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
  )
}

export default Dashboard
