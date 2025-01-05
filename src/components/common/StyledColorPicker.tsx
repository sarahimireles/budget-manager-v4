import { FormControl, InputLabel, Input, Box } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { StyledIcon } from "./StyledIcon"
import { HexColorPicker } from "react-colorful"
import { StyledColorPickerProps } from "../../types/common/types"

export const StyledColorPicker = (props: StyledColorPickerProps) => {
  const [color, setColor] = useState(props.color)
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement | null>(null) // Referencia al color picker
  const inputRef = useRef<HTMLDivElement | null>(null) // Referencia al contenedor del input

  const onColorChanged = (color: string) => {
    setColor(color)
    props.handleColorChange(color)
  }
  // Cierra el picker si se hace clic fuera
  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
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

  const togglePicker = () => {
    setShowPicker(!showPicker) // Alternar entre mostrar y ocultar el picker
  }

  return (
    <Box position="relative" ref={inputRef} sx={{ width: "100%" }}>
      {/* Color Picker */}
      {showPicker && (
        <Box
          ref={pickerRef} // Referencia al picker
          sx={{
            position: "absolute", // Flotante
            zIndex: 2,
            bottom: "100%", // Posiciona el picker arriba del input
            left: 0,
            backgroundColor: "white", // Fondo blanco para el picker
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // Sombra flotante
            borderRadius: "8px", // Borde redondeado
            padding: "8px", // Espaciado interno opcional
            marginBottom: "8px", // Espaciado entre el picker y el input
          }}
        >
          <HexColorPicker color={color} onChange={onColorChanged} />
        </Box>
      )}

      {/* Input */}
      <FormControl variant="standard" error={!!props.error} fullWidth>
        <InputLabel htmlFor="color-picker-input">{props.label}</InputLabel>
        <Input
          id="color-picker-input"
          type="text"
          value={color}
          readOnly
          endAdornment={
            <Box
              onClick={togglePicker} // Controla la visibilidad del picker
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <StyledIcon icon="calendar" />
            </Box>
          }
        />
      </FormControl>
    </Box>
  )
}
