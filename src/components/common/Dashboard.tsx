import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import StyledButton from "./StyledButton"
import React from "react"
import { DashboardProps } from "../../types/common"

const Dashboard = (props: DashboardProps) => {
  return (
    <Box>
      <Paper elevation={0}>
        <h2>Pantalon para tiendas</h2>
        <p>Usuario autenticado: {props.email}</p>
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
        </Grid>
      </Paper>
    </Box>
  )
}

export default Dashboard
