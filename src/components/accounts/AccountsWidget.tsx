import React, { useState, useEffect } from "react"
import { AccountsService } from "../../services"
import { useDatabaseContext, useAuthContext } from "../../utils/hooks/common"
import { formatCurrency } from "../../utils/functions"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../common/Accordion"
import { Card, CardHeader, CardContent } from "../common/Card"
import Button from "../common/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AccountGroup, ACCOUNTS_WIDGET_CONSTANTS } from "../../types/accounts"
import { AddAccount } from "../modals/AddAccount"
import { AddAccountProps } from "../../types/modals"

export const AccountsWidget = () => {
  const db = useDatabaseContext().db
  const userId = useAuthContext().user?.uid
  const [accounts, setAccounts] = useState<AccountGroup[] | null>([])
  const accountsService = new AccountsService(db, userId)
  const refreshAccounts = () => {
    accountsService
      .getAccountsGroupedByType()
      .then((data: AccountGroup[] | null) => {
        setAccounts(data)
      })
      .catch((error) => console.error(error))
  }
  const [addAccountsOpen, setAddAccountsOpen] = useState<boolean>(false)
  const addAccountProps: AddAccountProps = {
    open: addAccountsOpen,
    handleClose: () => {
      setAddAccountsOpen(false)
    },
  }

  const openAddAccountDialog = () => {
    setAddAccountsOpen(true)
  }

  // Create UserEffect to get accounts
  useEffect(() => {
    refreshAccounts()
  }, [])

  return (
    <>
      <AddAccount {...addAccountProps} />
      <Card>
        <CardHeader
          className="pb-6"
          title={ACCOUNTS_WIDGET_CONSTANTS.TITLE}
          action={
            <Button
              variant="text"
              size="small"
              color="primary"
              onClick={openAddAccountDialog}
              startIcon={<FontAwesomeIcon icon={faPlus} />}
            >
              {ACCOUNTS_WIDGET_CONSTANTS.ADD_ACCOUNT_TEXT}
            </Button>
          }
        />
        <CardContent className="p-0 pb-0 last:pb-0">
          {accounts != undefined && accounts.length > 0 ? (
            accounts?.map((group) => (
              <Accordion key={group.name}>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex w-full justify-between items-center">
                    <div className="w-3/4">
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {group.name}
                      </p>
                    </div>
                    <div className="w-1/4 text-right">
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {formatCurrency(group.totalBalance)}
                      </p>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="list-none p-0 m-0">
                    {group.items?.map((account) => (
                      <li
                        key={account.key}
                        className="flex justify-between items-center py-2 px-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {account.name}
                        </span>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {formatCurrency(account.currentBalance)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <p className="px-4 pb-4 text-gray-500 dark:text-gray-400">
              No hay cuentas registradas
            </p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
