import { styled, Accordion, AccordionSummary } from "@mui/material"

export const StyledAccordion = styled(Accordion)(() => ({
  overflow: "hidden", // Asegura que el contenido respete los bordes redondeados
  "&.Mui-expanded": {
    marginBottom: "8px", // Evita cambios de margen al expandir
    marginTop: "8px", // Evita cambios de margen al expandir
  },
}))

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "&.Mui-expanded": {
    backgroundColor: theme.palette.secondary.dark, // Cambia el color al expandirse
  },
}))
