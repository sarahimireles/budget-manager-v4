import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  anchor?: "left" | "right" | "top" | "bottom"
  PaperProps?: {
    sx?: Record<string, unknown>
  }
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  anchor = "left",
}) => {
  const positionClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  }

  const slideClasses = {
    left: {
      enterFrom: "-translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "-translate-x-full",
    },
    right: {
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full",
    },
    top: {
      enterFrom: "-translate-y-full",
      enterTo: "translate-y-0",
      leaveFrom: "translate-y-0",
      leaveTo: "-translate-y-full",
    },
    bottom: {
      enterFrom: "translate-y-full",
      enterTo: "translate-y-0",
      leaveFrom: "translate-y-0",
      leaveTo: "translate-y-full",
    },
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom={slideClasses[anchor].enterFrom}
          enterTo={slideClasses[anchor].enterTo}
          leave="ease-in duration-200"
          leaveFrom={slideClasses[anchor].leaveFrom}
          leaveTo={slideClasses[anchor].leaveTo}
        >
          <Dialog.Panel
            className={`fixed ${positionClasses[anchor]} bg-background-paper text-gray-100 shadow-xl`}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Drawer
