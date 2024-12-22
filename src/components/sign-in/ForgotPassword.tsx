import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import OutlinedInput from "@mui/material/OutlinedInput"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import CustomSnackbar from "../common/CustomSnackbar"
import { useSnackbar } from "../../utils/hooks/common/useSnackbar"
import { TEXTS } from "../../types/common"

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const emailRef = React.useRef<HTMLInputElement>(null)
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar()

  const handlePasswordReset = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const email: string = emailRef.current?.value ?? ""
      await sendPasswordResetEmail(auth, email)

      showSnackbar(TEXTS.SNACKBAR.EMAIL_SENT_SUCCESS, "success")
    } catch (error: unknown) {
      console.error("Error enviando correo para cambiar el passowrd:", error)

      showSnackbar(TEXTS.SNACKBAR.GENERAL_ERROR, "error")
    } finally {
      handleClose()
    }
  }

  return (
    <>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            handleClose()
          },
          sx: { backgroundImage: "none" },
        }}
      >

        <DialogTitle>{TEXTS.FORM.FORGOT_PASSWORD_TITLE}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          <DialogContentText>
            {TEXTS.FORM.FORGOT_PASSWORD_DESCRIPTION}
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label={TEXTS.FORM.EMAIL_LABEL}
            placeholder={TEXTS.FORM.EMAIL_LABEL}
            type="email"
            fullWidth
            inputRef={emailRef}
          />
        </DialogContent>

        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>{TEXTS.DIALOG.CANCEL}</Button>
          <Button variant="contained" onClick={handlePasswordReset}>
            {TEXTS.DIALOG.SEND}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
