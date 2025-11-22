import React from "react"
import { Combobox, Transition } from "@headlessui/react"
import { Fragment } from "react"

interface AutocompleteOption {
  label: string
  value: string
}

interface AutocompleteProps {
  options: AutocompleteOption[]
  value: AutocompleteOption | null
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: AutocompleteOption | null
  ) => void
  renderInput: (params: {
    label?: string
    error?: boolean
    placeholder?: string
    helperText?: string
  }) => React.ReactNode
  getOptionLabel?: (option: AutocompleteOption) => string
  isOptionEqualToValue?: (
    option: AutocompleteOption,
    value: AutocompleteOption
  ) => boolean
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  renderInput,
  getOptionLabel = (option) => option.label,
}) => {
  const [query, setQuery] = React.useState("")

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          getOptionLabel(option).toLowerCase().includes(query.toLowerCase())
        )

  return (
    <Combobox
      value={value}
      onChange={(newValue) =>
        onChange({} as React.SyntheticEvent<Element, Event>, newValue)
      }
    >
      <div className="relative">
        {renderInput({
          label: "Selecciona un país",
          error: false,
          placeholder: "Escribe para buscar",
        })}
        <Combobox.Input
          className="w-full px-3 py-2 rounded border border-gray-600 bg-background-paper text-gray-100 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary"
          displayValue={(option: AutocompleteOption | null) =>
            option ? getOptionLabel(option) : ""
          }
          onChange={(event) => setQuery(event.target.value)}
        />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-paper py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-400">
                No se encontraron resultados.
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? "bg-primary text-gray-900" : "text-gray-100"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                    >
                      {getOptionLabel(option)}
                    </span>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

export default Autocomplete
