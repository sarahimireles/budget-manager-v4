import React from "react"
import { Link as LinkRoute } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import ColorModeSelect from "../../components/shared-theme/ColorModeSelect"
import StyledAppBar from "./StyledAppBar"

type NavbarProps = {
  toggleDrawerDispatch: () => void
}

const Navbar = (props: NavbarProps) => {
  return (
    <StyledAppBar position="static" sx={{ padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid size={10}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.toggleDrawerDispatch}
          >
            <span className="fa-solid fa-bars"></span>
          </IconButton>
          <LinkRoute
            className="navbar-link"
            to="/"
            style={{ textDecoration: "none" }}
          >
            <span className="brand">BudgetManager</span>
          </LinkRoute>
        </Grid>
        <Grid
          size={1}
          sx={{ display: "inline-flex", justifyContent: "space-around" }}
        >
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
        <Grid
          size={1}
          sx={{
            display: "inline-flex",
            justifyContent: "end",
            alignSelf: "center",
          }}
        >
          <ColorModeSelect sx={{ height: "2rem" }} />
        </Grid>
      </Grid>
    </StyledAppBar>
  )
}

export default Navbar
