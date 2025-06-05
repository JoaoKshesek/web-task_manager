import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import {
  Checkbox,
  CheckboxProps as MuiCheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

interface Props<T extends FieldValues> {
  label?: string;
  customLabel?: React.ReactNode; 
  checkboxLabel: string;
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  customOnChange?: () => void;
}

type CheckboxProps = Omit<MuiCheckboxProps, "checked" | "onChange" | "onBlur" | "value">;

export function ControlledCheckbox<T extends FieldValues>({
  label,
  checkboxLabel,
  customLabel,
  name,
  control,
  errorMessage,
  customOnChange,
  ...checkboxProps
}: Props<T> & CheckboxProps) {
  return (
    <FormControl fullWidth>
      {label && <FormHelperText sx={{ ml: 0 }}>{label}</FormHelperText>}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(value)}
                onChange={(_, checked) => {
                  if (typeof customOnChange === "function") customOnChange();
                  onChange(checked);
                }}
                onBlur={onBlur}
                {...checkboxProps}
              />
            }
            label={customLabel || checkboxLabel}
          />
        )}
      />
      {errorMessage && <FormHelperText sx={{ color: "error.main" }}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
