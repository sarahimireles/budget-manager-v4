import { Box } from "@mui/material"
import React, { useState, useEffect } from "react"
import { AccountsService } from "../../services"
import { Account } from "../../types/common"
import { useDatabaseContext, useAuthContext } from "../../utils/hooks/common"

export const AccountsWidget = () => {
  const db = useDatabaseContext().db
  const userId = useAuthContext().user?.uid
  const [accounts, setAccounts] = useState<Account[] | null>([])

  // Create UserEffect to get accounts
  useEffect(() => {
    const accountsService = new AccountsService(db, userId)

    accountsService
      .getAll()
      .then((data: Account[] | null) => {
        setAccounts(data)
      })
      .catch((error) => console.error(error))
  }, [])

  return accounts?.map((account) => (
    <Box key={account.key}>
      <h3>{account.name}</h3>
      <p>Saldo: {account.currentBalance}</p>
    </Box>
  ))
}
