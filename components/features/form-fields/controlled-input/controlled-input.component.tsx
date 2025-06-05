import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

import { FormControl, FormHelperText, TextField, TextFieldProps } from "@mui/material";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
}

type InputProps = Omit<TextFieldProps, "value" | "onBlur" | "onChange" | "error">;

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  errorMessage,
  ...inputProps
}: Props<T> & InputProps) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            sx={{ borderRadius: 4 }}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={Boolean(errorMessage)}
            {...inputProps}
          />
        )}
      />
      {errorMessage && <FormHelperText sx={{ color: "red" }}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
