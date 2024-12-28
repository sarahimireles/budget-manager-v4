import React from "react"
import { useAuthContext } from "../utils/hooks/common/useAuthContext"

const Accounts = () => {
  const { user } = useAuthContext()
  return <div>Accounts {user?.email}</div>
}

export default Accounts
