import { Dialog, DialogTitle, DialogContent } from "@mui/material"
import React from "react"
import { AddAccountProps } from "../../types/modals"
import AddAccountForm from "../accounts/AddAccountForm"

export const AddAccount = (props: AddAccountProps) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose} maxWidth="lg">
      <DialogTitle>Nueva cuenta</DialogTitle>
      <DialogContent>
        <AddAccountForm />
      </DialogContent>
    </Dialog>
  )
}
