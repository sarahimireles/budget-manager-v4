import AppBar, { AppBarProps } from "@mui/material/AppBar"
import { styled } from "@mui/material/styles"

const StyledAppBar = styled(AppBar)<AppBarProps>(() => ({
  backgroundImage: "none",
  borderBottom: "1px solid #26333c",
}))

export default StyledAppBar
