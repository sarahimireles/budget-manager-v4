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
import { useSnackbar } from "../../utils/hooks/snackbar/useSnackbar"
import { isValidEmail } from "../../utils/functions"
import { FormEvent, useRef } from "react"
import { ForgotPasswordProps } from "../../types/sign-in"
import { SIGN_IN_CONSTANTS } from "../../types/sign-in"
import { Severity } from "../../types/snackbar"

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const emailRef = useRef<HTMLInputElement>(null)
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar()

  const handlePasswordReset = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const email: string = emailRef.current?.value ?? ""

    if (!isValidEmail(email)) {
      showSnackbar(SIGN_IN_CONSTANTS.INVALID_EMAIL, Severity.ERROR)
      return // Detener el envío si el correo es inválido
    }

    try {
      await sendPasswordResetEmail(auth, email)
      showSnackbar(SIGN_IN_CONSTANTS.EMAIL_SENT_SUCCESS, Severity.SUCCESS)
    } catch (error: unknown) {
      console.error("Error enviando correo para cambiar el password:", error)
      showSnackbar(SIGN_IN_CONSTANTS.GENERAL_ERROR, Severity.ERROR)
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
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            handleClose()
          },
          sx: { backgroundImage: "none" },
        }}
      >
        <DialogTitle>{SIGN_IN_CONSTANTS.FORGOT_PASSWORD_DIALOG_TITLE}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          <DialogContentText>
            {SIGN_IN_CONSTANTS.FORGOT_PASSWORD_DIALOG_DESCRIPTION}
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label={SIGN_IN_CONSTANTS.EMAIL_LABEL}
            placeholder={SIGN_IN_CONSTANTS.EMAIL_LABEL}
            type="email"
            fullWidth
            inputRef={emailRef}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>{SIGN_IN_CONSTANTS.DIALOG_CANCEL}</Button>
          <Button variant="contained" onClick={handlePasswordReset}>
            {SIGN_IN_CONSTANTS.DIALOG_SEND}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
