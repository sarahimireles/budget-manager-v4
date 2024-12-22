import { useState } from "react"

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

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
