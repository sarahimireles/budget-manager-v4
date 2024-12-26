import Button, { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"

const StyledButton = styled(Button)<ButtonProps>(() => ({
  textTransform: "none",
}))

export default StyledButton
