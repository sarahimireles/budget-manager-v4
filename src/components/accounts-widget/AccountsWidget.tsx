import {
  AccordionDetails,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import React, { useState, useEffect } from "react"
import { AccountsService } from "../../services"
import { useDatabaseContext, useAuthContext } from "../../utils/hooks/common"
import { formatCurrency } from "../../utils/functions"
import Grid from "@mui/material/Grid2"
import {
  StyledAccordion,
  StyledAccordionSummary,
} from "../common/StyledAccordion"
import { Add } from "@mui/icons-material"
import {
  AccountGroup,
  ACCOUNTS_WIDGET_CONSTANTS,
} from "../../types/accounts-widget"
import StyledButton from "../common/StyledButton"

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
    <Card>
      <CardHeader
        sx={{ paddingBottom: "1.5rem" }}
        title={ACCOUNTS_WIDGET_CONSTANTS.TITLE}
        action={
          <StyledButton
            variant="text"
            size="small"
            color="primary"
            startIcon={<Add />}
          >
            {ACCOUNTS_WIDGET_CONSTANTS.ADD_ACCOUNT_TEXT}
          </StyledButton>
        }
      />
      <CardContent sx={{ p: 0, "&:last-child": { paddingBottom: 0 } }}>
        {accounts != undefined && accounts.length > 0 ? (
          accounts?.map((group) => (
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
                    <Typography>
                      {formatCurrency(group.totalBalance)}
                    </Typography>
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
          ))
        ) : (
          <Typography sx={{ pl: 2, pr: 2, pb: 2 }}>
            No hay cuentas registradas
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
