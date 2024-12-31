import { Database } from "firebase/database"
import { Account, AccountGroup } from "../types/common"
import { ServiceBase } from "./serviceBase"

// Service for accounts
export class AccountsService extends ServiceBase<Account> {
  constructor(db: Database, userId: string | undefined) {
    super(db, userId)
    this.serviceUrl = "accounts"
  }

  async getAccountsGroupedByType(): Promise<AccountGroup[] | null> {
    const accounts: Account[] | null = await this.getAll()

    if (!accounts) {
      return null
    }

    const groupedAccountsMap = new Map<string, AccountGroup>()

    accounts.forEach((account) => {
      const groupName = account.accountType.name
      const existingGroup = groupedAccountsMap.get(groupName)

      if (existingGroup) {
        existingGroup.items.push(account)
        existingGroup.totalBalance += account.currentBalance
      } else {
        groupedAccountsMap.set(groupName, {
          name: groupName,
          items: [account],
          totalBalance: account.currentBalance,
        })
      }
    })

    // Convert the Map values to an array
    return Array.from(groupedAccountsMap.values())
  }
}
