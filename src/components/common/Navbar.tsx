import React from "react"
import { Link as LinkRoute } from "react-router-dom"
import Grid from "@mui/material/Grid2"
import StyledAppBar from "./StyledAppBar"
import Link from "@mui/material/Link"
import { signOut } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import ColorModeSelect from "../../components/shared-theme/ColorModeSelect"

const Navbar = () => {
  return (
    <StyledAppBar position="static" sx={{ padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid size={9}>
          <LinkRoute to="/">Budget Manager</LinkRoute>
        </Grid>
        <Grid
          size={2}
          sx={{ display: "inline-flex", justifyContent: "space-around" }}
        >
          <LinkRoute to="/accounts">Accounts</LinkRoute>
          <Link
            component="button"
            color="textPrimary"
            underline="hover"
            onClick={() => {
              signOut(auth)
            }}
          >
            Cerrar sesion
          </Link>
        </Grid>
        <Grid size={1} sx={{ display: "inline-flex", justifyContent: "end" }}>
          <ColorModeSelect sx={{ height: "2rem" }} />
        </Grid>
      </Grid>
    </StyledAppBar>
  )
}

export default Navbar
