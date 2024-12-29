import {
  AccordionDetails,
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
import Grid from "@mui/material/Grid2"
import {
  StyledAccordion,
  StyledAccordionSummary,
} from "../common/StyledAccordion"

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
        <StyledAccordion key={group.name}>
          <StyledAccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Grid container spacing={3} sx={{ width: "100%" }}>
              <Grid size={9}>
                <Typography>{group.name}</Typography>
              </Grid>
              <Grid size={3} sx={{ textAlign: "right" }}>
                <Typography>{formatCurrency(group.totalBalance)}</Typography>
              </Grid>
            </Grid>
          </StyledAccordionSummary>
          <AccordionDetails>
            <List>
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
        </StyledAccordion>
      ))}
    </Box>
  )
}
