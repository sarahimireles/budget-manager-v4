import React, { Fragment } from "react"
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon"
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Menu, Transition } from "@headlessui/react"
import { useTheme } from "../../contexts/ThemeContext"

export default function ColorModeIconDropdown() {
  const { mode, setTheme } = useTheme()

  const icon = {
    light: <FontAwesomeIcon icon={faMoon} />,
    dark: <FontAwesomeIcon icon={faSun} />,
  }[mode]

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="inline-flex items-center justify-center w-9 h-9 rounded border border-gray-600 hover:bg-gray-700 transition-colors"
        data-screenshot="toggle-mode"
      >
        {icon}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-32 origin-top-right rounded-lg bg-background-paper border border-gray-700 shadow-lg focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setTheme("light")}
                  className={`${active ? "bg-gray-700" : ""} ${
                    mode === "light" ? "bg-gray-800" : ""
                  } group flex w-full items-center px-4 py-2 text-sm text-gray-100`}
                >
                  Light
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setTheme("dark")}
                  className={`${active ? "bg-gray-700" : ""} ${
                    mode === "dark" ? "bg-gray-800" : ""
                  } group flex w-full items-center px-4 py-2 text-sm text-gray-100`}
                >
                  Dark
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
