export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
  onClose: () => void;
}

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
}
