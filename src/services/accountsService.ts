import { Database } from "firebase/database"
import { Account } from "../types/common"
import { ServiceBase } from "./serviceBase"

// Service for accounts
export class AccountsService extends ServiceBase<Account> {
  constructor(db: Database, userId: string | undefined) {
    super(db, userId)
    this.serviceUrl = "accounts"
  }
}
