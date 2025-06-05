import { Icon } from "@/components";
import { Touchable } from "./button.styles";
import { CircularProgress, ButtonProps } from "@mui/material";
import Link from "next/link";

export interface Props extends ButtonProps {
  label: string;
  isLoading?: boolean;
  icon?: string;
}

export function Button({ label, color, disabled, icon, isLoading, ...props }: Props) {
  return (
    <Touchable
      {...props}
      color={color}
      disabled={isLoading || disabled}
      startIcon={icon && !isLoading ? <Icon icon={icon} /> : undefined}
      LinkComponent={props.href ? Link : undefined}
    >
      {isLoading ? <CircularProgress color={color} size={26} /> : label}
    </Touchable>
  );
}
