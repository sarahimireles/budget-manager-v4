import React, { useEffect } from "react"
import { Transition } from "@headlessui/react"

interface SnackbarProps {
  open: boolean
  message: string
  severity?: "success" | "error" | "warning" | "info"
  autoHideDuration?: number
  onClose: () => void
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity = "info",
  autoHideDuration = 6000,
  onClose,
}) => {
  useEffect(() => {
    if (open && autoHideDuration) {
      const timer = setTimeout(onClose, autoHideDuration)
      return () => clearTimeout(timer)
    }
  }, [open, autoHideDuration, onClose])

  const severityClasses = {
    success: "bg-success text-gray-900",
    error: "bg-error text-white",
    warning: "bg-warning text-white",
    info: "bg-info text-white",
  }

  return (
    <Transition
      show={open}
      enter="transition-all duration-300"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
    >
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div
          className={`px-6 py-3 rounded-lg shadow-lg ${severityClasses[severity]}`}
        >
          {message}
        </div>
      </div>
    </Transition>
  )
}

export default Snackbar
