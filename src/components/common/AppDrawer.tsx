import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Drawer,
  useTheme,
  Divider,
} from "@mui/material"
import React from "react"
import { AppRoutes } from "../../utils/common/AppRoutes"
import { AppDrawerProps, AppRoutesType, THEME_MODE } from "../../types/common"
import { useNavigate } from "react-router-dom"

// @ts-expect-error because for some reason img file is not found
import logo from "../../assets/images/calculator.png"

const AppDrawer = (props: AppDrawerProps) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const drawerBgImage =
    theme.palette.mode === THEME_MODE.DARK ? "none" : "var(--Paper-overlay)"

  const iconColor =
    theme.palette.mode === THEME_MODE.DARK
      ? theme.palette.primary.main
      : theme.palette.grey[900]

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawerDispatch}
    >
      <List>
        <ListItem key={"logo001"} style={{ marginTop: "1rem" }} disablePadding>
          <ListItemButton onClick={() => handleNavigation("/")}>
            <ListItemIcon>
              <img src={logo} style={{ maxHeight: "30px" }} />
            </ListItemIcon>
            <ListItemText
              primary="BudManager"
              style={{ fontFamily: "Lora, serif" }}
              primaryTypographyProps={{
                fontSize: "1.2rem",
                fontFamily: "Lora, serif",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        {AppRoutes.map((route: AppRoutesType, index: number) => (
          <ListItem
            key={index + "-" + route.itemTxt}
            disablePadding
            style={{ marginTop: "1rem" }}
          >
            <ListItemButton onClick={() => handleNavigation(route.path)}>
              <ListItemIcon>
                <span
                  className={`fa-solid ${route.icon}`}
                  style={{ fontSize: "1.1rem", color: iconColor }}
                ></span>
              </ListItemIcon>
              <ListItemText primary={route.itemTxt} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <>
      <Drawer
        open={props.showDrawer}
        onClose={props.toggleDrawerDispatch}
        PaperProps={{
          sx: {
            backgroundImage: drawerBgImage,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  )
}

export default AppDrawer
