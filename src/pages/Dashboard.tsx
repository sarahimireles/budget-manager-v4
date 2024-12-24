import { Box, Button } from "@mui/material"
import { signOut, User } from "firebase/auth"
import React from "react"
import { auth } from "../../firebaseConfig"

type DashboardProps = {
  user: User | null
}

const Dashboard = (props: DashboardProps) => {
  return (
    <Box>
      <h2>Pantalon para tiendas</h2>
      <p>Usuario autenticado: {props.user?.email}</p>
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
