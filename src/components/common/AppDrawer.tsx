import React from "react"
import { useNavigate } from "react-router-dom"
import Drawer from "./Drawer"
import Box from "./Box"
import { AppRoutes } from "../../utils/common/AppRoutes"
import { AppDrawerProps, AppRoutesType } from "../../types/common"

// @ts-expect-error because for some reason img file is not found
import logo from "../../assets/images/calculator.png"

const AppDrawer = (props: AppDrawerProps) => {
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
    props.toggleDrawerDispatch()
  }

  return (
    <Drawer
      open={props.showDrawer}
      onClose={props.toggleDrawerDispatch}
      anchor="left"
    >
      <Box className="w-[250px] h-full flex flex-col bg-background-paper dark:bg-background-paper-dark">
        <ul className="p-0 m-0 list-none">
          <li className="mt-4">
            <button
              onClick={() => handleNavigation("/")}
              className="w-full flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <div className="min-w-[40px] flex justify-center">
                <img src={logo} style={{ maxHeight: "30px" }} alt="Logo" />
              </div>
              <span className="font-brand text-xl text-gray-900 dark:text-gray-100">
                BudManager
              </span>
            </button>
          </li>
        </ul>

        <ul className="p-0 m-0 list-none mt-2">
          {AppRoutes.map((route: AppRoutesType, index: number) => (
            <li key={index + "-" + route.itemTxt} className="mt-4">
              <button
                onClick={() => handleNavigation(route.path)}
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left group"
              >
                <div className="min-w-[40px] flex justify-center">
                  <span
                    className={`fa-solid ${route.icon} text-lg text-gray-900 dark:text-primary group-hover:text-primary transition-colors`}
                  ></span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {route.itemTxt}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
      </Box>
    </Drawer>
  )
}

export default AppDrawer
