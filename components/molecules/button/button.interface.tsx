export type Variant = "outlined" | "contained";
export type VariantType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "ghost"
  | "dark";

type Type = "button" | "reset" | "submit";

export interface ButtonProps {
  onClick?: () => void;
  variant: Variant;
  varianttype?: VariantType;
  type?: Type;
  disabled?: boolean;
  icon?: string;
  text?: string;
  iconSize?: number;
  full?: boolean;
  sx?: object;
}
