import Button, { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"

const StyledButton = styled(Button)<ButtonProps>(() => ({
  textTransform: "none",
  padding: "8px 16px",
}))

export default StyledButton
