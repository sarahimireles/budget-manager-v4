import React from "react"
import { SnackbarProps } from "../../types/snackbar"
import Snackbar from "./Snackbar"

const CustomSnackbar = ({
  open,
  message,
  severity,
  onClose,
}: SnackbarProps) => {
  return (
    <Snackbar
      open={open}
      message={message}
      severity={severity}
      onClose={onClose}
      autoHideDuration={6000}
    />
  )
}

export default CustomSnackbar
