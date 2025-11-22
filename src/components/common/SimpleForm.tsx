import React, { useState } from "react"
import { SelectChangeEvent } from "../../types/common"
import { AccountIcons, IncomeCategoryIcons } from "../../types/common"
import { IconSelect } from "./IconSelect"
import { IconPicker } from "./icon-picker/IconPicker"
import { StyledColorPicker } from "./StyledColorPicker"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import Box from "./Box"
import TextField from "./TextField"
import Button from "./Button"
import Switch, { FormControlLabel } from "./Switch"
import Autocomplete from "./Autocomplete"

// TODO: Este control se va a eliminar, solo es para ver como se hace un formulario simple

type formError = {
  name?: string
  balance?: string
  autoCompleteOption?: string
  incomeCategoryError?: string
  colorError?: string
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
  const [formValues, setFormValues] = useState({
    name: "",
    balance: 0,
    isSum: false,
    autoCompleteOption: { label: "", value: "" },
    icon: AccountIcons[0],
    incomeCategoryIcon: "",
    color: "#fff",
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
    // Adapted for new Select component which passes value directly or event
    const value = event.target.value
    setFormValues((prev) => ({ ...prev, icon: value }))
  }

  const handleCategoryIconChange = (selectedIcon: string) => {
    setFormValues((prev) => ({ ...prev, incomeCategoryIcon: selectedIcon }))
    setFormErrors((prev) => ({ ...prev, incomeCategoryError: "" })) // Limpiar errores
  }

  const handleColorChange = (color: string) => {
    setFormValues((prev) => ({ ...prev, color }))
    setFormErrors((prev) => ({ ...prev, colorError: "" })) // Limpiar errores
  }

  return (
    <Box className="flex flex-col gap-4">
      {/* TextField */}
      <TextField
        label="Nombre"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        error={!!formErrors.name}
        helperText={formErrors.name}
      />

      {/* TextField para números */}
      <TextField
        label="Edad"
        name="balance"
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
      <IconPicker
        label="Icono"
        handleIconChange={handleCategoryIconChange}
        icons={IncomeCategoryIcons}
        selectedColor="hsl(210, 98%, 42%)" // Hardcoded primary color for now
        selectedIcon={formValues.incomeCategoryIcon}
        error={formErrors.incomeCategoryError}
      />

      {/* Color picker */}
      <StyledColorPicker
        color={formValues.color}
        label="Mi color"
        handleColorChange={handleColorChange}
        error={formErrors.colorError}
      />

      {/* Date picker - Keeping MUI for now but wrapped */}
      <div className="w-full">
        <DatePicker label="Basic date picker" className="w-full" />
      </div>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  )
}

export default SimpleForm
