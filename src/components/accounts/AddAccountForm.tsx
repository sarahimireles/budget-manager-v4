import React, { useState } from "react"
import { AccountIcons } from "../../types/common"
import { IconSelect } from "../common/IconSelect"
import { StyledColorPicker } from "../common/StyledColorPicker"
import Button from "../common/Button"
import Box from "../common/Box"
import TextField from "../common/TextField"
import Autocomplete from "../common/Autocomplete"
import Switch, { FormControlLabel } from "../common/Switch"
import {
  ACCOUNT_TYPE_OPTIONS,
  AddAccountFormProps,
  AutoCompleteOptionType,
  FormError,
} from "../../types/accounts"

const AddAccountForm = ({ onClose }: AddAccountFormProps) => {
  const [formValues, setFormValues] = useState({
    name: "",
    balance: 0,
    isSum: false,
    accountType: { label: "", value: "" },
    icon: AccountIcons[0],
    incomeCategoryIcon: "",
    color: "#fff",
  })

  const [formErrors, setFormErrors] = useState<FormError>({
    name: "",
    balance: "",
    accountType: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleIconChange = (event: { target: { value: string } }) => {
    const value = event.target.value
    setFormValues((prev) => ({ ...prev, icon: value }))
  }

  const handleAccountTypeChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: AutoCompleteOptionType | null
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
    <Box className="flex flex-col gap-4 w-full md:w-[600px] pt-2">
      <TextField
        label="Nombre"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        error={!!formErrors.name}
        helperText={formErrors.name}
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <TextField
            label="Balance actual"
            name="balance"
            value={formValues.balance}
            onChange={handleChange}
            error={!!formErrors.balance}
            helperText={formErrors.balance}
            type="number"
            className="w-full"
          />
        </div>
        <div className="col-span-4">
          <IconSelect
            label="Icono de categoria"
            icon={formValues.icon}
            handleIconChange={handleIconChange}
            icons={AccountIcons}
          />
        </div>
      </div>

      <Autocomplete
        options={ACCOUNT_TYPE_OPTIONS}
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

      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-8">
          <FormControlLabel
            control={
              <Switch checked={formValues.isSum} onChange={handleIsSumToggle} />
            }
            label="Se suma al presupuesto"
          />
        </div>
        <div className="col-span-4">
          <StyledColorPicker
            color={formValues.color}
            label="Color de cuenta"
            handleColorChange={handleColorChange}
            error={formErrors.colorError}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // TODO: Implement save functionality
            console.log("Save clicked", formValues)
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  )
}

export default AddAccountForm
