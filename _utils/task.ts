import { ChipProps } from "@mui/material";

export type MuiColor = ChipProps["color"];

export type Option = {
  value: string;
  label: string;
  color?: MuiColor;
};

export const priorityOptions: Option[] = [
  { label: "Baixa", value: "low", color: "success" },
  { label: "Média", value: "medium", color: "info" },
  { label: "Alta", value: "high", color: "warning" },
  { label: "Urgente", value: "urgent", color: "error" },
];

export const statusOptions: Option[] = [
  { label: "Não iniciado", value: "not_started", color: "default" },
  { label: "Em progresso", value: "in_progress", color: "info" },
  { label: "Completo", value: "completed", color: "success" },
  { label: "Cancelado", value: "cancelled", color: "error" },
];

export function getOptionLabel(options: Option[], value?: string | null): string {
  return options.find((opt) => opt.value === value)?.label ?? "-";
}

export function getOptionColor(options: Option[], value?: string | null): MuiColor | undefined {
  return options.find((opt) => opt.value === value)?.color;
}
