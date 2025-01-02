import React from "react"
import Dashboard from "../../pages/Dashboard"
import Accounts from "../../pages/Accounts"
import { AppRoutesType } from "../../types/common"

export const AppRoutes: AppRoutesType[] = [
  {
    path: "/",
    element: <Dashboard user={null} />,
    itemTxt: "Dashboard",
    icon: "fa-calculator",
  },
  {
    path: "/accounts",
    element: <Accounts />,
    itemTxt: "Cuentas",
    icon: "fa-dollar-sign",
  },
  {
    path: "/accounts",
    element: <Accounts />,
    itemTxt: "Transacciones",
    icon: "fa-receipt",
  },
  {
    path: "/accounts",
    element: <Accounts />,
    itemTxt: "Plan de gastos",
    icon: "fa-scale-balanced",
  },
  {
    path: "/accounts",
    element: <Accounts />,
    itemTxt: "Reportes",
    icon: "fa-chart-pie",
  },
  {
    path: "/accounts",
    element: <Accounts />,
    itemTxt: "Facturas y recibos",
    icon: "fa-file-invoice-dollar",
  },
]
