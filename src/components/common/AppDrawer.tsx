import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Drawer,
  Divider,
} from "@mui/material"
import React from "react"
import { AppRoutes } from "../../utils/common/AppRoutes"
import { AppRoutesType } from "../../types/common"

// @ts-expect-error because for some reason img file is not found
import logo from "../../assets/images/calculator.png"

type AppDrawerProps = {
  showDrawer: boolean
  toggleDrawerDispatch: () => void
}

const AppDrawer = (props: AppDrawerProps) => {
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawerDispatch}
    >
      <List>
        <ListItem key={"logo001"}>
          <ListItemIcon>
            <img src={logo} style={{ maxHeight: "30px" }} />
          </ListItemIcon>
          <ListItemText primary="BudManager" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {AppRoutes.map((route: AppRoutesType, index: number) => (
          <ListItem key={index + "-" + route.itemTxt}>
            <ListItemButton>
              <ListItemIcon>
                <span
                  className={`fa-solid ${route.icon}`}
                  style={{ marginRight: "10px" }}
                ></span>
              </ListItemIcon>
              <ListItemText primary={route.itemTxt} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <Drawer
        open={props.showDrawer}
        onClose={props.toggleDrawerDispatch}
        PaperProps={{
          sx: {
            backgroundColor: "#161726",
            backgroundImage: "none",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  )
}

export default AppDrawer
