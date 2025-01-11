import React from "react"
import Dashboard from "../../pages/Dashboard"
import Accounts from "../../pages/Accounts"
import { AppRoutesType } from "../../types/common"
import Transactions from "../../pages/Transactions"
import SpendingPlan from "../../pages/SpendingPlan"
import Reports from "../../pages/Reports"
import PaymentsAndBills from "../../pages/PaymentsAndBills"

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
    path: "/transactions",
    element: <Transactions />,
    itemTxt: "Transacciones",
    icon: "fa-receipt",
  },
  {
    path: "/spending-plan",
    element: <SpendingPlan />,
    itemTxt: "Plan de gastos",
    icon: "fa-scale-balanced",
  },
  {
    path: "/reports",
    element: <Reports />,
    itemTxt: "Reportes",
    icon: "fa-chart-pie",
  },
  {
    path: "/payments-and-bills",
    element: <PaymentsAndBills />,
    itemTxt: "Facturas y recibos",
    icon: "fa-file-invoice-dollar",
  },
]
