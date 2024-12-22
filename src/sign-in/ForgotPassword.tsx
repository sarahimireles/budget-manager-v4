import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import OutlinedInput from "@mui/material/OutlinedInput"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import CustomSnackbar from "../components/common/CustomSnackbar"
import { useSnackbar } from "../hooks/common/useSnackbar"

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

      showSnackbar("Un correo ha sido enviado a esta direccion para cambiar el password.", "success")
    } catch (error: unknown) {
      console.error("Error enviando correo para cambiar el passowrd:", error)

      showSnackbar("Oopsy, algo salio mal. Intenta de nuevo.", "error")
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

        <DialogTitle>Cambiar password</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          <DialogContentText>
            Ingresa tu correo y te enviaremos un email para cambiar tu password.
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Correo electronico"
            placeholder="Correo electronico"
            type="email"
            fullWidth
            inputRef={emailRef}
          />
        </DialogContent>

        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handlePasswordReset}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
