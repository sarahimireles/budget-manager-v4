import React from "react"
import { useAuthContext } from "../utils/hooks/common/useAuthContext"

const Accounts = () => {
  const context = useAuthContext()
  return <div>Accounts {context?.user?.email}</div>
}

export default Accounts
