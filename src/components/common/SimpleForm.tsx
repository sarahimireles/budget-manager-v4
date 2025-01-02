import React, { useState } from "react"
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  SelectChangeEvent,
  Switch,
  TextField,
  useTheme,
} from "@mui/material"
import { AccountIcons, IncomeCategoryIcons } from "../../types/common"
import { IconSelect } from "./IconSelect"
import { IconPicker } from "./icon-picker/IconPicker"

// TODO: Este control se va a eliminar, solo es para ver como se hace un formulario simple

type formError = {
  name?: string
  balance?: string
  autoCompleteOption?: string
  incomeCategoryError?: string
}

type autoCompleteOptionType = {
  label: string
  value: string
}

const autoCompleteOptions = [
  { label: "México", value: "MX" },
  { label: "Estados Unidos", value: "US" },
  { label: "Canadá", value: "CA" },
]

const SimpleForm = () => {
  const theme = useTheme()
  const [formValues, setFormValues] = useState({
    name: "",
    balance: 0,
    isSum: false,
    autoCompleteOption: { label: "", value: "" },
    icon: AccountIcons[0],
    incomeCategoryIcon: "",
  })

  const [formErrors, setFormErrors] = useState<formError>({
    name: "",
    balance: "",
    autoCompleteOption: "",
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
    if (formValues.autoCompleteOption.value === "")
      errors.autoCompleteOption = "Por favor selecciona un país"
    if (formValues.incomeCategoryIcon === "")
      errors.incomeCategoryError = "Selecciona un icono"

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

  const handleAutoCompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: autoCompleteOptionType | null
  ) => {
    setFormValues((prev) => ({
      ...prev,
      autoCompleteOption: value || { label: "", value: "" },
    }))
    setFormErrors((prev) => ({ ...prev, autoCompleteOption: "" })) // Limpiar errores
  }

  const handleIconChange = (event: SelectChangeEvent) => {
    setFormValues((prev) => ({ ...prev, icon: event.target.value as string }))
  }

  const handleCategoryIconChange = (selectedIcon: string) => {
    setFormValues((prev) => ({ ...prev, incomeCategoryIcon: selectedIcon }))
    setFormErrors((prev) => ({ ...prev, incomeCategoryError: "" })) // Limpiar errores
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

      {/* Autocomplete */}
      <Autocomplete
        options={autoCompleteOptions} // Opciones
        getOptionLabel={(option) => option.label} // Cómo mostrar las opciones
        value={formValues.autoCompleteOption} // Valor actual
        onChange={handleAutoCompleteChange} // Manejar el cambio
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona un país"
            error={!!formErrors.autoCompleteOption} // Mostrar el estado de error
            placeholder="Escribe para buscar"
            helperText={formErrors.autoCompleteOption}
          />
        )}
        isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara valores para evitar errores
      />

      {/* Select icon */}
      <IconSelect
        label="Icono de categoria"
        icon={formValues.icon}
        handleIconChange={handleIconChange}
        icons={AccountIcons}
      />

      {/* Icon picker */}
      {/* TODO: Como le hago para obtener el color del tema? */}
      <IconPicker
        label="Icono"
        handleIconChange={handleCategoryIconChange}
        icons={IncomeCategoryIcons}
        selectedColor={theme.palette.secondary.main}
        selectedIcon={formValues.incomeCategoryIcon}
        error={formErrors.incomeCategoryError}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  )
}

export default SimpleForm
