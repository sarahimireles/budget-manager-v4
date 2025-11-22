import React, { useEffect, useRef, useState } from "react"
import { StyledIcon } from "./StyledIcon"
import { HexColorPicker } from "react-colorful"
import { StyledColorPickerProps } from "../../types/common/types"

export const StyledColorPicker = (props: StyledColorPickerProps) => {
  const [color, setColor] = useState(props.color)
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onColorChanged = (color: string) => {
    setColor(color)
    props.handleColorChange(color)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node) &&
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false)
    }
  }

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPicker])

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
        {props.label}
      </label>
      <div className="relative">
        <div className="flex items-center w-full px-3 py-2 rounded border border-gray-600 bg-background-paper text-gray-100">
          <div
            className="w-6 h-6 rounded border border-gray-500 mr-3"
            style={{ backgroundColor: color }}
          />
          <input
            type="text"
            value={color}
            readOnly
            className="bg-transparent border-none focus:outline-none flex-grow text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <StyledIcon icon="eye-dropper" />
          </button>
        </div>
      </div>

      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute z-10 bottom-full left-0 mb-2 bg-white p-2 rounded-lg shadow-xl border border-gray-200"
        >
          <HexColorPicker color={color} onChange={onColorChanged} />
        </div>
      )}

      {props.error && <p className="text-xs text-error mt-1">{props.error}</p>}
    </div>
  )
}
