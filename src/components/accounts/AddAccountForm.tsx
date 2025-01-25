import React, { useState } from "react"
import { AccountIcons } from "../../types/common"
import {
  Autocomplete,
  Box,
  FormControlLabel,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material"
import { IconSelect } from "../common/IconSelect"
import Grid from "@mui/material/Grid2"
import { StyledColorPicker } from "../common/StyledColorPicker"
import StyledButton from "../common/StyledButton"

/* To move outside */
type formError = {
  name?: string
  balance?: string
  accountType?: string
  incomeCategoryError?: string
  colorError?: string
}

const accountTypeOptions = [
  { label: "Debito", value: "debit" },
  { label: "Credito", value: "credit" },
]

type autoCompleteOptionType = {
  label: string
  value: string
}

/* Finish block To move outside */

const AddAccountForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    balance: 0,
    isSum: false,
    accountType: { label: "", value: "" },
    icon: AccountIcons[0],
    incomeCategoryIcon: "",
    color: "#fff",
  })

  const [formErrors, setFormErrors] = useState<formError>({
    name: "",
    balance: "",
    accountType: "",
  })

  const handleChange = () => {}

  const handleIconChange = (event: SelectChangeEvent) => {
    setFormValues((prev) => ({ ...prev, icon: event.target.value as string }))
  }

  const handleAccountTypeChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: autoCompleteOptionType | null
  ) => {
    setFormValues((prev) => ({
      ...prev,
      accountType: value || { label: "", value: "" },
    }))
    setFormErrors((prev) => ({ ...prev, accountType: "" })) // Limpiar errores
  }

  const handleColorChange = (color: string) => {
    setFormValues((prev) => ({ ...prev, color }))
    setFormErrors((prev) => ({ ...prev, colorError: "" })) // Limpiar errores
  }

  const handleIsSumToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, isSum: event.target.checked }))
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "30vw",
        paddingTop: "0.5rem",
      }}
    >
      <TextField
        label="Nombre"
        name="name"
        variant="outlined"
        value={formValues.name}
        onChange={handleChange}
        error={!!formErrors.name}
        helperText={formErrors.name}
      />

      <Grid container spacing={3}>
        <Grid size={8}>
          <TextField
            label="Balance actual"
            name="balance"
            variant="outlined"
            value={formValues.balance}
            onChange={handleChange}
            error={!!formErrors.balance}
            helperText={formErrors.balance}
            type="number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={4}>
          <IconSelect
            label="Icono de categoria"
            icon={formValues.icon}
            handleIconChange={handleIconChange}
            icons={AccountIcons}
          />
        </Grid>
      </Grid>

      <Autocomplete
        options={accountTypeOptions}
        getOptionLabel={(option) => option.label}
        value={formValues.accountType}
        onChange={handleAccountTypeChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona tipo de cuenta"
            error={!!formErrors.accountType}
            placeholder="Escribe para buscar"
            helperText={formErrors.accountType}
          />
        )}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
      />

      <Grid container spacing={3}>
        <Grid size={8}>
          <FormControlLabel
            control={
              <Switch checked={formValues.isSum} onChange={handleIsSumToggle} />
            }
            label="Se suma al presupuesto"
          />
        </Grid>
        <Grid size={4}>
          <StyledColorPicker
            color={formValues.color}
            label="Color de cuenta"
            handleColorChange={handleColorChange}
            error={formErrors.colorError}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2rem",
          justifyContent: "flex-end",
          gap: "2rem",
        }}
      >
        <Grid>
          <StyledButton
            variant="outlined"
            color="secondary"
            onClick={() => {
              // Close dialog
            }}
          >
            Cancel
          </StyledButton>
        </Grid>
        <Grid>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              // TODO: Implement save functionality
              console.log("Save clicked", formValues)
            }}
          >
            Save
          </StyledButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddAccountForm
