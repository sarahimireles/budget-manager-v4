import React, { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"

interface SelectOption {
  label: string
  value: string | number
}

interface SelectProps {
  label?: string
  value: string | number
  onChange: (value: string | number) => void
  options: SelectOption[]
  className?: string
  error?: boolean
  helperText?: string
  renderOption?: (option: SelectOption) => React.ReactNode
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className = "",
  error = false,
  helperText,
  renderOption,
}) => {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-default rounded-lg bg-background-paper py-2 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 sm:text-sm ${
              error
                ? "border-error focus:border-error focus:ring-error"
                : "border-gray-600 focus:border-primary focus:ring-primary"
            }`}
          >
            <span className="block truncate text-gray-900 dark:text-gray-100">
              {selectedOption ? selectedOption.label : "Select option"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <span className="fa-solid fa-chevron-down text-gray-400 text-xs"></span>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-paper py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {renderOption ? renderOption(option) : option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <span className="fa-solid fa-check text-xs"></span>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {helperText && (
        <p className={`mt-1 text-xs ${error ? "text-error" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Select
