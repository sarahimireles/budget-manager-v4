import React from "react"
import { AddAccountProps } from "../../types/modals"
import AddAccountForm from "../accounts/AddAccountForm"
import Modal from "../common/Modal"

export const AddAccount = (props: AddAccountProps) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      title="Nueva cuenta"
      maxWidth="lg"
    >
      <AddAccountForm onClose={props.handleClose} />
    </Modal>
  )
}
