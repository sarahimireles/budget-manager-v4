import React, { useState } from "react"
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material"

// TODO: Este control se va a eliminar, solo es para ver como se hace un formulario simple

type formError = {
  name?: string
  balance?: string
}

const SimpleForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    balance: 0,
    isSum: false,
  })

  const [formErrors, setFormErrors] = useState<formError>({
    name: "",
    balance: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: "" })) // Limpiar errores
  }

  const validate = () => {
    const errors: formError = {}

    if (!formValues.name.trim()) errors.name = "El nombre es obligatorio"
    const min = 0
    const balance = Number(formValues.balance)
    if (balance < min) errors.balance = `El valor no puede ser menor que ${min}`

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      console.log("Formulario válido:", formValues)
    }
  }

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, isSum: event.target.checked }))
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* TextField */}
      <TextField
        label="Nombre"
        name="name"
        variant="outlined"
        value={formValues.name}
        onChange={handleChange}
        error={!!formErrors.name}
        helperText={formErrors.name}
      />

      {/* TextField para números */}
      <TextField
        label="Edad"
        name="balance"
        variant="outlined"
        value={formValues.balance}
        onChange={handleChange}
        error={!!formErrors.balance}
        helperText={formErrors.balance}
        type="number"
      />

      {/* Switch */}
      <FormControlLabel
        control={<Switch checked={formValues.isSum} onChange={handleToggle} />}
        label="Se suma al presupuesto"
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  )
}

export default SimpleForm
