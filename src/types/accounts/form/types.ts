export type FormError = {
  name?: string
  balance?: string
  accountType?: string
  incomeCategoryError?: string
  colorError?: string
}

export type AutoCompleteOptionType = {
  label: string
  value: string
}

export type AddAccountFormProps = {
  onClose?: () => void
}
