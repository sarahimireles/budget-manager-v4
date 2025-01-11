import React from "react"
import { Link as LinkRoute } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import { useTheme } from "@mui/material"
import ColorModeSelect from "../../components/shared-theme/ColorModeSelect"
import StyledAppBar from "./StyledAppBar"
import { NavbarProps, THEME_MODE } from "../../types/common"

const Navbar = (props: NavbarProps) => {
  const theme = useTheme()

  const iconColor =
    theme.palette.mode === THEME_MODE.DARK
      ? theme.palette.common.white
      : theme.palette.common.black

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
            style={{ textDecoration: "none", color: iconColor }}
          >
            <span className="brand">BudManager</span>
          </LinkRoute>
        </Grid>
        <Grid
          size={2}
          sx={{
            display: "inline-flex",
            justifyContent: "end",
            alignSelf: "center",
          }}
        >
          <ColorModeSelect sx={{ height: "2rem", marginRight: "1rem" }} />

          <Link
            component="button"
            color="textPrimary"
            underline="hover"
            aria-label="Log out"
            onClick={() => {
              signOut(auth)
            }}
          >
            <span className="fa-solid fa-door-open"></span>
          </Link>
        </Grid>
        {/* <Grid
          size={1}
          sx={{ display: "inline-flex", justifyContent: "space-around" }}
        >
          
        </Grid> */}
      </Grid>
    </StyledAppBar>
  )
}

export default Navbar
