import { useState } from "react"
import { SnackbarState } from "../../../types/snackbar"

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  })

  const showSnackbar = (message: string, severity: "error" | "warning" | "info" | "success") => {
    setSnackbar({ open: true, message, severity })
  }

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return { snackbar, showSnackbar, closeSnackbar }
}
