export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
  onClose: () => void;
}
