import React from "react"
import Box from "../components/common/Box"
import Paper from "../components/common/Paper"
import Button from "../components/common/Button"
import { DashboardProps } from "../types/common/index"
import Container from "../components/common/Container"
import { AccountsWidget } from "../components/accounts/AccountsWidget"
import SimpleForm from "../components/common/SimpleForm"
import { StyledIcon } from "../components/common/StyledIcon"

const Dashboard = (props: DashboardProps) => {
  const icon = "user"
  return (
    <Container maxWidth="lg">
      <Box>
        <Paper
          elevation={0}
          className="p-4 mt-4 bg-background-paper dark:bg-background-paper-dark"
        >
          <h2 className="mt-0 text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Pantalon para tiendas
          </h2>
          <p className="flex items-center gap-2 mb-6 text-gray-700 dark:text-gray-300">
            <StyledIcon icon={icon} />
            Usuario autenticado: {props.user?.email || ""}
          </p>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-2">
              <Button variant="contained">Primary</Button>
            </div>
            <div className="col-span-12 sm:col-span-3">
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
            </div>
            <div className="col-span-12 sm:col-span-2">
              <Button variant="contained" color="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="col-span-12 sm:col-span-2">
              <Button variant="contained" color="info">
                Info
              </Button>
            </div>
            <div className="col-span-12 sm:col-span-2">
              <Button variant="contained" color="success">
                Success
              </Button>
            </div>
            <div className="col-span-12 sm:col-span-2">
              <Button variant="contained" color="error">
                Error
              </Button>
            </div>
            <div className="col-span-12">
              <AccountsWidget />
            </div>
            <div className="col-span-12 md:col-span-6">
              <SimpleForm />
            </div>
          </div>
        </Paper>
      </Box>
    </Container>
  )
}

export default Dashboard
