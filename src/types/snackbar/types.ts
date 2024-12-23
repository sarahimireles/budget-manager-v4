export enum Severity {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}

export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: Severity;
  onClose: () => void;
}

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: Severity;
}
