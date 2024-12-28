import AppBar, { AppBarProps } from "@mui/material/AppBar"
import { styled } from "@mui/material/styles"

const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  backgroundImage:
    theme.palette.mode === "dark"
      ? `linear-gradient(${theme.palette.info.dark}, ${theme.palette.background.default})`
      : `linear-gradient(${theme.palette.info.light}, ${theme.palette.info.light})`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}))

export default StyledAppBar
