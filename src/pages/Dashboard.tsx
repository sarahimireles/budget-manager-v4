import React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import StyledButton from "../components/common/StyledButton"
import { DashboardProps } from "../types/common/index"
import Container from "@mui/material/Container"
import { AccountsWidget } from "../components/accounts-widget/AccountsWidget"

const Dashboard = (props: DashboardProps) => {
  const icon = "fa-user"
  return (
    <Container maxWidth="lg">
      <Box>
        <Paper elevation={0} sx={{ padding: "1rem", marginTop: "1rem" }}>
          <h2 style={{ marginTop: "0" }}>Pantalon para tiendas</h2>
          <p>
            <span
              className={`fa-solid ${icon}`}
              style={{ marginRight: "10px" }}
            ></span>
            Usuario autenticado: {props.user?.email || ""}
          </p>
          <Grid container spacing={3}>
            <Grid size={2}>
              <StyledButton variant="contained">Primary</StyledButton>
            </Grid>
            <Grid size={3}>
              <StyledButton variant="contained" color="secondary">
                Secondary
              </StyledButton>
            </Grid>
            <Grid size={2}>
              <StyledButton variant="contained" color="primary" disabled>
                Disabled
              </StyledButton>
            </Grid>
            <Grid size={2}>
              <StyledButton
                variant="contained"
                color="info"
                sx={{ textTransform: "none" }}
              >
                Info
              </StyledButton>
            </Grid>
            <Grid size={2}>
              <StyledButton
                variant="contained"
                color="success"
                sx={{ textTransform: "none" }}
              >
                Success
              </StyledButton>
            </Grid>
            <Grid size={2}>
              <StyledButton variant="contained" color="error">
                Error
              </StyledButton>
            </Grid>
            <Grid size={12}>
              <AccountsWidget />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default Dashboard
