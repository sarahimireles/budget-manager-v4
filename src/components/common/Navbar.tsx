import React from "react"
import { Link as LinkRoute } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import ColorModeIconDropdown from "../../components/shared-theme/ColorModeIconDropdown"
import AppBar from "./AppBar"
import { NavbarProps } from "../../types/common"

const Navbar = (props: NavbarProps) => {
  const { logout } = useAuth0()

  return (
    <AppBar position="static" className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-100"
            onClick={props.toggleDrawerDispatch}
            aria-label="menu"
          >
            <span className="fa-solid fa-bars text-xl"></span>
          </button>
          <LinkRoute
            className="navbar-link no-underline text-gray-900 dark:text-gray-100"
            to="/"
          >
            <span className="brand text-xl font-brand font-bold">
              BudManager
            </span>
          </LinkRoute>
        </div>
        <div className="flex items-center gap-4">
          <ColorModeIconDropdown />

          <button
            className="text-gray-900 dark:text-gray-100 hover:underline flex items-center"
            aria-label="Log out"
            onClick={() => {
              logout({ logoutParams: { returnTo: window.location.origin } })
            }}
          >
            <span className="fa-solid fa-door-open text-xl"></span>
          </button>
        </div>
      </div>
    </AppBar>
  )
}

export default Navbar
