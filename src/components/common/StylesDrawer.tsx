import Drawer, { DrawerProps } from "@mui/material/Drawer"
import { styled } from "@mui/material/styles"

const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.background.paper),
}))

export default StyledDrawer
