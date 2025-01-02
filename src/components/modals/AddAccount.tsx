import { Dialog, DialogTitle, DialogContent } from "@mui/material"
import React from "react"
import { AddAccountProps } from "../../types/modals"

export const AddAccount = (props: AddAccountProps) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Nueva cuenta</DialogTitle>
      <DialogContent>Contenido</DialogContent>
    </Dialog>
  )
}
