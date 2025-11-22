import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { SIGN_IN_CONSTANTS } from "../../types/sign-in"
import Button from "../common/Button"
import { Card } from "../common/Card"
import Box from "../common/Box"

export default function SignIn() {
  const { loginWithRedirect, isLoading } = useAuth0()

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background with radial gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,hsl(210,100%,97%),hsl(0,0%,100%))] dark:bg-[radial-gradient(at_50%_50%,hsla(210,100%,16%,0.5),hsl(220,30%,5%))]" />

      <Card
        variant="outlined"
        className="w-full max-w-[450px] p-8 flex flex-col gap-6 shadow-card dark:shadow-card-dark"
      >
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2 font-brand">
          Budget Manager
        </h1>

        <Box className="flex flex-col w-full gap-4 items-center">
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => loginWithRedirect()}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : SIGN_IN_CONSTANTS.LOGIN_SUBMIT}
          </Button>
        </Box>
      </Card>
    </div>
  )
}
