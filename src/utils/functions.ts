export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\S+@\S+\.\S+$/
  return emailRegex.test(email)
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}
