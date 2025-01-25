export type Account = {
  name: string
  image: string
  color: string
  sumsToMonthlyBudget: boolean
  currentBalance: number
  key?: string
  accountType: AccountType
}

export type AccountType = {
  name: string
}

export type AccountGroup = {
  name: string
  items: Account[]
  totalBalance: number
}
