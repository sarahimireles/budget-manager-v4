import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import React, { useState, useEffect } from "react"
import { AccountsService } from "../../services"
import { AccountGroup } from "../../types/common"
import { useDatabaseContext, useAuthContext } from "../../utils/hooks/common"
import { formatCurrency } from "../../utils/functions"

export const AccountsWidget = () => {
  const db = useDatabaseContext().db
  const userId = useAuthContext().user?.uid
  const [accounts, setAccounts] = useState<AccountGroup[] | null>([])

  // Create UserEffect to get accounts
  useEffect(() => {
    const accountsService = new AccountsService(db, userId)

    accountsService
      .getAccountsGroupedByType()
      .then((data: AccountGroup[] | null) => {
        setAccounts(data)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <Box>
      {accounts?.map((group) => (
        <Accordion key={group.name}>
          <AccordionSummary
            //   expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" sx={{ width: "90%", flexShrink: 0 }}>
              {group.name}
            </Typography>
            <Typography
              component="span"
              sx={{ color: "text.secondary", textAlign: "right" }}
            >
              {formatCurrency(group.totalBalance)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {group.items?.map((account) => (
                <ListItem key={account.name}>
                  <ListItemText primary={account.name} />
                  <Typography sx={{ textAlign: "right" }}>
                    {formatCurrency(account.currentBalance)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
