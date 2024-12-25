import React from "react"
import Dashboard from "../../pages/Dashboard"
import Accounts from "../../pages/Accounts"

export const AppRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/accounts", element: <Accounts /> },
]
