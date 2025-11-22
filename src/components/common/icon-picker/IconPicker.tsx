import React from "react"
import { StyledIcon } from "../StyledIcon"
import { IconPickerProps } from "../../../types/common"

export const IconPicker = (props: IconPickerProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {props.label}
      </label>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-600 rounded-lg min-h-[50px]">
        {props.icons.map((icon) => (
          <button
            key={icon}
            type="button"
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-secondary/20 ${
              props.selectedIcon === icon
                ? "ring-2 ring-offset-2 ring-secondary"
                : ""
            }`}
            style={
              props.selectedIcon === icon
                ? { backgroundColor: props.selectedColor }
                : {}
            }
            onClick={() => props.handleIconChange(icon)}
          >
            <StyledIcon icon={icon} />
          </button>
        ))}
      </div>
      {props.error && <p className="text-xs text-error mt-1">{props.error}</p>}
    </div>
  )
}
